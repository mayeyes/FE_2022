<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://egovframework.gov/ctl/ui" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/WEB-INF/tlds/gonet-util.tld" prefix="util"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<script type="text/javascript">
$(document).ready(function(){
	setTimeout(function() {
		  $(window).keydown(function(event){
				if(event.keyCode == 9){
					$("#footer .layout .inners .line1 div:first-child a:first-child").focus(); 
					return false;
				}
			});
		}, 1000);
	
	 return false;
}); 

	$(document).ready(function(){
        // 이전년을 클릭한 경우
		$("#prev_year").click(function(){
			var year = Number($(".year").html().substring(0,4)) - 1;
			var month = Number($(".year").html().substring(5,7));
			
			if(month == 0){
				month = 12;
				year = year - 1;
			}
			
			if(month < 10){
				month = "0" + month;
			}
			
			var scheduleDate = year + "." + month + ".01";
			$("#scheduleDate").val(scheduleDate);
			$("#searchYear").val(year);
			$("#searchMonth").val(month);
			$("#searchCheck").val('Y');
			
			$("#scheduleForm").submit();
			
            return false;
 		});
		// 이전달을 클릭한 경우
		$("#pre_month").click(function(){
			var year = Number($(".year").html().substring(0,4));
			var month = Number($(".year").html().substring(5,7)) - 1;
			
			if(month == 0){
				month = 12;
				year = year - 1;
			}
			
			if(month < 10){
				month = "0" + month;
			}
			
			var scheduleDate = year + "." + month + ".01";
			$("#scheduleDate").val(scheduleDate);
			$("#searchYear").val(year);
			$("#searchMonth").val(month);
			$("#searchCheck").val('Y');
			
			$("#scheduleForm").submit();
			
            return false;
 		});
		
		//  다음달을 클릭한 경우
		$("#next_month").click(function(){
			var year = Number($(".year").html().substring(0,4));
			var month = Number($(".year").html().substring(5,7)) + 1;
			
			if(month == 13){
				month = 1;
				year = year + 1;
			}
			
			if(month < 10){
				month = "0" + month;
			}
			
			var scheduleDate = year + "." + month + ".01";
			$("#scheduleDate").val(scheduleDate);
			$("#searchYear").val(year);
			$("#searchMonth").val(month);
			$("#searchCheck").val('Y');
			
			$("#scheduleForm").submit();
            
            return false;
		});	
        //  다음년을 클릭한 경우
		$("#next_year").click(function(){
			var year = Number($(".year").html().substring(0,4)) + 1;
			var month = Number($(".year").html().substring(5,7));
			
			if(month == 13){
				month = 1;
				year = year + 1;
			}
			
			if(month < 10){
				month = "0" + month;
			}
			
			var scheduleDate = year + "." + month + ".01";
			$("#scheduleDate").val(scheduleDate);
			$("#searchYear").val(year);
			$("#searchMonth").val(month);
			$("#searchCheck").val('Y');
			
			$("#scheduleForm").submit();
            
            return false;
		});	
		
		// 캘린더에서 일자를 클릭하면 
		$("tr.trClass td a").click(function(){
			var date = Number($(this).find('span').text());
			if(date < 10){
				date = "0" + date;
			}
			
			$("#scheduleDate").val($(".year").text() + date);
			$("#scheduleForm").submit();
			
			$("#calendar_view #hDate h4").focus();
            
            return false;
			
		});
		
	});

	
