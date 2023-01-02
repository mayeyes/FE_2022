<%@ page language="java"  contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="net.acego.common.util.*"%>
<%
String code = request.getParameter("code");

if(code == null ) code = "01";

int codeLen =code.length();
if(codeLen <4) codeLen = 2;

String code1 = code.substring(0,2);		// 1단계 코드
String siteCode = (String)request.getAttribute("siteCode");
XmlUtil util = new XmlUtil();
List<XmlBean> beanList = util.makeSiteMenuXmlList(siteCode+"_cms","cms");
StringBuffer buf =  new StringBuffer();
XmlBean bean = null;
%>
 

				<!-- 사이트맵 -->
				<div id="sitemap">

	</div>
				<!-- //사이트맵 -->
 