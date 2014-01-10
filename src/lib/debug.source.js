//IE6
//原生JS
//配置显示模式，类似firebug，或者透明层浮动

honey.def(function(H) {

	var _N = "N", //N == notice
		_E = "E"; //E == error

	/*
	 * debug function
	 * Enterance function of this module
	 */
	H.debug = function() {

		var _builded = false,
			_num = 0,
			_types = [_N, _E],
			_arg = Array.prototype.slice.call(arguments); // object to array


		//if it's builded and show out
		if (!_builded) {
			_appendTo();
			_show(_argCheck(_arg));
		} else {
			builderBox();
		}


	}

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

			if ($.inArray(last, arg)) {
				ret = [arg, last];
			} else {
				type = _N;
				ret = [arg.concact(last), type];
			}
		}
		return ret;
	}

	/*
	 * append the panel to Body
	 */
	function _appendTo() {

		_eventBind();
	}

	function _eventBind(){

	}

	function _builderBox() {
		_show(argCheck());
	}

	function _show(arr) {
		var text = "";

		switch (arr.pop()) {
			case _N:
				text = _noticeT();
				break;
			case _E:
				text = _errorT();
				break;
		}

		_addText(text);
	}

	function _addText(t) {

	}

	function _noticeT(list) {

	}

	function _errorT(list){
		
	}

});