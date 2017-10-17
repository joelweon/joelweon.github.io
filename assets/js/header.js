
$('.panel-button').click(function() {
	$('.segment').toggle();
});

// 색상바꾸기
$('.switcher').click(function() {
	$('#particles-js').css("background-color", $(this).css('background-color'));
});

// nav 색상 검정
$(window).scroll(function() {
	if ($(window).scrollTop() > 50) {
		$('nav').css("background-color", "black");
	} else {
		$('nav').css("background-color", "");
	}
});

$(window).on('scroll', function() {
    $('.target').each(function() {
        if($(window).scrollTop() >= $(this).offset().top - 1) {
        	var id = $(this).attr('id');
        	$('.navbar-nav a').removeClass('active');
        	$('.navbar-nav a[href*=' + id + ']').addClass('active');
        }
    });
});

// 작은화면 nav 메뉴바
$('.navbar-toggler').click(function() {
	$('.navbar-toggler-menu').toggle();
});