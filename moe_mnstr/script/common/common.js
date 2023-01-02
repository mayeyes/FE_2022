
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}
function MM_showHideLayers2() {
  var i,p,v,obj,args=MM_showHideLayers2.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
	if (obj.style) { obj=obj.style; v=(v=='show')?'':(v=='none')?'none':v; }
	obj.display=v;}
}
function MM_openBrWindow(theURL,winName,features) { //v2.0

  window.open(theURL,winName,features);

}
// 엔터 클릭시 실행되는 펑션 각 페이지에서 필요한 매소드 재정의
function Load()
{
    if(event.keyCode==13)
    {   
       	enterDown();
    }
}

function enterDown()
{
	//searchStr에 포커스가 있으면 검색 실행
	//goSearch();
}

// KeyUp 이벤트
function keyUp()
{
	return;
}

// 검색결과 페이지
function goSearch()
{
	var forms = document.searchForm;
	
	if( forms.searchStr.value == null || forms.searchStr.value == "" )
	{
		alert("검색어를 입력하세요");
		forms.searchStr.focus();
		return false;
	} 
	
	window.open("", "search", "width=720 height=600 scrollbars=yes");
	forms.method = "POST";
	forms.target = "search";
	forms.action = "/search.do";
	forms.submit();
}

function open_PopN( name)
{
	document.all[name].style.visibility = "visible";
} 
function closePopN(name)
{
	document.all[name].style.visibility = "hidden";
	closeWin(name);
}

function closePopNDay(name)
{
	document.all[name].style.visibility = "hidden";
	setCookieKL( name, "done" , 1);
	closeWinDay(name);
}

function closeLayer(name)
{
	document.all[name].style.visibility = "hidden";
	closeWin(name);
}


//풀사이즈 웹
//검색
function doSearch() {
	var searchForm = document.search; 

	if (searchForm.query.value == "") {
		alert("검색어를 입력하세요.");
		searchForm.query.focus();
		return;
	}
	if(searchForm.selectCollection.value=="ALL"){
		searchForm.collection.value = "ALL";
	}else{
		searchForm.collection.value = searchForm.selectCollection.value;
	}
	//searchForm.startDate.value = "";
	//searchForm.endDate.value = "";
	//searchForm.range.value = "A";
	//searchForm.startCount.value = 0;
	//searchForm.searchField.value = "ALL";
	//searchForm.sort.value = "DATE";
	 searchForm.action = "/search/search.jsp";

	//searchForm.target = "_blank";

	searchForm.submit();
}

//엔터 체크	
function pressCheck() {   
	if (event.keyCode == 13) {
		return doSearch();
	}else{
		return false;
	}
}

//반응형 모바일
//검색
function doSearch_m() {
	var searchForm = document.search; 

	if (searchForm.query_m.value == "") {
		alert("검색어를 입력하세요.");
		searchForm.query_m.focus();
		return;
	}
	if(searchForm.selectCollection.value=="ALL"){
		searchForm.collection.value = "ALL";
	}else{
		searchForm.collection.value = searchForm.selectCollection.value;
	}
	//searchForm.startDate.value = "";
	//searchForm.endDate.value = "";
	//searchForm.range.value = "A";
	//searchForm.startCount.value = 0;
	//searchForm.searchField.value = "ALL";
	//searchForm.sort.value = "DATE";

 	 searchForm.query.value = searchForm.query_m.value;
	 searchForm.action = "/search/search.jsp";

	//searchForm.target = "_blank";

	searchForm.submit();
}

//엔터 체크	
function pressCheck_m() {   
	if (event.keyCode == 13) {
		return doSearch_m();
	}else{
		return false;
	}
}

//================= 미니리스트 마우스오버 =====================
function selMiniList(listID, listNum)
{
	for(i=1;i<10;i++)
	{
		var id = listID+i;
		if(document.getElementById(id) != null)
			document.getElementById(id).style.display = "none";
	}
	var id = listID+listNum;
	document.getElementById(id).style.display = "block";
}


//================= 팝업관련 =====================
function getCookieKL( name ) 
{
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ) 
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) 
		{
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) ); 
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break; 
	}
	return ""; 
}


