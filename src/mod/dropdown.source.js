honey.def(function(H) {

	//todo
	//dragButton height calculate
	//dragButton move relationship
	//wheel event
	var Event = function() {
		this.addEvent = function(type, handler, capture) {
			if (this.addEventListener) {
				this.addEventListener(type, handler, capture);
			} else if (this.attachEvent) {
				this.attachEvent("on" + type, handler);
			}
		};

		this.detachEvent = function(type, handler, capture) {
			if (this.removeEventListener) {
				this.removeEventListener(type, handler, capture);
			} else if (this.detachEvent) {
				this.detachEvent("on" + type, handler);
			}
		};
	};
	var evt = new Event(),
		doc = document;

	H.dropdown = function($dBox, $options) {

		var _opt = {
			assoc: null, //associated selector
			data: [],
			_box: null,
			showNum: 4,
			defaultIndex: 1,
			listHeight: 200,
			itemHeight: 40,
			slave: false,
			slaveIndex: 0,
			selectKeyValue: []
		};

		if ($dBox.indexOf("#") > -1) {
			_opt._box = doc.getElementById($dBox.replace("#", ""));
		} else {
			return null;
		}

		_extendsOpt(_opt, $options);
		_build(_opt);
		_setListStyle(_opt);
		_bindEvent(_opt);

		if (!_opt.slave && _opt.assoc) {
			_opt.assoc.changeTo(_opt.defaultIndex - 1);
		}

		return {
			getValue: function() {
				return _opt.selectKeyValue;
			},
			changeTo: function(index) {
				if (_opt.slave) {
					var options = _buildList(_opt.data[index]),
						list = doc.getElementById("list_" + _opt.mod_id),
						text = doc.getElementById("text_" + _opt.mod_id);
					_opt.defaultIndex = parseInt(index) + 1;
					list.innerHTML = options;
					text.innerHTML = _opt.data[index][_opt.slaveIndex - 1];
					_opt.selectKeyValue = [_opt.slaveIndex - 1, _opt.data[index][_opt.slaveIndex - 1]];
					_setListStyle(_opt);
				}
			}
		};
	}

	function _extendsOpt(_opt, $opt) {
		for (var k in $opt) {
			if (_opt.hasOwnProperty(k)) {
				_opt[k] = $opt[k];
			}
		}
	}

	function _build(_opt) {
		var options = "",
			textStr = "",
			defaultIndex = _opt.defaultIndex,
			slaveIndex = _opt.slaveIndex;
		_opt.mod_id = Math.random() * 10000 >> 0;

		if (defaultIndex > _opt.data.length && defaultIndex < 1) {
			defaultIndex = 1;
		}

		if (slaveIndex > _opt.data[defaultIndex - 1] && slaveIndex < 1) {
			slaveIndex = 1;
		}

		if (_opt.slave) {
			textStr = _opt.data[defaultIndex - 1][slaveIndex - 1];
			if (_opt.data[defaultIndex - 1].length > 0) {
				options = _buildList(_opt.data[defaultIndex - 1]);
			}
		} else {
			textStr = _opt.data[defaultIndex - 1];
			if (_opt.data.length > 0) {
				options = _buildList(_opt.data);
			}
		}
		var html = "<div class='hdd-title clearfix' id='title_" + _opt.mod_id + "'> \
            <div class='hdd-text' id='text_" + _opt.mod_id + "'>" + textStr + "</div> \
            <span class='hdd-tip'><em class='hdd-pinner'>◆</em><em class='hdd-pouter'>◆</em></span></div>\
        	<div class='hdd-body' id='body_" + _opt.mod_id + "'> \
	            <ul class='hdd-list' id='list_" + _opt.mod_id + "'> \
	            " + options + " </ul> \
           	<div class='hdd_verticalBar' id='track_" + _opt.mod_id + "'> \
                <div class='hdd_track'> \
                    <div class='hdd_dragButton' id='db_" + _opt.mod_id + "'></div> \
                </div> \
            </div></div>";
		_opt._box.innerHTML = html;
		_opt.selectKeyValue = [defaultIndex - 1, textStr];

	}

	function _buildList($data) {
		var index = 0,
			option = "";
		for (var i in $data) {
			option += "<li><a href='javascript:void(0);' value='" + index + "'>" + $data[i] + "</a></li>";
			index++;
		}
		return option;
	}

	function _setListStyle(_opt){
		var dragButton = doc.getElementById("db_" + _opt.mod_id),
			track = doc.getElementById("track_" + _opt.mod_id),
			listBody = doc.getElementById("body_" + _opt.mod_id);

		listBody.style.height = _opt.listHeight + "px";
		//获取列表的数据长度，如果是从下拉框的话则获取相应列表的长度。
		var len = parseInt(((_opt.slave) ? (_opt.data[_opt.defaultIndex - 1].length) : (_opt.data.length)));
		//等分滚动条
		_opt.perItem = _opt.listHeight / len;
		//设置滚动条Bar的长度，perItem必须取整，不然滚动条移动不到距离的时候最后一项无法显示
		_opt.btnHeight = (len <= _opt.showNum) ? _opt.listHeight : (_opt.showNum * (_opt.perItem >> 0));
		//设置滚动条Bar的长度
		dragButton.style.height = _opt.btnHeight + "px";

		 var links = listBody.getElementsByTagName("a");

		 //move a to right
		if (_opt.btnHeight >= _opt.listHeight) {
			track.style.display = "none";
			for(var l in links) {
				//links[l].style.border = "1px";
				console.log(links[l]);
			}
		}else{
			track.style.display = "block";
			for(var l in links) {
				//links[l].style.border = "0px";
			}
		}
	}

	//=========================Event====================
	function _bindEvent(_opt) {
		//set getStyles
		if (window.getComputedStyle) {
			getStyles = function(elem) {
				return window.getComputedStyle(elem, null);
			};
		} else if (document.documentElement.currentStyle) {
			getStyles = function(elem) {
				return elem.currentStyle;
			};
		}

		var box = _opt._box,
			mod_id = _opt.mod_id,
			dragButton = doc.getElementById("db_" + mod_id),
			listBody = doc.getElementById("body_" + mod_id),
			list = doc.getElementById("list_" + mod_id),
			title = doc.getElementById("title_" + mod_id),
			text = doc.getElementById("text_" + mod_id),
			oTop = 0,
			oScreenY = 0,
			db_down = false;

		// listBody.style.height = _opt.listHeight + "px";
		// //获取列表的数据长度，如果是从下拉框的话则获取相应列表的长度。
		// var len = parseInt(((_opt.slave) ? (_opt.data[_opt.defaultIndex].length) : (_opt.data.length)));
		// //等分滚动条
		// var perItem = _opt.listHeight / len;
		// //设置滚动条Bar的长度，perItem必须取整，不然滚动条移动不到距离的时候最后一项无法显示
		// btnHeight = (len <= _opt.showNum) ? _opt.listHeight : (_opt.showNum * (perItem >> 0));
		// dragButton.style.height = btnHeight + "px";

		// //hide the track and bar if dropdown don't need scroll
		// if (btnHeight >= _opt.listHeight) {
		// 	track.style.display = "none";
		// }

		evt.addEvent.apply(dragButton, ['mousedown',
			function(evt) {
				oTop = getStyles(dragButton).top.replace("px", "");
				oScreenY = evt.screenY;
				db_down = true;
			}
		]);

		evt.addEvent.apply(doc, ['mouseup',
			function(evt) {
				db_down = false;
				oTop = oScreenY = 0;
			}
		]);

		evt.addEvent.apply(doc, ['mousemove',
			function(evt) {
				if (db_down) {
					var disY = evt.screenY - oScreenY;
					var newTop = parseInt(oTop) + parseInt(disY);
					if (newTop < 0) {
						newTop = 0
					} else if (newTop > (_opt.listHeight - _opt.btnHeight)) {
						newTop = _opt.listHeight - _opt.btnHeight;
					}
					dragButton.style.top = newTop + "px";
					//获取移动的绝对距离除以每一等分，获取应该移动多少等分。
					var downNum = (newTop / _opt.perItem) >> 0;
					var h = getStyles(list).lineHeight.replace("px", "");
					list.style.marginTop = "-" + (downNum * h) + "px";
				}
			}
		]);

		evt.addEvent.apply(listBody, ["click",
			function(evt) {
				var target = (evt.target || evt.srcElement);
				if (target.tagName.toLowerCase() == "a") {
					var key = target.getAttribute("value"),
						value;
					if (!_opt.slave) {
						value = _opt.data[key];
					} else {
						value = _opt.data[_opt.defaultIndex - 1][key];
					}

					text.innerHTML = value;
					_opt.selectKeyValue = [key, value];
					listBody.style.display = "none";

					if (_opt.assoc) {
						_opt.assoc.changeTo(key);
					}
				}
				target.blur();
			}
		]);

		evt.addEvent.apply(listBody, ["selectstart",
			function(evt) {
				return false;
			}
		]);

		evt.addEvent.apply(title, ["click",
			function(evt) {
				listBody.style.display = (listBody.style.display == "block") ?
					"none" : "block";
			}
		]);


		// evt.addEvent.apply(listBody, ['mousewheel', function(evt){
		// 	var delta = 0;
		// 	delta = (evt.wheelDelta) ? evt.wheelDelta : evt.detail;

		// 	if(delta > 0) {

		// 	}else {

		// 	}
		// }]);
	}

	//=========================Event====================


});