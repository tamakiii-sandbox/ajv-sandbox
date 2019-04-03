
lint: tsconfig.json
	npx tslint -p $^ src/**/*.ts

lint-fix: tsconfig.json
	npx tslint -p $^ --fix src/**/*.ts

webpack: webpack.config.js package.json tsconfig.json tslint.json
	npx nodemon $(foreach f,$^,--watch $f) --exec "npx webpack --mode development --watch --progress"

webpack-dev-server: webpack.config.js package.json tsconfig.json tslint.json
	npx nodemon $(foreach f,$^,--watch $f) --exec "npx webpack-dev-server --host 0.0.0.0 --port 8888 --hot"

