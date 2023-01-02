<!--TITLE>실명인증</TITLE-->
<%@ page pageEncoding="utf-8"%>
<%@ page language="java" import="Kisinfo.Check.IPINClient" %>
<%
int port = request.getServerPort();
String protocol = port == 443 ? "https://" : "http://";
// String protocol = "http://";
%>

<%
// SMS 인증부분 시작.
// 	String rUrl = request.getParameter("rUrl");
// 	if(rUrl == null || rUrl.equals("")) {
// 		rUrl= "http://localhost:8080/form.do"; // 인증 처리 이후 이동될 페이지 정보.
// 	}
// 	session.setAttribute("rUrl", rUrl);

	//리턴URL
	String rUrl = request.getParameter("returnUrl");	
 	if(rUrl == null || rUrl.equals("")) {
 		rUrl= (String)session.getAttribute("rUrl"); 			       
 	}	

 	session.setAttribute("rUrl", rUrl);
	
	NiceID.Check.CPClient niceCheck = new  NiceID.Check.CPClient();
	
	String domain = "";
	
	domain = protocol + request.getServerName();
	
	if(port != 443 && port != 80){
		domain += ":" + request.getServerPort();
	}
	
	String sReturnUrl = domain + "/NICE_ID/result.jsp";      // 성공시 이동될 URL
	String sErrorUrl = domain + "/NICE_ID/fail.jsp";          // 실패시 이동될 URL
			
	String sSiteCode = "G5727";				// NICE로부터 부여받은 사이트 코드
    String sSitePassword = "QIWQJT0OOF6O";		// NICE로부터 부여받은 사이트 패스워드
    
    String sRequestNumber = "REQ0000000001";        	// 요청 번호, 이는 성공/실패후에 같은 값으로 되돌려주게 되므로 
														// 업체에서 적절하게 변경하여 쓰거나, 아래와 같이 생성한다.
	sRequestNumber = niceCheck.getRequestNO(sSiteCode);
	session.setAttribute("REQ_SEQ" , sRequestNumber);	// 해킹등의 방지를 위하여 세션을 쓴다면, 세션에 요청번호를 넣는다.
	
	String sAuthType = "";      	// 없으면 기본 선택화면, M: 핸드폰, C: 신용카드, X: 공인인증서
	String popgubun 	= "N";		//Y : 취소버튼 있음 / N : 취소버튼 없음
	String customize 	= "";			//없으면 기본 웹페이지 / Mobile : 모바일페이지
	
	// 입력될 plain 데이타를 만든다.
    String sPlainData = "7:REQ_SEQ" + sRequestNumber.getBytes().length + ":" + sRequestNumber +
                        "8:SITECODE" + sSiteCode.getBytes().length + ":" + sSiteCode +
                        "9:AUTH_TYPE" + sAuthType.getBytes().length + ":" + sAuthType +
                        "7:RTN_URL" + sReturnUrl.getBytes().length + ":" + sReturnUrl +
                        "7:ERR_URL" + sErrorUrl.getBytes().length + ":" + sErrorUrl +
                        "11:POPUP_GUBUN" + popgubun.getBytes().length + ":" + popgubun +
                        "9:CUSTOMIZE" + customize.getBytes().length + ":" + customize;
    
    String sMessage = "";
    String sEncData = "";
    
	int iReturn = niceCheck.fnEncode(sSiteCode, sSitePassword, sPlainData);
    if( iReturn == 0 )
    {
        sEncData = niceCheck.getCipherData();
    }
    else if( iReturn == -1)
    {
        sMessage = "암호화 시스템 에러입니다.";
    }    
    else if( iReturn == -2)
    {
        sMessage = "암호화 처리오류입니다.";
    }    
    else if( iReturn == -3)
    {
        sMessage = "암호화 데이터 오류입니다.";
    }    
    else if( iReturn == -9)
    {
        sMessage = "입력 데이터 오류입니다.";
    }    
    else
    {
        sMessage = "알수 없는 에러 입니다. iReturn : " + iReturn;
    }
%>

