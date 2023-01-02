var $DOCUMENT 	= $(document);
var $WINDOW		= $(window);

var PANO_PATH = "js/pano/";
var M_WIDTH = 1000;

var isMobile = function(){
    if ($WINDOW.width() <= M_WIDTH) return true;
    else return false;
}



