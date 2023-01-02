<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.File"%>
<%@ page import="net.acego.common.util.*"%>
<%
	String code = CommonUtil.checkNull(request.getParameter("code"), "");
	String siteCode = CommonUtil.checkNull(request.getParameter("siteCode"), "mayor");
	int listCnt = CommonUtil.checkNull(request.getParameter("listCnt"),3);
	int strLength = CommonUtil.checkNull(request.getParameter("strLength"), 20);
	int contLength = CommonUtil.checkNull(request.getParameter("contLength"), 50);
	int strLengthCopy = 0;
	strLengthCopy = strLength;
	
	try {
		XmlUtil util = new XmlUtil();
		List<XmlBean> beanList = util.makeSiteMenuXmlList(code, code);
		StringBuffer buf = new StringBuffer();
 		String subject = "";
 		String contents = "";
 		String newChk= "N";
 		String img_url = "/images/prog/common/noimage.jpg";
 		int prevListCnt = 0;
 		
		if(beanList != null) {
			if(beanList.size() <= listCnt) listCnt =  beanList.size();
			prevListCnt = listCnt -1;
			
			for(int k = 0; k < listCnt; k++) {
				XmlBean bean = beanList.get(k);
				newChk= "N";
				strLength = strLengthCopy;
				
				subject = bean.getTitle();
				subject = CommonUtil.stripTags(subject);
				subject = subject.replaceAll("&nbsp;"," ");
				subject = subject.replaceAll("  "," ");
				
				contents = bean.getContent().replace("&","&amp;");
				contents = CommonUtil.stripTags(contents);
				contents = contents.replaceAll("&nbsp;"," ");
				contents = contents.replaceAll("  "," ");	

				buf.append("<li>");
				buf.append("<a href=\"" + bean.getLinkUrl()+ "\">");
				
				if(!bean.getFileName().equals("")){
					img_url="/cmm/fms/getImage.do?atchFileId="+bean.getFileName()+"&fileSn=0&kind=100";
				}
 
				buf.append("<span class='photo'><img src='"+img_url+"'  alt='"+subject+"' /></span>");
				
				buf.append("<div><p class='title'>");
				if(subject.length() > strLength){
					buf.append(subject.substring(0,strLength)+"...");
				} else {
					buf.append(subject);
				}
				buf.append("</p></div>");

				
 
				buf.append("</a>");
				buf.append("</li>");
			}
		}
		// 출력
		out.println(buf.toString());
	} catch (Exception e) {
		System.out.println("MAYOR PHOTO ERROR = "+e.getStackTrace());
	}
%>