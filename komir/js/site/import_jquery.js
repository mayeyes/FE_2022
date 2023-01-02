function fontList(arr){var t = "";for(var i=0; i<arr.length; i++){if(i !== 0) t += "&";t += arr[i];}$('<link rel="preconnect" href="//fonts.googleapis.com"><link rel="preconnect" href="//fonts.gstatic.com" crossorigin><link href="//fonts.googleapis.com/css2?'+t+'&display=swap" rel="stylesheet">').appendTo("head");}

addScript(commonPath+'/js/jquery-1.12.4.min.js');
// document ready
window.onload = function(){
    if($("body#main").length !== 0){// 메인
        
    } else {// 서브
        // 달력
        addCss(commonPath+'/core/plug/calendar/jquery-ui.css');
        addScript(commonPath+'/core/plug/calendar/jquery-ui.js');
        
        // 달력 커스텀
        addCss(commonPath+'/core/plug/datetimepicker_trentrichardson/jquery-ui-timepicker-addon.css');
        addScript(commonPath+'/core/plug/datetimepicker_trentrichardson/jquery-ui-timepicker-addon.min.js');
    }

    //web-font
    //family=Lato:wght@100;300;400;700'
    if (navigator.onLine == true){
        var fontArray = fontList([
            'family=Lato:wght@100;300;400;700',
            'family=Noto+Serif+KR:wght@400;500;600',
            'family=Montserrat:wght@100;200;300;400;500;600;700',
            'family=Noto+Sans+KR:wght@300;400;500;700'
        ]);
	}
    addCss(commonPath+'/font/NanumSquare/font.css');
    addScript(localPath+'/js/core/core.js');
    addScript(localPath+'/js/site/'+_param.site+'/content.js',10);
}