import os
from PIL import Image

image_dir = 'images'
files_to_process = ['1L.png', '200ML.png', '2L.png', '500ML.png', '5L TIN.png']

for file_name in files_to_process:
    file_path = os.path.join(image_dir, file_name)
    if os.path.exists(file_path):
        print(f'Cropping {file_path}...')
        try:
            with Image.open(file_path) as img:
                # Convert to RGBA if not already
                img = img.convert("RGBA")
                # Get bounding box of non-transparent pixels
                bbox = img.getbbox()
                if bbox:
                    # Crop the image to the bounding box
                    cropped_img = img.crop(bbox)
                    # Add a small 5% padding around it just in case
                    width, height = cropped_img.size
                    pad_w = int(width * 0.05)
                    pad_h = int(height * 0.05)
                    new_img = Image.new("RGBA", (width + 2*pad_w, height + 2*pad_h), (0,0,0,0))
                    new_img.paste(cropped_img, (pad_w, pad_h))
                    new_img.save(file_path)
                    print(f'Successfully cropped {file_name}')
                else:
                    print(f'Image {file_name} is completely transparent.')
        except Exception as e:
            print(f'Failed {file_path}: {e}')
    else:
        print(f'{file_path} not found.')
print('Done cropping images!')
