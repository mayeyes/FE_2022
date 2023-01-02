<%@page import="egovframework.com.cmm.LoginVO"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="java.util.*"%>
<%@ page import="egovframework.mayeyeutil.*"%>

<%
	String siteCode = (String)request.getAttribute("siteCode");
	XmlUtil util = new XmlUtil();

	List<XmlBean> beanList = util.makeSiteMenuXmlList(siteCode+"_cms","cms");
	StringBuffer buf =  new StringBuffer();	
	
	
%>

<script type="text/javascript">
	/**
	 * 법령용어 검색 팝업
	 */
	function showPopLawDic(){
		var form = document.createElement("form");
		var search_keyword = document.createElement("input");
		var search_type = document.createElement("input");
		var search_keyword_label = document.createElement("label");
		var search_type_label = document.createElement("label");
	
		form.target = "dic";
		form.method = "POST";
		form.action = "/kor/business/bizLawDicKeyword.do";
	
		search_keyword.type = "text";
		search_keyword.name = "search_keyword";
		search_keyword.value = "ㄱ";
		search_keyword.style.display = "none";
		search_type.type = "text";
		search_type.name = "search_type";
		search_type.value = "consonant";
		search_type.style.display = "none";
		search_keyword_label.for = "search_keyword";
		search_type_label.for = "search_type";
	
		form.appendChild(search_keyword);
		form.appendChild(search_type);
		form.appendChild(search_keyword_label);
		form.appendChild(search_type_label);
		document.body.appendChild(form);
	
		window.open("", "dic", "height=625,width=840,status=no,menubar=no,scrollbars=no");
		form.submit();
	}
