module.exports = {
	"env": {
		"commonjs": true,
		"es2021": true,
		"node": true,
		"jest": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"eqeqeq": "error",
		"object-curly-spacing": [
			"error",
			"always"
		],
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		],
		"no-console": 0 // disables a rule, by defining value as 0
	}
};
