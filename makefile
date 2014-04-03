compress:
	@uglifyjs -nc src/configs/config.js > svn/honey.js
	@uglifyjs -nc src/head.load.js >> svn/honey.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.js

imgotv:
	@echo 芒果TV 压缩中。。。
	@uglifyjs -nc src/configs/config.imgotv.js > svn/honey.imgotv.js
	@uglifyjs -nc src/head.load.js >> svn/honey.imgotv.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.imgotv.js

ihunantv:
	@echo 芒果微空间 压缩中。。。
	@uglifyjs -nc src/configs/config.ihunantv.js > svn/honey.ihunantv.js
	@uglifyjs -nc src/head.load.js >> svn/honey.ihunantv.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.ihunantv.js

hunantv:
	@echo 金鹰网 压缩中。。。
	@uglifyjs -nc src/configs/config.hunantv.js > svn/honey.hunantv.js
	@uglifyjs -nc src/head.load.js >> svn/honey.hunantv.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.hunantv.js

datahunantv:
	@echo 资讯数据 data.hunantv 压缩中。。。
	@uglifyjs -nc src/configs/config.datahunantv.js > svn/honey.data.js
	@uglifyjs -nc src/head.load.js >> svn/honey.data.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.data.js

monitor:
	@echo 监控 压缩中。。。
	@uglifyjs -nc src/configs/config.monitor.js > svn/honey.monitor.js
	@uglifyjs -nc src/head.load.js >> svn/honey.monitor.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.monitor.js

newhunantv:
	@echo 新金鹰网 压缩中。。。
	@uglifyjs -nc src/configs/config.newhunantv.js > svn/honey.newhunantv.js
	@uglifyjs -nc src/head.load.js >> svn/honey.newhunantv.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.newhunantv.js

hunantvimgotv:
	@echo 芒果视频 压缩中
	@uglifyjs -nc src/configs/config.hunantvimgotv.js > svn/honey.hunantv.imgo.js
	@uglifyjs -nc src/head.load.js >> svn/honey.hunantv.imgo.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.hunantv.imgo.js



admanager:
	@echo 广告系统 压缩中。。。
	@uglifyjs -nc src/configs/config.admanager.js > svn/honey.admanager.js
	@uglifyjs -nc src/head.load.js >> svn/honey.admanager.js
	@uglifyjs -nc src/honey.source.js >> svn/honey.admanager.js



docx: 
	@echo 文档生成...
	@cp -rf ./doc-svn/ svn/doc
	@cd svn/; \
		svn add ./doc; \
		echo 提交文档到svn;


#do echo $(basename $$filename); 
#do echo $(basename $$filename});
#uglifyjs $${origin} >> svn/; 
#echo $${dirname}; 

#svn: hunantv compress imgotv ihunantv datahunantv monitor hunantvimgotv admanager
svn: hunantvimgotv
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
		svn up; \
		svn add *.js; \
		echo 提交svn; \
		svn ci -m 'honey 2.0 svn deploy xydudu'; 
	@echo ------ 完成 -----

#	@for filename in src/lib/*.source.js; \
#		do echo $${filename##*/}; \
#		done
#

