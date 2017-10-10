let $ = require('jquery');
let len = $('.scroll li').length;
$('.scroll ul').width(len*$('.scroll li').eq(0).width())