//================= 메뉴관련 =====================
function leftMenuView(idx)
{ 
	var str = "" + idx;

	for(i=100; i<150; i++)
	{
		if(document.getElementById("LMenu" + i))
		{
			hide_menu = document.getElementById("LMenu"+i);
			// 3자리 이상 idx일때 양끝 하나씩 잘라낸것과 일치하는것은 바로 상위 메뉴이므로 감추지 않는다.
			if(str.length >= 3 && isPrnt(str, i))
			{
				hide_menu.style.display = 'block';
			}
			else
			{
				hide_menu.style.display = 'none';
			}
		}
	}
	subMenu = document.getElementById("LMenu"+idx);
	if(subMenu != null)
		subMenu.style.display = 'block'; 
}

function isPrnt(str, idx)
{
	var subStr = str.substring(1,str.length-1);
	if(parseInt(subStr) == idx)
		return true;

	if(subStr.length >= 3 && isPrnt(subStr, idx))
		return true;

	return false;
}

function viewSiteMap(url){
 	if(document.getElementById("layerSiteMap").style.visibility == "hidden") 
 	{
  		document.getElementById("layerSiteMap").style.visibility = "visible";
  		document.getElementById("SiteMapFrm").src =url;  
 	}
 	else
 	{
  		document.getElementById("layerSiteMap").style.visibility = "hidden";
 	}
}

var prevIdx = 0;
function subMenuView(idx)
{ 
	hide_menu = document.getElementById("subMenu"+prevIdx);
	if(hide_menu != null && hide_menu.style.display  == 'block')
		hide_menu.style.display = 'none';
				
	subMenu = document.getElementById("subMenu"+idx);
	if(subMenu != null)
	{
		subMenu.style.display = 'block'; 
		prevIdx = idx
	}
}

//================= 메뉴관련 =====================
function isValidSN(jumin1, jumin2)
{
	var ssn1 = jumin1;
	var ssn2 = jumin2;
	var ssn=ssn1+ssn2;
	a = new Array(13);
	for (var i=0; i < 13; i++) 
	{
		a[i] = parseInt(ssn.charAt(i));
	}
	var k = 11 - (((a[0] * 2) + (a[1] * 3) + (a[2] * 4) + (a[3] * 5) + (a[4] * 6) + (a[5] * 7) + (a[6] * 8) + (a[7] * 9) + (a[8] * 2) + (a[9] * 3) + (a[10] * 4) + (a[11] * 5)) % 11);
	if (k > 9)
	{
		k -= 10;
	}
	if (k == a[12])
		return true;
	else
		return false;	
}
function goLogin()
{
	//var forms = document.tmpForm;

	//forms.target = "tmpFrm";
	//forms.action = "/login/login/loginPop.jsp";
	//forms.action = "/login.do?m=0906&s=ice";
	//forms.submit();
	location.href="/login.do?m=0906&s=ice";
}
function eduLogin()
{
	var forms = document.boardForm;

	forms.action = "/eduLogin.do";
	forms.submit();
}

function goMsg()
{
	//alert("메신저 업그레이드후 재배포 예정입니다");
	var forms = document.tmpForm;

	forms.target = "tmpFrm";
	forms.action = "/msg.do";
	forms.submit();
	
}

function siteMap()
{
	window.open("/sitemap.do","login","width=900 height=620 scrollbars=yes");
}

// 로그인서버 도메인이 앞에 붙어야함
function chgInfo()
{
	var forms = document.tmpForm;
	
	forms.target = "tmpFrm";
	forms.action = "/chgInfoPop.jsp";
	forms.submit();
}

// 자료관리자등에서 사용할 직원찾기
function empSrch(reqUsrID, reqUsrNM, reqDeptCD, reqDeptNM, reqEMail, reqPhone)
{
	var url = "/sub/dje/dataMng/empSrch.jsp?usrID="+reqUsrID+"&usrNM="+reqUsrNM+"&deptCD="+reqDeptCD+"&deptNM="+reqDeptNM+"&email="+reqEMail+"&phone="+reqPhone;
	window.open(url, "empSrch", "width=550, height=500, scrollbars=yes");
}

