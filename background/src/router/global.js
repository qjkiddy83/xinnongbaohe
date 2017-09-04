import '../css/reset.css';
import '../css/base.css';
import '../js/switch.js';

let $ = require('jquery');
$('.nav,.right-cont').css('min-height', $(window).height());

$(window).on('resize', function() {
    $('.nav,.right-cont').css('min-height', $(window).height());
})

$('.msg').on('click','.ico-close',function(){
	$(this).parent().fadeOut(function(){
		$(this).remove();
	});
})