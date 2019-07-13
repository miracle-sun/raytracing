function scalar(a, b) {
	const n = a.length;
	let res = 0;

	for (let i = 0; i < n; i++) {
		res += a[i] * b[i]
	}

	return res;
}

function difference(a, b) {
	const n = a.length;
	let res = [];

	for (let i = 0; i < n; i++) {
		res[i] = b[i] - a[i]
	}

	return res;
}

const ray_intersect = function ray_intersect(orig, dir, center, radius) {
	const L = difference(orig, center);
	const tca = scalar(L, normalize(dir));
	const d2 = scalar(L, L) - tca*tca;

	if (d2 > radius*radius) {
		return false; 
	}

	const thc = Math.sqrt(radius*radius - d2);
	let t0 = tca - thc;
	let t1 = tca + thc;

	if (t0 < 0) {
		t0 = t1;
        if (t0 < 0) {
        	return false;
        }
    }

    return true;
}

const normalize = function normalize(vec) {
	const n = vec.length;
	let l = 0;
	let res = [];

	for (let i = 0; i < n; i++) {
		l += vec[i]*vec[i];
	}

	for (let j = 0; j < n; j++) {
		res[j] = vec[j]/Math.sqrt(l);
	}

	return res;
}

module.exports.normalize = normalize;
module.exports.ray_intersect = ray_intersect;

// console.log(ray_intersect([2, 1], [3,4], [3, 3], 1));
// console.log(ray_intersect([2, 1], [-1,-2], [5, 5], 2));
// console.log(ray_intersect([2, 1], [2,0], [5, 5], 2));