// 권한설정 창 오픈
function popupAuth(url, ele)
{
	var cnts = eval("document."+ele).value;
	url = url+"?Ele="+ele+"&Cnts="+cnts;

	window.open(url, '','width=400,height=400, scrollbars=yes, resizable=yes');
}

function allSrch(reqUsrID, reqUsrNM, reqDeptCD, reqDeptNM, reqEMail, reqPhone)
{
	var url = "/sub/dje/dataMng/allSrch.jsp?usrID="+reqUsrID+"&usrNM="+reqUsrNM+"&deptCD="+reqDeptCD+"&deptNM="+reqDeptNM+"&email="+reqEMail+"&phone="+reqPhone;
	window.open(url, "empSrch", "width=550, height=500, scrollbars=yes");
}

// 스트링의 str1에 해당하는 문자열을 str2로 바꾼다.
// 사용법.
// var str = 문자열.replaceAll("a", "1");  <-- 문자열 내에서 'a'를 찾아 전부 '1'로 바꾸라는 의미
String.prototype.replaceAll = function(str1, str2)
{
  	var temp_str = "";

  	if (this.trim() != "" && str1 != str2)
  	{
    	temp_str = this.trim();

   	 	while (temp_str.indexOf(str1) > -1)
    	{
      		temp_str = temp_str.replace(str1, str2);
    	}
  	}
  return temp_str;
}

// 문자열을 한번 바꾼다.
function replace(msrc,sstr,rstr) {
       var idx,sleft,sright;

       msrc+="";
       sstr+="";
       rstr+="";
       idx=msrc.indexOf(sstr);
       if (idx > -1) {
              sleft = msrc.substring(0,idx) + rstr;
              sright = msrc.substring(idx+sstr.length);
              return sleft + replace(sright,sstr,rstr);
       } else {
              return msrc;
       }
}

//================= 날짜 선택 =====================
  function Popup_Date(reqRY, reqCallBack)
  {
	
	var wWidth = 300;
    var wHeight = 300;
    var wTop = (screen.height-100)/2; //200;//((screen.height - 100) - wHeight) / 2 ;
    var wLeft = (screen.width)/2 //200; //(screen.width - wWidth) / 2;
    

	
	 var screenWidth = screen.availwidth;
        var screenHeight = screen.availheight;

    var wTarget = 'KLFRAME_CALENDAR';
    var wAddr =  '/script/calendar/main.jsp';

    wAddr = wAddr + '?R=' + reqRY
    wAddr = wAddr + '&T=S'
	if(reqCallBack != null)
		wAddr += '&CallBack=' + reqCallBack;

    wNewWin = window.open(wAddr, wTarget,'toolbar=no,menubar=no,location=no,directories=no,status=no,scrollbars=no,resizable=yes,width='+wWidth+',height='+wHeight+',top='+wTop+',left='+wLeft+'');
    wNewWin.focus();
	
	//window.open('/script/calendar/main.jsp', 'KLFRAME_CALENDAR','toolbar=no,menubar=no,location=no,directories=no,status=no,scrollbars=no,resizable=yes,width=300px,height=300px,top=100px,left=100px');
  }
  
  function Popup_Period(reqR, reqIdx)
  {
    var wWidth = 300;
    var wHeight = 300;
    var wTop = ((screen.height - 100) - wHeight) / 2 ;
    var wLeft = (screen.width - wWidth) / 2;

    var wTarget = 'KLFRAME_CALENDAR';
    var wAddr =  '/script/calendar/main.jsp';

    wAddr = wAddr + '?R=' + reqR
    wAddr = wAddr + '&Idx=' + reqIdx
    wAddr = wAddr + '&T=P'

    wNewWin = window.open(wAddr, wTarget,'toolbar=no,menubar=no,location=no,directories=no,status=no,scrollbars=no,resizable=yes,width='+wWidth+',height='+wHeight+',top='+wTop+',left='+wLeft+'');
    wNewWin.focus();
  }
  //================= 날짜 선택 =====================

