from PIL import Image
import sys

def image_to_ascii(image_path, new_width=100):
    try:
        img = Image.open(image_path)
    except Exception as e:
        print(f"Error opening image: {e}")
        return
        
    width, height = img.size
    aspect_ratio = height / float(width)
    new_height = int(aspect_ratio * new_width * 0.55) # 0.55 corrects character aspect ratio
    img = img.resize((new_width, new_height))
    
    img = img.convert('L') # Convert to grayscale
    pixels = img.getdata()
    
    # 10 levels of grayscale
    chars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "]
    
    new_pixels = [chars[min(9, pixel // 26)] for pixel in pixels]
    new_pixels = ''.join(new_pixels)
    
    ascii_image = [new_pixels[index:index + new_width] for index in range(0, len(new_pixels), new_width)]
    print(f"--- ASCII Preview of {image_path} ({width}x{height}) ---")
    print('\n'.join(ascii_image))
    print("---------------------------------------")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_to_ascii(sys.argv[1], 80)
    else:
        print("Usage: python view_ascii.py <image_path>")
