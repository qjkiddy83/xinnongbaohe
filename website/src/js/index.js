let Swiper = require('swiper');
new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay : 3000,
    loop:true,
    autoplayDisableOnInteraction: false
});