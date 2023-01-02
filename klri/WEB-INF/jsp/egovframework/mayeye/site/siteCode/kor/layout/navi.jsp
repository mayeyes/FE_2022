<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="java.util.*"%>
<%@ page import="egovframework.mayeyeutil.*"%>

<%
	String siteCode = (String)request.getAttribute("siteCode");
	String mno = (String)request.getAttribute("mno");
	String title = "";
	String code = "";
	int idx = 0;
	int depth3 = 0;
	boolean chkDepth3 =  false;	// 3단계인지 첵크한다.
	
	XmlUtil util = new XmlUtil();
	XmlBean bean = null;
	XmlBean subbean = null;

	code = util.getSearchCode(mno);
	
	int codeLen =code.length();
	if(codeLen <4){
		codeLen = 2;
	}
	
	List<XmlBean> beanList = util.makeSiteMenuXmlList(siteCode+"_cms","cms");
	StringBuffer buf =  new StringBuffer();	 
	String code1 = code.substring(0,2);	
	String code2 = code;		
	String code3 = code;	
	
	if(codeLen >= 4){
		code2 = code.substring(0, 4);
	}
	if(codeLen >= 6){
		code3 = code.substring(0, 6);
	}
	
	String deps_01 = "<ul>";
	String deps_01_title = "";
	String deps_02 = "<ul>";
	String deps_02_title = "";
	String deps_03 = "<ul>";
	String deps_03_title = "";
	
	for(int k=0; k< beanList.size(); k++)
	{
		bean = beanList.get(k);

			if(bean.getDepth().equals("1")){
				if(bean.getSubNo() != null && bean.getPageType().equals("html"))
				{
					subbean = beanList.get(k+1);
					if(subbean.getSubNo() != null)
					{
						subbean = beanList.get(k+2);
						if(subbean.getSubNo() !=null && subbean.getPageType().equals("html"))
						{
							subbean = beanList.get(k+3);
							if(subbean.getPageType().equals("html"))
							{
								deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("board"))
							{
								deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("linkUrl"))
							{
								deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("program"))
							{
								deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
						}
						else{
							if(subbean.getPageType().equals("html"))
							{
								deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("board"))
							{
								deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("linkUrl"))
							{
								deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("program"))
							{
								deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
						}
					}
					else
					{
						if(subbean.getPageType().equals("html"))
						{
							deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";	
						}
						else if(subbean.getPageType().equals("board"))
						{
							deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
						}
						else if(subbean.getPageType().equals("linkUrl"))
						{
							deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
						}
						else if(subbean.getPageType().equals("program"))
						{
							deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
						}
					}
				}
				else
				{
					if(bean.getPageType().equals("html"))
					{
						deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+bean.getMno()+".do' target='"+bean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
					}
					else if(bean.getPageType().equals("board"))
					{
						deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+bean.getBbsId()+"/list.do' target='"+bean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
					}
					else if(bean.getPageType().equals("linkUrl"))
					{
						deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+bean.getLinkUrl()+"' target='"+bean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
					}
					else if(bean.getPageType().equals("program"))
					{
						deps_01+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+bean.getUserUrl()+"' target='"+bean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
					}
				}
			}
			if(bean.getMno().equals("sub"+code1)){		
				deps_01_title = "<strong><a href=\""+request.getContextPath()+ bean.getLinkUrl()+"\" target='"+ bean.getLinkTarget()+"' title='2뎁스 메뉴 선택 링크리스트 클릭시 해당 페이지로 이동합니다.'>"+ bean.getTitle()+"</a></strong>";
				idx = k;
			}
	} 
	
	
	for(int k=0; k< beanList.size(); k++) 
	{
		bean = beanList.get(k);
			if(bean.getDepth().equals("2") && mno.substring(3,5).equals(bean.getMno().substring(3,5))){
				if(bean.getSubNo() != null && bean.getPageType().equals("html"))
				{
					subbean = beanList.get(k+1);
					if(subbean.getSubNo() != null)
					{
						subbean = beanList.get(k+2);
						if(subbean.getPageType().equals("html"))
						{
							deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
						}
						else if(subbean.getPageType().equals("board"))
						{
							deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
						}
						else if(subbean.getPageType().equals("linkUrl"))
						{
							deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
						}
						else if(subbean.getPageType().equals("program"))
						{
							deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
						}
					}
					else
					{
						if(subbean.getPageType().equals("html"))
						{
							deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";	
						}
						else if(subbean.getPageType().equals("board"))
						{
							deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
						}
						else if(subbean.getPageType().equals("linkUrl"))
						{
							deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
						}
						else if(subbean.getPageType().equals("program"))
						{
							deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
						}
					}
				}
				else
				{
					if(bean.getPageType().equals("html"))
					{
						deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+bean.getMno()+".do' target='"+bean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
					}
					else if(bean.getPageType().equals("board"))
					{
						deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+bean.getBbsId()+"/list.do' target='"+bean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
					}
					else if(bean.getPageType().equals("linkUrl"))
					{
						deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+bean.getLinkUrl()+"' target='"+bean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
					}
					else if(bean.getPageType().equals("program"))
					{
						deps_02+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+bean.getUserUrl()+"' target='"+bean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
					}
				}
			}
			if(bean.getMno().replace("_", "").equals("sub"+code2)){		
				deps_02_title = "<strong><a href=\""+request.getContextPath()+ bean.getLinkUrl()+"\" target='"+ bean.getLinkTarget()+"' title='3뎁스 메뉴 선택 링크리스트 클릭시 해당 페이지로 이동합니다.'>"+ bean.getTitle()+"</a></strong>";
				idx = k;
			}
	} 
	
	
	
	
	
	for(int k=0; k< beanList.size(); k++) 
	{
		bean = beanList.get(k);
			if(bean.getDepth().equals("3") && bean.getMno().length() > 9){
				if(mno.substring(0,8).equals(bean.getMno().substring(0,8))){
					if(bean.getSubNo() != null && bean.getPageType().equals("html"))
					{
						subbean = beanList.get(k+1);
						if(subbean.getSubNo() != null) 
						{
							subbean = beanList.get(k+2);
							if(subbean.getPageType().equals("html"))
							{
								deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("board"))
							{
								deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("linkUrl"))
							{
								deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("program"))
							{
								deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a></li>";
							}
						}
						else
						{
							if(subbean.getPageType().equals("html"))
							{
								deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";	
							}
							else if(subbean.getPageType().equals("board"))
							{
								deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("linkUrl"))
							{
								deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
							}
							else if(subbean.getPageType().equals("program"))
							{
								deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
							}
						}
					}
					else
					{
						if(bean.getPageType().equals("html"))
						{
							deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+bean.getMno()+".do' target='"+bean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
						}
						else if(bean.getPageType().equals("board"))
						{
							deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+bean.getBbsId()+"/list.do' target='"+bean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
						}
						else if(bean.getPageType().equals("linkUrl"))
						{
							deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+bean.getLinkUrl()+"' target='"+bean.getLinkTarget()+"' >"+ bean.getTitle()+"</a></li>";
						}
						else if(bean.getPageType().equals("program"))
						{
							deps_03+="<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+bean.getUserUrl()+"' target='"+bean.getLinkTarget()+"'  >"+ bean.getTitle()+"</a></li>";
						}
					}
				
				if(bean.getMno().replace("_", "").equals("sub"+code3)){		
					deps_03_title = "<strong><a href=\""+request.getContextPath()+ bean.getLinkUrl()+"\" target='"+ bean.getLinkTarget()+"' title='4뎁스 메뉴 선택 링크리스트 클릭시 해당 페이지로 이동합니다.'>"+ bean.getTitle()+"</a></strong>";
					idx = k;
				}
			}
		}
	} 
  
	
	deps_01 = deps_01_title + deps_01 + "</ul>";
	deps_02 = deps_02_title + deps_02 + "</ul>";
	deps_03 = deps_03_title + deps_03 + "</ul>";
%>
	


<!-- menu ::s:: -->
    <div class="js_menu select">
    	<a href="/" class="home">Home</a>
        <% 
			//1deps
			out.println("<div class=\"js_menu_select\">");
			out.println(deps_01);
			out.println("</div>");
			
			//2deps
			if(code.length() >= 4){
				if(code.length() >= 6){
					out.println("<div class=\"js_menu_select\">");
				} else {
					out.println("<div class=\"js_menu_select last\">");
				}
				out.println(deps_02);
				out.println("</div>");
			}
			
			//3deps
			if(code.length() >= 6){
				out.println("<div class=\"js_menu_select last\">");
				out.println(deps_03);
				out.println("</div>");
			}
		%>
 
        <div class="clear"></div>
    </div>
    <!-- menu ::e:: -->
	
	<!-- 공유 ::s:: -->
	<a href="#" class="gongu" title="SNS 공유 리스트 열기">공유</a>
    <div class="sns_box">
    	<div class="bx">
    		<div class="head">SNS 공유하기</div>
            <ul>
            	<li><a href="#" onclick="facebookOpen();return false;" class="btn_f">페이스북</a></li>
            	<li><a href="#" onclick="twitterOpen();return false;" class="btn_t">트위터</a></li>
            </ul>
            <a href="#" class="btn_close">닫기</a>
        </div>
      	</div>
      	<!-- 공유 ::e:: -->

      	<!-- 프린트 ::s:: -->
	<a href="#" class="print" title="클릭시 해당 컨텐츠를 프린트 하실 수 있습니다.">프린트</a>
	<!-- 프린트 ::e:: -->

	<!-- quick ::s:: -->
    <div class="quicks">
    	<strong class="head"><a href="#" title="홈페이지 간편메뉴 리스트 열기/닫기">QUICK LINK</a></strong>
    	<div class="midd">
    		<ul>
				<li><a href="${pageContext.request.contextPath}/kor/researchTask/list.do"><span>연구과제제안</span></a></li>
				<li><a href="${pageContext.request.contextPath}/kor/bbs/BBSMSTR_000000000021/list.do"><span>고객의견접수</span></a></li>
				<li><a href="${pageContext.request.contextPath}/kor/magazine/list.do"><span>맞춤형 외국법제정보</span></a></li>
				<li><a href="${pageContext.request.contextPath}/kor/sub04_02_01_01.do"><span>법제연구</span></a></li>
				<li><a href="${pageContext.request.contextPath}/kor/sub04_02_02_01.do"><span>입법평가연구</span></a></li>
				<li><a href="${pageContext.request.contextPath}/kor/sub04_02_03_01.do"><span>KJLL</span></a></li>
    		</ul>
    	</div>
    </div>
    <!-- quick ::e:: -->
 