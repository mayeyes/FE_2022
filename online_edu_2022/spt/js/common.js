//contextRoot 경로
var contextPath = '/edu';

/*--------------------------------------------------------------------------------------------
 Spec	  : 숫자만 입력 / 세자리 콤마
 Argument : string
 Return   : string
 Example  : class="numfmt" 	==> 샘플페이지 : bsnsPblancForm.jsp
			// 숫자/세자리 콤마 	==> 페이지 상단에 설정
		    //$('.numfmt').commaNumber();
		    // 숫자만 입력 		==> 페이지 상단에 설정
		    //$('.number').onlyNumber();
		    // 숫자이외의 값 삭제 	==> 저장시 사용
		    //$('.numfmt').removeText();
---------------------------------------------------------------------------------------------*/
(function ($) {
    // 숫자 제외하고 모든 문자 삭제.
    $.fn.removeText = function(_v, ext){
    	var patten = new RegExp("[^0-9"+ext+"]", "g");
    	
        if(typeof(_v)==="undefined"){
            $(this).each(function(){
                this.value = this.value.replace(patten,'');
            });
        }else{
            return _v.replace(patten,'');
        }
    };   

    // 세자리 꼼마
    $.fn.numberFormat = function(_v){
        this.proc = function(_v){
            var tmp = '',
                number = '',
                cutlen = 3,
                comma = ','
                i = 0,
                len = _v.length,
                mod = (len % cutlen),
                k = cutlen - mod;
                 
            for(var i;i < len;i++){
                number = number + _v.charAt(i);
                if(i < len - 1){
                    k++;
                    if((k % cutlen) == 0){
                        number = number + comma;
                        k = 0;
                    }
                }
            }
            return number;
        };
         
        var proc = this.proc;
        if(typeof(_v)==="undefined"){
            $(this).each(function(){
                this.value = proc($(this).removeText(this.value));
            });
        }else{
            return proc(_v);
        }
    };
     
    // 숫자만.
    $.fn.onlyNumber = function (p){
        $(this).each(function(i) {
            //$(this).attr({'style':'text-align:right'});
             
            this.value = $(this).removeText(this.value);
             
            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeText(this.value);
            });
        });
    };

    // 위 두개의 합성.
    // 숫자만 + 세자리 콤마.
    $.fn.commaNumber = function (p){
        $(this).each(function(i) {
            //$(this).attr({'style':'text-align:right'});
             
            this.value = $(this).removeText(this.value);
            this.value = $(this).numberFormat(this.value);
             
            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeText(this.value);
                this.value = $(this).numberFormat(this.value);
            });
        });
    };
    
    // 위 두개의 합성.
    // '-' 숫자.
    $.fn.extNumber = function (p){
        $(this).each(function(i) {
            this.value = $(this).removeText(this.value, p);
             
            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeText(this.value, p);
            });
        });
    };
})(jQuery);

// 탭 이동
function fn_tabMove(url) {
    $("#pform").attr("target", "_self");
    $("#pform").attr("action", url);
    $("#pform").submit();
}

//필수 입력값 체크
function fn_val_chk(id){
	var _type = $(id).attr('type');
	if(_type == "text" || $(id)[0].type == "textarea"){
		var _val = $.trim($(id).val());
		$(id).val(_val);
		if(_val.length < 1){
			alert($(id).attr('title')+"을(를) 입력해 주세요.");
			$(id).focus();
			return true;
		}else{
			return false;
		}
	}else{
		var _val = $(id).val();
		if(_val.length < 1){
			alert($(id).attr('title')+"을(를) 선택해 주세요.");
			$(id).focus();
			return true;
		}else{
			return false;
		}
	}
}

// 숫자 체크
function fn_num(val) {	
	var Num = "1234567890";
	for (var i=0; i<val.length; i++) {
		if(Num.indexOf(val.substring(i,i+1))<0) {
			return true;
		}
	}
	return false;
}

// 숫자만 입력되도록
function fn_showKeyCode(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;	
	if(!((keyID == 8) || (45 < keyID && keyID < 58) || (95 < keyID && keyID < 106))){
		return false;
	}
}

// 문자열 변환
function fn_replaceAll(str, tar, txt){
	var v_exp = new RegExp(tar, "g");
	var v_ret = str.replace(v_exp, txt);
	return v_ret;
} 

// 전화번호 설정
function fn_phone(num){
	var num1 = $("#"+num+"1").val();
	var num2 = $("#"+num+"2").val();
	var num3 = $("#"+num+"3").val();
	var phone = num1+"-"+num2+"-"+num3;

	if(phone.indexOf("--") == -1){
	    $("#"+num).val(phone);
	}else{
	    $("#"+num).val("");
	}
}

// 체크박스 모두 선택/해제 
function fn_checkall() {
	var checkField = document.pform.checkField;
	if(document.pform.checkAll.checked) {
		if(checkField) {
			if(checkField.length > 1) {
				for(var i=0; i<checkField.length; i++) {
					checkField[i].checked = true;
				}
			} else {
				checkField.checked = true;
			}
		}
	} else {
		if(checkField) {
			if(checkField.length > 1) {
				for(var j=0; j<checkField.length; j++) {
					checkField[j].checked = false;
				}
			} else {
				checkField.checked = false;
			}
		}
	}
}

// 우편번호찾기
function fn_zipSearch(){
  window.open(contextPath+"/admin/common/postEtc.do", "post_pop", "width=600,height=450,scrollbars=YES");
}

