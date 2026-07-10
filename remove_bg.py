import os
from rembg import remove

image_dir = 'images'
files_to_process = ['1L.png', '200ML.png', '2L.png', '500ML.png', '5L TIN.png']

for file_name in files_to_process:
    file_path = os.path.join(image_dir, file_name)
    if os.path.exists(file_path):
        print(f'Removing background for {file_path}...')
        try:
            with open(file_path, 'rb') as i:
                input_data = i.read()
            output_data = remove(input_data)
            with open(file_path, 'wb') as o:
                o.write(output_data)
            print(f'Successfully processed {file_name}')
        except Exception as e:
            print(f'Failed {file_path}: {e}')
    else:
        print(f'{file_path} not found.')
print('Done!')
