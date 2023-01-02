<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://egovframework.gov/ctl/ui" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/WEB-INF/tlds/gonet-util.tld" prefix="util"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<% pageContext.setAttribute("crlf", "\r\n"); %>

<script type="text/javascript">
	$(document).ready(function(){	
	
		// 일정의 이전을 클릭한 경우
		$("body").delegate(".prev2", "click", function(){
			scheduleDate = $("#prev").children("span.hidden").text();
			if(scheduleDate.length > 1){
				getScheduleJSON(scheduleDate);
			}
		});
		
		// 일정의 일자을 클릭한 경우
		$(".scheduleList").click(function(){
			scheduleDate = $(this).children("span.hidden").text();
			if(scheduleDate.length > 1){
				getScheduleJSON(scheduleDate);
			}
		});	
		
		// 일정의 다음을 클릭한 경우
		$("body").delegate(".next2", "click", function(){
			scheduleDate = $("#next").children(".hidden").text();
			if(scheduleDate.length > 1){
				getScheduleJSON(scheduleDate);
			}
		});
	});
	
	function getScheduleJSON(scheduleDate){
		$.get("${ctx}/prog/mayor/bbs_schedule/main_scheduleJSON.do",
			{scheduleDate : scheduleDate },
			function(data){
				if(data != null){
					data = $.parseJSON(data);
					
					$(".today").html(data.Today);
					
					//if(data.PrevBbsScheduleInfo.scheduleDate != null){
						$(".prev2").remove();
						$("#prev").html("<span class='hidden'>"+data.Preday +"</span><a href='#link'>"+data.Preday.substr(5,5)+"</a>");
						$("div.today_list").append("<a class='prev2' href='#link'><span>이전</span></a>");
					//} else {
					//	$("#prev").removeClass("scheduleList").html("");
					//	$(".prev2").remove();
					//}
					
					$("#today").html("<span class='hidden'>"+data.Today +"</span><a href='#link'>"+data.Today.substr(5,5)+"</a>");
					
					//if(data.NextBbsScheduleInfo.scheduleDate != null){
						$(".next2").remove();
						$("#next").html("<span class='hidden'>"+data.Nextday +"</span><a href='#link'>"+data.Nextday.substr(5,5)+"</a>");
						$("div.today_list").append("<a class='next2' href='#link'><span>다음</span></a>");
					//} else {
					//	$("#next").removeClass("scheduleList").html("");
					//	$(".next2").remove();
					//}
						
					var today_schedule = "";
					var list_cnt = 0;
					$.each(data.BbsScheduleListByToday, function(i,item){	
						//if(i < 2){
							today_schedule += "<li><a href='${ctx }/prog/bbs_schedule/mayor/sub02_01/schedule_list.do?scheduleDate="+item.scheduleDate+"'>["+item.scheduleTime+"] "+item.title+"</a></li>";
							list_cnt++;
						//}
					});
					if(list_cnt > 0) {
						$("ul.today_schedule").html(today_schedule);
					} else {
						$("ul.today_schedule").html("등록된 일정이 없습니다.");											
					}
					$("a.more").attr("href","/prog/bbs_schedule/mayor/sub02_01/schedule_list.do?scheduleDate="+data.Today);
				}
			}
		);		
	}
</script>	
				
	<div class="today_box">
		<div class="today_bg slide_effect slide_effect_de">
			<div class="box ">
				<h4>오늘의 일정<span class="today">${Today }</span></h4>
				<div class="today_list">
					<%-- <c:if test="${PrevBbsScheduleInfo.scheduleDate }"> --%>
						<a class="prev2" href="#link"><span>이전</span></a>
					<%-- </c:if> --%>
					<ul>
						<li id="prev" class="scheduleList">
							<span class="hidden">${Preday}</span>
							<a href="#link">${fn:substring(Preday, 5, 10)  }</a>
						</li>
						<li id="today" class="scheduleList">
							<span class="hidden">${Today }</span>
							<a href="#link">${fn:substring(Today, 5, 10)  }</a>
						</li>
						<li id="next" class="scheduleList">
							<span class="hidden">${Nextday}</span>
							<a href="#link">${fn:substring(Nextday, 5, 10)  }</a>
						</li>
					</ul>				
					<%-- <c:if test="${NextBbsScheduleInfo.scheduleDate }"> --%>
						<a class="next2" href="#link"><span>다음</span></a>
					<%-- </c:if> --%>
				</div>
				<c:choose>
					<c:when test="${fn:length(BbsScheduleListByToday) > 0 }">
						<ul class="today_schedule">
							<c:forEach var="scheduleList" items="${BbsScheduleListByToday }" varStatus="status">
								<c:if test="${status.index  < 2}">
									<li><a href="${ctx }/prog/bbs_schedule/mayor/sub02_01/schedule_list.do?scheduleDate=${scheduleList.scheduleDate }">[${scheduleList.scheduleTime }] ${scheduleList.title }</a></li>
								</c:if>
							</c:forEach>
						</ul>
					</c:when>
					<c:otherwise>
						<ul class="today_schedule">
							<li>등록된 일정이 없습니다.</li>
						</ul>
					</c:otherwise>
				</c:choose>
				<a class="more" href="${ctx }/prog/bbs_schedule/mayor/sub02_01/schedule_list.do?scheduleDate=${Today }">주요일정 달력보기</a>
			</div>
		</div>
	</div>