let $ = require('jquery');
$('.cam-tabs').on('click','a',function(){
	let source = $(this).data('source');
	$(this).addClass('cur').siblings('a').removeClass('cur');
	$('.cam img').attr('src',source);
	return false;
})