<%
	
	String gSiteCode				= "EH73";			// IPIN 서비스 사이트 코드		(NICE평가정보에서 발급한 사이트코드)
	String gSitePw					= "csyss0212*19";			// IPIN 서비스 사이트 패스워드	(NICE평가정보에서 발급한 사이트패스워드)
	
	/*
	┌ sReturnURL 변수에 대한 설명  ─────────────────────────────────────────────────────
		NICE평가정보 팝업에서 인증받은 사용자 정보를 암호화하여 귀사로 리턴합니다.
		따라서 암호화된 결과 데이타를 리턴받으실 URL 정의해 주세요.
		
		* URL 은 http 부터 입력해 주셔야하며, 외부에서도 접속이 유효한 정보여야 합니다.
		* 당사에서 배포해드린 샘플페이지 중, ipin_process.jsp 페이지가 사용자 정보를 리턴받는 예제 페이지입니다.
		
		아래는 URL 예제이며, 귀사의 서비스 도메인과 서버에 업로드 된 샘플페이지 위치에 따라 경로를 설정하시기 바랍니다.
		예 - http://www.test.co.kr/ipin_process.jsp, https://www.test.co.kr/ipin_process.jsp, https://test.co.kr/ipin_process.jsp
	└────────────────────────────────────────────────────────────────────
	*/
	String gReturnURL				= domain + "/IPIN/ipin_process.jsp";
	
	
	/*
	┌ sCPRequest 변수에 대한 설명  ─────────────────────────────────────────────────────
		[CP 요청번호]로 귀사에서 데이타를 임의로 정의하거나, 당사에서 배포된 모듈로 데이타를 생성할 수 있습니다.
		
		CP 요청번호는 인증 완료 후, 암호화된 결과 데이타에 함께 제공되며
		데이타 위변조 방지 및 특정 사용자가 요청한 것임을 확인하기 위한 목적으로 이용하실 수 있습니다.
		
		따라서 귀사의 프로세스에 응용하여 이용할 수 있는 데이타이기에, 필수값은 아닙니다.
	└────────────────────────────────────────────────────────────────────
	*/
	String gCPRequest				= "";
	
	
	
	// 객체 생성
	IPINClient pClient = new IPINClient();
	
	
	// 앞서 설명드린 바와같이, CP 요청번호는 배포된 모듈을 통해 아래와 같이 생성할 수 있습니다.
	gCPRequest = pClient.getRequestNO(gSiteCode);
	
	// CP 요청번호를 세션에 저장합니다.
	// 현재 예제로 저장한 세션은 ipin_result.jsp 페이지에서 데이타 위변조 방지를 위해 확인하기 위함입니다.
	// 필수사항은 아니며, 보안을 위한 권고사항입니다.
	session.setAttribute("CPREQUEST" , gCPRequest);
	
	
	// Method 결과값(iRtn)에 따라, 프로세스 진행여부를 파악합니다.
	int iRtn = pClient.fnRequest(gSiteCode, gSitePw, gCPRequest, gReturnURL);
	
	String sRtnMsg					= "";			// 처리결과 메세지
	String gEncData					= "";			// 암호화 된 데이타
	
	// Method 결과값에 따른 처리사항
	if (iRtn == 0)
	{
	
		// fnRequest 함수 처리시 업체정보를 암호화한 데이터를 추출합니다.
		// 추출된 암호화된 데이타는 당사 팝업 요청시, 함께 보내주셔야 합니다.
		gEncData = pClient.getCipherData();		//암호화 된 데이타
		
		sRtnMsg = "정상 처리되었습니다.";
	
	}
	else if (iRtn == -1 || iRtn == -2)
	{
		sRtnMsg =	"배포해 드린 서비스 모듈 중, 귀사 서버환경에 맞는 모듈을 이용해 주시기 바랍니다.<BR>" +
					"귀사 서버환경에 맞는 모듈이 없다면 ..<BR><B>iRtn 값, 서버 환경정보를 정확히 확인하여 메일로 요청해 주시기 바랍니다.</B>";
	}
	else if (iRtn == -9)
	{
		sRtnMsg = "입력값 오류 : fnRequest 함수 처리시, 필요한 4개의 파라미터값의 정보를 정확하게 입력해 주시기 바랍니다.";
	}
	else
	{
		sRtnMsg = "iRtn 값 확인 후, NICE평가정보 개발 담당자에게 문의해 주세요.";
	}

%>
<!--	==========================================================	-->
<!--	한국신용정보주식회사 처리 모듈 (수정 및 변경하지 마십시오)	-->
<!--	==========================================================	-->
<script type="text/javascript" src="http://secure.nuguya.com/nuguya/nice.nuguya.oivs.crypto.js"></script>
<script type="text/javascript" src="http://secure.nuguya.com/nuguya/nice.nuguya.oivs.msg.js"></script>
<script type="text/javascript" src="http://secure.nuguya.com/nuguya/nice.nuguya.oivs.util.js"></script>

