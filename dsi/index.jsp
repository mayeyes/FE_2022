<%--
/**
 * index.jsp
 * 
 * ==============================================
 * @author BJH
 * @history     작성일            작성자     변경내용
 * @history     2019-09-02         BJH      최초작성
 * ==============================================
 */
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="util" uri="http://mec.mayeye.net/util" %>


<strong class="hidden">본문</strong>
	<div id="container">
		<div class="layout">
			<div id="main_slide">
				<ul data-js="tab">
					<li class="on"><a href="${pageContext.request.contextPath}/kor/2/data/list/1/1/1" class="tbtn"><span>지도로 보는 대전&middot;세종</span></a></li>
					<li><a href="${pageContext.request.contextPath}/kor/20/data/list/2/1/1" class="tbtn"><span>통계로 보는 대전&middot;세종</span></a></li>
					<li><a href="${pageContext.request.contextPath}/kor/38/data/list/3/1/1" class="tbtn"><span>지표로 보는 대전&middot;세종</span></a></li>
				</ul>	

				<div data-tab="1">
					<div data-js="slide" class="swipes">
						<ul>
						<c:forEach items="${oneList}" var="result" begin="0" end="3">
				            <li data-set=${result }>
				            	<div>
				            		<strong>${result.dataTitle }</strong>
				            		<div class="photos">
				            			<img src="${pageContext.request.contextPath}/attach/image/<c:out value="${result.atchFileId}" default="0"/>/order/last?gubun=image" />
				            		</div>
				            		<div class="hash">
				            			<c:if test="${empty result.tag}">
											<c:out value="${result.tag}" />
										</c:if>
				            		</div>
				            	</div>
				            </li>
				        </c:forEach>
						</ul>
					</div>
					<a href="${pageContext.request.contextPath}/kor/2/data/list/1/1/1" class="more">더보기</a>
				</div>
				<div data-tab="2">
					<div data-js="slide" class="swipes">
						<ul>
				        <c:forEach items="${twoList}" var="result" begin="0" end="3">
				            <li data-set=${result }>
				            	<div>
				            		<strong>${result.dataTitle }</strong>
				            		<div class="photos">
				            			<img src="${pageContext.request.contextPath}/attach/image/<c:out value="${result.atchFileId}" default="0"/>/order/last?gubun=image" />
				            		</div>
				            		<div class="hash">
				            			<c:if test="${empty result.tag}">
											<c:out value="${result.tag}" />
										</c:if>
				            		</div>
				            	</div>
				            </li>
				        </c:forEach>
						</ul>
					</div>
					<a href="${pageContext.request.contextPath}/kor/20/data/list/2/1/1" class="more">더보기</a>
				</div>
				<div data-tab="3">
					<div data-js="slide" class="swipes">
						<ul>
					       <c:forEach items="${threeList}" var="result" begin="0" end="3">
					            <li data-set=${result }>
					            	<div>
					            		<strong>${result.dataTitle }</strong>
					            		<div class="photos">
					            			<img src="${pageContext.request.contextPath}/attach/image/<c:out value="${result.atchFileId}" default="0"/>/order/last?gubun=image" />
					            		</div>
				            		<div class="hash">
				            			<c:if test="${empty result.tag}">
											<c:out value="${result.tag}" />
										</c:if>
				            		</div>
					            	</div>
					            </li>
					        </c:forEach>
						</ul>
					</div>
					<a href="${pageContext.request.contextPath}/kor/38/data/list/3/1/1" class="more">더보기</a>
				</div>
			</div>

			
			<div id="databx">
				<h3><span>현재 등록된 데이터 <em class="blue" data-skin="count">${total}</em></span></h3>
				<ul>
					<li>
						<strong>지도로 보는 대전&middot;세종</strong>
						<em data-skin="count">${one}</em>
					</li>
					<li>
						<strong>통계로 보는 대전&middot;세종</strong>
						<em data-skin="count">${two}</em>
					</li>
					<li>
						<strong>지표로 보는 대전&middot;세종</strong>
						<em data-skin="count">${three}</em>
					</li>
					<li>
						<strong>연구보고서</strong>
						<em data-skin="count">${five}</em>
					</li>
					<li>
						<strong>설문자료</strong>
						<em data-skin="count">${four}</em>
					</li>
				</ul>
			</div>
		</div>
	</div>
<script type="text/babel" data-presets="es2015,stage-2">
    const siteCode = '<c:out value="${siteCode}"/>';
</script>
<script src="<c:url value="/js/site/kor/popup.js"/>" type="text/babel" data-presets="es2015,stage-2" charset="UTF-8"></script>