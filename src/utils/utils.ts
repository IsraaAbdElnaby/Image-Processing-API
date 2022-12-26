import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const resizeImg = async (imgFile: string, width: number, height: number):
 Promise< string> => {
    const imgsDir = getDirectory();
    const resizeDir = path.join(imgsDir, 'thumbnail');

    if(!fs.existsSync(resizeDir)) {
        fs.mkdirSync(resizeDir);
    }
    
    if(width && height) {
        const outPath = path.join(imgsDir, 'thumbnail', `${imgFile}-width${width}-height${height}.jpg`);
        const inPath = path.join(imgsDir,imgFile+'.jpg');
        const img = sharp(inPath);

        await img.resize ({
            width,
            height
        })
        .toFile(outPath);
        return outPath;
    } else if (!height && width) { //if only width is provided
        const outPath = path.join(imgsDir, 'thumbnail', `${imgFile}-width${width}.jpg`);
        const inPath = path.join(imgsDir,imgFile+'.jpg');
        const img = sharp(inPath);

        await img.resize ({
            width
        })
        .toFile(outPath);
        return outPath;
    } else { //if only height is provided
        const outPath = path.join(imgsDir, 'thumbnail', `${imgFile}-height${height}.jpg`);
        const inPath = path.join(imgsDir,imgFile+'.jpg');
        const img = sharp(inPath);

        await img.resize ({
            height
        })
        .toFile(outPath);
        return outPath;
    }
}

export const getImgPath = async (imgFile: string, width: number, height: number):
Promise<string> => {
    const imgsDir = getDirectory();
    const originalImg = path.join(imgsDir, `${imgFile}.jpg`);

    if (!width && !height) {
        return originalImg;
    }else {
        const resizedImg = await resizeImg(imgFile, width, height);
        return resizedImg;
    }
}

export const getDirectory = (dir: string = __dirname): string => {
    const contents = fs.readdirSync(dir);
    if (contents.includes("images")) {
        return path.join(dir, 'images');
    }else {
        return getDirectory(path.join(dir, '..'))
    }
};