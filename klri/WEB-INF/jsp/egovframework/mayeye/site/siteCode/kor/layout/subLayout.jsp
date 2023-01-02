<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page import="java.util.*"%>
<%@ page import="egovframework.mayeyeutil.*"%>
<%
String siteCode = (String)request.getAttribute("siteCode");
String mcode = (String)request.getAttribute("mcode");
String mcode2 = (String)request.getAttribute("mcode");
String title ="";
String title2 ="";


XmlUtil util = new XmlUtil();
try{
		HashMap<String, XmlBean> xmlMap = util.makeSiteMenuXmlMap(siteCode);
		if(mcode.length() == 8){
			mcode=mcode.substring(0, 6);
		}
		XmlBean beanTitle = xmlMap.get(mcode);
		title = beanTitle.getTitle();
		
		mcode2=mcode2.substring(0, 2);
		XmlBean beanTitle2 = xmlMap.get(mcode2);
		title2 = beanTitle2.getTitle();
	}
	catch(Exception e){
		
	}
	request.setAttribute("title", title);
	request.setAttribute("title2", title2);
%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<tiles:insertAttribute name="header_meta" />	
</head>
<body id="sub" class="user">


<div id="wrap" class="con_<%=mcode2 %>">
	<div class="js_mobile_check"></div>

	<!-- header :: s :: -->
	<div id="header">
		<tiles:insertAttribute name="header" />
	</div>
	
	<hr />
	<!-- header :: e :: -->

	<!-- visual :: s :: -->
	<div id="visual" class="bg_<%=mcode2 %>">
		<strong><%=title2 %></strong>
		<c:choose>
			<c:when test="${title2 eq '발간물'}">
				<span>연구보고서, 정기간행물 등의 최신발간물 정보를 알려드립니다.</span>
			</c:when>
			<c:when test="${title2 eq '연구사업'}">
				<span>한국법제연구원의 연구사업 및 계획, 연구네트워크 등에 관련된 정보를 제공합니다.</span>
			</c:when>
			<c:when test="${title2 eq '연구원소식'}">
				<span>공지사항, 행사안내, 보도자료 등에 관련된 정보를 제공합니다.</span>
			</c:when>
			<c:when test="${title2 eq '참여마당'}">
				<span>연구과제 제안, 학술지 원고모집 등에 관련된 정보를 제공합니다.</span>
			</c:when>
			<c:when test="${title2 eq '연구원소개'}">
				<span>한국법제연구원 소개, 조직구성 등에 관련된 정보를 제공합니다.</span>
			</c:when>
			<c:otherwise>
				<span>공공데이터 개방 정책, 해외출장보고에 관련된 정보를 제공합니다.</span>
			</c:otherwise>
		</c:choose>
	</div>
	<!-- visual :: e :: -->

	<!-- container :: s :: -->
	<strong class="hidden">본문</strong>
	<div id="container">
		<div class="layout">

			<div id="content_box">
				
				<!-- remote :: s :: -->
				<tiles:insertAttribute name="left" />	
				<!-- remote :: e :: -->



				<!-- content :: s :: -->
				<div id="content">
				 
					<!-- navi :: s :: -->
					<div id="path">
						<tiles:insertAttribute name="navi" />	
					</div>
					<!-- navi :: e :: -->
					 
				    <!-- Txt :: s :: -->
				    <h3>
				    	<c:choose>
				    		<c:when test="${title eq '로그인/회원정보변경' and (not empty loginVO and loginVO.identityAt eq 'U')}">회원정보변경</c:when>
				    		<c:when test="${title eq '로그인/회원정보변경' and (empty loginVO or loginVO.identityAt ne 'U')}">로그인</c:when>
				    		<c:when test="${title eq '회원가입안내/회원탈퇴' and (not empty loginVO and loginVO.identityAt eq 'U')}">회원탈퇴</c:when>
				    		<c:when test="${title eq '회원가입안내/회원탈퇴' and (empty loginVO or loginVO.identityAt ne 'U')}">회원가입안내</c:when>
				    		<c:otherwise>${title}</c:otherwise>
				    	</c:choose>
				    </h3>
				    <div id="txt">
					<!-- 서브페이지 내용:: s -->
					<!-- 텝메뉴 ::s:: -->
					<tiles:insertAttribute name="tabmenu" />
					<!-- 텝메뉴 ::e:: -->
					<tiles:insertAttribute name="content" />	
					<!-- 서브페이지 내용:: e -->
				    </div>
				    <!-- Txt :: e :: -->
				</div>
				<!-- content :: e :: -->

			</div>

		</div>
	</div>
	<!-- container :: e :: -->



	<!-- footer :: s :: -->
	<div id="footer">
		<tiles:insertAttribute name="footer" />		
	</div>
	<!-- footer :: e :: -->


	
</div>

</body>
</html>
