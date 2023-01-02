
//플러그인 css 출력
//document.write('<link rel="stylesheet" href="'+contextPath+'/js/core/plug/calendar/jquery-ui.css" media="all" />');
document.write('<link rel="stylesheet" href="'+contextPath+'/js/core/plug/custom-scrollbar-plugin/jquery.mCustomScrollbar.css" media="all"/>');

//FONT
document.write('<link rel="stylesheet" href="'+contextPath+'/font/NotoSansKr/font.css" media="all" />');
document.write('<link rel="stylesheet" href="'+contextPath+'/font/Montserrat/font.css" media="all" />');
document.write('<link rel="stylesheet" href="'+contextPath+'/font/CoreDream/fonts.css" media="all" />');
document.write('<link rel="stylesheet" href="'+contextPath+'/font/Roboto/font.css" media="all" />');

//플러그인 import
var jsImport = [
	contextPath+'/js/core/plug/calendar/jquery-ui.js',
	contextPath+'/js/core/plug/jquery-mousewheel-3.1.11/jquery.mousewheel.min.js',
	contextPath+'/js/core/plug/jquery.scrollTo-1.4.13/jquery.scrollTo.min.js',
	contextPath+'/js/core/plug/custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
	contextPath+'/js/core/print/jquery.printElement.js',
	contextPath+'/js/core/plug/rwdImageMaps/jquery.rwdImageMaps.min.js',
	contextPath+'/js/core/plug/jquery.nicescroll-3.7.6/jquery.nicescroll.min.js'
];
for(var i=0; i<jsImport.length; i++){	
	document.write('<script src="'+jsImport[i]+'"></script>');
}

//커스텀 출력
//document.write('<script src="'+contextPath+'/js/core/jquery-ui.min.js"></script>');
document.write('<script src="'+contextPath+'/js/site/kor/content.js"></script>');
document.write('<script src="'+contextPath+'/js/core/core.js"></script>');

