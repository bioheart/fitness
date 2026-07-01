import fitz
import cv2
import numpy as np
from PIL import Image
import io

pdf_path = "docs/source/57006b61-d7ac-43e3-90d3-ac6520867f56_Workout_Plan_UpperLower_Hybrid__AnteriorPosterior_Focus.pdf"
doc = fitz.open(pdf_path)

# Let's load Page 11 (Day 1)
page = doc.load_page(11)
pix = page.get_pixmap(dpi=300)
img_data = pix.tobytes("png")
img_array = np.frombuffer(img_data, np.uint8)
img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Top circle center for Day 1 Card 2:
tx, ty = 1050.2, 728.5
bx, by = 1048.6, 1544.6

# Start at ty + 150 (safely below circle)
start_y = int(ty + 150)

# Move left from tx to find x0
x0 = None
for x in range(int(tx), 0, -1):
    # Border is a dark line (typically < 235)
    if gray[start_y, x] < 235:
        # Check if it's a line (several pixels are dark)
        if gray[start_y, x-1] < 235 or gray[start_y, x-2] < 235:
            x0 = x
            break

# Move right from tx + 300 to find x1
x1 = None
for x in range(int(tx + 300), gray.shape[1]):
    if gray[start_y, x] < 235:
        if gray[start_y, x+1] < 235 or gray[start_y, x+2] < 235:
            x1 = x
            break

# Move up from ty to find y0 (start at tx + 200)
start_x = int(tx + 200)
y0 = None
for y in range(int(ty), 0, -1):
    if gray[y, start_x] < 235:
        if gray[y-1, start_x] < 235:
            y0 = y
            break

# Move down from by to find y1 (start at tx + 200)
y1 = None
for y in range(int(by), gray.shape[0]):
    if gray[y, start_x] < 235:
        if gray[y+1, start_x] < 235:
            y1 = y
            break

print(f"Detected Card 2 borders: X={x0} to {x1} (width={x1-x0 if x0 and x1 else 0})")
print(f"Detected Card 2 borders: Y={y0} to {y1} (height={y1-y0 if y0 and y1 else 0})")