// 강사검색 리스트
function fn_instrctrSearch() {
    var sw = 1000;
    var sh = 850;
    var st = Math.ceil((parent.screen.width-sw)/2);
    var sl = Math.ceil((parent.screen.height-sh)/2)-100;
    window.open("", "_popup", "width="+sw+", height="+sh+", top="+sl+", left="+st+", scrollbars=yes");
    var frm = document.pform;
    frm.target = "_popup";
    frm.action = contextPath+"/institution/spt/cmmnInfo/instrctrSearchListPop.do";
    frm.method = "post";
    frm.submit();	
}

// 강사 상세조회
function fn_instrctrView(instrctrSn) {
    var sw = 750;
    var sh = 670;
    var st = Math.ceil((parent.screen.width-sw)/2);
    var sl = Math.ceil((parent.screen.height-sh)/2)-100;
    window.open("", "_detailpopup", "width="+sw+", height="+sh+", top="+sl+", left="+st+", scrollbars=yes");
    var frm = document.pform;
    frm.target = "_detailpopup";
    frm.action = contextPath+"/institution/spt/cmmnInfo/instrctrViewPop.do?instrctrSn="+instrctrSn;
    frm.method = "post";
    frm.submit();	
}

// 멘토검색 리스트
function fn_mentoSearch() {
    var sw = 800;
    var sh = 450;
    var st = Math.ceil((parent.screen.width-sw)/2);
    var sl = Math.ceil((parent.screen.height-sh)/2)-100;
    window.open("", "_popup", "width="+sw+", height="+sh+", top="+sl+", left="+st+", scrollbars=yes");
    var frm = document.pform;
    frm.target = "_popup";
    frm.action = contextPath+"/institution/spt/cmmnInfo/mentoSearchListPop.do";
    frm.method = "post";
    frm.submit();	
}

// 멘토 상세조회
function fn_mentoView(mentoSn) {
    var sw = 750;
    var sh = 670;
    var st = Math.ceil((parent.screen.width-sw)/2);
    var sl = Math.ceil((parent.screen.height-sh)/2)-100;
    window.open("", "_detailpopup", "width="+sw+", height="+sh+", top="+sl+", left="+st+", scrollbars=yes");
    var frm = document.pform;
    frm.target = "_detailpopup";
    frm.action = contextPath+"/institution/spt/cmmnInfo/mentoViewPop.do?mentoSn="+mentoSn;
    frm.method = "post";
    frm.submit();	
}


/*--------------------------------------------------------------------------------------------
 Spec	  : 숫자입력시 3자리마다 자동으로 콤마 찍기
 Argument : string
 Return   : string
 Example  : onkeyup="fn_comma_value(this)"
---------------------------------------------------------------------------------------------*/
function fn_comma_value(val){
    if (event.keyCode != 9){
        var cur = val.value;
        var setMinus = 0;

        if (cur.charAt(0) == "-") {
            setMinus = 1;
        }

        cur = cur.replace(/[^.0-9]/g ,"");
        cur = cur.replace(/[.]+/g ,".");
        
        if (setMinus == 1) 
            val.value = "-" + formatNumbertoString(cur);
        else
            val.value = formatNumbertoString(cur);
    }
}
function formatNumbertoString(cur){
    var leftString = cur;
    var rightString = ".";
    var dotIndex = 0;

    for(var i=0; i<cur.length; i++){
    	// 1) '.'이 처음에 입력 되었을때 앞에 0을 더해 "0."을 리턴
		// 2) "0."이외의 입력 일 때 "0"만 리턴
    	if(cur.charAt(i) == "." || (cur.length > 1 && cur.charAt(0) == "0" && cur.charAt(1) != ".")){
    		dotIndex = i;
    		if(dotIndex == 0){
                if   (cur.charAt(0) == ".")   leftString="0.";
                else                          leftString="";
    			return leftString;
    		}
    		break;
    	}
    }

    if(dotIndex != 0){	//dot가 있을 경우..
    	leftString = cur.substr(0, dotIndex);
    	rightString = cur.substr(dotIndex+1);
    	rightString = rightString.replace(/\./g,"");
    }else{ 				//없으면..
    	leftString = cur;
    }

    len=leftString.length-3;
    while(len>0){
        leftString=leftString.substr(0,len)+","+leftString.substr(len);
        len-=3;
    }           

    if(rightString != ".")
        return (leftString + "." + rightString); 
    else
        return leftString;
}

// 콤마를 제거
function fn_comma_remove(val) {
    var rtn = parseFloat(val.replace(/,/gi, ""));
    if(isNaN(rtn)){
        return 0;
    }else{
        return rtn;
    }
}

/*****************************************************************/
/**************************** 승인상태코드 ***************************/
/*****************************************************************/
// 과제_제출 승인상태코드 저장
function go_stat(cmd){	
	$("#cmd").val(cmd);
	
	var confmCode = $("#confmCode").val();
	if(confmCode == "R"){
		go_return_resn();
	}else{
		go_stat_exec();
	}
}

