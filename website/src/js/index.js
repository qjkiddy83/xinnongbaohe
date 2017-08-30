let Swiper = require('swiper');
require('./Login');
new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay : 5000
});