//================= 팝업창 컨트롤 관련 =====================
function setCookieKL( name, value, expiredays ) 
{
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
}

function getCookieKL( name ) 
{
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ) 
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) 
		{
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) ); 
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break; 
	}
	return ""; 
}

function open_layer(frameName, name, seq)
{
	document.all[name].style.visibility = "visible";
	eval("document."+frameName).location.replace('/popupL.do?popType=L&seq='+seq);
} 

function closeLayer(name)
{
	document.all[name].style.visibility = "hidden";
}

function closeLayerDay(name)
{
	document.all[name].style.visibility = "hidden";
	setCookieKL( name, "done" , 1);
}

function closeWin(name)
{
	self.close();
}

function closeWinDay(name)
{
	self.close();
	setCookieKL( name, "done" , 1);
}
//================= 팝업창 컨트롤 관련 =====================

// 프레임 사이즈 조절
function selfResize(reqDiv, reqFrm)
{ 
	dataobj = document.getElementById(reqDiv) //

    dataobj.style.top=0 
    dataobj.style.left=0 

    pagelength=dataobj.offsetHeight
    pagewidth=dataobj.offsetWidth

    parent.document.getElementById(reqFrm).height=pagelength  
    parent.document.getElementById(reqFrm).width=pagewidth 
} 

// 우편번호 검색
function openZipcode(reqZip, reqAddr1)
{
	var url = "/zipcode.do?zipNM="+reqZip+"&addrNM="+reqAddr1;
	window.open(url,'','width=450,height=350,scrollbars=yes');
}


// 필수입력오류체크
function cmnErrCertChk(reqForm, reqName, reqFoucs)
{
	if(reqForm.value == "")
	{
		alert(reqName +" 입력해주세요");
		reqForm.value = "";
		if(reqForm != null && reqFoucs != "N")
			reqForm.focus();
		return false;
	}
	return true;
}

// 숫자입력오류체크
function numErrChk(reqForm, reqMsg)
{
	if(isNaN(reqForm.value) || reqForm.value=="")
	{
		if(reqMsg == null ) reqMsg = "";
		alert(reqMsg+"숫자만 입력할수 있습니다");
		reqForm.value = "0";
		reqForm.focus();
		return false;
	}
	return true;
}

// 영문유효성체크
function engErrChk(reqForm, reqMsg)
{
	var eng_check = /^[a-zA-Z]+$/;

	if(!eng_check.test(reqForm.value) )
	{
		if(reqMsg == null ) reqMsg = "";
		alert(reqMsg+"영문만 입력할 수 있습니다.");
		
		return false;
	}
	return true;
}
	
