"""Crop exercise cards from the four source workout sheets.

The source sheets contain five or six exercise panels. This script extracts
each complete card, including its number, illustration, names, and coaching
note, then normalizes its width for use by the web app.
"""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "images"
OUTPUT_WIDTH = 720


# Crop boxes use Pillow's (left, top, right, bottom) coordinates.
SHEETS = {
    1: {
        "source": "raw_p11_i1.png",
        "cards": [
            (18, 207, 391, 756),
            (396, 207, 736, 756),
            (741, 207, 1105, 756),
            (18, 762, 391, 1297),
            (396, 762, 736, 1297),
            (741, 762, 1105, 1297),
        ],
    },
    2: {
        "source": "raw_p12_i1.png",
        "cards": [
            (10, 207, 377, 780),
            (386, 207, 738, 780),
            (745, 207, 1112, 780),
            (142, 794, 554, 1314),
            (565, 794, 979, 1314),
        ],
    },
    3: {
        "source": "raw_p13_i1.png",
        "cards": [
            (18, 207, 384, 788),
            (389, 207, 733, 788),
            (741, 207, 1105, 788),
            (113, 794, 557, 1307),
            (565, 794, 1001, 1307),
        ],
    },
    4: {
        "source": "raw_p14_i1.png",
        "cards": [
            (19, 208, 380, 785),
            (386, 208, 734, 785),
            (741, 208, 1105, 785),
            (120, 795, 560, 1314),
            (564, 795, 1001, 1314),
        ],
    },
}


def normalize_width(image: Image.Image) -> Image.Image:
    """Resize a card to a consistent width while retaining its aspect ratio."""
    return image.resize(
        (OUTPUT_WIDTH, round(image.height * OUTPUT_WIDTH / image.width)),
        Image.Resampling.LANCZOS,
    )


def main() -> None:
    for day, sheet in SHEETS.items():
        source = Image.open(IMAGE_DIR / sheet["source"]).convert("RGB")
        for number, crop_box in enumerate(sheet["cards"], start=1):
            card = source.crop(crop_box)
            output = normalize_width(card)
            output.save(
                IMAGE_DIR / f"day{day}_{number}.png",
                format="PNG",
                optimize=True,
            )

if __name__ == "__main__":
    main()