// 과제_제출 반려사유 입력
function go_return_resn(){	
	var st = Math.ceil((parent.screen.height-500)/2);
	var sl = Math.ceil((parent.screen.width-200)/2);
	$("#returnDiv").dialog({
		modal : false,
		resizable : false,
		position:[sl,st],
		buttons : {
			"저장" : function() { 
				if($("#returnResnDiv").val() == ''){
					alert("반려사유를 입력해 주세요.");
					$("#returnResnDiv").focus();
					return;			
				}else{
					$("#returnResn").val($("#returnResnDiv").val());
					go_stat_exec();
					$(this).dialog("close"); 
				}
			},
			"닫기" : function() { 
				$(this).dialog("close"); 
			} 
		}
	});	
}

// 과제_제출 승인상태코드 저장 실행
function go_stat_exec(){
	if(confirm("저장하시겠습니까?")){
		$.ajax({
			url : contextPath+'/spt/cmmnInfo/confmCodeExec.do',
			type : "POST",
			dataType : "json",
			data : $("#pform").serialize(),
			success : function(data) {
				/*
				if(data.success == "Y"){
					alert(data.message);
				}else{
					alert(data.message);
				}
				*/
				if($("#confmCode").val() == "C"){
					$("#confmCodeBtn").hide();
				}
				
				go_list();
			}	
		});
	}
}

//[멘토링] 과제_제출 승인상태코드 저장
function go_stat_mntr_task(cmd){	
	$("#cmd").val(cmd);
	var confmCode = $("#confmCode").val();
	if(confmCode == "R"){
		go_return_resn_mntr_task();
	}else{
		go_stat_exec_mntr_task();
	}
}

// [멘토링] 과제_제출 반려사유 입력
function go_return_resn_mntr_task(){	
	var st = Math.ceil((parent.screen.height-500)/2);
	var sl = Math.ceil((parent.screen.width-200)/2);
	$("#returnDiv").dialog({
		modal : false,
		resizable : false,
		position:[sl,st],
		buttons : {
			"저장" : function() { 
				if($("#returnResnDiv").val() == ''){
					alert("반려사유를 입력해 주세요.");
					$("#returnResnDiv").focus();
					return;			
				}else{
					$("#returnResn").val($("#returnResnDiv").val());
					go_stat_exec_mntr_task();
					$(this).dialog("close"); 
				}
			},
			"닫기" : function() { 
				$(this).dialog("close"); 
			} 
		}
	});	
}

// [멘토링] 과제_제출 승인상태코드 저장 실행
function go_stat_exec_mntr_task(){
	if(confirm("저장하시겠습니까?")){
		$.ajax({
			url : contextPath+'/institution/spt/cmmnInfo/confmCodeExecMntrTask.do',
			type : "POST",
			dataType : "json",
			data : $("#pform").serialize(),
			success : function(data) {
				if(data.success == "Y"){
					alert(data.message);
				}else{
					alert(data.message);
				}
			}	
		});
	}
}

//[멘토링] 수행_제출 승인상태코드 저장
function go_stat_mntr_exc(cmd){	
	$("#cmd").val(cmd);
	var confmCode = $("#confmCode").val();
	if(confmCode == "R"){
		go_return_resn_mntr_exc();
	}else{
		go_stat_exec_mntr_exc();
	}
}

// [멘토링] 수행_제출 반려사유 입력
function go_return_resn_mntr_exc(){	
	var st = Math.ceil((parent.screen.height-500)/2);
	var sl = Math.ceil((parent.screen.width-200)/2);
	$("#returnDiv").dialog({
		modal : false,
		resizable : false,
		position:[sl,st],
		buttons : {
			"저장" : function() { 
				if($("#returnResnDiv").val() == ''){
					alert("반려사유를 입력해 주세요.");
					$("#returnResnDiv").focus();
					return;			
				}else{
					$("#returnResn").val($("#returnResnDiv").val());
					go_stat_exec_mntr_exc();
					$(this).dialog("close"); 
				}
			},
			"닫기" : function() { 
				$(this).dialog("close"); 
			} 
		}
	});	
}

// [멘토링] 수행_제출 승인상태코드 저장 실행
function go_stat_exec_mntr_exc(){
	if(confirm("저장하시겠습니까?")){
		$.ajax({
			url : contextPath+'/institution/spt/cmmnInfo/confmCodeExecMntrExc.do',
			type : "POST",
			dataType : "json",
			data : $("#pform").serialize(),
			success : function(data) {
				if(data.success == "Y"){
					alert(data.message);
				}else{
					alert(data.message);
				}
			}	
		});
	}
}
/** 첨부파일 ***************************************************************/	
function fnMultiFileAdd() {
	if ( $(".td-input-wrap").children(".file-wrap").length >= 9) {
		alert('9개까지 등록 가능합니다.');
		return;
	}
	// 첨부파일 갯수체크
	var attachFileSize = $(".td-input-wrap").children(".file-wrap").length;
	attachFileSize++;
	var fileHtml = "";
	fileHtml += "<div class='file-wrap' style='padding-bottom:5px;'>";
	fileHtml += "	<div class='file_input_div'>"; 
	fileHtml += "		<input type='file' id='uploadFile_"+attachFileSize+"' name='uploadFile_"+attachFileSize+"' class='file_input_hidden' title='첨부파일' accept='.hwp,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt,.zip'/>";	
	fileHtml += "		<span class='timebtn'><a class='scale-down btn red small' id='fnRowDel' title='삭제'>삭제</a></span>";
	fileHtml += "	</div>";
	fileHtml += "</div>";
	$(".td-input-wrap").append(fileHtml);
}

