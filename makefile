compress:
	@uglifyjs -nc src/config.js > svn/honey.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.js

imgotv:
	@echo 芒果TV 压缩中。。。
	@uglifyjs -nc src/config.imgotv.js > svn/honey.imgotv.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.imgotv.js

ihunantv:
	@echo 芒果微空间 压缩中。。。
	@uglifyjs -nc src/config.ihunantv.js > svn/honey.ihunantv.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.ihunantv.js

hunantv:
	@echo 金鹰网 压缩中。。。
	@uglifyjs -nc src/config.hunantv.js > svn/honey.hunantv.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.hunantv.js

datahunantv:
	@echo 资讯数据 data.hunantv 压缩中。。。
	@uglifyjs -nc src/config.datahunantv.js > svn/honey.data.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.data.js


#do echo $(basename $$filename); 
#do echo $(basename $$filename});
#uglifyjs $${origin} >> svn/; 
#echo $${dirname}; 

svn: hunantv compress imgotv ihunantv datahunantv
	@for dirname in src/*; do \
		if [ -d $${dirname} ]; then \
			for file in $${dirname}/*.source.js; do \
				origin=$${file}; \
				file=$${file##src/}; \
				target=svn/$${file%source.js}js; \
				dir=$${target%/*.js}; \
				if [ -f $${origin} ]; then \
					if [ ! -d $$dir ]; then mkdir -p $$dir; fi; \
					echo 压缩 $${origin} 到 $${target}; \
					uglifyjs -nc $$origin > $$target; \
					svn add $$target; \
				fi; \
			done; \
		fi; \
	done
	@cd svn/; \
		svn add *.js; \
		echo 提交svn; \
		svn ci -m 'honey 2.0 svn deploy xydudu'; 
	@echo ------ 完成 -----

#	@for filename in src/lib/*.source.js; \
#		do echo $${filename##*/}; \
#		done
#

