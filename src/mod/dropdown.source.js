honey.def(function(H) {

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


	H.dropdown = function(dBox, options) {

		var _box;

		var _opt = {
			assoc: null, //associated selector
			onChange: function() {},
			data: []
		};

		if (dBox.indexOf("#")) {
			_box = doc.getElementById(dBox.replace("#", ""));
		} else {
			return null;
		}

		this.onChange = onChange;
		return this;
	}

	function _build(_opt){
		var html = "<ul>";
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
	function bindEvent() {
		//evt
	}

	//=========================Event====================


});