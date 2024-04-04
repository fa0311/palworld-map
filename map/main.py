import os

from PIL import Image

img = Image.open('map/raw.png')

def split_map(x:int, y:int, output:str):
    width, height = img.size
    assert width % x == 0, 'Width is not divisible by x'
    assert height % y == 0, 'Height is not divisible by y'

    os.makedirs(output, exist_ok=True)
    for i in range(0, width // x):
        for j in range(0, height // y):
            box = (i * x, j * y, (i + 1) * x, (j + 1) * y)
            img.crop(box).save(f'{output}/{i}_{j}.png')
    


if __name__ == '__main__':
    split_map(512, 512, 'public/map/512x512'),
    split_map(1024, 1024, 'public/map/1024x1024'),