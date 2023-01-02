function processKey() 
{ 
        if( (event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) || event.keyCode == 65
        (event.keyCode >= 112 && event.keyCode <= 123) || event.keyCode == 8) 
            { 
        event.keyCode = 0; 
        event.cancelBubble = true; 
        event.returnValue = false; 
            } 
} 

//document.onkeydown = processKey;

/*function click() {
	if ((event.button==2) || (event.button==3)) {
		alert('이 페이지에서는 오른쪽 마우스를 사용하실수 없습니다.');
	}
}

document.onmousedown=click*/

function winClose(){
	var msg = " 창을 닫으시면 정상적으로 문제를 저장하지 못할수도 있습니다. \n 그래도 창을 닫으시겠습니까?";
	if(confirm(msg)){
		parent.window.close()
	}	
	return;
}


function doNotReload(){
    if(    (event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) 
        || (event.keyCode == 116) )
    {
      event.keyCode = 0;
      event.cancelBubble = true;
      event.returnValue = false;
 	  alert("이 페이지에서는 새로고침을 사용하실수 없습니다.");
    } 
}

