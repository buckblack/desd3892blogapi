$(window).resize(function () {
	var $this = $(this),
		w = $this.width();

	if (w > 768) {
		if ($('body').hasClass('offcanvas-menu')) {
			$('body').removeClass('offcanvas-menu');
		}
	}
})

var clickOutToggleMobile = false;
$('body').on('click', '.js-menu-toggle', function (e) {
	var $this = $(this);
	e.preventDefault();

	if ($('body').hasClass('offcanvas-menu')) {
		if (!clickOutToggleMobile) {
			$('body').removeClass('offcanvas-menu');
			$this.removeClass('active');
		}
	} else {
		if (!clickOutToggleMobile) {
			$('body').addClass('offcanvas-menu');
			$this.addClass('active');
		}
	}
})

// click outisde offcanvas
$(document).mouseup(function (e) {
	clickOutToggleMobile = false;
	var container = $(".site-mobile-menu");
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		if ($('body').hasClass('offcanvas-menu')) {
			$('body').removeClass('offcanvas-menu');
			clickOutToggleMobile = true;
		}
	}
});