<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<tiles:insertAttribute name="header_meta" />	
</head>
<body id="main" class="user">


<div id="wrap">
	<div class="js_mobile_check"></div>

	<!-- header :: s :: -->
	<div id="header">
		<tiles:insertAttribute name="header" />
	</div>

	<hr />	
	<!-- header :: e :: -->
	
	<!-- container :: s :: -->
	<strong class="hidden">본문</strong>
	<div id="container">
		<tiles:insertAttribute name="content" />
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
