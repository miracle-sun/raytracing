function render(width, height) {
	const image = new Array(width);

	for (let x = 0; x < width; x++) {
		image[x] = new Array(height);
	}

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			image[x][y] = [y/height, x/width, 0];
		}
	}

	return image;
}

function saveImageToFile(image, fileName) {
	const fs = require('fs');

	const width = image.length;
	const height = image[0].length;

	const fileHeader = `P3\n${width} ${height}\n255\n`;

	let content = fileHeader;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let pixel = convertPixel(image[x][y]) + '\t';
			content += pixel;
		}
	}

	fs.writeFileSync(fileName, content);
}

function convertChannel(chl) {
	return Math.floor(chl*255);
}

function convertPixel(pixel) {
	const convertedPixel = pixel.map(chl => convertChannel(chl));
	
	return convertedPixel.join(' ');
}

saveImageToFile(render(3, 2), 'small.ppm');
saveImageToFile(render(1024, 768), 'large.ppm');
