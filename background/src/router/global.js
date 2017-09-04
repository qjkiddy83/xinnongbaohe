import '../css/reset.css';
import '../css/base.css';
let $ = require('jquery');
$('.nav,.right-cont').css('min-height',$(window).height());

$(window).on('resize',function(){
	$('.nav,.right-cont').css('min-height',$(window).height());
})