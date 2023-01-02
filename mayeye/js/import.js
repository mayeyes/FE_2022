function googleFontList(arr){var t = "";for(var i=0; i<arr.length; i++){if(i !== 0) t += "&";t += arr[i];}$('<link rel="preconnect" href="//fonts.googleapis.com"><link rel="preconnect" href="//fonts.gstatic.com" crossorigin><link href="//fonts.googleapis.com/css2?'+t+'&display=swap" rel="stylesheet">').appendTo("head");}
function scriptQuery(){var script = document.getElementsByTagName('script');script = script[script.length-1].src.replace(/^[^\?]+\?/, '').replace(/#.+$/, '').split('&');var queries = {}, query;while(script.length){query = script.shift().split('=');queries[query[0]] = query[1];}return queries;}
var _param = scriptQuery();
function addScript(str,t){var script = document.createElement('script');script.src = str;script.async = false;if(t !== undefined){setTimeout(function(){document.head.appendChild(script);},t);} else {document.head.appendChild(script);}}
function addBabel(str,t){var script = document.createElement('script');script.setAttribute('type','text/babel');script.setAttribute('data-presets','es2015,stage-2');if(typeof str === 'function'){script.innerHTML = str.toString().replace(/^(function).*[^{]/,'').replace(/}$/,'');} else {script.src = str;script.async = false;}if(t !== undefined){setTimeout(function(){document.body.appendChild(script);},t);} else {document.body.appendChild(script);}}
function addCss(str){var css = document.createElement('link');css.rel = 'stylesheet';css.href = str;document.head.appendChild(css);}

var localPath = _param.CONTEXT_PATH;
var commonPath = (navigator.onLine === false) ? localPath:'https://cdn.jsdelivr.net/gh/mayeyes/cdn';


// 웹폰트 로드
document.write('<link rel="stylesheet" href="'+localPath+'/css/core.css" />');
document.write('<link rel="stylesheet" href="'+localPath+'/css/layout.css" />');
document.write('<script src="'+localPath+'/font/webfont.js"><\/script>');

if(_param.MAIN === "Y"){
    document.write('<link rel="stylesheet" href="'+localPath+'/css/main.css" />');
} else {
    document.write('<link rel="stylesheet" href="'+localPath+'/css/content.css" />');
    document.write('<link rel="stylesheet" href="'+localPath+'/css/content_bg.css" />');
}

/* 로컬 사용 */
if(location.href.indexOf("fe.mayeye.net") || location.href.indexOf("localhost") || location.href.indexOf("192.168.")){
    document.write('<script src="'+commonPath+'/jquery-1.12.4.min.js" crossorigin><\/script>');
    document.write('<script src="'+commonPath+'/babel.min.js" crossorigin><\/script>');
    document.write('<script src="'+commonPath+'/babel.polyfill.min.js" crossorigin><\/script>');
    document.write('<script src="'+commonPath+'/bluebird.js" crossorigin><\/script>');
    document.write('<script type="text/babel" data-presets="es2015,stage-2">const CONTEXT_PATH = \''+_param.CONTEXT_PATH+'\';const mno = \''+_param.mno+'\';<\/script>');
}

// document ready
window.onload = function(){
    // plug-in
    addCss(localPath+'/css/layout_bg.css');
    
    if($("body#main").length !== 0){// 메인
        addCss(localPath+'/css/main_bg.css');
        addScript(localPath+'/js/mainText.js',10);
    } else {// 서브
        // 지도
        addScript('//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6ffcad5f0b6bc4e20594ef457fd62e1a');
    }
    
    addScript(localPath+'/js/content.js',10);
}

