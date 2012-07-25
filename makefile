compress:
	uglifyjs -nc src/config.js > build/honey.js
	uglifyjs -nc src/honey.source.js >> build/honey.js
