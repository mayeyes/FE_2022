<%
/****************************************
    system  : ClassDesk > 수강생 > 콘텐츠 로드 index 페이지
    title   : 콘텐츠 로드를위한 index페이지
    summary :   
    wdate   : 2016-08-14
    writer  : 황두은
****************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/jsp/common/inc/taglib_inc.jsp"%>
<%@ include file="/WEB-INF/jsp/classdesk/cmmn/inc/top_inc.jsp"%>
<%@ include file="/WEB-INF/jsp/classdesk/online/CommonSCORMAPI.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge"> 
	<meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=yes" />
	
	<!-- <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> -->
	<link rel="stylesheet" type="text/css" href="/classdesk/common/css/classdesk.css" />
	<link rel="stylesheet" type="text/css" href="/classdesk/common/css/jquery-ui-1.9.0.custom.css">
	
	<script type="text/javascript" src="/classdesk/common/js/jquery-1.8.2.js"></script>
	<script type="text/javascript" src="/classdesk/common/js/jquery-ui-1.9.0.custom.js"></script>
	
	<script type="text/javascript" src="/classdesk/common/js/jquery-control.js"></script>
	<script type="text/javascript" src="/common/js/sangs_core.js" ></script>
	
	
<!-- 
	<script type="text/javascript" src="/test/jwplayer-6/jwplayer.js"></script>	
	
	<script type="text/javascript">
	$(document).ready(function(){

		 jwplayer('contentArea').setup({
				file: "rtmp://112.175.102.51:1935/vod/mp4:30-01-01.mp4",
				//file: "http://lms.kinfa.or.kr/edu-data/contents/mobile/30/04/07.mp4",
				//type: typeText,
				//image: "images/bg.JPG",
				//mute: false,
				primary: "html5",   
				//controls: true , //컨트롤바
				fallback : "flash",
				width: "100%",
				//height: "800", //_movHeight
				autostart:false,
				aspectratio:"4:3"
		
		});

	});
	</script> -->
</head>
<body style="overflow-X:hidden; min-width: 100%;" bgcolor="#3C4E70" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"  onLoad="initAPI();" onUnload="onExit();">
 <input type="hidden" id="treeno" name="treeno" value="${REQUEST_DATA.treeno}"/>
<input type="hidden" id="lastFrameseq" name="lastFrameseq" value="${treeHistData.LAST_FRAMESEQ}"/>
<input type="hidden" id="movsec" name="movsec" value="${treeHistData.MOVSEC}"/>
<input type="hidden" id="studytime" name="studytime" value="${treeHistData.STUDYTIME}"/>
<input type="hidden" id="movsec_hh" name="movsec_hh" value="${treeHistData.MOVSEC_HH}"/>
<input type="hidden" id="movsec_mm" name="movsec_mm" value="${treeHistData.MOVSEC_MM}"/>
<input type="hidden" id="movsec_ss" name="movsec_ss" value="${treeHistData.MOVSEC_SS}"/>
<input type="hidden" id="progressYn" name="progressYn" value="1"/> 
<input type="hidden" id="bookMarkType" name="bookMarkType" value="${BOOK_MARK_TYPE}"/>
<input type="hidden" id="sday" name="sday" value="${SDAY}"/>
<input type="hidden" id="seqTitle" name="seqTitle"  value="${rowData.SEQ_TITLE}"/>
<input type="hidden" id="isPass" name="isPass"  value="${REQUEST_DATA.ispass}"/> 

<input type="hidden" id="framecnt" name="framecnt"  value="${treeData.FRAMECNT}"/> 
<input type="hidden" id="runtime" name="runtime"  value="${treeData.RUNTIME}"/> 

<input type="hidden" id="mobileFilePath" name="mobileFilePath"  value="${treeData.MOBILE_FILE_PATH}"/>





 <title>${REQUEST_DATA.title }</title>
	<div id="mainArea" class="study_body" style="text-align: center;">
		<div id="contentArea" name="contentArea" style="overflow-x:auto;overflow-y:auto;"></div> <!-- append될 iframe 학습창 -->
	</div>
	<applet code="" width="" height="" style="display:none"></applet>
	<iframe id="studyMenuFrame" name="studyMenuFrame" title="빈 프레임" frameborder="0" src="complete_rate.jsp" width="0" height="0" scrolling="no"></iframe>
</body>

</html>