function fnMultiFileInit() {
	var fileHtml = "";
	fileHtml += "<div class='file-wrap' style='padding-bottom:5px;'>";
	fileHtml += "	<div class='file_input_div'>"; 
	fileHtml += "		<input type='file' id='uploadFile_1' name='uploadFile_1' class='file_input_hidden' title='첨부파일' accept='.hwp,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt,.zip'/>";	
	fileHtml += "		<a class='scale-down btn blue small' onclick='fnMultiFileAdd();return false' title='추가'>추가</a>";
	fileHtml += "		&nbsp;(hwp, doc, docx, ppt, pptx, xls, xlsx, pdf, txt, zip)";
	fileHtml += "	</div>";
	fileHtml += "</div>";
	$(".td-input-wrap").append(fileHtml);
}

function fnMultiFileDelete(atchFileId, fileSn, obj){
	if(confirm("첨부파일을 삭제하시겠습니까?")){
        $.ajax({
            url : contextPath+"/cmm/fms/deleteFile.do",
            data : {atchFileId:atchFileId, fileSn:fileSn},
            dataType : "json",
            type : 'post',
            async: "true",
            success : function(result) {
            	$(obj).closest(".file-wrap").remove();
            	// 파일첨부가 0이면 최소하나 추가
            	if ( $(".td-input-wrap").children(".file-wrap").length == 0) {
            		fnMultiFileInit();
        		}
				//alert("첨부파일이 정상적으로 삭제 되었습니다.");
            },
            error : function(e) {
                alert("error :" + e.responseText);
            }
        });
    }	
}

function fnFileDelete(atchFileId, fileSn, obj){
    if(confirm("첨부파일을 삭제하시겠습니까?")){
        $.ajax({
            url : contextPath+"/cmm/fms/deleteFile.do",
            data : {atchFileId:atchFileId, fileSn:fileSn},
            dataType : "json",
            type : 'post',
            async: "true",
            success : function(result) {
            	$("#fileDivSn_file_"+fileSn).empty();
            	$("#uploadFile_"+fileSn).show();
            	$("#uploadSpan_"+fileSn).show();
            	// 파일업로드 폼 생성
            	//var fileHtml = "";
            	//fileHtml += "				<input type='file' id='uploadFile_"+(fileSn)+"' name='uploadFile_"+(fileSn)+"' class='file_input_hidden' title=''/>";
            	//$("#fileDivSn_"+fileSn).append(fileHtml);
				//alert("첨부파일이 정상적으로 삭제 되었습니다.");
            },
            error : function(e) {
                alert("error :" + e.responseText);
            }
        });
    }	
}

function fnFileDown(atchFileId, fileSn){
	$("#atchFileId").val(atchFileId);
	$("#fileSn").val(fileSn);
	
    $("#fileForm").attr("target", "hiddenDownloadFrame");
	$("#fileForm").attr("action", contextPath+"/cmm/fms/fileDown.do");
	$("#fileForm").submit();
}

function fnFileDownHis(atchFileId, fileSn){
	if(atchFileId == "rept_template.xlsx" || atchFileId == "mber_template.xlsx"){
		$("#atchFileId").val(atchFileId);
		$("#fileSn").val(fileSn);
		
	    $("#fileForm").attr("target", "hiddenDownloadFrame");
		$("#fileForm").attr("action", contextPath+"/cmm/fms/fileDown.do");
		$("#fileForm").submit();
	}else{
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    // 01) Validation
	    if (! atchFileId) {
	        alert("파일 KEY가 없습니다.");
	        return;
	    }    
	
	    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    // 02) Key 설정
	    var mapPk    = {};
	    mapPk.ATCH_FILE_ID = atchFileId;
	    mapPk.FILE_SN = fileSn;
	    
	    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    // 03) Parameter 설정
	    var jsonParam    = {};
	    jsonParam.COMPANY_ID       = "SEMAS"        ;
	    jsonParam.SYS_CD           = "EDUWWW"       ;
	    jsonParam.DWLD_MTHD        = "UUID"         ;
	    jsonParam.BIZNES_ID        = "X4020"        ;
	    jsonParam.CRTFC_DN_VALUE   = $("#_crtfcDnValue").val();
	    jsonParam.ATCH_FILE_PK     = GetJson2Base64(mapPk) ;
	    jsonParam.ORGINL_FILE_NM   = "" ;
	
	    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    // 10) Call Form
	    var url = $("#_cmnDwldUrl").val()+"?rawParam=" + GetJson2Base64(jsonParam);
	    var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=550, height=345, top=200,left=200"; 
	    
	    window.open(url, "CmnDownFile", status);
	}
}

