compress:
	uglifyjs -nc src/config.js > build/honey.js
	uglifyjs -nc src/honey.source.js >> build/honey.js

imgotv:
	@if [ ! -d build/imgotv ]; then mkdir -p build/imgotv; fi
	uglifyjs -nc src/config.imgotv.js > build/imgotv/honey.js
	uglifyjs -nc src/honey.source.js >> build/imgotv/honey.js
