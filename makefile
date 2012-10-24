compress:
	uglifyjs -nc src/config.js > build/honey.js
	uglifyjs -nc src/honey.source.js >> build/honey.js

imgotv:
	@if [ ! -d build/imgotv ]; then mkdir -p build/imgotv; fi
	uglifyjs -nc src/config.imgotv.js > build/imgotv/honey.js
	uglifyjs -nc src/honey.source.js >> build/imgotv/honey.js

ihunantv:
	@if [ ! -d build/ihunantv ]; then mkdir -p build/ihunantv; fi
	uglifyjs -nc src/config.ihunantv.js > build/ihunantv/honey.js
	uglifyjs -nc src/honey.source.js >> build/ihunantv/honey.js

		#do echo $(basename $$filename); 
		#do echo $(basename $$filename});
loop:
	@for filename in src/lib/*.source.js; \
		do echo $${filename##*/}; \
		done


