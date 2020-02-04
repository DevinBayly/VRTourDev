/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'ua-brand-symbols\'">' + entity + '</span>' + html;
	}
	var icons = {
		'ua-brand-uaccess': '&#xe600;',
		'ua-brand-checklist': '&#xe601;',
		'ua-brand-spring-fling': '&#xe603;',
		'ua-brand-tour': '&#xe604;',
		'ua-brand-uasavvy': '&#xe605;',
		'ua-brand-athletics': '&#xe607;',
		'ua-brand-feedback': '&#xe608;',
		'ua-brand-alumni': '&#xe609;',
		'ua-brand-document': '&#xe60a;',
		'ua-brand-az-index': '&#xe60b;',
		'ua-brand-directory': '&#xe60c;',
		'ua-brand-calendar': '&#xe60d;',
		'ua-brand-weather': '&#xe60e;',
		'ua-brand-campus-map': '&#xe60f;',
		'ua-brand-news': '&#xe610;',
		'ua-brand-foursquare': '&#xe63c;',
		'ua-brand-pinterest': '&#xe63d;',
		'ua-brand-video': '&#xe606;',
		'ua-brand-youtube': '&#xf104;',
		'ua-brand-facebook': '&#xf103;',
		'ua-brand-ua-mobile': '&#xf102;',
		'ua-brand-instagram': '&#xf101;',
		'ua-brand-linkedin': '&#xf100;',
		'ua-brand-twitter': '&#xf105;',
		'ua-brand-rss': '&#xe63e;',
		'ua-brand-unbookmark': '&#xe611;',
		'ua-brand-search': '&#xe602;',
		'ua-brand-bookmark': '&#xe612;',
		'ua-brand-checkmark': '&#xe613;',
		'ua-brand-x': '&#xe614;',
		'ua-brand-grip': '&#xe617;',
		'ua-brand-minus': '&#xe619;',
		'ua-brand-plus': '&#xe61b;',
		'ua-brand-email': '&#xe616;',
		'ua-brand-print': '&#xe61c;',
		'ua-brand-link': '&#xe618;',
		'ua-brand-refresh': '&#xe61d;',
		'ua-brand-upload': '&#xe61f;',
		'ua-brand-download': '&#xe615;',
		'ua-brand-minimize': '&#xe620;',
		'ua-brand-maximize': '&#xe621;',
		'ua-brand-fast-forward': '&#xe622;',
		'ua-brand-stop': '&#xe61e;',
		'ua-brand-pause': '&#xe61a;',
		'ua-brand-rewind': '&#xe623;',
		'ua-brand-down-point': '&#xe624;',
		'ua-brand-up-right-point': '&#xe625;',
		'ua-brand-right-point': '&#xe626;',
		'ua-brand-down-right-point': '&#xe627;',
		'ua-brand-up-point': '&#xe628;',
		'ua-brand-left-point': '&#xe629;',
		'ua-brand-down-left-point': '&#xe62a;',
		'ua-brand-up-left-point': '&#xe62b;',
		'ua-brand-bottom-left-corner': '&#xe62c;',
		'ua-brand-bottom-corner': '&#xe62d;',
		'ua-brand-bottom-right-corner': '&#xe62e;',
		'ua-brand-right-corner': '&#xe62f;',
		'ua-brand-top-right-corner': '&#xe630;',
		'ua-brand-top-corner': '&#xe631;',
		'ua-brand-top-left-corner': '&#xe632;',
		'ua-brand-left-corner': '&#xe633;',
		'ua-brand-down-left-arrow': '&#xe634;',
		'ua-brand-down-arrow': '&#xe635;',
		'ua-brand-down-right-arrow': '&#xe636;',
		'ua-brand-right-arrow': '&#xe637;',
		'ua-brand-up-right-arrow': '&#xe638;',
		'ua-brand-up-arrow': '&#xe639;',
		'ua-brand-up-left-arrow': '&#xe63a;',
		'ua-brand-left-arrow': '&#xe63b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/ua-brand-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