</script>

	<form name="scheduleForm" id="scheduleForm" method="post" action="${ctx }/prog/bbs_schedule/${siteCode }/${mno }/schedule_list.do">
		<input type="hidden" id="scheduleDate" name="scheduleDate"/>
		<input type="hidden" id="searchMonth" name="searchMonth"/>
		<input type="hidden" id="searchYear" name="searchYear"/>
		<input type="hidden" id="searchCheck" name="searchCheck"/>
		<input type="hidden" name="scheduleNo" value="" />
	</form>	
	<div id="calendar_view">
        <div class="program_schedule">
            <p class="cal_year">
                <a href="#prev_year" id="prev_year" class="prev_year">이전년</a>
                <a href="#pre_month" id="pre_month" class="prev">이전달</a>
                <span class="year">${fn:substring(mayorScheduleVO.scheduleDate, 0, 4) }.${fn:substring(mayorScheduleVO.scheduleDate, 4, 6)  }</span> 
                <a href="#next_month" id="next_month" class="next">다음달</a>
                <a href="#next_year" id="next_year" class="next_year">다음년</a>
            </p>
        </div>

        <table class="calendar" summary="달력 일,월,화,수,목,금,토 순입니다.">
            <caption>달력</caption>
            <colgroup>
                <col style="width: 14%">
                <col style="width: 14%">
                <col style="width: 14%">
                <col style="width: 14%">
                <col style="width: 14%">
                <col style="width: 15%">
                <col style="width: 15%">
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">일</th>
                    <th scope="col">월</th>
                    <th scope="col">화</th>
                    <th scope="col">수</th>
                    <th scope="col">목</th>
                    <th scope="col">금</th>
                    <th scope="col">토</th>
                </tr>
            </thead>
            <tbody>
                <tr class="trClass">
                    <c:set value="0" var="newLine"/>
                    <c:forEach begin="1" end="${Week - 1}">
                        <td></td>
                        <c:set value="${newLine + 1 }" var="newLine"/>
                    </c:forEach>

                    <c:forEach begin="${StartDay }" end="${EndDay}" var="date">
                        <c:set var="dates"><fmt:formatNumber value="${ date }" pattern="##" minIntegerDigits="2" /></c:set>
                        <c:set var="TdClass" value=""/>
                        <c:set var="saturClass" value=""/>

                        <c:forEach var="list" items="${BbsScheduleListByYearMonth }">
                            <c:if test="${dates eq fn:substring(list.scheduleDate, 6, 9) }">
                                <c:set var="TdClass" value="select_day"/>
                            </c:if>	
                        </c:forEach>

                        <c:choose>
                            <c:when test="${newLine eq '0' }">
                                <c:set var="spanClass" value="sun"/>
                            </c:when>
                            <c:when test="${newLine eq '6' }">
                                <c:set var="spanClass" value="satur"/>
                                <c:set var="saturClass" value="t_end"/>
                            </c:when>
                            <c:otherwise>
                                <c:set var="spanClass" value="day"/>
                            </c:otherwise>
                        </c:choose>
                        <fmt:formatNumber var="no" minIntegerDigits="2" value="${Month}" type="number"/>
						<c:set var="comdate" value="${fn:substring(mayorScheduleVO.scheduleDate, 0, 4) }${fn:substring(mayorScheduleVO.scheduleDate, 4, 6) }${date}" />
						<c:if test="${today eq comdate }">
                            <c:set var="TdClass" value="today"/>
                        </c:if>	
						
						<fmt:formatNumber var="dateno" minIntegerDigits="2" value="${date}" type="number"/>
						<c:set var="daynow" value="${fn:substring(mayorScheduleVO.scheduleDate, 0, 4) }${fn:substring(mayorScheduleVO.scheduleDate, 4, 6) }${dateno}" />
                        <td class="${TdClass } ${saturClass }">
                            <a href="#link">
                                <span class="${spanClass }">${date }</span>
                                <c:forEach var="list" items="${list }" varStatus="list_idx">
                          		
                          		<fmt:parseDate value='${list.startDate}' var='startDate' pattern='yyyymmdd'/>
								<fmt:formatDate value="${startDate}" var='startDate1' pattern='yyyymmdd'/>
								
								<fmt:parseDate value='${list.endDate}' var='endDate' pattern='yyyymmdd'/>
								<fmt:formatDate value="${endDate}" var='endDate1' pattern='yyyymmdd'/>
						 
								<c:if test="${startDate1<=daynow and daynow<=endDate1}">
								    <ul>
	                                    <li>${list.title}</li>
	                                </ul>
								</c:if> 
                                </c:forEach>
                            </a>
                        </td>

                        <c:set value="${newLine + 1 }" var="newLine"/>

                        <c:if test="${newLine == 7 && date != EndDay  }">
                            </tr>
                            <tr class="trClass">	
                            <c:set value="0" var="newLine"/>						
                        </c:if>						
                    </c:forEach>

                    <c:forEach begin="${newLine + 1 }" end="7">
                        <td></td>
                    </c:forEach>					
                </tr>
            </tbody>
        </table>
        <p class="tip mt_10">날짜를 클릭하시면 해당일의 일정을 확인하실 수 있습니다.</p>
       
        <div id="hDate">
            <h4>${fn:substring(mayorScheduleVO.scheduleDate, 0, 4) }년 ${fn:substring(mayorScheduleVO.scheduleDate, 4, 6) }월 ${fn:substring(mayorScheduleVO.scheduleDate, 6, 9) }일 일정</h4>
        </div>

        <div class="h4_p">
            <table class="table">
                <caption>일정에 대한 일정내용, 장소입니다.</caption>
                <colgroup>
                    <col style="width:auto;">
                    <col style="width:25%;">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">일정내용</th>
                        <th scope="col">장소</th>
                    </tr>
                </thead>
                <tbody id="scheduleBody">
	                <c:if test="${fn:length(searchVO) != 0}">
			            <c:forEach var="searchVO" items="${searchVO }" varStatus="list_idx">
		                	<tr id="emptySchedules">
			                	<td class="word_b align_left">
		                            <ul class="list_01 mt_00">
		                                <li>
		                                    <p id="scheduleTitle"><strong>${searchVO.title}</strong></p>
		                                    <p id="scheduleContent">${searchVO.content}</p>
		                                </li>
		                            </ul>
		                            <td>
	                              		${searchVO.place}
	                               	</td>
		                        </td>
		                       </tr>
	                    </c:forEach>
	                </c:if>
	                <c:if test="${fn:length(searchVO) == 0}">
	                    <tr id="emptySchedules">
	                        <td colspan="2">등록된 일정이 없습니다.</td>
	                    </tr>
	                </c:if>
                </tbody>
            </table>
        </div>
	</div>