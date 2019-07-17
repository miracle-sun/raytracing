const scalar = function scalar(a, b) {
	const n = a.length;
	let res = 0;

	for (let i = 0; i < n; i++) {
		res += a[i] * b[i]
	}

	return res;
}

const vectorAdd = function(a, b) {
	const n = a.length;
	let res = [];

	for (let i = 0; i < n; i++) {	
		res.push(a[i] + b[i]);
	}

	return res;
}

const vectorSubtract = function(a, b) {
	const n = a.length;
	let res = [];

	for (let i = 0; i < n; i++) {	
		res.push(b[i] - a[i]);
	}

	return res;
}

const multipleVectorByConst = function multipleVectorByConst(c, a) {
	const n = a.length;
	let res = [];

	for (let i = 0; i < n; i++) {	
		res.push(a[i]*c);
	}

	return res;
}

const ray_intersect = function ray_intersect(orig, dir, sphere) {
	const {center, radius} = sphere;
	const L = vectorSubtract(orig, center);
	const tca = scalar(L, normalize(dir));
	const d2 = scalar(L, L) - tca*tca;

	if (d2 > radius*radius) {
		return -1;
	}

	const thc = Math.sqrt(radius*radius - d2);
	let t0 = tca - thc;
	let t1 = tca + thc;

	if (t0 < 0) {
		t0 = t1;
        if (t0 < 0) {
			return -1;
        }
    }

    return t0;
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
module.exports.scalar = scalar;
module.exports.multipleVectorByConst = multipleVectorByConst;
module.exports.vectorAdd = vectorAdd;
module.exports.vectorSubtract = vectorSubtract;
// console.log(ray_intersect([2, 1], [3,4], [3, 3], 1));
// console.log(ray_intersect([2, 1], [-1,-2], [5, 5], 2));
// console.log(ray_intersect([2, 1], [2,0], [5, 5], 2));