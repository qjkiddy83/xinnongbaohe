let $ = require('jquery');

$.fn.switch = function(callback){
	$(this).click(function(){
		let open = 1;
		if($(this).hasClass('open')){
			$(this).removeClass('open');
			open = 0;
		}else{
			$(this).addClass('open');
		}
		callback(open);
	})
}