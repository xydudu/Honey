/*
 * Honey Debugger v0.9
 * Author: lanbin
 * Date: 2014-01-13
 *
 * It can be used on any web site which use Honey.
 * Add "#debug" string after url of the site to switch on the module, just like:
 * e.g.  http://www.hunantv.com/ => http://www.hunantv.com/#debug
 *
 *
 * honey.go('lib:Debug', function(){
 *     honey.debug("someMessage");
 *     honey.debug("someMessage", "N"); //those are equal
 *
 * 	   honey.debug("some Error Message", "E"); //the message will have red color style
 * });
 *
 * ** F10 is shortcut for open and close the panel.
 *
 * changelog
 * 01-16
 * 1). support "undefined" & "null"
 * 2). Array's quota change from {} to []
 */

honey.def(function(H) {

	var _N = "N", //N == notice
		_E = "E", //E == error
		_num = 0, //Message's order number
		_css = CSS + '/widget/debug.css', //css url
		_builded = false,
		_types = [_N, _E],
		_F10 = 121, //keyCode of F10
		_doc = document,
		_body = document.getElementsByTagName("body")[0],
		_panel,
		_list,
		_level = 0, //遍历参数层次
		_switch = false;

	/*
	 * Event Object constructor
	 */
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
	//instance of Event
	var evt = new Event();


	/*
	 * debug function
	 * Enterance function of this module
	 */
	H.debug = function() {

		//check if the switchis open
		// 不应该在内部进行是否显示的判断，这一步应该在外部判断。 Lian Hsueh 1.15
		//_switch = _checkSwitch();
		//alert(_switch)
		//if (!_switch) return;

		H.css(_css);
		//turn arguments to array
		var _a = Array.prototype.slice.call(arguments, 0);
		_arg = [];

		for (var p in _a) {
			var ap = arguments[p];
			if (typeof ap == 'undefined') {
				_arg.push('undefined');
			} else if (ap === null) {
				_arg.push('null');
			} else if (typeof ap == 'string' && ap.match(/<[^>]+>/g)) {
				var rows = ap.match(/\n/g).length + 1;
				_arg.push("<textarea class='hdp_ta' rows=" + rows + ">" + ap + "</textarea>");
			} else if (typeof ap == 'object' && !(ap instanceof Array)) {
				var obj = {};
				for (var k in ap) {
					obj[k] = ap[k];
				}
				_arg.push(obj);
			} else {
				_arg.push(ap);
			}
		}

		if (!_builded) {
			_builderBox(); //build the panel if it's not exsit
			_eventBind(); //bind events
			_builded = true; //set build status
		}
		_show(_argCheck(_arg)); //handle messages
	}

	/*
	 *check if the switchis open
	 */
	//function _checkSwitch() {
	//	return (window.location.href.indexOf("#debug") > -1);
	//}

	/*
	 * check the arguments' format
	 */
	function _argCheck(arg) {
		var len = arg.length,
			ret = [];

		if (len == 1) {
			ret = [arg[0], _N];
		} else if (len > 1) {
			var last = arg.pop(),
				type = "";

			if (inArray(last, _types)) {
				type = last;
			} else {
				type = _N;
				arg.push(last);
			}
			ret = [_showObj(arg), type];
		}
		return ret;
	}

	function inArray(value, arr) {
		for (var p in arr) {
			if (value == arr[p]) {
				return true;
			}
		}
		return false;
	}

	function _showObj(obj) {
		var str = "{";
		for (var p in obj) {
			if (typeof obj[p] == 'object') {
				str += "<em class='hdi_key'>" + p + "</em>:  " + _showObj(obj[p]) + ", ";
			} else {
				var objStr = obj[p].toString();
				if (objStr.indexOf("textarea") < 0) {
					//替换< >符号
					objStr = objStr.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				}
				str += "<em class='hdi_key'>" + p + "</em>:  " + objStr + ", ";
			}

		}
		str = (str += "}").replace(", }", "}");

		if (obj instanceof Array) {
			str = str.replace(/^{/, "[").replace(/}$/, "]");
		}
		return str;
	}

	function _eventBind() {
		evt.addEvent.apply(document.getElementsByTagName("body")[0], ['keydown',
			function(evt) {
				if (evt.keyCode == _F10) {
					if (_panel.style.display == 'none') {
						_panel.style.display = "block";
					} else {
						_panel.style.display = "none";
					}
				}
			}
		]);
		evt.addEvent.apply(document.getElementById("hp_close"), ['click',
			function() {
				_panel.style.display = "none";
			}
		]);
	}

	function _builderBox() {
		var _p = _doc.createElement("div");
		_p.setAttribute("id", "hd_panel");
		_p.innerHTML = "<div id='hdp_nav'><span id='hdp_title'>Honey Debugger v0.9</span><a id='hp_close' href='javascript:void(0)'>X</a></div> \
						<div id='hdp_list'></div>";
		_panel = _p;
		_doc.getElementsByTagName("body")[0].appendChild(_p);
		_list = _doc.getElementById("hdp_list");
	}

	function _show(arr) {
		var text = "",
			className = "";
		switch (arr.pop()) {
			case _N:
				className = "hdi_notice";
				break;
			case _E:
				className = "hdi_error";
				break;
		}

		text = "<i class='hdn'>" + (++_num) + ". </i><em class='hdc " + className + "'>" + arr + "</em>";

		_addText(text);
	}

	function _addText(t) {
		var _i = _doc.createElement("p");
		_i.className = "hdp_item";
		_i.innerHTML = t;
		_list.appendChild(_i);
		_list.scrollTop = _list.scrollHeight;
	}
});