<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="java.util.*"%>
<%@ page import="net.acego.common.util.*"%>
<%@ page import="egovframework.com.cmm.LoginVO" %>

<%
	//로그인 정보 
	LoginVO loginVO = (LoginVO)session.getAttribute("loginVO");
	if(loginVO != null) request.setAttribute("loginVO",loginVO);
	
	String siteCode = (String)request.getAttribute("siteCode");
	if(siteCode == null || siteCode.equals("")) siteCode = request.getParameter("siteCode");
	
	String mno = (String)request.getAttribute("mno");
	if(mno == null || mno.equals("")) mno = request.getParameter("mno");
	
	String code = "";
	 
	XmlUtil util = new XmlUtil();
	code = util.getSearchCode(mno);
	 
	int codeLen =code.length();
	if(codeLen <4) codeLen = 2;
	 
	List<XmlBean> beanList = util.makeSiteMenuXmlList(siteCode+"_cms","cms");
	StringBuffer buf =  new StringBuffer();
	XmlBean bean = null;
	
	String code1 = code.substring(0,2);		// 1단계 코드
	String title1 = "";						// 1단계 제목
	int idx1 = 0;							// 1단계 index
	String code2 = code;					// 2단계 코드
	String code3 = code;					// 3단계 코드
	boolean chkDepth3 =  false;				// 3단계인지 첵크한다.
	
	if(codeLen >= 4) code2 = code.substring(0, 4);
	//else code2 = code1+"01";
		
	if(codeLen >= 6) code3 = code.substring(0, 6);
	//else code3 = code2+"01";
	 
	// 1단계 코드 제목을 가져온다.
	for(int k=0; k< beanList.size(); k++) {
		bean = beanList.get(k);
	
		int na = bean.getMcode().length() % 2;
		if(na == 1) bean.setMcode("0"+bean.getMcode());
	
		if(bean.getMcode().equals(code1) || bean.getMcode().equals(code1+"00")) {
			title1 = bean.getTitle();
			idx1 = k;
			break;
		}
	}   
	
	int depth3 = 0;
	int mno_depth3 = 0;

%>
<!-- lnb :S -->
<div class="depth2_tab">
    <h2 class="cont_title">
            <p><%out.println(bean.getTitle());%></p>
            
            <script>
                
            </script>
        </h2>
	<ul class="lm_2th">
<%
	// 2단계 code 출력  
	idx1++;

	for(int k=idx1; k< beanList.size(); k++) {
		bean = beanList.get(k);

		int na = bean.getMcode().length() % 2;
		if(na == 1) bean.setMcode("0"+bean.getMcode());

		// 1 단계가 나오면 나간다.
		if(bean.getDepth().equals("1")) break;
		else if(bean.getDepth().equals("3") || bean.getDepth().equals("4") || bean.getDepth().equals("5")) continue;
		else if(bean.getDepth().equals("2") ) {
			//2단계만 출력
			if(loginVO != null && bean.getMno().equals("sitemap_01"))  continue;
			if(loginVO != null && bean.getMno().equals("sitemap_03"))  continue;
			if(loginVO != null && bean.getMno().equals("sitemap_04"))  continue;
			if(loginVO == null && bean.getMno().equals("sitemap_10"))  continue;
			if(code2.equals(bean.getMcode())) {
				// 2단계 출력
				String link_target=bean.getLinkTarget();
				if(bean.getDepth().equals("3") || bean.getDepth().equals("4") || bean.getDepth().equals("5")) continue;
				if(link_target.equals("popup") || bean.getLinkTarget().equals("_blank")) {
					out.println("<li><a href=\""+request.getContextPath()+ bean.getLinkUrl()+"\" target='"+ bean.getLinkTarget()+"' title='"+bean.getTitle()+" 페이지가 새창으로 열립니다.' class='ov' >"+ bean.getTitle()+"</a>");
				} else {
					//out.println(link_url);
					out.println("<li><a href=\""+request.getContextPath()+ bean.getLinkUrl()+"\" target='"+ bean.getLinkTarget()+"' class='ov' >"+ bean.getTitle()+"</a>");
				}					
				out.println("</li>");
			} else {
				//2010.09.30  수정 wclee
				String link_target=bean.getLinkTarget();

				if(bean.getDepth().equals("3") || bean.getDepth().equals("4") || bean.getDepth().equals("5")) continue;
				
				if(link_target.equals("popup")) {
					out.println("<li><a href='#total' target='"+ bean.getLinkTarget()+"' title='"+bean.getTitle()+" 페이지가 새창으로 열립니다.' onclick=\""+ bean.getLinkUrl()+";return false;\" class='link_2th'>"+ bean.getTitle()+"</a>");
				} else if(link_target.equals("_blank")) {
					out.println("<li><a href='"+ bean.getLinkUrl()+"' target='"+ bean.getLinkTarget()+"' title='"+bean.getTitle()+" 페이지가 새창으로 열립니다.' class='link_2th'>"+ bean.getTitle()+"</a>");
				} else {
					//out.println(link_url);
					out.println("<li><a href=\""+request.getContextPath()+ bean.getLinkUrl()+"\" target='"+ bean.getLinkTarget()+"' class='link_2th'>"+ bean.getTitle()+"</a>");
				}
				out.println("</li>");
			}
		}
		
	}
%>
	</ul>

	<div class="sotong">
		<a href="/mayor/sub03_06_01.do">
			<strong>시민소통</strong>
			<span>시민의 목소리에 <br> 귀를 기울이겠습니다.</span>
		</a>
	</div>

</div>
<!-- <script type="text/javascript">leftmenu();</script> -->
<!-- lnb :E -->	