function CheckEMail (emailStr) 
{  
	// 전자메일 패턴. 사용자이름@도메인 의 형식을 검사함  
	var emailPat=/^(.+)@(.+)$/;
	// 포함되지 말아야할 특수문자들 ( ) < > @ , ; : \ " . [ ]  
	var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";  
	// 포함될 수 있는 특수문자들 (나머지)  
	var validChars="\[^\\s" + specialChars + "\]";  
	// 아래의 경우는 사용자 이름에 따옴표가 있는 경우. RFC표준사항임  
	var quotedUser="(\"[^\"]*\")"; 
	// 도메인 대신 IP를 사용할 수있음  
	// 예를 들어 laday@[210.120.253.10]은 올바른 메일 주소 "[", "]"이 반드시 필요 
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;  
	// 기본적인 아토믹에 해당됨  
	var atom=validChars + '+';  
	// 사용자로 사용될 수 있는 문자를 나타냄  
	var word="(" + atom + "|" + quotedUser + ")";  
	// 사용자의 패턴을 나타냄. 위의 워드가 .단위로 여러개 올 수있음  
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");  
	// 아래의 것은 일반적인 도메인 패턴에 해당됨  
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");  
	// @을 기준으로 사용자와 도메인으로 나눔. 편의를 위함  
	var matchArray=emailStr.match(emailPat);  
	if (matchArray==null) 
	{    
	// 두개 이상 또는 @이 아예 없는 경우   
		alert("메일주소 형식이 잘못되어 있습니다 (공백 및 @과 .을 확인해 보세요)");    
		return false; 
	}  
	var user=matchArray[1];  
	var domain=matchArray[2];  
	// 사용자 부분이 제대로 되었는지 검사  
	if (user.match(userPat)==null) 
	{    
		alert("메일 아이디가 올바르지 않습니다");    
		return false;  
	} 
	// 도메인 부분이 IP로 되어 있는 경우 
	var IPArray=domain.match(ipDomainPat);  
	if (IPArray!=null) 
	{    
		for (var i=1;i<=4;i++) 
		{      
			if (IPArray[i]>255) 
			{        
				alert("IP 주소 형식이 올바르지 않습니다");        
				return false;      
			}    
		}    
		return true;  
	}  
	// 도메인 이름이 심볼릭 네임인 경우 올바르지 않음  
	var domainArray=domain.match(domainPat);  
	if (domainArray==null) 
	{    
		alert("도메인 형식이 올바르지 않습니다");   
		return false; 
	}  
	// 도메인 형식 검사에 통과했더라도, 마지막 세개 또는 두개의 문자(com, net, kr등등)  
	// 까지 올바른지 검사. 최상위 도메인은 반드시 세글자 아니면 두 글자임  
	var atomPat=new RegExp(atom,"g");  
	var domArr=domain.match(atomPat);  
	var len=domArr.length;  
	if (domArr[domArr.length-1].length<2 ||    domArr[domArr.length-1].length>3) 
	{    
		alert("도메인 주소의 마지막 필드는 반드시 세글자 도메인 또는 두글자 나라이어야 합니다.");    
		return false; 
	}  
	// 호스트이름이 있는지 검사  
	if (len<2) 
	{    
		alert("호스트 이름이 존재하지 않습니다. 호스트 이름은 반드시 2글자 이상이어야 합니다");    
		return false;  
	}  
	
	return true;
}	
//-->


/*
 var nowZoom = 100; 
 var maxZoom = 500;
 var minZoom = 100; 

 
 document.onkeypress = getKey;

 function getKey(keyStroke) {
	  isNetscape = (document.layers);
	  eventChooser = (isNetscape) ? keyStroke.which : event.keyCode;
	  which = String.fromCharCode(eventChooser).toLowerCase();
	  which2 = eventChooser;

	  var el = event.srcElement;

	  if ((el.tagName != "INPUT") && (el.tagName != "TEXTAREA")) {
	   if (which == "+") {
	    zoomIn();
	   } else if (which == "-") {
	    zoomOut();
	   }
	  }
	 }
 

 function zoomInit() {
  if (nowZoom < maxZoom) {
   nowZoom = 100;
  } else {
   return;
  }

  document.body.style.zoom = nowZoom + "%";
 }	 


 function zoomIn() {
  if (nowZoom < maxZoom) {
   nowZoom += 5; 
  } else {
   return;
  }

  document.body.style.zoom = nowZoom + "%";
 }



 function zoomOut() {
  if (nowZoom > minZoom) {
   nowZoom -= 5; 
  } else {
   return;
  }
  document.body.style.zoom = nowZoom + "%";
 }
*/

 
//인쇄
 function printView(url)
 {
 	window.open(url, "print", "width=750, height=700, scrollbars=yes");
 }

 
  function goPrint() {
	 window.print(); 
  }

 // 메뉴바로가기
 function quickMenu(obj)
 {
	var strUrl = obj.options[obj.selectedIndex].value;
	if(strUrl != "")
		location.href = strUrl;
 }
 //사이트바로가기
 function quickSite(obj)
 {
	var strUrl = obj.options[obj.selectedIndex].value;
	if(strUrl != "")
		window.open(strUrl);
 }
 
 //iframe 백그라운 설정
 onload = function() {
  var theframes = document.getElementsByTagName('iframe');
  for(var i = 0; i < theframes.length; i++)
  {
   theframes[i].setAttribute("allowTransparency", "ture");
  }
 }
 
