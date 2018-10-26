module.exports = (setA, setB) => {
	var o = {},
		result = [];
	function count(i, o) {
		return function(a) {
			o[a] = o[a] || { count: 0, value: a };
			o[a].count += i;
		};
	}

	setA.forEach(count(1, o));
	setB.forEach(count(-1, o));
	Object.keys(o).forEach(function(k) {
		if (o[k].count) {
			o[k].count = Math.abs(o[k].count);
			while (o[k].count--) {
				result.push(o[k].value);
			}
		}
	});
	return result;
};
