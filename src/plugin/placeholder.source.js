/**
 * Example: inputPlaceholder( document.getElementById('my_input_element') )
 * @param {Element} input
 * @param {String} [color='#AAA']
 * @return {Element} input
 */

honey.def(function(H) {

    function hasPlaceholderSupport() {
        var input = document.createElement('input');
        return ('placeholder' in input);
    }

    //if (!hasPlaceholderSupport()) {

    //    var inputs = document.getElementsByTagName('input');
    //    for (var i=0,  count = inputs.length; i<count; i++) {
    //        if (inputs[i].getAttribute('placeholder')) {

    //            inputs[i].style.cssText = "color:#939393;font-style:italic;"
    //            inputs[i].value = inputs[i].getAttribute("placeholder");
    //            inputs[i].onclick = function(){
    //                if(this.value == this.getAttribute("placeholder")){
    //                    this.value = '';
    //                    this.style.cssText = "color:#000;font-style:normal;"
    //                }
    //            }
    //            inputs[i].onblur = function(){
    //                if(this.value == ''){
    //                    this.value = this.getAttribute("placeholder");
    //                    this.style.cssText = "color:#939393;font-style:italic;"
    //                }
    //            }

    //        }
    //    }

    //}

    H.placeholder = function(_input) {
        if (hasPlaceholderSupport()) return false
        if (_input.getAttribute('placeholder')) {

            _input.style.cssText = "color:#939393;font-style:italic;"
            _input.value = _input.getAttribute("placeholder")
            _input.onclick = function() {
                if (this.value == this.getAttribute("placeholder")) {
                    this.value = ''
                    this.style.cssText = "color:#000;font-style:normal;"
                }
            }
            _input.onblur = function() {
                if (this.value == '') {
                    this.value = this.getAttribute("placeholder")
                    this.style.cssText = "color:#939393;font-style:italic;"
                }
            }

        }
    }

})
