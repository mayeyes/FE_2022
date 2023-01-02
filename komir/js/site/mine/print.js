



$(function(){
	$("#print").click(function(){
	
		if(this.getAttribute("href").indexOf("/cc/")== -1){
			window.open("/hkor/print/userMain/Print.do", "" , 'scrollbars=yes,toolbar=no,resizable=no,width=800,height=850,left=0,top=0');
		}
		else{
			window.open("/hkor/cc/print/userMain/Print.do", "" ,'scrollbars=yes,toolbar=no,resizable=no,width=800,height=850,left=0,top=0');
			}
	return false;
	});
});
$(function(){
	$("#printHmrm").click(function(){
			window.open("/hmrm/print/userMain/Print.do" , "" ,'scrollbars=yes,toolbar=no,resizable=no,width=800,height=850,left=0,top=0');
	
			return false;
	});
});

$(function(){
	$("#printHmine").click(function(){
			window.open("/hmine/print/userMain/Print.do" , "" ,'scrollbars=yes,toolbar=no,resizable=no,width=800,height=850,left=0,top=0');
				return false;
	});
});