</script>
	
		<div class="layout">
			<!-- skip :: s :: -->
			<div id="skip">
				<strong class="hidden">반복영역 건너뛰기</strong>
				<ul>
					<li><a href="#txt">본문 바로가기</a></li>
					<li><a href="#gnb">상단메뉴 바로가기</a></li>
				</ul>
			</div>
			<!-- skip :: e :: -->

			<h1><a href="/">한국법제연구원 KLRI</a></h1>			

			<strong class="hidden">부가기능 및 사이트</strong>
			
			<div id="global">
				<div class="btn_link">
					<ul>
					<% if(session.getAttribute("loginVO") == null){ %>
						<li><a href="${pageContext.request.contextPath}/kor/member/loginform.do"><span>로그인</span></a></li>
						<li><a href="${pageContext.request.contextPath}/kor/member/info/page.do"><span>회원가입</span></a></li>
					<%}else{ %>
						<%
							LoginVO loginVO = new LoginVO();
							loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
							if(loginVO.getIdentityAt().equals("U")){
						%>
						<li><a href="${pageContext.request.contextPath}/kor/member/logout.do"><span>로그아웃</span></a></li>
						<li><a href="${pageContext.request.contextPath}/kor/member/mod.do"><span>마이페이지</span></a></li>
						<%}else{ %>
						<li><a href="${pageContext.request.contextPath}/kor/member/loginform.do"><span>로그인</span></a></li>
						<li><a href="${pageContext.request.contextPath}/kor/member/info/page.do"><span>회원가입</span></a></li>
						<%} %>
					<%} %>	
                        <li><a href="http://elaw.klri.re.kr/kor_service/main.do" target="_blank" title="새창"><span>영문법령</span></a></li>
						<li><a href="#" onclick="showPopLawDic();return false;" title="새창 팝업"><span>법령용어검색</span></a></li>
						<li><a href="${pageContext.request.contextPath}/eng.do" target="_blank" title="새창"><span>ENG</span></a></li>
						<li class="icon_01"><a href="https://www.facebook.com/KLRIPR/" target="_blank" title="새창"><span>페이스북</span></a></li>
						<li class="icon_02"><a href="https://mobile.twitter.com/klritwit" target="_blank" title="새창"><span>트위터</span></a></li>
						<li class="icon_03"><a href="https://blog.naver.com/klri" target="_blank" title="새창"><span>블로그</span></a></li>
						<li class="icon_04"><a href="https://www.youtube.com/channel/UCTklDPxaVVZ__zwKy4tno8g" target="_blank" title="새창"><span>유튜브</span></a></li>
					</ul>
				</div>
				<a href="#" class="btn_search">검색</a>
				<div class="search_form">
					<form action="/search/front/Search.jsp" name="search_form" method="post" target="_blank">
						<input type="hidden" name="menu" value="통합검색" />
						<fieldset>
							<legend>통합검색</legend>
							<input type="text" name="qt" class="js_input_val" title="검색어를 입력해주세요." />
							<input type="submit" value="검색" />
							<a href="#" class="btn_close">닫기</a>
						</fieldset>
					</form>
				</div>
				<a href="${pageContext.request.contextPath}/kor/sub07_01.do" class="btn_menu_all">전체메뉴</a>
				<a href="#" class="btn_menu_all_close">전체메뉴닫기</a>
			</div>
			
			<div class="header_bg"></div>

			<!-- top menu :: s :: -->
			<strong class="hidden">상단메뉴</strong>
			<div class="js_menu" id="gnb">
				<ul>
					<%-- xml header 생성 --%>
				<% 
					try {
						for(int k=0; k<beanList.size(); k++)
						{
							XmlBean bean = beanList.get(k);
							XmlBean subbean =null;
							if(bean.getMno().substring(0,3).equals("sub") && bean.getDepth().equals("1")) {
								
								if(bean.getSubNo() != null && bean.getPageType().equals("html"))
								{
									subbean = beanList.get(k+1);
									
									if(subbean.getSubNo() != null )
									{
										subbean = beanList.get(k+2);
										if(subbean.getSubNo() == null )
										{
											if(subbean.getPageType().equals("html"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
											}
											else if(subbean.getPageType().equals("board"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
											}
											else if(subbean.getPageType().equals("linkUrl"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' ><span>"+bean.getTitle()+"</span></a>");
											}
											else if(subbean.getPageType().equals("program")){
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
											}
										}
										else{
											subbean = beanList.get(k+3);
											if(subbean.getPageType().equals("html"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
											}
											else if(subbean.getPageType().equals("board"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
											}
											else if(subbean.getPageType().equals("linkUrl"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' ><span>"+bean.getTitle()+"</span></a>");
											}
											else if(subbean.getPageType().equals("program")){
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
											}
										}
									}
									else
									{
										if(subbean.getPageType().equals("html"))
										{
											out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
										}
										else if(subbean.getPageType().equals("board"))
										{
											out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
										}
										else if(subbean.getPageType().equals("linkUrl"))
										{
											out.println("<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
										}
										else if(subbean.getPageType().equals("program")){
											out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
										}
									}
								}
								else
								{
									if(subbean.getPageType().equals("html"))
									{
										out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+bean.getMno()+".do' target='"+bean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
									}
									else if(bean.getPageType().equals("boad"))
									{
										out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+bean.getBbsId()+"/list.do' target='"+bean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
									}
									else if(bean.getPageType().equals("linkUrl"))
									 {
										out.println("<li class=\""+bean.getMno()+"\"><a href='"+bean.getLinkUrl()+"' target='"+bean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
									 }
									else if(bean.getPageType().equals("program")){
										out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+bean.getUserUrl()+"' target='"+bean.getLinkTarget()+"'><span>"+bean.getTitle()+"</span></a>");
									}
								}
								String titleSave = bean.getTitle();
								k++;
								bean = beanList.get(k);
								if(bean!= null && bean.getDepth().equals("2")) {
									out.println("<strong>"+titleSave+"</strong>");
									out.println("<span>미래혁신과 국민행복을 추구하는 글로벌 입법 연구 플랫폼</span>");
									out.println("<ul>");
									for(int m=k; m< beanList.size(); m++)
									{
										bean = beanList.get(m);
										k = m;
										if(bean.getDepth().equals("1")) {
											k--;
											break;
										}
										if(bean.getSubNo() != null && bean.getPageType().equals("html"))
										{
											subbean = beanList.get(m+1);
											if(subbean.getSubNo() != null && subbean.getPageType().equals("html"))
											{
												subbean = beanList.get(m+2);
												if(subbean.getPageType().equals("html"))
												{
													out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
												}
												else if(subbean.getPageType().equals("board"))
												{
													out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
												}
												else if(subbean.getPageType().equals("program")){
													out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
												}
												else if(subbean.getPageType().equals("linkUrl"))
												{
													out.println("<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
												}
											}
											else
											{
												if(subbean.getPageType().equals("html"))
												{
													out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
												}
												else if(subbean.getPageType().equals("board"))
												{
													out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
												}
												else if(subbean.getPageType().equals("linkUrl"))
												{
													out.println("<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
												}
												else if(subbean.getPageType().equals("program"))
												{
													out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
												}
											}
										}
										else
										{
											if(bean.getPageType().equals("html"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+bean.getMno()+".do' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
											}
											else if(bean.getPageType().equals("board"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+bean.getBbsId()+"/list.do' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
											}
											else if(bean.getPageType().equals("linkUrl"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+bean.getLinkUrl()+"' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
											}
											else if(bean.getPageType().equals("program"))
											{
												out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+bean.getUserUrl()+"' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
											}
										}
										
										if(m >= beanList.size()) {
											out.println("</ul>");
											break;
										}
										
										bean = beanList.get(m+1);
										
										if(bean.getDepth().equals("3"))
										{
											out.println("<ul>");
											for(int n=m+1; n< beanList.size(); n++)
											{
												bean = beanList.get(n);
	
												if(bean.getDepth().equals("1") || bean.getDepth().equals("2"))
												{
													m=n-1;
													break;
												}
												if(bean.getSubNo() != null && bean.getPageType().equals("html"))
												{
													subbean = beanList.get(n+1);
													if(subbean.getPageType().equals("html"))
													{
												 		out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+subbean.getMno()+".do' target='"+subbean.getLinkTarget()+"' >"+bean.getTitle()+"<em class=\"win\"></em></a>");
													}
													else if(subbean.getPageType().equals("board"))
													{
														out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+subbean.getBbsId()+"/list.do' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
													}
													else if(subbean.getPageType().equals("linkUrl"))
													{
												 		out.println("<li class=\""+bean.getMno()+"\"><a href='"+subbean.getLinkUrl()+"' target='"+subbean.getLinkTarget()+"' >"+bean.getTitle()+"<em class=\"win\"></em></a>");
													}
													else if(subbean.getPageType().equals("program"))
													{
														out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+subbean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a>");
													}
												}
												else 
												{
													if(bean.getPageType().equals("html"))
													{
														out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+bean.getMno()+".do' target='"+bean.getLinkTarget()+"' >"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
													}
													else if(bean.getPageType().equals("board"))
													{
														out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+bean.getBbsId()+"/list.do' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
													}
													else if(bean.getPageType().equals("linkUrl"))
													{
														out.println("<li class=\""+bean.getMno()+"\"><a href='"+bean.getLinkUrl()+"' target='"+bean.getLinkTarget()+"' >"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
													}
													else if(bean.getPageType().equals("program"))
													{
														out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+bean.getUserUrl()+"' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
													}
												}
											 	bean = beanList.get(n+1);
											 	
											 	if(bean.getDepth().equals("4"))
											 	{
											 		out.println("<ul>");
											 		for(int r=n+1; r< beanList.size(); r++)
											 		{
											 			bean = beanList.get(r);
											 			if(bean.getDepth().equals("1") || bean.getDepth().equals("2") || bean.getDepth().equals("3"))
														{
															out.println("</ul>");
															out.println("</li>");
															n=r-1;
															break;
														}
											 			if(bean.getPageType().equals("html"))
														{
															out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/"+bean.getMno()+".do' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
														}
														else if(bean.getPageType().equals("board"))
														{
															out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+"/"+siteCode+"/bbs/"+bean.getBbsId()+"/list.do' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
														}
														else if(bean.getPageType().equals("linkUrl"))
														{
															out.println("<li class=\""+bean.getMno()+"\"><a href='"+bean.getLinkUrl()+"' target='"+bean.getLinkTarget()+"' >"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
														}
														else if(bean.getPageType().equals("program")){
															out.println("<li class=\""+bean.getMno()+"\"><a href='"+request.getContextPath()+subbean.getUserUrl()+"' target='"+bean.getLinkTarget()+"'>"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
														}
														else{
															out.println("<li class=\""+bean.getMno()+"\"><a href='#' target='_self' >"+bean.getTitle()+"<em class=\"win\"></em></a></li>");
														}
											 		}
											 		
											 	}
											 	
											}
											out.println("</ul>");
										}
										out.println("</li>");
									}
									out.println("</ul>");
								}
								if(bean.getDepth().equals("1")) {
									k--;
								}
								out.println("</li>");
							}   
						}
					} catch(Exception e) {
						
					}
					%>   
			<%-- 예외처리 :: 테그 누락 예외로 인한 처리 필요 --%>		
							</li>
						</ul>
					</li>
				</ul>	
			</div>
			<!-- top menu :: e :: -->  
			<script type="text/javascript">
				$(".js_menu#gnb>ul>li").last().hide();
			</script>
			
		</div>
