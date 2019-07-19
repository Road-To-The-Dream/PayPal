function diplay_hide(blockId) {
    if ($(blockId).css('display') === 'none') {
        $(blockId).animate({height: 'show'}, 500);
        $('html').css('overflow', 'hidden');
        $(document.querySelector('.menu_rect1')).css('transform', 'rotate(315deg)')
        $(document.querySelector('.menu_rect1')).css('margin-right', '5px')
        $(document.querySelector('.menu_rect1')).css('margin-top', '12px')
        $(document.querySelector('.menu_rect3')).css('transform', 'rotate(-315deg)')
        $(document.querySelector('.menu_rect3')).css('margin-right', '5px')
        $(document.querySelector('.menu_rect1')).css('margin-bottom', '-12px')
        $(document.querySelector('.menu_rect2')).css('opacity', '0')
    } else {
        $(blockId).animate({height: 'hide'}, 500);
        $('html').css('overflow', 'auto')
        $('html').css('overflow-x', 'hidden')
        $(document.querySelector('.menu_rect1')).css('transform', 'rotate(0deg)')
        $(document.querySelector('.menu_rect3')).css('transform', 'rotate(0deg)')
        $(document.querySelector('.menu_rect2')).css('opacity', '1')
        $(document.querySelector('.menu_rect1')).css('margin', '0')
        $(document.querySelector('.menu_rect3')).css('margin', '0')
    }
}