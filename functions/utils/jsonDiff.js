const _ = require('lodash');

module.exports = (object, base) => {
	const changes = (object, base) =>
		_.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] =
					_.isObject(value) && _.isObject(base[key])
						? changes(value, base[key])
						: value;
			}
		});
	return changes(object, base);
};
