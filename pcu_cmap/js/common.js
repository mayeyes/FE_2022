/**
 * Commons.js
 * 공통기능 JS
 * ==============================================
 * @author PJY
 * @history     작성일     작성자     변경내용
 * @history 2019.04.08    PJY      최초작성
 * @history 2019.04.08    PJY      공통 파라미터 생성함수 정의
 * ==============================================
 */

/**
 * REQUEST METHOD 상수
 * @author PJY
 */
const METHOD = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS'
};
const MESSAGE = {
    DELETE: '삭제하시겠습니까 ?',
    DELETED: '삭제하였습니다.',
    FAILED: '실패하였습니다.',
    RESET: '초기화하시겠습니까?',
    REMOVE: '완전 삭제하시겠습니까? 복원이 불가능합니다.',
    RECOVERY: '복원하시겠습니까?',
    SAVED:'저장하였습니다.',
    EDIT:'수정하시겠습니까?',
    SELECT:'선택하시겠습니까?',
    APPLIED:'적용되었습니다.'
};
/**
 * VALIDATE_MESSAGE 상수
 * @author PJY
 */
const VALIDATE_MESSAGE = '은(는) 필수 값입니다';

/**
 * 공통 VALIDATE_MESSAGE FUNCTION
 * @param tagName 태그명
 * @author PJY
 */
const validateMsg = (tagName) => {
    const tag = document.getElementById(tagName);
    const label = tag.parentNode.previousSibling.previousSibling;
    alert(label.innerText + VALIDATE_MESSAGE);
};

/**
 * AJAX - GET Function
 * @param url
 * @param data
 * @author PJY
 */
$.ajaxGet = (url,data) => {
    return $.ajax({
        url: url,
        data: data,
        method: 'GET',
        dataType: 'json',
        contentType:'application/json'
    });
};

/**
 * AJAX - POST Function
 * @param url
 * @param data
 * @author PJY
 */
$.ajaxPost = (url, data) => {
   return $.ajax({
        url: url,
        data: data,
        method: 'POST',
        dataType: 'json',
        contentType:'application/json'
    });
};


/**
 * AJAX - PUT Function
 * @param url
 * @param data
 * @author PJY
 */
$.ajaxPut = (url, data) => {
    return $.ajax({
        url: url,
        data: data,
        method: 'PUT',
        dataType: 'json',
        contentType:'application/json'
    });
};

/**
 * AJAX - DELETE Function
 * @param url
 * @param data
 * @author PJY
 */
$.ajaxDelete = (url,data) => {
    return $.ajax({
        url: url,
        data: data,
        method: 'DELETE',
        dataType: 'json',
        contentType:'application/json'
    });
};

$.fn.serializeObject = function () {
    const o = {};
    const a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];

            }
            o[this.name].push(this.value || '');

        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
/**
 * 공통 함수 정의
 * @type {{createParams: (function(*, *=): string)}}
 */
const COMMON = {
    createParams (form, pageIndex = 1 ) {
        const searchCondition = form.searchCondition.value;
        const searchKeyword = form.searchKeyword.value;
        const mno = form.mno.value;
        const params = {
            mno,
            pageIndex,
            searchCondition,
            searchKeyword
        };
        const result = Object.keys(params).reduce((result, key, index) => {
            if (params[key]) {
                return result + `${key}=${params[key]}&`;
            } else {
                return result;
            }
        }, '?');
        return result;
    },
    createParamsWithSearchDate (form, pageIndex = 1) {
        const searchCondition = form.searchCondition.value;
        const searchKeyword = form.searchKeyword.value;
        const mno = form.mno.value;
        const searchSDate = form.searchSDate.value;
        const searchEDate = form.searchEDate.value;
        const params = {
            mno,
            pageIndex,
            searchCondition,
            searchKeyword,
            searchSDate,
            searchEDate,
        };
        const result = Object.keys(params).reduce((result, key, index) => {
            if (params[key]) {
                return result + `${key}=${params[key]}&`;
            } else {
                return result;
            }
        }, '?');
        return result;
    }
};

/* 발리데이션 결과 */
const validateResult = (responseJSON) => {
    if (responseJSON.causes) {
        return responseJSON.causes.reduce((result, data, index) => `${result}${data.message}\n`, "");
    }
    return responseJSON.message;
};

const checkText = {
    onlyEngNum(event){
        event = event || window.event;
        let keyID = (event.which) ? event.which : event.keyCode;
        if (!(keyID >=37 && keyID<=40)) {
            event.target.value = event.target.value.replace(/[^a-z0-9\-\_\.]/gi, "");
        }
    },
    onlyNum(event){
        event = event || window.event;
        let keyID = (event.which) ? event.which : event.keyCode;
        if ( !((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 9 || keyID == 46 || keyID == 35 || keyID == 36 || keyID == 37 || keyID == 39) ) {
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
    },
    resize(obj) {// textarea 높이 자동 조절
        obj.style.height = "1px";
        obj.style.height = (12+obj.scrollHeight)+"px";
    },
};

$(()=>{
    // div_onlyEngNum 클래스를 사용할 시 영문과 숫자만 입력 가능
    $(".div_onlyEngNum").keyup(function(event){
        checkText.onlyEngNum(event);
    });
    // div_onlyNum 클래스를 사용할 시 숫자만 입력 가능
    $(".div_onlyNum").keyup(function(event){
        checkText.onlyNum(event);
    });
    $(".div_txtAutoSize").keyup(function(event){
        checkText.resize(event.target);
    });
    $(".div_txtAutoSize").each((i,obj)=>{
        checkText.resize(obj);
    });
});

function copyToClipboard(val) {
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
}
function clip_paste(val){
    copyToClipboard(val);
    alert('복사되었습니다.');
}
function searchClose(){ //통합검색 닫기
    $("#totalsearch").val("");
    $(".search_btn").removeClass("on");
    $(".search_btn2").removeClass("on");
    $(".search_datail").hide().stop().animate({"opacity":0},300,"easeOutCubic",function(){
        $(this).hide();
        $(".search_btn").focus();
        $(".search_btn2").focus();
    });
    return true;
}
function checkMobile(){
    //모바일/PC 스크립트 인식 구분
    let filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {//MOBILE
            return true;
        } else {//PC
            return false;
        }
    }
}
function gologin(){
    if(checkMobile()){//mobile
        location.href = "https://login.kongju.ac.kr/?sg_pkid=KNU0001&gourl=&sg_return=https://www.kongju.ac.kr/loginResult.jsp";
    }else{//pc
        location.href = "https://login.kongju.ac.kr/?sg_pkid=S05VMDAwMQ==&gourl=&sg_return=aHR0cHM6Ly93d3cua29uZ2p1LmFjLmtyL2xvZ2luUmVzdWx0LmpzcA==&sg_type=bm9uVmFs&sg_error_url=bm9uVmFs&ok=bm9uVmFs";
    }
}