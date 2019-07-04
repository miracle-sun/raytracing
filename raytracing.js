function render(width, height) {
	const image = new Array(width);

	for (let x = 0; x < width; x++) {
		image[x] = new Array(height);
	}

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			image[x][y] = [x/width, y/height, 0];
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

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			let pixel = convertPixel(image[x][y]) + ' ';
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