function fnCmnZipFileDown(atchFileListid, dwldUrl, dwldParam){
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 02) Key 설정
    var mapPk    = {};
    mapPk.ATCH_FILE_ID = $("#"+atchFileListid).val() ;   // PK 설정
    mapPk.FILE_SN      = ""                    ;
    
    var ATCH_FILE_PK   = GetJson2Base64(mapPk) ;
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 03) Parameter 설정
    var jsonParam    = {};
    jsonParam.COMPANY_ID       = "SEMAS"        ;   // 회사 ID
    jsonParam.SYS_CD           = "EDUMNG"       ;   // 시스템 코드
    jsonParam.DWLD_MTHD        = "DIRECT"       ;   // 다운로드 방식
    jsonParam.BIZNES_ID        = "X4020"        ;   // 업무 ID
    jsonParam.CRTFC_DN_VALUE   = $("#_crtfcDnValue").val();   // 인증 DN값
    jsonParam.ATCH_FILE_PK     = ATCH_FILE_PK	;   // PK 설정
    jsonParam.ORGINL_FILE_NM   = "일괄다운로드.zip"	;   // 원본 파일명
    jsonParam.DWLD_URL         = window.location.protocol+"//"+window.location.host+dwldUrl		;   // 다운로드 URL
    //jsonParam.DWLD_URL         = "https://edu.sbiz.or.kr"+dwldUrl		;   // 다운로드 URL
    jsonParam.DWLD_PARAM       = dwldParam		;   // 다운로드 Parameter

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 10) Call Form
    var url = $("#_cmnDwldUrl").val()+"?rawParam=" + GetJson2Base64(jsonParam);
    var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=550, height=345, top=200,left=200"; 
    
    window.open(url, "CmnDownFile", status);
}

//테이블 Row 추가
function fnRowAdd(tblId) {
	var trLength = $("#"+tblId+" > tbody:first > tr").length+1;
	if(trLength>5) {
		alert('5개까지 추가 가능합니다.');
		return;
	}
	var trHtml = $("#"+tblId+" > tbody:first > tr:first").html();
	$("#"+tblId+" tbody:last").append("<tr>"+trHtml+"</tr>");
	// 생성 Row 초기화
	$("#"+tblId+" tbody:last tr:last input").val("");
	$("#"+tblId+" tr:last select").val("");
	$("#"+tblId+" tbody:last tr:last input").attr("checked",false);
}

// 테이블 Row 삭제
function fnRowDelete(tblId) {
	var trLength = $("#"+tblId+" > tbody:first > tr").length;
	if(trLength>1) {
		$("#"+tblId+" tbody > tr:last").remove();
	}
}

//테이블 2Row 추가
function fnTwoRowAdd(tblId) {
	var trLength = $("#"+tblId+" > tbody:first > tr").length+2;
	if(trLength>10) {
		alert('5개까지 추가 가능합니다.');
		return;
	}
	var trHtml1 = $("#"+tblId+" > tbody:first > tr:first").html();
	var trHtml2 = $("#"+tblId+" > tbody:first > tr:first").next().html();
	$("#"+tblId+" tbody:last").append("<tr class='pe'>"+trHtml1+"</tr><tr>"+trHtml2+"</tr>");

	// 생성 Row 초기화
	$("#"+tblId+" tbody:last tr:last input").val("");
	$("#"+tblId+" tr:last select").val("");
	$("#"+tblId+" tbody:last tr:last input").attr("checked",false);
	
	fnTitleSet(tblId, 2);
}

//테이블 2Row 삭제
function fnTwoRowDelete(tblId) {
	var trLength = $("#"+tblId+" > tbody:first > tr").length;
	if(trLength>2) {
		$("#"+tblId+" tbody > tr:last").remove();
		$("#"+tblId+" tbody > tr:last").remove();
	}
	fnTitleSet(tblId, 2);
}

//테이블 3Row 추가
function fnThreeRowAdd(tblId) {
	var trLength = $("#"+tblId+" > tbody:first > tr").length+3;
	if(trLength>15) {
		alert('5개까지 추가 가능합니다.');
		return;
	}
	var trHtml1 = $("#"+tblId+" > tbody:first > tr:first").html();
	var trHtml2 = $("#"+tblId+" > tbody:first > tr:first").next().html();
	var trHtml3 = $("#"+tblId+" > tbody:first > tr:first").next().next().html();
	$("#"+tblId+" tbody:last").append("<tr class='pe'>"+trHtml1+"</tr><tr>"+trHtml2+"</tr><tr>"+trHtml3+"</tr>");
	
	// 생성 Row 초기화
	$("#"+tblId+" > tbody:first > tr:last").find('input').val('');
	$("#"+tblId+" > tbody:first > tr:last").find('select').val('');
	$("#"+tblId+" > tbody:first > tr:last").find('input').attr("checked",false);
	
	$("#"+tblId+" > tbody:first > tr:last").prev().find('input').val('');
	$("#"+tblId+" > tbody:first > tr:last").prev().find('select').val('');
	$("#"+tblId+" > tbody:first > tr:last").prev().find('input').attr("checked",false);
	
	fnTitleSet(tblId, 3);
}

//테이블 3Row 삭제
function fnThreeRowDelete(tblId) {
	var trLength = $("#"+tblId+" > tbody:first > tr").length;
	if(trLength>3) {
		$("#"+tblId+" tbody > tr:last").remove();
		$("#"+tblId+" tbody > tr:last").remove();
		$("#"+tblId+" tbody > tr:last").remove();
	}
	fnTitleSet(tblId, 3);
}