<script type="text/javascript">
//<!--
// 실명인증 팝업 오픈
	window.name ="Parent_window";
	
	//Open 공공IPIN
	function openGPIN() {
// 		alert('준비중입니다.');
// 		return; 
// 	    wWidth = 360;
// 	    wHight = 120; 
// 	    wX = (window.screen.width - wWidth) / 2;
// 	    wY = (window.screen.height - wHight) / 2;
// 	    var w = window.open("/G-PIN/AuthRequest.jsp", "gPinLoginWin", "directories=no,toolbar=no,left="+wX+",top="+wY+",width="+wWidth+",height="+wHight);
		window.open('', 'popupIPIN2', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		document.form_ipin.target = "popupIPIN2";
		document.form_ipin.action = "https://cert.vno.co.kr/ipin.cb";
		document.form_ipin.submit();
	}

	function fnPopup(){
		window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
		document.form_chk.target = "popupChk";
		document.form_chk.submit();
	}
	
	function openTEST(){
		window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		document.form_chk.action = "/NICE_ID/test.jsp";
		document.form_chk.target = "popupChk";
		document.form_chk.submit();
	}
	<%
	if(!sMessage.equals("")){
		%>
	alert('<%= sMessage %>');
		<%
	}
	%>
//-->
</script>

<form name="form_chk" method="post">
	<input type="hidden" name="m" value="checkplusSerivce">
	<input type="hidden" name="EncodeData" value="<%= sEncData %>">	
	<input type="hidden" name="param_r1" value="">
	<input type="hidden" name="param_r2" value="">
	<input type="hidden" name="param_r3" value="">
</form>

<form name="form_ipin" method="post">
	<input type="hidden" name="m" value="pubmain">						<!-- 필수 데이타로, 누락하시면 안됩니다. -->
    <input type="hidden" name="enc_data" value="<%= gEncData %>">		<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->
    <input type="hidden" name="param_r1" value="">
    <input type="hidden" name="param_r2" value="">
    <input type="hidden" name="param_r3" value="">
</form>

<form name="vnoform" method="post">
	<input type="hidden" name="enc_data">								<!-- 인증받은 사용자 정보 암호화 데이타입니다. -->
    <input type="hidden" name="param_r1" value="">
    <input type="hidden" name="param_r2" value="">
    <input type="hidden" name="param_r3" value="">
</form>

<div class="auth_box">
	<div class="auth_phone">
		<h5>휴대폰 인증</h5>
		<p>
		휴대전화번호를 이용한 본인확인 서비스입니다. <br />2014년 08월 07일부터 개정되는 
		개인정보보호법에 따라 <br />주민등록번호를 이용한 
		실명인증 서비스를 중단하고, 휴대전화 <br />번호로 
		본인임을 확인할 수 있는 휴대폰인증 서비스입니다.</p>
		<a href="#link" onclick="fnPopup(); return false;" ><img src="/images/specific/common/auth_phone.jpg" alt="휴대폰인증 바로가기"></a>
	</div>
	
	<div class="auth_gpin">
		<h5>I-PIN 인증</h5>
		<p>
		아이핀(I-PIN)은 
        인터넷상의 개인식별번호를 의미하며, <br />
        대면확인이 어려운 인터넷에서
        주민등록번호를 사용하지 않고도 <br />
        본인임을 확인할 수 있는 수단입니다.</p>
		<a href="#link" onclick="openGPIN(); return false;"><img src="/images/specific/common/auth_gpin.jpg" alt="인증 바로가기"></a>
	</div>
</div>

<ul class="h5_ul">
	<li>I-PIN 인증이 되지 않는 경우
		<ul class="h7_ul">
			<li>I-PIN 홈페이지 : <a href="http://www.vno.co.kr/" target="_blank" title="새창으로 I-PIN 홈페이지 홈페이지가 열립니다.">http://www.vno.co.kr/</a></li>
			<li>I-PIN 고객센터 : 02-1600-1522 (운영시간 : 평일 09시 ~ 18시)</li>
		</ul>
	</li>
	<li>실명인증이 되지 않는 경우
		<ul class="h7_ul">
			<li>나이스평가정보 홈페이지 : <a target="_blank" title="새창" href="http://www.niceinfo.co.kr">http:/www.niceinfo.co.kr</a></li>
			<li>나이스평가정보 고객센터 : 02-2122-4000 (상담시간 : 평일 09시 ~ 18시)</li>
		</ul>
	</li>
</ul>