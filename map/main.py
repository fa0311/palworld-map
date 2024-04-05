import os

from PIL import Image

img = Image.open('map/raw.png')

def split_map(n, size, save_dir):
    os.makedirs(save_dir, exist_ok=True)
    width, height = img.size
    for i in range(n):
        for j in range(n):
            crop = (j * width // n, i * height // n, (j + 1) * width // n, (i + 1) * height // n)
            img.crop(crop).resize((size, size)).save(f'{save_dir}/{i}_{j}.png')


if __name__ == '__main__':
    for i in range(0, 6):
        split_map(2 ** i, 256, f'public/map/{i}')