//테이블 4Row 추가
function fnFourRowAdd(tblId) {
	var trLength = $("#"+tblId+" > tbody:first > tr").length+4;
	if(trLength>20) {
		alert('5개까지 추가 가능합니다.');
		return;
	}
	var trHtml1 = $("#"+tblId+" > tbody:first > tr:first").html();
	var trHtml2 = $("#"+tblId+" > tbody:first > tr:first").next().html();
	var trHtml3 = $("#"+tblId+" > tbody:first > tr:first").next().next().html();
	var trHtml4 = $("#"+tblId+" > tbody:first > tr:first").next().next().next().html();
	$("#"+tblId+" tbody:last").append("<tr class='pe'>"+trHtml1+"</tr><tr>"+trHtml2+"</tr><tr>"+trHtml3+"</tr><tr>"+trHtml4+"</tr>");
	
	// 생성 Row 초기화
	$("#"+tblId+" > tbody:first > tr:last").find('input').val('');
	$("#"+tblId+" > tbody:first > tr:last").find('select').val('');
	$("#"+tblId+" > tbody:first > tr:last").find('input').attr("checked",false);
	
	$("#"+tblId+" > tbody:first > tr:last").prev().find('input').val('');
	$("#"+tblId+" > tbody:first > tr:last").prev().find('select').val('');
	$("#"+tblId+" > tbody:first > tr:last").prev().find('input').attr("checked",false);
	
	$("#"+tblId+" > tbody:first > tr:last").prev().prev().find('input').val('');
	$("#"+tblId+" > tbody:first > tr:last").prev().prev().find('select').val('');
	$("#"+tblId+" > tbody:first > tr:last").prev().prev().find('input').attr("checked",false);
	
	$("#"+tblId+" > tbody:first > tr:last").prev().prev().prev().find('input').val('');
	$("#"+tblId+" > tbody:first > tr:last").prev().prev().prev().find('select').val('');
	$("#"+tblId+" > tbody:first > tr:last").prev().prev().prev().find('input').attr("checked",false);
	
	var chkBox = $("#"+tblId+" > tbody:first > tr:last").find('input:checkbox');
	chkBox.attr('id',chkBox.attr('id')+$("#"+tblId+" > tbody:first").find('input:checkbox').length);
	chkBox.next().attr('for',chkBox.next().attr('for')+$("#"+tblId+" > tbody:first").find('input:checkbox').length);
	
	fnTitleSet(tblId, 4);
}


//테이블 4Row 삭제
function fnFourRowDelete(tblId) {
	var trLength = $("#"+tblId+" > tbody:first > tr").length;
	if(trLength>4) {
		$("#"+tblId+" tbody > tr:last").remove();
		$("#"+tblId+" tbody > tr:last").remove();
		$("#"+tblId+" tbody > tr:last").remove();
		$("#"+tblId+" tbody > tr:last").remove();
	}
	fnTitleSet(tblId, 4);
}


//function trInit(trObj){
//	
////	$(trObj).find('input').val('');
////	$(trObj).find('select').val('');
////	$(trObj).find('input').attr("checked",false);
//	
//	$(trObj).find('input').each(function(){	
//		var inName = $(this).attr('name');
//		$('input[name='+inName+']').each(function(i){
//			$(this).attr('title', $(this).attr('title')+i);
//		});
//	});
//}

function fnTitleSet(id, rowCnt){
	var idx = 0;
	var cnt = 1;
	
	$("#"+id).find('tbody').find('tr').each(function(){
		
		idx++;
		
		$(this).find('input', 'select').each(function(){
			if($(this).attr('title') != undefined){
				var title = $(this).attr('title').replace(/[0-9]/g, "");
				$(this).attr('title', title+cnt);	
			}
			
		});
	
	if(idx == rowCnt){
		idx =0;
		cnt++;
	}
	});
}


$(document).on('click', '#fnRowDel', function(){ 
	if ( $(".td-input-wrap").children(".file-wrap").length == 1) {
		alert("더 이상 삭제하실 수 없습니다.");
		return;
	}
	$(this).closest(".file-wrap").remove();
});
/** 첨부파일 ***************************************************************/


//파일 용량 체크
function checkFile(obj, patten, maxsize){
	var file = obj.files;

	if(maxsize == null){
		maxsize = 10
	}
	if(file[0].size>1024*1024*maxsize){
		alert(maxsize+"MB 이하 파일만 등록할 수 있습니다.");
		$(obj).val('');
		return;
	}
	
	if(patten == null || patten == ""){
		patten = ".hwp.ppt.pptx.xls.xlsx.doc.docx.pdf.jpg.jpeg.png.gif.zip.alz.egg";
		if($(obj).attr("accept") != null && $(obj).attr("accept") != ""){
			patten = $(obj).attr("accept");
		}
	}
	
	var filename = obj.value.substring(obj.value.lastIndexOf(".")).toLowerCase();
	if(patten.indexOf(filename) < 0){
		alert("등록 할 수 없는 첨부파일 입니다.\n※ "+patten+" 파일만 등록 가능 합니다.");
		$(obj).val('');
		return;
	}
}


$(function(){
	$('<script src="../js/plug/jquery.nicescroll-3.7.6/jquery.nicescroll.min.js"></script>').appendTo($("head"));
	init();
});
function init(){
	$('[data-scroll="yes"]').niceScroll({cursorcolor: "#D2D5DA"});
	fn_slide();
	fn_slide_2();
	main_item_3();
	main_item_5();
	main_item_6();
	main_item_7();
	slide_quick();//2021.01.04 추가

	//sitemap

	$('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div><a href="#" class="btn_close">닫기</a></div></div>').prependTo($("#wrap"));
	$('#gnb').clone(false).appendTo($("#slide_map >.inner > .binds"));
	$("<div class='titles'>전체메뉴</div>").prependTo($("#slide_map >.inner > .binds"));
	$("#slide_map .in_depth_tit_p").remove();
	$("#slide_map .in_depth_menu").unwrap();
	$("#slide_map .in_depth_menu>li>ul").wrap('<div />');
	

	$(".btn_allmenu").click(function() {
		if($("#slide_map").is(":hidden")){		
			$("body").addClass("fixed");
			$("#slide_map").fadeIn(300).focus();
		}
		
		return false;
	});
	$("#slide_map>.inner>.btn_close").click(function(){
		$("#slide_map").fadeOut(300);
		$("body").removeClass("fixed");
	});
}

