	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
	<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
	<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
	<%@ taglib uri="/WEB-INF/tlds/mayeye.tld" prefix="util"%>
	
	<script type="text/javascript">
	function page(){
		var classid = $('#box_4').attr('class');
		var board_1 = $('#board_1').val();
		var board_2 = $('#board_2').val();
		if(classid == 'step_1'){
			location.href = board_1;
		}else{
			location.href = board_2;
		}
	}
	</script>
	
	<script type="text/javascript">
	// 쿠키 팝업

	function setCookie( name, value, expirehours ) { 
		var todayDate = new Date(); 
		todayDate.setHours( todayDate.getHours() + expirehours ); 
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
	}
	cookiedata = document.cookie;
	if (cookiedata.indexOf("ncookie=done") < 0  ) { 
		//팝업1
		//window.open("/popup/popup_200422.jsp", "mpop", "left=20, width=460, height=303, menubar=no, status=no, toolbar=no, scrollbars=yes");
	}
	
	</script>
	
	
		<div id="txt">
		<!-- visual ::s:: -->
		<div id="visual">
			<!-- 비주얼 롤링 :s -->
			<div class="slide">
				<div class="move">
					<ul>
						<li>
							<div class="bg">
								<div class="pc" style="background-image:url(../images/kor/layout/visual_1.jpg);"></div>
								<div class="mobile" style="background-image:url(../images/kor/layout/visual_1_mobile.jpg);"></div>
							</div>
							<div class="layout">
								<strong><a href="#">2022 Vol. 77<br />초고령사회</a></strong>
							</div>
						</li>
						<li>
							<div class="bg">
								<div class="pc" style="background-image:url(../images/kor/layout/visual_2_pc.jpg);"></div>
								<div class="mobile" style="background-image:url(../images/kor/layout/visual_2_mobile.jpg);"></div>
							</div>
							<div class="layout">
								<strong><a href="#">제18회 아이사법령정보네트워크<br />국제학술대회개최</a></strong>
							</div>
						</li>
						<li>
							<div class="bg">
								<div class="pc" style="background-image:url(../images/kor/layout/visual_3_pc.jpg);"></div>
								<div class="mobile" style="background-image:url(../images/kor/layout/visual_3_mobile.jpg);"></div>
							</div>
							<div class="layout">
								<strong><a href="#">'남북교류협력법 적용의 실제와<br />입법개선 방향' 학술대회 개최</a></strong>
							</div>
						</li>
						<li>
							<div class="bg">
								<div class="pc" style="background-image:url(../images/kor/layout/visual_4_pc.jpg);"></div>
								<div class="mobile" style="background-image:url(../images/kor/layout/visual_4_mobile.jpg);"></div>
							</div>
							<div class="layout">
								<strong><a href="#">미래혁신과 국민행복을 추구하는<br />글로벌 입법 연구 플랫폼</a></strong>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- 비주얼 롤링 :e -->
			<div id="pops">
				<strong class="head"><a href="#" title="POPUP 리스트 열기/닫기">POPUP</a></strong>
				<div class="midd">
					<div class="move">
						<ul>
							<c:forEach var="result" items="${popupList}" varStatus="status">
								<c:if test="${result.gubun eq 'center'}">
								<li>
									<a href="${result.url }" target="${result.urlType }" <c:if test="${result.urlType eq '_blank'}">title="새창이동"</c:if>>
										<span class="photos">
											<span><img src="/cmm/fms/getImage.do?atchFileId=${result.atchFileId }" alt="${result.acctag }" /></span>
										</span>
									</a>
								</li>
								</c:if>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>
			<!-- quick ::s:: -->
			<div class="quicks">
				<strong class="head"><a href="#" title="홈페이지 간편메뉴 리스트 열기/닫기">QUICK LINK</a></strong>
				<div class="midd">
					<ul>
						<li><a href="${pageContext.request.contextPath}/${siteCode}/researchTask/list.do"><span>연구과제제안</span></a></li>
						<li><a href="${pageContext.request.contextPath}/${siteCode}/bbs/BBSMSTR_000000000021/list.do"><span>고객의견접수</span></a></li>
						<li><a href="${pageContext.request.contextPath}/${siteCode}/magazine/list.do"><span>맞춤형 외국법제정보</span></a></li>
						<li><a href="${pageContext.request.contextPath}/${siteCode}/sub04_02_01_01.do"><span>법제연구</span></a></li>
						<li><a href="${pageContext.request.contextPath}/${siteCode}/sub04_02_02_01.do"><span>입법평가연구</span></a></li>
						<li><a href="${pageContext.request.contextPath}/${siteCode}/sub04_02_03_01.do"><span>KJLL</span></a></li>
					</ul>
				</div>
			</div>
			<!-- quick ::e:: -->
			
		</div>
		<!-- visual ::e:: -->
	
		<!-- line 01 ::s:: -->
		<div id="box_line_01">
			<div class="layout">
				<!-- box_1 ::s:: -->
				<div id="box_1">
					<strong class="titles">발간물</strong>
					<ul>
						<li><strong><a href="#">이슈발간물</a></strong>
							<div class="views">
								<ul>
									<jsp:include page="/WEB-INF/jsp/egovframework/mayeye/site/siteCode/kor/layout/data_skin_kor.jsp">
										<jsp:param name="code" value="mainPublication" />
										<jsp:param name="dir" value="main" />  
										<jsp:param name="siteCode" value="kor" />
										<jsp:param name="listCnt" value="5" />
										<jsp:param name="titleLength" value="36" />							
									</jsp:include>
								</ul>
							</div>
							<a href="${pageContext.request.contextPath}/kor/issueData/P/list.do" class="more">더보기</a>
						</li>
						<li><strong><a href="#">연구보고서</a></strong>
							<div class="views type_02">
								<ul>
									<jsp:include page="/WEB-INF/jsp/egovframework/mayeye/site/siteCode/kor/layout/data_skin_kor.jsp">
										<jsp:param name="code" value="publication" />
										<jsp:param name="dir" value="main" />  
										<jsp:param name="siteCode" value="kor" />
										<jsp:param name="listCnt" value="6" />
										<jsp:param name="titleLength" value="36" />							
									</jsp:include>
								</ul>
							</div>
							<a href="${pageContext.request.contextPath}/kor/publication/list.do" class="more">더보기</a>
						</li>
						<li><strong><a href="#">학술지</a></strong>
							<div class="views">
								<ul>
									<jsp:include page="/WEB-INF/jsp/egovframework/mayeye/site/siteCode/kor/layout/data_skin_kor.jsp">
										<jsp:param name="code" value="journal" />
										<jsp:param name="dir" value="main" />  
										<jsp:param name="siteCode" value="kor" />
										<jsp:param name="listCnt" value="5" />
										<jsp:param name="titleLength" value="36" />							
									</jsp:include>
								</ul>
							</div>
							<a href="${pageContext.request.contextPath}/kor/journal/L/list.do" class="more">더보기</a>
						</li>
						<li><strong><a href="#">연속간행물</a></strong>
							<div class="views">
								<ul>
									<jsp:include page="/WEB-INF/jsp/egovframework/mayeye/site/siteCode/kor/layout/data_skin_kor.jsp">
										<jsp:param name="code" value="continuity" />
										<jsp:param name="dir" value="main" />  
										<jsp:param name="siteCode" value="kor" />
										<jsp:param name="listCnt" value="5" />
										<jsp:param name="titleLength" value="36" />							
									</jsp:include>
								</ul>
							</div>
							<a href="${pageContext.request.contextPath}/kor/journal/Z/list.do" class="more">더보기</a>
						</li>
						<li><strong><a href="#">자료집</a></strong>
							<div class="views type_02">
								<ul>
									<jsp:include page="/WEB-INF/jsp/egovframework/mayeye/site/siteCode/kor/layout/data_skin_kor.jsp">
										<jsp:param name="code" value="data" />
										<jsp:param name="dir" value="main" />  
										<jsp:param name="siteCode" value="kor" />
										<jsp:param name="listCnt" value="6" />
										<jsp:param name="titleLength" value="36" />							
									</jsp:include>
								</ul>
							</div>
							<a href="/kor/data/S/list.do" class="more">더보기</a>
						</li>
					</ul>
					
				</div>
				<!-- box_1 ::e:: -->
	
				<!-- box_2 ::s:: -->
				<div id="box_2">
					<strong class="titles">카드뉴스</strong>
					<div class="views">
						<jsp:include page="/WEB-INF/jsp/egovframework/mayeye/site/siteCode/kor/layout/card_skin_kor.jsp">
							<jsp:param name="code" value="card" />
							<jsp:param name="dir" value="main" /> 
							<jsp:param name="siteCode" value="kor" />
						</jsp:include>
					</div>
					<a href="${pageContext.request.contextPath}/${siteCode}/cardnews/list.do" class="more">더보기</a>
				</div>
				<!-- box_2 ::e:: -->
			</div>
		</div>
		<!-- line 01 ::e:: -->
	
		<!-- line 02 ::s:: -->
		<div id="box_line_02">
			<div class="layout">
				<!-- box_3 ::s:: -->
				<div id="box_3">
					<div class="lay">
						<strong class="titles">KLRI NEWS</strong>
						<a href="${pageContext.request.contextPath}/${siteCode }/news/K/${newsVO.news_cntno}/view.do">
							<span class="photos">
								<span><img src="/cmm/fms/getImage.do?atchFileId=${newsVO.news_img }" alt="${newsVO.news_title }" /></span>
							</span>
							<strong>${newsVO.news_title }</strong>
						</a>
						<a href="${pageContext.request.contextPath}/${siteCode }/news/K/list.do" class="more">더보기</a>
					</div>
				</div>
				<!-- box_3 ::e:: -->
	
				<!-- box_4 ::s:: -->
				<div id="box_4">
					<div class="lay">
						<ul>
							<li><strong class="titles"><a href="#">공지사항</a></strong>
								<div class="views">
									<ul>
										<c:forEach var="result" items="${mainList[0].list }" varStatus="status">
											<li>
												<a href="/${siteCode }/${result.bbsId }/${result.nttId }/view.do">
													<strong class="tis">${result.nttSj }</strong> 
													<c:if test="${util:compareToday(result.frstRegisterPnttm)>0}">
														<span class="iconew">NEW</span>
													</c:if>
													<span class="days">${result.frstRegisterPnttm }</span>
												</a>
											</li>
										</c:forEach>
									</ul>
									<input type="hidden" id="board_1" value="/${siteCode }/bbs/BBSMSTR_000000000001/list.do" />
								</div>
								<a href="/${siteCode }/bbs/BBSMSTR_000000000001/list.do" class="more">더보기</a>
							</li>
							<li><strong class="titles"><a href="#">입찰정보</a></strong>
								<div class="views">
									<ul>
										<c:forEach var="result" items="${mainList[1].list }" varStatus="status">
											<li>
												<a href="/${siteCode }/${result.bbsId }/${result.nttId }/view.do">
													<strong class="tis">${result.nttSj }</strong>
													<c:if test="${util:compareToday(result.frstRegisterPnttm)>0}">
														<span class="iconew">NEW</span>
													</c:if>
													<span class="days">${result.frstRegisterPnttm }</span>
												</a>
											</li>
										</c:forEach>
									</ul>
									<input type="hidden" id="board_2" value="/${siteCode }/bbs/BBSMSTR_000000000002/list.do" />
								</div>
								<a href="/${siteCode }/bbs/BBSMSTR_000000000002/list.do" class="more">더보기</a>
							</li>
						</ul>
						
					</div>
				</div>
				<!-- box_4 ::e:: -->
	
				<!-- box_5 ::s:: -->
				<div id="box_5">
					<div class="lay">
						<ul>
							<li><strong class="titles"><a href="#">행사안내</a></strong>
								<div class="views">
									<ul>
										<c:forEach var="result" items="${newsEventList }" varStatus="status">
										<li>
											<a href="${pageContext.request.contextPath}/${siteCode }/newsEvent/${result.n_no}/view.do">
												
												<em>${fn:substring(fn:replace(result.event_to,"-", "/"),5,10) }</em>
												<strong class="tis">${result.title }</strong>
											</a>
										</li>
										</c:forEach>
									</ul>
								</div>
								<a href="${pageContext.request.contextPath}/${siteCode }/newsEvent/list.do" class="more">더보기</a>
							</li>
							<li><strong class="titles"><a href="#">보도자료</a></strong>
								<div class="views">
									<ul>
										<c:forEach var="result" items="${mainList[1].list }" varStatus="status">
										<li>
											<a href="/${siteCode }/${result.bbsId }/${result.nttId }/view.do">
												
												<em>${fn:substring(fn:replace(result.frstRegisterPnttm,"-", "/"),5,10) }</em>
												<strong class="tis">${result.nttSj }</strong>
											</a>
										</li>
										</c:forEach>
									</ul>
								</div>
								<a href="/${siteCode }/bbs/BBSMSTR_000000000002/list.do" class="more">더보기</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- box_5 ::e:: -->
			</div>
		</div>
		<!-- line 02 ::e:: -->
	
		<!-- line 03 ::s:: -->
		<div id="box_line_03">
			<div class="layout">
	
				<!-- box_6 ::s:: -->
				<div id="box_6">
					<ul>
						<li class="item_01">
							<div class="lay">
								<img src="${pageContext.request.contextPath}/images/kor/layout/box_6_grid.png" alt="" class="grid" />
								<div class="views">
									<a href="/${siteCode }/newsLetter/list.do"><span>뉴스레터</span></a>
								</div>
							</div>
						</li>
						<li class="item_02">
							<div class="lay">
								<img src="${pageContext.request.contextPath}/images/kor/layout/box_6_grid.png" alt="" class="grid" />
								<div class="views">
									<a href="/${siteCode }/bbs/BBSMSTR_000000000021/list.do"><span>고객의견접수</span></a>
								</div>
							</div>
						</li>
						<li class="item_03">
							<div class="lay">
								<img src="${pageContext.request.contextPath}/images/kor/layout/box_6_grid.png" alt="" class="grid" />
								<div class="views">
									<a href="${pageContext.request.contextPath}/kor/sub06_06.do"><span>주요연락처</span></a>
								</div>
							</div>
						</li>
						<li>
							<div class="lay">
								<img src="${pageContext.request.contextPath}/images/kor/layout/box_6_grid.png" alt="" class="grid" />
								<div class="views">
									<div id="popupzone">
										<div class="move">
											<ul>
												<c:forEach var="result" items="${popupList}" varStatus="status">
												<c:if test="${result.gubun eq 'middle'}">
													<li><a href="${result.url }" target="${result.urlType }" <c:if test="${result.urlType eq '_blank'}">title="새창이동"</c:if>><img src="/cmm/fms/getImage.do?atchFileId=${result.atchFileId }" alt="${result.acctag }" ></a></li>
												</c:if>
												</c:forEach>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- box_6 ::e:: -->
	
				<!-- box_7 ::s:: -->
				<div id="box_7">
					<ul>
						<li>
							<div class="lay">
								<a href="/kor/researchTask/list.do"><span>과제제안</span></a>
							</div>
						</li>
						<li>
							<div class="lay">
								<a href="/kor/researchboard/L/list.do"><span>원고모집</span></a>
							</div>
						</li>
						<li>
							<div class="lay">
								<a href="/kor/magazine/list.do"><span>맞춤형 외국법제정보신청</span></a>
							</div>
						</li>
						<li>
							<div class="lay">
								<a href="/kor/recruit/list.do"><span>채용정보</span></a>
							</div>
						</li>
					</ul>
				</div>
				<!-- box_7 ::e:: -->
	
				<!-- box_8 ::s:: -->
				<div id="box_8">
					<strong class="tis">법제정보<span>서비스</span></strong>
					<div class="tes">
						<ul>
							<li><a href="http://elaw.klri.re.kr/kor_service/main.do" target="_blank" title="새창">영문법령 검색</a></li>
							<li><a href="http://lib.klri.re.kr/" target="_blank" title="새창">전자도서관</a></li>
							<li><a href="https://www.e-alin.org" target="_blank" title="새창">ALIN</a></li>
							<li><a href="/slc.do" target="_blank" title="새창">법의식통계</a></li> 
							<li><a href="https://www.klri.re.kr:9443/" target="_blank" title="새창">KLRI Repository</a></li>
							<li><a href="javascript:showPopLawDic();">법령용어검색</a></li>
							<li><a href="http://klri.re.kr/jsp/popup/janlaw.jsp" onclick="window.open(this.href,'','width=500,height=340');return false;" title="새창 팝업">일본법령번역 서비스</a></li>
						</ul>
					</div>
				</div>
				<!-- box_8 ::e:: -->
	
			</div>
		</div>
		<!-- line 03 ::e:: -->
	
		<!-- line 04 ::s:: -->
		<div id="box_line_04">
			<div class="layout">
				<!-- box_9 ::s:: -->
				<div id="box_9">
					<ul>
						<li>
							<span class="js_count">${mainCnt }</span>
							<strong>발간물</strong>
						</li>
						<li>
							<span class="js_count">${jornalCnt }</span>
							<strong>외국법제정보</strong>
						</li>
						<li>
							<span class="js_count">${planCnt }</span>
							<strong>연구사업</strong>
						</li>
						<li>
							<span class="js_count">${taskCnt }</span>
							<strong>과제제안</strong>
						</li>
					</ul>
				</div>
				<!-- box_9 ::s:: -->
			</div>
		</div>
		<!-- line 04 ::e:: -->
	
	<script type="text/javascript">
		function more_link(){
			if($('#box_1').attr('class')=='step_1'){
				location.href="${pageContext.request.contextPath}/kor/publication/list.do";
			}
			if($('#box_1').attr('class')=='step_2'){
				location.href="${pageContext.request.contextPath}/kor/publication/list.do";			
			}
			if($('#box_1').attr('class')=='step_3'){
				location.href="${pageContext.request.contextPath}/kor/journal/L/list.do";
			}
			if($('#box_1').attr('class')=='step_4'){
				location.href="${pageContext.request.contextPath}/kor/journal/Z/list.do";
			}
			if($('#box_1').attr('class')=='step_5'){
				location.href="${pageContext.request.contextPath}/kor/data/S/list.do";
			}
		}
	</script>
	</div>