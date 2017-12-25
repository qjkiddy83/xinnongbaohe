let $ = require('jquery');

// $.fn.switch = function(callback){
// 	$(this).click(function(){
// 		let open = 1;
// 		if($(this).hasClass('open')){
// 			$(this).removeClass('open');
// 			open = 0;
// 		}else{
// 			$(this).addClass('open');
// 		}
// 		callback(open);
// 	})
// }

$(document).on('click','.btn-switch',function(){
	if($(this).hasClass('disabled')){
		return false;
	}
	$(this).addClass('loading')
	if($(this).hasClass('open')){
		setTimeout(function(){
			$(this).removeClass('open loading');
		}.bind(this),1000)
	}else{
		setTimeout(function(){
			$(this).addClass('open').removeClass('loading');
		}.bind(this),1000)
	}
})