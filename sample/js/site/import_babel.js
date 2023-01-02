function googleFontList(arr){var t = "";for(var i=0; i<arr.length; i++){if(i !== 0) t += "&";t += arr[i];}$('<link rel="preconnect" href="//fonts.googleapis.com"><link rel="preconnect" href="//fonts.gstatic.com" crossorigin><link href="//fonts.googleapis.com/css2?'+t+'&display=swap" rel="stylesheet">').appendTo("head");}
function scriptQuery(){var script = document.getElementsByTagName('script');script = script[script.length-1].src.replace(/^[^\?]+\?/, '').replace(/#.+$/, '').split('&');var queries = {}, query;while(script.length){query = script.shift().split('=');queries[query[0]] = query[1];}return queries;}
var _param = scriptQuery();
function addScript(str,t){var script = document.createElement('script');script.src = str;script.async = false;if(t !== undefined){setTimeout(function(){document.head.appendChild(script);},t);} else {document.head.appendChild(script);}}
function addBabel(str,t){var script = document.createElement('script');script.setAttribute('type','text/babel');script.setAttribute('data-presets','es2015,stage-2');if(typeof str === 'function'){script.innerHTML = str.toString().replace(/^(function).*[^{]/,'').replace(/}$/,'');} else {script.src = str;script.async = false;}if(t !== undefined){setTimeout(function(){document.body.appendChild(script);},t);} else {document.body.appendChild(script);}}
function addCss(str){var css = document.createElement('link');css.rel = 'stylesheet';css.href = str;document.head.appendChild(css);}
var localPath = _param.CONTEXT_PATH;
var commonPath = (navigator.onLine === false) ? localPath:'//cdn.jsdelivr.net/gh/mayeyes/cdn';


document.write('<script src="'+commonPath+'/js/jquery-1.12.4.min.js"><\/script>');
// document.write('<script src="'+commonPath+'/js/babel.min.js"><\/script>');
// document.write('<script src="'+commonPath+'/js/babel.polyfill.min.js"><\/script>');
// document.write('<script src="'+commonPath+'/js/bluebird.js"><\/script>');
// document.write('<script type="text/babel" data-presets="es2015,stage-2">const CONTEXT_PATH = \''+_param.CONTEXT_PATH+'\';const mno = \''+_param.mno+'\';<\/script>');
// document ready
window.onload = function(){
    // addScript(commonPath+'/js/jquery-1.12.4.min.js');
    addScript(commonPath+'/js/babel.min.js');
    addScript(commonPath+'/js/babel.polyfill.min.js');
    addScript(commonPath+'/js/bluebird.js');
    addBabel(function(){
        const CONTEXT_PATH = _param.CONTEXT_PATH;
        const mno = _param.mno;
    });
    //web-font
    //family=Lato:wght@100;300;400;700'
    if (navigator.onLine == true){
        googleFontList([
            'family=Lato:wght@100;300;400;700',
            'family=Noto+Serif+KR:wght@400;500;600',
            'family=Montserrat:wght@100;200;300;400;500;600;700',
            'family=Noto+Sans+KR:wght@300;400;500;700'
        ]);
	}
    addCss(commonPath+'/font/NanumSquare/font.css');

    // plug-in
    if($("body#main").length !== 0){// 메인
        addCss(localPath+'/css/site/kor/main.css');    
    } else {// 서브
        // 달력
        addCss(commonPath+'/core/plug/calendar/jquery-ui.css');
        addScript(commonPath+'/core/plug/calendar/jquery-ui.js');
        
        // 달력 커스텀
        addCss(commonPath+'/core/plug/datetimepicker_trentrichardson/jquery-ui-timepicker-addon.css');
        addScript(commonPath+'/core/plug/datetimepicker_trentrichardson/jquery-ui-timepicker-addon.min.js');
    }

    // layout
    addCss(localPath+'/css/site/core/core.css');
    addCss(localPath+'/css/site/kor/layout.css');
    if($("body#main").length !== 0){// 메인
        addCss(localPath+'/css/site/kor/main.css');
    } else {// 서브
        addCss(localPath+'/css/site/kor/content.css');
        addCss(localPath+'/css/site/kor/board.css');
        addCss(localPath+'/css/site/kor/program.css');
        addCss(localPath+'/css/site/kor/cover.css');
    }
    
    addScript(localPath+'/js/core/core.js');
    addScript(localPath+'/js/site/'+_param.site+'/content.js',10);
}

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {console.log(document.readyState);
        // if (document.querySelectorAll('head script').length === 0) {
            window.dispatchEvent(new Event('DOMContentLoaded', {
                bubbles: true,
                cancelable: true
              }));
        // }
    }
}