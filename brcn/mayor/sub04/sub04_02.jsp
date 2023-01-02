<%@page import="egovframework.com.cmm.LoginVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	LoginVO loginVO = (LoginVO)session.getAttribute("loginVO");
%>

<script type="text/javascript">
	function checkUser(str) {
		if(!str) str = "0";
		var url = '';
		var link_array = new Array();
		link_array[0] = "/cop/bbs/BBSMSTR_000000000582/selectBoardList.do";//시민용
		link_array[1] = "/cop/bbs/BBSMSTR_000000000581/selectBoardList.do";//공직자용 : 내부비리
		link_array[2] = "/cop/bbs/BBSMSTR_000000000583/selectBoardList.do";//시민용 : 클린
		
		if('${empty loginVO}' == 'true') {
			url = '/mayor/sitemap_12.do?returnUrl='+link_array[str];	
		} else {
			url = link_array[str];
		}
		
		location.href = url;
	}
</script>

<div id="sub_04_02">
    <div class="imgbox" data-box="1" data-icon="no">
        <div class="txt">
            <div class="tit">
                <p>보령시는 <span class="mark">깨끗하고 투명한 행정서비스를 제공</span>하기 위해 노력하고 있습니다.</p>
            </div>

            <div class="sub">
                <p>시민 여러분이 보령시 공무원으로부터 부당한 대우, 금품이나 향응 요구, 공금을 횡령하거나 부당하게 집행하는 행위 등을 경험하셨다면
                    언제든지 신고해 주시기 바랍니다.</p>
                <p class="noti_txt">비리신고센터에 접수된 내용은 철저한 익명성을 보장하며, 신고인의 인적사항은 비공개 처리를 원칙으로 합니다.
                </p>
            </div>
        </div>
    </div>

    <div class="declare_box">
        <ul>
            <li>
                <div class="inner_box">
                    <p class="title">공직비리 신고센터 <span>(시민용)</span></p>
                    <div class="mid">
                        <div class="icon_box" data-icon="1">
                            <p class="icon"></p>
                        </div>
                        <ul class="list_box" data-list="1">
                            <li>공무원의 금품향응 수수 및 요청</li>
                            <li>특정인에 대한 특혜 제공</li>
                            <li>사적이익을 위한 직위 사용</li>
                            <li>기타 부당 이권개입 행위 등</li>
                        </ul>
                    </div>
                    <a href="#" data-btn="2" data-size="s" onclick="checkUser(0);return false;">
                        <span> 신고하기</span>
                    </a>
                </div>
            </li>

            <li>
                <div class="inner_box">
                    <p class="title">내부비리 신고센터<span> (공직자용) </span></p>
                    <div class="mid">
                        <div class="icon_box" data-icon="2">
                            <p class="icon"></p>
                        </div>
                        <ul class="list_box" data-list="1">
                            <li>공무원의 금품향응 수수 및 요청</li>
                            <li>업무관련 부당지시나 압력</li>
                            <li>공무원 행동강령 위반</li>
                            <li>기타 불합리한 제도 등</li>
                        </ul>
                    </div>

                    <a href="#" data-btn="2" data-size="s" onclick="checkUser(1);return false;">
                        <span> 신고하기</span>
                    </a>
                </div>
            </li>

            <li>
                <div class="inner_box">
                    <p class="title">클린 신고센터<span> (공직자용) </span></p>
                    <div class="mid">
                        <div class="icon_box" data-icon="3">
                            <p class="icon"></p>
                        </div>
                        <ul class="list_box" data-list="1">
                            <li>직무관련자로부터 본인이나 가족이 금풍 등을 수수한 경우</li>
                            <li>금풍 등을 제 3자가 전달하여 돌려 줄 방법이 없는 경우</li>
                        </ul>
                    </div>
                    <a href="#" data-btn="2" data-size="s" onclick="checkUser(2);return false;">
                        <span> 신고하기</span>
                    </a>
                </div>
            </li>
        </ul>
    </div>

    <p class="noti_check">
        법령상 제출 의무 없는 서류 제출요구나 민원처리 불친절 행위 등 <span>민원관련</span> 부당한 대우를 받았을 경우 민원부조리신고센터에 신고해 주시기 바랍니다.
    </p>






    <div class="center_btn">
        <a href="http://www.brcn.go.kr/kor/sub03_02_01.do" target="_blank" title="새창이동" data-btn="1" data-icon="1"><span>민원부조리신고센터 바로가기</span></a>

    </div>



</div>

