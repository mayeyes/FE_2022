function selecthtml5usage() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        || navigator.userAgent.match(/Opera Mini/i)
        || navigator.userAgent.match(/IEMobile/i) ) {
        return "always";
    }else{
        return "never";
    }
}
function loadPano(pano_number) {
    embedpano({swf:"js/pano/tour.swf", xml: PANO_PATH + "xmls/"+pano_number+".xml", target:"krpano",  html5: 'prefer', wmode:"transparent", passQueryParameters:true});
}