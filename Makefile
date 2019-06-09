install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

build:
	npx babel src --out-dir dist

publish:
	npm publish --dry-run

lint:
	npx eslint .

asciinema:
	asciinema rec

test:
	npm test