const geometry_math = require('./math.js');

function render(width, height) {
	const image = new Array(width);

	for (let x = 0; x < width; x++) {
		image[x] = new Array(height);
	}

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			// image[x][y] = [y/height, x/width, 0];
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
		content += '\n';
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

// saveImageToFile(render(3, 2), 'small.ppm');
// saveImageToFile(render(1024, 768), 'large.ppm');

function cast_ray(orig, dir, sphere){
	let {center, radius} = sphere;

	if (geometry_math.ray_intersect(orig, dir, center, radius)) {
		return [0.7, 0.3, 0.3];
	}

	return [0.2, 0.7, 0.8];
}


function final_render(sphere, width, height, fov){
	let x, y, dir;

	const image = new Array(width);

	for (let w = 0; w < width; w++) {
		image[w] = new Array(height);
	}

	for (let j = 0; j < height; j++) {
		for (let i = 0; i < width; i++) {
			x =   ((2*i + 1)/width - 1)*Math.tan(fov/2) * (width/height);
			y = - ((2*j + 1)/height - 1)*Math.tan(fov/2);
			dir = geometry_math.normalize([x, y, -1]);
			image[i][j] = cast_ray([0,0,0], dir, sphere);
		}
	}

	return image;
}

const Sphere = {center: [-3, 0, -16], radius: 2};
console.log(saveImageToFile(final_render(Sphere, 1024, 768, Math.PI/2), 'new.ppm'));

// console.log(ray_intersect([2, 1], [3,4], [3, 3], 1));
// console.log(ray_intersect([2, 1], [-1,-2], [5, 5], 2));
// console.log(ray_intersect([2, 1], [2,0], [5, 5], 2));