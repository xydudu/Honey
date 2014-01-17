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

		this._opt = {
			assoc: null, //associated selector
			onChange: function() {},
			data: [],
			_box: null,
			showNum: 4,
			defaultIndex: 1,
			listHeight: 200,
            itemHeight: 40
		};

		this.dragButton = null;

		if ($dBox.indexOf("#") > -1) {
			this._opt._box = doc.getElementById($dBox.replace("#", ""));
		} else {
			return null;
		}

		_extendsOpt(this._opt, $options);
		_build(this._opt);

		_bindEvent(this)


		this.onChange = onChange;
		return {
			getvalue: _getValue
		};
	}

	function _getValue() {
		var key, value;
		return [key, value];
	}

	function _extendsOpt(_opt, $opt) {
		for (var k in $opt) {
			if (_opt.hasOwnProperty(k)) {
				_opt[k] = $opt[k];
			}
		}
	}

	function _build($opt) {
		var options = "";
		$opt.mod_id = Math.random() * 10000 >> 0;

		if ($opt.data.length > 0) {
			var index = 0;
			for (var i in $opt.data) {
				options += "<li value='" + index + "'><a href='javascript:void(0);'>" + $opt.data[i] + "</a></li>";
				index++;
			}
		}
		var html = "<div class='hdd-title clearfix'> \
            <div class='hdd-text'>dddd</div> \
            <span class='hdd-tip'><em class='hdd-pinner'>◆</em><em class='hdd-pouter'>◆</em></span></div>\
        	<div class='hdd-body' id='body_" + $opt.mod_id + "''> \
	            <ul class='hdd-list' id='list_" + $opt.mod_id + "'> \
	            " + options + " </ul> \
           	<div class='hdd_verticalBar'> \
                <div class='hdd_track'> \
                    <div class='hdd_dragButton' id='db_" + $opt.mod_id + "'></div> \
                </div> \
            </div></div>";
		$opt._box.innerHTML = html;
	}

	//current dropdown change
	function change() {
		if (_opt.assoc) {
			_opt.assoc.onChange(value);
		}
	}


	function onChange(val) {

	}

	//=========================Event====================
	function _bindEvent($self) {
		//evt
		if (window.getComputedStyle) {
			getStyles = function(elem) {
				return window.getComputedStyle(elem, null);
			};
		} else if (document.documentElement.currentStyle) {
			getStyles = function(elem) {
				return elem.currentStyle;
			};
		}

		var opt = $self._opt,
			box = opt._box,
			dragButton = doc.getElementById("db_" + opt.mod_id),
			listBody = doc.getElementById("body_" + opt.mod_id),
			oTop = 0,
			oScreenY = 0,
			btnHeight = getStyles(dragButton).height.replace("px", ""),
			db_down = false;

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
					if (newTop < 0) newTop = 0
					else if (newTop > (200 - btnHeight)) newTop = 200 - btnHeight;
					dragButton.style.top = newTop + "px";
				}
			}
		]);

		evt.addEvent.apply(listBody, ["click",
			function(evt) {
				var target = evt.target;
				if (target.tagName.toLowerCase() == "li") {
					
				}
				target.blur();
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