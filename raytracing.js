const geometry_math = require('./math.js');

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
	let {center, radius, color} = sphere;

	if (geometry_math.ray_intersect(orig, dir, center, radius)) {
		return color;
	}

	return [0.2, 0.7, 0.8];
}

function scene_intersect(orig, dir, spheres){
	const n = spheres.length;
	let res = [];
	let intersect, sphere_i;
	for (let i = 0; i < n; i++) {
		intersect = geometry_math.ray_intersect(orig, dir, spheres[i])
		if(intersect >= 0 ) {
			res.push({dist: intersect, index: i});
		}
	}

	if (res.length > 0) {
		sphere_i = min_index(res);
		return spheres[sphere_i].color;
	}

	return [0.2, 0.7, 0.8];
}

function min_index(arr) {
	let index = arr[0].index;
	let min = arr[0].dist;
	for (let i = 1; i < arr.length; i++){
		if(arr[i].dist < min) {
			min = arr[i].dist;
			index = arr[i].index;
		}
	}

	return index;
}


function final_render(spheres, width, height, fov){
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

			image[i][j] = scene_intersect([0,0,0], dir, spheres);
		}
	}

	return image;
}

const Ivory = [0.4, 0.4, 0.3];
const RedRubber = [0.3, 0.1, 0.1];
const Sphere1 = {center: [-3, 0, -16], radius: 2, color: Ivory};
const Sphere2 = {center: [-1.0, -1.5, -12], radius: 2, color: RedRubber};
const Sphere3 = {center: [1.5, -0.5, -18], radius: 3, color: RedRubber};
const Sphere4 = {center: [7, 5, -18], radius: 4, color: Ivory};
const Spheres = [Sphere1, Sphere2, Sphere3, Sphere4];
console.log(saveImageToFile(final_render(Spheres, 1024, 768, Math.PI/2), 'spheres.ppm'));

// console.log(ray_intersect([2, 1], [3,4], [3, 3], 1));
// console.log(ray_intersect([2, 1], [-1,-2], [5, 5], 2));
// console.log(ray_intersect([2, 1], [2,0], [5, 5], 2));