function fn_slide(){
	function _set(str){
		var obj = str;

		//2021.01.04 :s
		if(obj.find(" li").size() == 0){
			$('<a href="#" class="btn_left"><span>이전</span></a>\
			   <a href="#" class="btn_right"><span>다음</span></a>\
			   <div class="move"><ul>\
			   <li><img src="../images/movie_sample.svg" alt="no-data" /></li>\
			   <li><img src="../images/movie_sample.svg" alt="no-data" /></li>\
			   <li><img src="../images/movie_sample.svg" alt="no-data" /></li>\
			   <li><img src="../images/movie_sample.svg" alt="no-data" /></li>\
			   </ul></div>').appendTo(obj.empty());
			   obj.attr("data-nodata","not");
		}
		//2021.01.04 :e
			obj.ul = obj.find(" .move>ul");
			obj.li = obj.ul.find(">li");
			obj.btn_left = obj.find(" .btn_left");
			obj.btn_right = obj.find(" .btn_right");

		function _move(str){
			obj.li = obj.ul.find(">li");
			var l = obj.li.innerWidth() * -1;

			if(str == "left"){
				obj.li.last().prependTo(obj.ul);
				obj.ul.css("left",l+"px");
				l = 0;
			}
			obj.ul.animate({"left":l+"px"},300,function(){
				if(str == "right"){
					obj.li.eq(0).appendTo(obj.ul);
					obj.ul.css("left","0");
				}
			});
		}

		obj.btn_left.on("click",function(){_move("left");return false;});
		obj.btn_right.on("click",function(){_move("right");return false;});
	}

	for(var i=0; i<$('[data-js="slide-1"]').size(); i++){
		_set($('[data-js="slide-1"]').eq(i));
	}
}

function fn_slide_2(){
	function _set(str){
		var obj = str;
			obj.ul = obj.find(" .move>ul");
			obj.li = obj.ul.find(">li");
			obj.allCnt = obj.li.size();
			obj.btn_left = obj.find(" .btn_left");
			obj.btn_right = obj.find(" .btn_right");
			obj.btn_stop = obj.find(" .btn_stop");
			obj.btn_play = obj.find(" .btn_play");
			obj.cnt = 0;
			obj.count = obj.find(" .count");
			obj.auto = (obj.btn_play.size() != 0) ? "Y":"N";
			obj.autoTime = "";
			obj.autoTimeSpeed = 6000;

		if(obj.li.size() < 1){
			obj.find(" .control").remove();
			return false;
		}
		function _def(){
			if(obj.attr('data-simbol') == "yes"){
				for(var i=0; i<obj.li.size(); i++){
					$('<a href="#"><span>'+(obj.li.size()-i)+'</span></a>').prependTo(obj.find(" .control"));
				}
				obj.simbol = obj.find(" .control>a:not([class*='btn_'])");
			}
			
			obj.li.eq(0).addClass("on");
			for(i=0; i<obj.li.size(); i++){
				obj.li.eq(i).attr("data-cnt",i);
			}
			if(obj.li.size() > 1){
				var liClone = obj.li.clone();
				liClone.removeAttr("data-cnt").removeClass("on").prependTo(obj.ul);
			} else {
				obj.allCnt = 0;
			}
			obj.li = obj.ul.find(">li");
			_page();
			_position();
		}
		_def();
		function _position(){
			obj.li = obj.ul.find(">li");
			var idx = obj.li.index(obj.ul.find(">li.on"));
			var l = 0;
			var c = 0;

			for(var i=(idx-1); i>=0; i--){
				c = c - 1;
				l = 105*c;
				obj.li.eq(i).css("left",l+"%");
			}
			for(i=0; i<(obj.li.size() - idx); i++){
				c = i;
				l = 105*i;
				obj.li.eq(idx+i).css("left",l+"%");
			}
		}
		function _page(){
			if(obj.count.size() != 0) obj.count.text((obj.cnt+1)+"/"+(obj.li.size() - obj.allCnt));
			if(obj.attr('data-simbol') == "yes"){
				_sumbol();
			}
		}
		function _sumbol(){
			obj.simbol.removeClass("on").eq(obj.cnt).addClass("on");
		}
		function _move(idx){
			if(idx == obj.cnt) return false;
			if(idx > (obj.li.size() - 1 - obj.allCnt)) idx = 0;
			if(idx < 0) idx = (obj.li.size() - 1 - obj.allCnt);
			obj.li = obj.ul.find(">li");
			var str = "next";
			var o = idx - obj.cnt;
			var l = (o*105) * -1;

			if(idx < obj.cnt){
				str = "prev";
				o = (obj.li.size()-1) - (o * -1);
			}
			
			
			obj.ul.stop().animate({"left":l+"%"},500,function(){
				obj.ul.css("left","0");
				if(str == "next"){
					obj.ul.find(">li:lt("+(o)+")").appendTo(obj.ul);
				} else {
					obj.ul.find(">li:gt("+(o)+")").prependTo(obj.ul);
				}

				obj.li.removeClass("on");
				obj.ul.find(">li[data-cnt='"+idx+"']").addClass("on");

				_position();

				if(obj.auto == "Y"){
					_play();
				}
			});
			obj.cnt = idx;
			_page();
		}
		function _play(){
			obj.autoTime = setTimeout(function(){
				var idx=obj.cnt+1;
				_move(idx);
			},obj.autoTimeSpeed);
		}
		function _stop(){
			clearTimeout(obj.autoTime);
		}

		obj.btn_left.on("click",function(){var idx=obj.cnt-1;_move(idx);return false;});
		obj.btn_right.on("click",function(){var idx=obj.cnt+1;_move(idx);return false;});
		if(obj.attr('data-simbol') == "yes"){
			obj.simbol.on("click",function(){var idx=obj.simbol.index($(this));_move(idx);return false;});
		}

		obj.btn_play.on("click",function(){
			obj.auto = "Y";
			obj.btn_play.hide();
			obj.btn_stop.show();
			_play();
			return false;
		});
		obj.btn_stop.on("click",function(){
			obj.auto = "N";
			obj.btn_play.show();
			obj.btn_stop.hide();
			_stop();
			return false;
		});

		if(obj.auto == "Y"){
			obj.btn_play.click();
		}
	}

	for(var i=0; i<$('[data-js="slide-2"]').size(); i++){
		_set($('[data-js="slide-2"]').eq(i));
	}
}