function chkMenuAuth(auth){
	if( auth == "2" ){
		alert("회원만 열람할 수 있는 메뉴입니다. 회원가입후 이용하세요.");
	}else if (auth == "3" ){
		alert("교직원만 열람할 수 있는 메뉴입니다. 교직원 로그인 후 이용하세요.");
	}else if (auth == "1" ){
		alert("실명인증후 열람할 수 있는 메뉴입니다. 아이핀 로그인 후 이용하세요.");
	}else if (auth == "4" ){
		alert("메뉴열람 권한이 없습니다.");
	}
	location.href = "/login.do?m=0906";
}


function showAllBanner()
{
	document.getElementById("all_banner_wrap").style.display='block';
}

function hideAllBanner()
{
	document.getElementById("all_banner_wrap").style.display='none';
}

// 입력 텍스트 길이 및 숫자 체크
function chkNLength(reqForm, reqLength, reqChkNum)
{
	var val 		= eval("document."+reqForm);
	var str 		= val.value;
	var strByte 	= 0;
	var strLength 	= 0;
	
	// 숫자 체크
	if(reqChkNum == "int")
	{
		if(isNaN(val.value))
		{
			alert("숫자만  입력할수 있습니다");
			val.value = "";
			return;
		}
	}
	
	for(var i=0;i<str.length;i++)
	{
		var ch = str.charAt(i);
		// 한글
		if(escape(ch).length > 4)
			strByte = strByte+2;
		else
			strByte++;
		
		if(strByte <= reqLength)
			strLength = i+1;
	}
	
	if(strByte > reqLength)
	{
		if(reqChkNum == "int")
			alert(reqLength + "자리 이내 숫자만 입력해주세요");
		else
			alert("한글"+parseInt(reqLength/2) + "자 영문"+reqLength+"자 이상 입력하실수 없습니다");
		
		val.value = str.substr(0, strLength);
	}
}
//url 복사
function copyThis() {
	
	var IE = (document.all)?true:false;

	var curPage = document.location.href; 

	var IE11 = navigator.userAgent.search('Trident');

	if(IE || IE11!= -1){ //익스면
		window.clipboardData.setData("Text", curPage);
		alert(curPage+" 가 복사되었습니다.");
	}else{ //그 외 브라우저면
		temp = prompt("Ctrl+C를 눌러 클립보드로 복사하세요", curPage);
	}
}



//동영상 업로드
function vodUpload(){
	var url = "/vod/up/Uploader.html";		
	//window.open(url , "uploader", "width=450, height=550").focus();
	window.open(url , "uploader", "width=450px, height=550px");
	
	
}
//동영상 return
function ResultAction(value)
{

	var result="";
	for(var i in value){
		if (i=="ukey") {
			document.getElementById("filePath").value = value[i];	
		}
		if (i=="filename") {
			document.getElementById("fileNM").value = value[i];
		}
	}
}

//댓글보기 추가
function moreReply2(size) {
	document.getElementById('btnMore').style.display = 'none';
	for (i=5;i<size;i++) {
		document.getElementById('replay_more'+i).style.display = 'block';
	}
	
		 
}

/*******************************************************************************
 * Date
 ******************************************************************************/
function setDateTextBox(param, startDateTextBoxId, endDateTextBoxId){
    var startDateTextBox = $(startDateTextBoxId);
    var endDateTextBox = $(endDateTextBoxId);

    var startDateParam = {
        onClose: function(dateText, inst) {
            if (endDateTextBox.val() != '' && startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datetimepicker('setDate', testStartDate);
            }

            endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
            endDateTextBox.datetimepicker('option', 'minDateTime', startDateTextBox.datetimepicker('getDate'));
        } ,
        onSelect: function (selectedDateTime){
            endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
            endDateTextBox.datetimepicker('option', 'minDateTime', startDateTextBox.datetimepicker('getDate'));
        }
    };

    startDateTextBox.datetimepicker($.extend(true, param, startDateParam));

    var endDateParam = {
        onClose: function(dateText, inst) {
            if (startDateTextBox.val() != '' && endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datetimepicker('setDate', testEndDate);
            }

            startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
            startDateTextBox.datetimepicker('option', 'maxDateTime', endDateTextBox.datetimepicker('getDate'));
        },
        onSelect: function (selectedDateTime){
            startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
            startDateTextBox.datetimepicker('option', 'maxDateTime', endDateTextBox.datetimepicker('getDate'));
        }
    };

    endDateTextBox.datetimepicker($.extend(true, param, endDateParam));

    endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
    endDateTextBox.datetimepicker('option', 'minDateTime', startDateTextBox.datetimepicker('getDate'));

    startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
    startDateTextBox.datetimepicker('option', 'maxDateTime', endDateTextBox.datetimepicker('getDate'));
}


