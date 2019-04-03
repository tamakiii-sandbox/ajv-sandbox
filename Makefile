
lint: tsconfig.json
	npx tslint -p $^ src/**/*.ts

lint-fix: tsconfig.json
	npx tslint -p $^ --fix src/**/*.ts

webpack: webpack.config.js package.json
	npx nodemon $(foreach f,$^,--watch $f) --exec "npx webpack --mode development --watch --progress"