function main_item_3(){
	function _set(str){
		var obj = str;
			obj.menu = obj.find(" .head>ul>li");
			obj.box = obj.find(" .midd>.view[data-page]");

		function _set(idx){
			obj.menu.removeClass("on");
			obj.menu.find(">a[data-page='"+idx+"']").parent().addClass("on");
			obj.box.removeClass("on");
			obj.find(" .midd>.view[data-page='"+idx+"']").addClass("on");

			obj.find(" .midd").getNiceScroll(0).doScrollTop('y', 0);
		}

		obj.menu.find(">a").on("click",function(){
			var idx = $(this).attr("data-page");
			_set(idx);
			return false;
		});
		obj.menu.eq(0).find(">a").click();
	}
	for(var i=0; i<$('[data-item="3"]').size(); i++){
		_set($('[data-item="3"]').eq(i));
	}
}

function main_item_5(){
	function _set(str){
		var obj = str;
			obj.menu = obj.find(" .midd>.tabs>ul>li");
			obj.box = obj.find(" .midd>.move>[data-page]");

		function _set(idx){
			obj.menu.removeClass("on");
			obj.menu.find(">a[data-page='"+idx+"']").parent().addClass("on");
			obj.box.removeClass("on");
			obj.find(" .midd>.move>[data-page='"+idx+"']").addClass("on");
		}

		obj.menu.find(">a").on("click",function(){
			var idx = $(this).attr("data-page");
			_set(idx);
			return false;
		});
		obj.menu.eq(0).find(">a").click();
	}
	for(var i=0; i<$('[data-item="5"]').size(); i++){
		_set($('[data-item="5"]').eq(i));
	}
}

function main_item_6(){
	function _set(str){
		var obj = str;
			obj.menu = obj.find(" .head>ul>li");
			obj.box = obj.find(" .midd>.view");

		function _set(idx){
			obj.menu.removeClass("on");
			obj.menu.find(">a[data-page='"+idx+"']").parent().addClass("on");
			obj.box.removeClass("on");
			obj.find(" .midd>.view[data-page='"+idx+"']").addClass("on");
		}

		obj.menu.find(">a").on("click",function(){
			var idx = $(this).attr("data-page");
			_set(idx);
			return false;
		});
	}
	for(var i=0; i<$('[data-item="6"]').size(); i++){
		_set($('[data-item="6"]').eq(i));
	}
}

function main_item_7(){
	function _set(str){
		var obj = str;
			obj.btn = obj.find(" .head > a");
		
		function _move(idx){
			obj.attr('data-page',(idx+1));
		}
		_move(0);
		obj.btn.on("click",function(){
			var idx = obj.find(" .head").index($(this).parent());
			_move(idx);
			return false;
		});
	}

	for(var i=0; i<$('[data-item="7"]').size(); i++){
		_set($('[data-item="7"]').eq(i));
	}

}

function modal(){
	return {
		on:function(str){
			$('[data-skin="modal"][data-name="'+str+'"]').show();
			$("body").attr("data-modal","yes");
		},
		off:function(){
			$('[data-skin="modal"]').hide();
			$("body").removeAttr("data-modal");
		}
	}
}
var modal = modal();

function alertbox(){
	return {
		on:function(str){
			$('[data-skin="alert"][data-name="'+str+'"]').show();
			$("body").attr("data-modal","yes");
		},
		off:function(){
			$('[data-skin="alert"]').hide();
			$("body").removeAttr("data-modal");
		}
	}
}
var alertbox = alertbox();


//2021.01.04 추가 :s
function slide_quick(){
	if($('[data-skin="slide-quick"]').size() == 0) return false;
	var obj = $('[data-skin="slide-quick"]');
		obj.btn_close = obj.find(" a.close");

	obj.btn_close.on("click",function(){
		obj.hide();
		return false;
	});
}
//2021.01.04 추가 :e