/*******************************************************************************
 * Date 시간까지
 ******************************************************************************/
function setDateTextBox2(param, startDateTextBoxId, endDateTextBoxId){
    var startDateTextBox = $(startDateTextBoxId);
    var endDateTextBox = $(endDateTextBoxId);

    var startDateParam = {
        onClose: function(dateText, inst) {
            if (endDateTextBox.val() != '' && startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datepicker('getDate');
                var testEndDate = endDateTextBox.datepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datepicker('setDate', testStartDate);
            }

            endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
            //endDateTextBox.datepicker('option', 'minDateTime', startDateTextBox.datepicker('getDate'));
        } ,
        onSelect: function (selectedDateTime){
            endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
            //endDateTextBox.datepicker('option', 'minDateTime', startDateTextBox.datepicker('getDate'));
        }
    };

    startDateTextBox.datepicker($.extend(true, param, startDateParam));

    var endDateParam = {
        onClose: function(dateText, inst) {
            if (startDateTextBox.val() != '' && endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datepicker('getDate');
                var testEndDate = endDateTextBox.datepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datepicker('setDate', testEndDate);
            }

            startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
            //startDateTextBox.datepicker('option', 'maxDateTime', endDateTextBox.datepicker('getDate'));
        },
        onSelect: function (selectedDateTime){
            startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
            //startDateTextBox.datepicker('option', 'maxDateTime', endDateTextBox.datepicker('getDate'));
        }
    };

    endDateTextBox.datepicker($.extend(true, param, endDateParam));

    //endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
    //endDateTextBox.datepicker('option', 'minDateTime', startDateTextBox.datepicker('getDate'));

    //startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
    //startDateTextBox.datepicker('option', 'maxDateTime', endDateTextBox.datepicker('getDate'));
}
/********************************
 * 첨부파일 미리보기 자바스크립트
 ********************************/

function fncFilePreView(seq){
	
	var nWidth = 950;
	var nHeight = 800;
	var nLeft = (window.screen.width - nWidth ) / 2;
	var nTop  = (window.screen.height- nHeight) / 2;
	var openParam  = "";
	openParam += "toolbar=no,location=no,menubar=no,status=no,directories=no,resizable=yes,scrollbars=yes";
	openParam += ",left=" + nLeft;
	openParam += ",top=" + nTop;
	openParam += ",width=" + nWidth;
	openParam += ",height=" + nHeight;	
//	var url = "/boardCnts/filePreView.do?atchFileId="+atchFileId+"&amp;fileSn="+fileSn;
	var url = "/boardCnts/filePreView.do?seq="+seq;
	
	window.open(url, "FilePreView", openParam).focus();
}

function fncFilePreView2(fileSeq, afieldid){
	
	var nWidth = 950;
	var nHeight = 800;
	var nLeft = (window.screen.width - nWidth ) / 2;
	var nTop  = (window.screen.height- nHeight) / 2;
	var openParam  = "";
	openParam += "toolbar=no,location=no,menubar=no,status=no,directories=no,resizable=yes,scrollbars=yes";
	openParam += ",left=" + nLeft;
	openParam += ",top=" + nTop;
	openParam += ",width=" + nWidth;
	openParam += ",height=" + nHeight;	
//	var url = "/boardCnts/filePreView.do?atchFileId="+atchFileId+"&amp;fileSn="+fileSn;
	var url = "/boardCnts/filePreView2.do?fileSeq="+fileSeq+"&afieldid="+afieldid;
	
	window.open(url, "FilePreView2", openParam).focus();
}