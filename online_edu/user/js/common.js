function _ID(obj){return document.getElementById(obj)}

function iciScroll(obj)
{
    if (event.wheelDelta >= 120) obj.scrollTop -= 40;
    else if (event.wheelDelta <= -120) obj.scrollTop += 40;
    //obj.scrollBy(0,event.wheelDelta / -3);
    return false;
}

/**
 * chkForm(form)
 *
 * 입력박스의 null 유무 체크와 패턴 체크
 *
 * @Usage	<form onSubmit="return chkForm(this)">
 */

function chkForm(form)
{
    if (typeof(mini_obj)!="undefined" || document.getElementById('_mini_oHTML')) mini_editor_submit();

    for (i=0;i<form.elements.length;i++){
        currEl = form.elements[i];
        if (currEl.disabled) continue;
        if (currEl.getAttribute("required")!=null){
            if (currEl.type=="checkbox" || currEl.type=="radio"){
                if (!chkSelect(form,currEl,currEl.getAttribute("msgR"))) return false;
            } else {
                if (!chkText(currEl,currEl.value,currEl.getAttribute("msgR"))) return false;
            }
        }
        if (currEl.getAttribute("option")!=null && currEl.value.length>0){
            if (!chkPatten(currEl,currEl.getAttribute("option"),currEl.getAttribute("msgO"))) return false;
        }
        if (currEl.getAttribute("minlength")!=null){
            if (!chkLength(currEl,currEl.getAttribute("minlength"))) return false;
        }
        if (currEl.getAttribute("maxlen")!=null){
            if(!chkMaxLength(currEl,currEl.getAttribute("maxlen"))) return false;
        }
    }
    if (form.password2){
        if (form.password.value!=form.password2.value){
            alert("비밀번호가 일치하지 않습니다");
            form.password.value = "";
            form.password2.value = "";
            return false;
        }
    }

    if (form['resno[]'] && !chkResno(form)) return false;
    if (form.chkSpamKey) form.chkSpamKey.value = 1;
    if (document.getElementById('avoidDbl')) document.getElementById('avoidDbl').innerHTML = "--- 데이타 입력중입니다 ---";
    return true;
}

function chkMaxLength(field,len){
    if (chkByte(field.value) > len){
        if (!field.getAttribute("label")) field.setAttribute("label", field.name);
        alert("["+field.getAttribute("label") + "]은 "+ len +"Byte 이하 여야 합니다.");
        return false;
    }
    return true;
}

function chkLength(field,len)
{
    text = field.value;
    if (text.trim().length<len){
        alert(len + "자 이상 입력하셔야 합니다");
        field.focus();
        return false;
    }
    return true;
}

function chkText(field,text,msg)
{
    text = text.replace("　", "");
    text = text.replace(/\s*/, "");
    if (text==""){
        var caption = field.parentNode.parentNode.firstChild.innerText;
        if (!field.getAttribute("label")) field.setAttribute("label",(caption)?caption:field.name);
        if (!msg) msg = "[" + field.getAttribute("label") + "] 필수입력사항";
        alert(msg);
        if (field.tagName!="SELECT") field.value = "";
        if (field.type!="hidden") field.focus();
        return false;
    }
    return true;
}

function chkSelect(form,field,msg)
{
    var ret = false;
    fieldname = eval("form.elements['"+field.name+"']");
    if (fieldname.length){
        for (j=0;j<fieldname.length;j++) if (fieldname[j].checked) ret = true;
    } else {
        if (fieldname.checked) ret = true;
    }
    if (!ret){
        if (!field.getAttribute("label")) field.setAttribute("label", field.name);
        if (!msg) msg = "[" + field.getAttribute("label") + "] 필수선택사항";
        alert(msg);
        field.focus();
        return false;
    }
    return true;
}

function chkPatten(field,patten,msg)
{
/*	20130626 버그로 인한 주석처리 장선아
 *
 * 	var regNum			= /^[0-9]+$/;
    var regEmail		= /^[^"'@]+@[._a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    var regUrl			= /^(http\:\/\/)*[.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    var regAlpha		= /^[a-zA-Z]+$/;
    var regHangul		= /[가-?]/;
    var regHangulEng	= /[가-?a-zA-Z]/;
    var regHangulOnly	= /^[가-?]*$/;
    var regId			= /^[a-zA-Z0-9]{1}[^"']{3,9}$/;
    var regPass			= /^[a-zA-Z0-9_-]{4,12}$/;
    var regPNum			= /^[0-9]*(,[0-9]+)*$/;
    */
    patten = eval(patten);
    if (!patten.test(field.value)){
        if (!field.getAttribute("label")) field.setAttribute("label", field.name);
        if (!msg) msg = "[" + field.getAttribute("label") + "] 입력형식오류";
        alert(msg);
        field.focus();
        return false;
    }
    return true;
}

function formOnly(form){
    var i,idx = 0;
    var rForm = document.getElementsByTagName("form");
    for (i=0;i<rForm.length;i++) if (rForm[i].name==form.name) idx++;
    return (idx==1) ? form : form[0];
}

function chkResno(form)
{
    var resno = form['resno[]'][0].value + form['resno[]'][1].value;

    fmt = /^\d{6}[1234]\d{6}$/;
    if (!fmt.test(resno)) {
        alert('잘못된 주민등록번호입니다.'); return false;
    }

    birthYear = (resno.charAt(6) <= '2') ? '19' : '20';
    birthYear += resno.substr(0, 2);
    birthMonth = resno.substr(2, 2) - 1;
    birthDate = resno.substr(4, 2);
    birth = new Date(birthYear, birthMonth, birthDate);

    if ( birth.getYear()%100 != resno.substr(0, 2) || birth.getMonth() != birthMonth || birth.getDate() != birthDate) {
        alert('잘못된 주민등록번호입니다.');
        return false;
    }

    buf = new Array(13);
    for (i = 0; i < 13; i++) buf[i] = parseInt(resno.charAt(i));

    multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
    for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

    if ((11 - (sum % 11)) % 10 != buf[12]) {
        alert('잘못된 주민등록번호입니다.');
        return false;
    }
    return true;
}

/**
 * chkBox(El,mode)
 *
 * 동일한 이름의 체크박스의 체크 상황 컨트롤
 *
 * -mode	true	전체선택
 *			false	선택해제
 *			'rev'	선택반전
 * @Usage	<input type=checkbox name=chk[]>
 *			<a href="javascript:void(0)" onClick="chkBox(document.getElementsByName('chk[]'),true|false|'rev')">chk</a>
 */

function chkBox(El,mode)
{
    if (!El) return;
    for (i=0;i<El.length;i++) El[i].checked = (mode=='rev') ? !El[i].checked : mode;
}

/**
 * isChked(El,msg)
 *
 * 체크박스의 체크 유무 판별
 *
 * -msg		null	바로 진행
 *			msg		confirm창을 띄어 실행 유무 체크 (msg - confirm창의 질의 내용)
 * @Usage	<input type=checkbox name=chk[]>
 *			<a href="javascript:void(0)" onClick="return isChked(document.getElementsByName('chk[]'),null|msg)">del</a>
 */

function isChked(El,msg)
{
    if (!El) return;
    if (typeof(El)!="object") El = document.getElementsByName(El);
    if (El) for (i=0;i<El.length;i++) if (El[i].checked) var isChked = true;
    if (isChked){
        return (msg) ? confirm(msg) : true;
    } else {
        alert ("선택된 사항이 없습니다");
        return false;
    }
}

/**
 * comma(x), uncomma(x)
 *
 * 숫자 표시 (3자리마다 콤마찍기)
 *
 * @Usage	var money = 1000;
 *			money = comma(money);
 *			alert(money);
 *			alert(uncomma(money));
 */

function comma(x)
{
    var temp = "";
    var x = String(uncomma(x));

    num_len = x.length;
    co = 3;
    while (num_len>0){
        num_len = num_len - co;
        if (num_len<0){
            co = num_len + co;
            num_len = 0;
        }
        temp = ","+x.substr(num_len,co)+temp;
    }
    return temp.substr(1);
}

function uncomma(x)
{
    var reg = /(,)*/g;
    x = parseInt(String(x).replace(reg,""));
    return (isNaN(x)) ? 0 : x;
}

/**
 * tab(El)
 *
 * textarea 입력 박스에서 tab키로 공백 띄우기 기능 추가
 *
 * @Usage	<textarea onkeydown="return tab(this)"></textarea>
 */

function tab(El)
{
    if ((document.all)&&(event.keyCode==9)){
        El.selection = document.selection.createRange();
        document.all[El.name].selection.text = String.fromCharCode(9)
        document.all[El.name].focus();
        return false;
    }
}

function enter()
{
    if (event.keyCode == 13){
        if (event.shiftKey == false){
            var sel = document.selection.createRange();
            sel.pasteHTML('<br>');
            event.cancelBubble = true;
            event.returnValue = false;
            sel.select();
            return false;
        } else {
            return event.keyCode = 13;
        }
    }
}

/**
 * strip_tags(str)
 *
 * 태그안의 문자만 가져오는 함수
 */

function strip_tags(str)
{
    var reg = /<\/?[^>]+>/gi;
    str = str.replace(reg,"");
    return str;
}

/**
 * miniResize(obj)
 *
 * 이미지 테이블 크기에 맞추어서 리사이즈
 */

function miniResize(obj)
{
    fix_w = obj.clientWidth;
    var imgs = obj.getElementsByTagName("img");
    for (i=0;i<imgs.length;i++){
        //document.write("["+i+"] "+imgs[i].width+" - "+imgs[i].height+"<br>");
        if (imgs[i].width > fix_w){
            imgs[i].width = fix_w;
            imgs[i].style.cursor = "pointer";
            imgs[i].title = "view original size";
            imgs[i].onclick = popupImg;
        }
    }
}

function miniSelfResize(contents,obj)
{
    fix_w = contents.clientWidth;
    if (obj.width > fix_w){
        obj.width = fix_w;
        obj.title = "popup original size Image";
    } else obj.title = "popup original Image";
    obj.style.cursor = "pointer";
    obj.onclick = popupImg;
}

function popupImg(src,base)
{
    if (!src) src = this.src;
    if (!base) base = "";
    window.open(base+'../board/viewImg.php?src='+escape(src),'','width=1,height=1');
}

/**
 * 문자열 Byte 체크 (한글 2byte)
 */
function chkByte(str)
{
    var length = 0;
    for(var i = 0; i < str.length; i++)
    {
        if(escape(str.charAt(i)).length >= 4)
            length += 2;
        else
            if(escape(str.charAt(i)) != "%0D")
                length++;
    }
    return length;
}

/**
 * 문자열 자르기 (한글 2byte)
 */
function strCut(str, max_length)
{
    var str, msg;
    var length = 0;
    var tmp;
    var count = 0;
    length = str.length;

    for (var i = 0; i < length; i++){
        tmp = str.charAt(i);
        if(escape(tmp).length > 4) count += 2;
        else if(escape(tmp) != "%0D") count++;
        if(count > max_length) break;
    }
    return str.substring(0, i);
}

/**
 * etc..
 */

function get_objectTop(obj){
    if (obj.offsetParent == document.body) return obj.offsetTop;
    else return obj.offsetTop + get_objectTop(obj.offsetParent);
}

function get_objectLeft(obj){
    if (obj.offsetParent == document.body) return obj.offsetLeft;
    else return obj.offsetLeft + get_objectLeft(obj.offsetParent);
}

function mv_focus(field,num,target)
{
    len = field.value.length;
    if (len==num && event.keyCode!=8) target.focus();
}

function onlynumber()
{
    var e = event.keyCode;
    window.status = e;
    if (e>=48 && e<=57) return;
    if (e>=96 && e<=105) return;
    if (e>=37 && e<=40) return;
    if (e==8 || e==9 || e==13 || e==46) return;
    event.returnValue = false;
}

function explode(divstr,str)
{
    var temp = str;
    var i;
    temp = temp + divstr;
    i = -1;
    while(1){
        i++;
        this.length = i + 1;
        this[i] = temp.substring(0, temp.indexOf( divstr ) );
        temp = temp.substring(temp.indexOf( divstr ) + 1, temp.length);
        if (temp=="") break;
    }
}

function getCookie( name )
{
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
        var y = (x+nameOfCookie.length);
        if ( document.cookie.substring( x, y ) == nameOfCookie ) {
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )
            break;
    }
    return "";
}

/*프로퍼티 미사용으로 인한 주석처리 > 2013 06 26 장선아
 *
 * String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
}*/

/**
 * chg_cart_ea(obj,str)
 *
 * 카트 수량 변경하기
 *
 * -obj		카드 수량 입력박스 아이디
 * -str		up|dn
 * -idx		인덱스 번호 (생략 가능)
 */

function chg_cart_ea(obj,str,idx)
{
    if (obj.length) obj = obj[idx];
    if (isNaN(obj.value)){
        alert ("구매수량은 숫자만 가능합니다");
        obj.value=1;
        obj.focus();
    } else {
        if (str=='up') obj.value++;
        else  obj.value--;
        if (obj.value==0) obj.value=1;
    }
}

function buttonX(str,action,width)
{
    if (!width) width	= 100;
    if (action) action	= " onClick=\"" + action + "\"";
    ret = "<button style='width:" + width + ";background-color:transparent;color:transparent;border:0;cursor:default' onfocus=this.blur()" + action + ">";
    ret += "<table width=" + (width-1) + " cellpadding=0 cellspacing=0>";
    ret += "<tr height=22><td><img src='../img/btn_l.gif'></td>";
    ret += "<td width=100% background='../img/btn_bg.gif' align=center style='font:8pt tahoma' nowrap>" + str + "</td>";
    ret += "<td><img src='../img/btn_r.gif'></td></tr></table></button>";
    document.write(ret);
}

/**
 * selectDisabled(oSelect)
 *
 * 셀렉트박스에 disabled 옵션추가
 */
function selectDisabled(oSelect)
{
    var isOptionDisabled = oSelect.options[oSelect.selectedIndex].disabled;
    if (isOptionDisabled){
        oSelect.selectedIndex = oSelect.preSelIndex;
        return false;
    } else oSelect.preSelIndex = oSelect.selectedIndex;
    return true;
}

/** prototype **/
/*버그로인한주석처리
String.prototype.trim = function(){ return this.replace(/(^\s*)|(\s*$)/g, ""); }
*/
/** 추가 스크립 **/

function viewSub(obj)
{
    var obj = obj.parentNode.childNodes[1].childNodes[0];
    obj.style.display = "block";
}

function hiddenSub(obj)
{
    var obj = obj.parentNode.childNodes[1].childNodes[0];
    obj.style.display = "none";
}

function execSubLayer()
{
    var obj = document.getElementById('menuLayer');
    for (i=0;i<obj.rows.length;i++){
        if (typeof(obj.rows[i].cells[1].childNodes[0])!="undefined"){
            obj.rows[i].cells[0].onmouseover = function(){ viewSub(this) }
            obj.rows[i].cells[0].onmouseout = function(){ hiddenSub(this) }
            obj.rows[i].cells[1].style.position = "relative";
            obj.rows[i].cells[1].style.verticalAlign = "top";
            obj.rows[i].cells[1].childNodes[0].onmouseover = function(){ viewSub(this.parentNode.parentNode.childNodes[0]) };
            obj.rows[i].cells[1].childNodes[0].onmouseout = function(){ hiddenSub(this.parentNode.parentNode.childNodes[0]) };
        }
    }
}

function popup(src,width,height)
{
    window.open(src,'','width='+width+',height='+height+',scrollbars=1');
}

function popup2(src,width,height,scrollbars)
{
    if ( scrollbars=='' ) scrollbars=1;
    window.open(src,'','width='+width+',height='+height+',scrollbars='+scrollbars);
}

function popup3(src,width,height,scrollbars, resize)
{
    if ( scrollbars=='' ) scrollbars=1;
    if ( resize=='' ) resize=1;
    window.open(src,'','width='+width+',height='+height+',scrollbars='+scrollbars+',resizable='+resize);
}

/*-------------------------------------
 공용 - 윈도우 팝업창 호출 / 리턴
-------------------------------------*/
function popup_return( theURL, winName, Width, Height, left, top, scrollbars ){

    if ( !Width ) Width=500;
    if ( !Height ) Height=415;
    if ( !left ) left=200;
    if ( !top ) top=10;
    if ( scrollbars=='' ) scrollbars=0;
    features = "loaction=no, directories=no, Width="+Width+", Height="+Height+", left="+left+", top="+top+", scrollbars="+scrollbars;
    var win = window.open( theURL, winName, features );

    return win;
}

/*** 할인액 계산 ***/
function getDcprice(price,dc)
{
    if (!dc) return 0;
    var ret = (dc.match(/%$/g)) ? price * parseInt(dc.substr(0,dc.length-1)) / 100 : parseInt(dc);
    return parseInt(ret / 100) * 100;
}

/*** 플래시 출력 ***/
function embed(src,width,height)
{
    document.write('\
    <OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="'+width+'" HEIGHT="'+height+'"  ALIGN="" name="flashProdnodep">\
    <PARAM NAME=movie VALUE="'+src+'">\
    <PARAM NAME=quality VALUE=high>\
    <PARAM NAME=wmode VALUE=transparent>\
    <PARAM NAME=bgcolor VALUE=#FFFFFF>\
    <EMBED src="'+src+'" quality=high bgcolor=#FFFFFF WIDTH="'+width+'" HEIGHT="'+height+'" NAME="flashProdnodep" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>\
    </OBJECT>\
    ');
}

/*** 관리자 페이지 관련 스크립트 ***/

function showSub(obj)
{
    var obj = obj.parentNode.getElementsByTagName('ul');
    obj[0].style.display = (obj[0].style.display!="block") ? "block" : "none";
}

function showSubAll(mode)
{
    var obj = _ID('navi');
    el = obj.getElementsByTagName('ul');
    for (i=0;i<el.length;i++) el[i].style.display = mode;
}

function iniLocation()
{
    var div = _ID('location').childNodes[0].nodeValue.split(" > ");
    var navi = document.getElementsByName('navi');

    for (i=0;i<navi.length;i++){
        var spot = navi[i].innerHTML;
        if (spot==div[2]) navi[i].style.fontWeight = "bold";
    }
}

function table_design_load()
{
    var tb = document.getElementsByTagName('table');
    for (i=0;i<tb.length;i++){
        if (tb[i].className=="tb"){
            with (tb[i]){
                setAttribute('border', 1);
                setAttribute('borderColor', "#e6e6e6");
                //setAttribute('rules', 'none');
                setAttribute('cellPadding',5);
                //frame = "hsides";
                //rules = "rows";
                //cellPadding = "4";
            }
            with (tb[i].style){

                width = "100%";
                borderCollapse = "collapse";
            }
        }
    }
}

function hiddenLeft()
{
    if(_ID('leftMenu').style.display!="none"){
        _ID('leftMenu').style.display = "none";
        _ID('btn_menu').style.display = "block";
        _ID('sub_left_menu').style.display = "block";
        document.getElementById('leftfooter').src = "../images/footer_left_off.gif";

    }else{
        document.getElementById('leftfooter').src = "../images/footer_left.gif";
        _ID('sub_left_menu').style.display = "none";
        _ID('btn_menu').style.display = "none";
        _ID('leftMenu').style.display = "block";
    }
}

function openLayer(obj,mode)
{
    obj = _ID(obj);
    if (mode) obj.style.display = mode;
    else obj.style.display = (obj.style.display!="none") ? "none" : "block";
}

/*** 레이어 팝업창 띄우기 ***/
function popupLayer(s,w,h) {

    if (!w) w = 600;
    if (!h) h = 400;

    var pixelBorder = 3;
    var titleHeight = 12;
    w += pixelBorder * 2;
    h += pixelBorder * 2 + titleHeight;

    var bodyW = document.body.clientWidth;
    var bodyH = document.body.clientHeight;

    var posX = (bodyW - w) / 2;
    var posY = (bodyH - h) / 2;

    hiddenSelectBox('hidden');

    /*** 백그라운드 레이어 ***/
    var obj = document.createElement("div");
    with (obj.style){
        position = "absolute";
        left = 0;
        top = 0;
        width = "100%";
        height = document.body.scrollHeight;
        backgroundColor = "#000000";
        filter = "Alpha(Opacity=80)";
        opacity = "0.5";
    }
    obj.id = "objPopupLayerBg";
    document.body.appendChild(obj);

    /*** 내용프레임 레이어 ***/
    var obj = document.createElement("div");
    with (obj.style){
        position = "absolute";
        left = posX + document.body.scrollLeft;
        top = posY + document.body.scrollTop;
        width = w;
        height = h;
        backgroundColor = "#ffffff";
        border = "3px solid #000000";
    }
    obj.id = "objPopupLayer";
    document.body.appendChild(obj);

    /*** 타이틀바 레이어 ***/
    var bottom = document.createElement("div");
    with (bottom.style){
        position = "absolute";
        width = w - pixelBorder * 2;
        height = titleHeight;
        left = 0;
        top = h - titleHeight - pixelBorder * 3;
        padding = "4px 0 0 0";
        textAlign = "center";
        backgroundColor = "#000000";
        color = "#ffffff";
        font = "bold 8pt tahoma; letter-spacing:0px";

    }
    bottom.innerHTML = "<a href='javascript:closeLayer()' class='white'>X close</a>";
    obj.appendChild(bottom);

    /*** 아이프레임 ***/
    var ifrm = document.createElement("iframe");
    with (ifrm.style){
        width = w - 6;
        height = h - pixelBorder * 2 - titleHeight - 3;
        //border = "3 solid #000000";
    }
    ifrm.frameBorder = 0;
    ifrm.src = s;
    //ifrm.className = "scroll";
    obj.appendChild(ifrm);
}

function closeLayer()
{
    hiddenSelectBox('visible');
    _ID('objPopupLayer').parentNode.removeChild( _ID('objPopupLayer') );
    _ID('objPopupLayerBg').parentNode.removeChild( _ID('objPopupLayerBg') );
}
function hiddenSelectBox(mode)
{
    var obj = document.getElementsByTagName('select');
    for (i=0;i<obj.length;i++){
        obj[i].style.visibility = mode;
    }
}

/*-------------------------------------
자바스크립트 동적 로딩
-------------------------------------*/
function exec_script(src)
{
    var scriptEl = document.createElement("script");
    scriptEl.src = src;
    _ID('dynamic').appendChild(scriptEl);
}

/*-------------------------------------
 CSS 라운드 테이블
 ------------------------------------*/
function cssRound(id,color,bg)
{
    if (!bg) bg = '#ffffff';
    color = '#93a0a6';
    var obj = _ID(id);
    obj.style.backgroundColor = color;
    with (obj.style){
        margin = "5px 0 0 0";
        color = "#4c4c4c";
        font = "8pt dotum";
    }
    obj.innerHTML = "<div style='padding:8px 13px;'><img src='../img/icn_chkpoint.gif'><br>" + obj.innerHTML + "</div>";

    cssRound_top(obj,bg,color);
    cssRound_bottom(obj,bg,color);
}

function cssRound_top(el,bg,color)
{
    var d=document.createElement("b");
    d.className="rOut";
    d.style.fontSize = 0;
    d.style.backgroundColor=bg;
    for(i=1;i<=4;i++){
        var x=document.createElement("b");
        x.className="r" + i;
        x.style.backgroundColor=color;
        d.appendChild(x);
    }
    el.style.paddingTop=0;
    el.insertBefore(d,el.firstChild);
}

function cssRound_bottom(el,bg,color){
    var d=document.createElement("b");
    d.className="rOut";
    d.style.fontSize = 0;
    d.style.backgroundColor=bg;
    for(i=4;i>0;i--){
        var x=document.createElement("b");
        x.className="r" + i;
        x.style.backgroundColor=color;
        d.appendChild(x);
    }
    el.style.paddingBottom=0;
    el.appendChild(d);
}

/*-------------------------------------
 색상표 보기
-------------------------------------*/
function colortable(){

    var hrefStr = '../proc/help_colortable.php';

    var win = popup_return( hrefStr, 'colortable', 400, 400, 200, 200, 0 );
    win.focus();
}

/*-------------------------------------
 WebFTP
-------------------------------------*/
function webftp(){

    var hrefStr = '../design/popup.webftp.php';

    var win = popup_return( hrefStr, 'webftp', 900, 800, 50, 50, 1 );
    win.focus();
}

/*-------------------------------------
 WebFTP Fileinfo
-------------------------------------*/
function webftpinfo( file_root ){

    if ( file_root == '' ){
        alert( '업로드된 이미지가 없습니다.' );
        return;
    }

    var hrefStr = '../design/webftp/webftp_info.php?file_root=' + file_root;

    var win = popup_return( hrefStr, '', 190, 300, 50, 50, 0 );
    win.focus();
}

/*-------------------------------------
 Stylesheet
-------------------------------------*/
function stylesheet(){

    var hrefStr = '../design/iframe.css.php';

    var win = popup_return( hrefStr, 'stylesheet', 900, 650, 100, 100, 1 );
    win.focus();
}

/*-------------------------------------
 manual
-------------------------------------*/
function manual(){

    var hrefStr = 'http://guide.godo.co.kr/season2/board/list.php?id=exgoods';

    var win = popup_return( hrefStr, 'manual', 1000, 780, 100, 100, 1 );
    win.focus();
}

/*-------------------------------------
 공용 - 체크박스 체크
 ckFlag : select, reflect, deselect
 CObj : checkbox object
-------------------------------------*/
function PubAllSordes( ckFlag, CObj ){

    if ( !CObj ) return;
    var ckN = CObj.length;

    if ( ckN != null ){

        if ( ckFlag == "select" ){
            for ( jumpchk = 0; jumpchk < ckN; jumpchk++ ) CObj[jumpchk].checked = true;
        }
        else if ( ckFlag=="reflect" ){
            for ( jumpchk = 0; jumpchk < ckN; jumpchk++ ){
                if ( CObj[jumpchk].checked == false ) CObj[jumpchk].checked = true; else CObj[jumpchk].checked = false;
            }
        }
        else{
            for ( jumpchk = 0; jumpchk < ckN; jumpchk++ ) CObj[jumpchk].checked = false;
        }
    }
    else {

        if ( ckFlag == "select" ) CObj.checked = true;
        else if ( ckFlag == "reflect" ){
            if ( CObj.checked == false ) CObj.checked = true; else CObj.checked = false;
        }
        else CObj.checked = false;
    }
}

/*-------------------------------------
 공용 - 체크박스 한개이상 체크여부
 CObj : checkbox object
-------------------------------------*/
function PubChkSelect( CObj ){

    if ( !CObj ) return;
    var ckN = CObj.length;

    if ( ckN != null ){

        var sett = 0;
        for ( jumpchk = 0; jumpchk < ckN; jumpchk++ ){
            if ( CObj[jumpchk].checked == false ) sett++;
        }

        if ( sett == ckN ) return false;
        else return true;
    }
    else{

        if ( CObj.checked == true ) return true;
        else return false;
    }
}

function setDate(obj,from,to)
{
    var obj = document.getElementsByName(obj);
    obj[0].value = (from) ? from : "";
    obj[1].value = (from) ? to : "";
}

/**********************
 * categoryBox
 *
 * @name	category 폼객체명
 * @idx		category 박스 갯수
 */

function categoryBox(name,idx,val,type,formnm)
{
    if (!idx) idx = 1;
    if (type=="multiple") type = "multiple style='width:160px;height:96'";
    for (i=0;i<idx;i++) document.write("<select " + type + " idx=" + i + " name='" + name + "' onchange='categoryBox_request(this)' class='select'></select>");

    oForm = eval("document.forms['" + formnm + "']");

    if ( oForm == null ) this.oCate = eval("document.forms[0]['" + name + "']");
    else{ this.oCate = eval("document." + oForm.name + "['" + name + "']"); }

    if (idx==1) this.oCate = new Array(this.oCate);

    this.categoryBox_init = categoryBox_init;
    this.categoryBox_build = categoryBox_build;
    this.categoryBox_init();

    function categoryBox_init()
    {
        this.categoryBox_build();
        categoryBox_request(this.oCate[0],val);
    }

    function categoryBox_build()
    {
        for (i=0;i<4;i++){
            if (this.oCate[i]){
                this.oCate[i].options[0] = new Option("= "+(i+1)+"차 분류 =","");
            }
        }
    }

}

function categoryBox_request(obj,val)
{
    if (!val) val = "";
    var idx = obj.getAttribute('idx');

    if ( document.location.href.indexOf("/admin") == -1 ){
        exec_script("../lib/_categoryBox.script.php?mode=user&idx=" + idx + "&obj=" + obj.name + "&formnm=" + obj.form.name + "&val=" + val + "&category=" + obj.value);
    }
    else {
        exec_script("../../lib/_categoryBox.script.php?mode=admin&idx=" + idx + "&obj=" + obj.name + "&formnm=" + obj.form.name + "&val=" + val + "&category=" + obj.value);
    }
}

/**
 * Calendar Script
 * @usage	<input type=text onclick="calendar(event)">
 */

var now			= new Date();
var static_now	= new Date();
var week		= new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
var weekNum		= new Array(1,2,3,4,5,6,7);

var tagNm		= "";
var thisObj		= "";
var eventElement= "";
var dy_calOpen	= "n";

function calendar(e)
{
    var event = e || window.event;
    if( !appname ){
        var appname = navigator.appName.charAt(0);
    }

    if( appname == "M" ){
        eventElement = event.srcElement;
        tagNm = eventElement.tagName;
    }else{
        eventElement = event.target;
        tagNm = eventElement.tagName;
    }

    var dy_x = event.clientX;
    var dy_y = event.clientY;

    if( dy_calOpen == 'n' ){
        var NewElement = document.createElement("div");
        with (NewElement.style){
            position	= "absolute";
            left		= dy_x;
            top			= dy_y;
            width		= "205px";
            Height		= "170px";
            background	= "#ffffff";
            border		= "0px";
        }
        NewElement.id = "Dynamic_CalendarID";
        document.body.appendChild(NewElement);
        thisObj = NewElement;
        dy_calOpen = 'y';
    }else{
        thisObj.style.left	= dy_x;
        thisObj.style.top	= dy_y;
    }

    //달력 출력하기!!
    var calCont = calendarSet();
}

function calendarSet(val){

    var now_date	= new Date();

    var p;
    var z=0;

    switch(val){
        case 1:now.setFullYear(now.getFullYear()-1);break;
        case 2:now.setMonth(now.getMonth()-1);break;
        case 3:now.setMonth(now.getMonth()+1);break;
        case 4:now.setFullYear(now.getFullYear()+1);break;
        case 5:now=now_date;break;
    }

    var NowYear = now.getFullYear();
    var NowMonth = now.getMonth();
    var m_infoDate = NowYear+'/'+NowMonth;

    last_date = new Date(now.getFullYear(),now.getMonth()+1,1-1);	//해당월 마지막 일자
    first_date= new Date(now.getFullYear(),now.getMonth(),1);		//해당월 처음일자 요일

    var now_scY = now.getFullYear()+"";
    var calendar_area = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border:4px #ffffff solid;\"><tr><td><table width=\"245\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" bgcolor=\"ffffff\" style=\"border:6px #78b300 solid;\"><tr height=\"26\" bgcolor=\"ffffff\" align=\"center\"><td style=\"padding-top:3px; padding-left:10px; \"> \n";
    calendar_area += "<div class=\"calendarTitleY\">";
    calendar_area += "<span onclick=\"calendarSet(1)\" style='cursor:pointer;'>◀ </span>";
    calendar_area += now_scY;
    calendar_area += "<span onclick=\"calendarSet(4)\" style='cursor:pointer;'> ▶</span>";
    calendar_area += "</div> \n";
    calendar_area += "<div class=\"calendarTitleM\">";
    calendar_area += "<span onclick=\"calendarSet(2)\" style='cursor:pointer;'>◀ </span>";
    calendar_area += (now.getMonth()+1) +"";
    calendar_area += "<span onclick=\"calendarSet(3)\" style='cursor:pointer;'> ▶</span>";
    calendar_area += "</div> \n";
    for(i=0;i<week.length;i++){
        if( weekNum[i] == 1 ) {
            calendar_area += "<div class=\"calendarWeekS\">"+week[i]+"</div> \n";
        } else if( weekNum[i] == 7 ) {
            calendar_area += "<div class=\"calendarWeekT\">"+week[i]+"</div> \n";
        } else {
            calendar_area += "<div class=\"calendarWeek\">"+week[i]+"</div> \n";
        }
    }

    calendar_area +="<div class=\"clearboth\"></div> \n";

    for(i=1;i<=first_date.getDay();i++){
        calendar_area+="<div class=\"calendarNoDay\">&nbsp;</div> \n";
    }

    z=(i-1);
    var clickDay;
    var weekCnt = 1;
    for (i=1;i<=last_date.getDate();i++){
        z++;
        p=z%7;
        var pmonth=now.getMonth()+1;
        if(i<10){var ii="0"+i;}else{var ii=i;}
        if(pmonth<10){pmonth="0"+pmonth;}

        clickDay = now.getFullYear() +''+ pmonth +''+ ii;

        // 날짜 출력
        if(i == now.getDate() && now.getFullYear()==static_now.getFullYear() && now.getMonth()==static_now.getMonth()){
            calendar_area += "<div class=\"calendarToDay\" onclick=\"calendarPrint('"+clickDay+"');\">"+ii+"</div> \n";
        }else if( p == 0 ){	//토요일
            calendar_area += "<div class=\"calendarDayT\" onclick=\"calendarPrint('"+clickDay+"');\">"+ii+"</div> \n";
        }else if( p == 1 ){	//일요일
            calendar_area += "<div class=\"calendarDayS\" onclick=\"calendarPrint('"+clickDay+"');\">"+ii+"</div> \n";
        }else{				//평일
            calendar_area += "<div class=\"calendarDay\" onclick=\"calendarPrint('"+clickDay+"');\">"+ii+"</div> \n";
        }
        if(p==0 && last_date.getDate() != i){
            calendar_area +="<div class=\"clearboth\"></div> \n";
            weekCnt++;
        }
    }

    if(p !=0){
        for(i=p;i<7;i++){
            calendar_area+="<div class=\"calendarNoDay\">&nbsp;</div> \n";
        }
    }

    var addtable1;
    var addtable2;
    if( weekCnt != 6){
        for(addtable1=weekCnt; addtable1 < 6; addtable1++){
            calendar_area +="<div class=\"clearboth\"></div> \n";
            for(addtable2=0; addtable2 < 7; addtable2++){
                calendar_area+="<div class=\"calendarNoDay\">&nbsp;</div> \n";
            }
        }
    }

    var nowDate	= now_date.getFullYear() + "-" + (100+( now_date.getMonth() + 1)).toString(10).substr(1) + "-" + (100+now_date.getDate()).toString(10).substr(1);

    calendar_area += "<div class=\"clearboth\"></div> \n";
    calendar_area += "<div class=\"calendarNow\" onclick=\"calendarSet(5)\" align=\"left\">Today : "+nowDate+" </div> \n";
    calendar_area += "<div class=\"calendarClose\" onclick=\"calendarClose();\" align=\"right\"><font class=ver8><b>X</b></font></div> \n";
    calendar_area += "</td></tr></table></td></tr></table> \n";

    thisObj.innerHTML = calendar_area;

}

function calendarClose()
{
    dy_calOpen = 'n';
    thisObj.parentNode.removeChild(thisObj);
}

function calendarPrint(date)
{
    if( tagNm == "INPUT" ) eventElement.value = date;
    else eventElement.innerHTML = date;
    calendarClose();
}

function calendar_get_objectTop(obj){
    if (obj.offsetParent == document.body) return obj.offsetTop;
    else return obj.offsetTop + get_objectTop(obj.offsetParent);
}

function calendar_get_objectLeft(obj){
    if (obj.offsetParent == document.body) return obj.offsetLeft;
    else return obj.offsetLeft + get_objectLeft(obj.offsetParent);
}

/*** onLoad 이벤트에 함수 할당 ***/
function addOnloadEvent(fnc)
{
    if ( typeof window.addEventListener != "undefined" )
        window.addEventListener( "load", fnc, false );
    else if ( typeof window.attachEvent != "undefined" ) {
        window.attachEvent( "onload", fnc );
    }
    else {
        if ( window.onload != null ) {
            var oldOnload = window.onload;
            window.onload = function ( e ) {
                oldOnload( e );
                window[fnc]();
            };
        }
        else window.onload = fnc;
    }
}

function order_print(frmp_nm, frml_nm)
{
    var frmp = document.forms[frmp_nm];
    var frml = document.forms[frml_nm];
    if ( frmp['list_type'][0].checked != true && frmp['list_type'][1].checked != true ) return;

    if ( frmp['list_type'][0].checked == true && frmp['list_type'][0].value == 'list' ){
        if ( PubChkSelect( frml['chk[]'] ) == false ){
            alert( "선택한 내역이 없습니다." );
            return;
        }

        var cds = new Array();
        var idx = 0;
        var count=frml['chk[]'].length;

        if ( count == undefined ){
            if ( frml['chk[]'].ordno != null ) cds[ idx++ ] = frml['chk[]'].ordno;
            else cds[ idx++ ] = frml['chk[]'].value;
        }
        else
            for ( i = 0; i < count ; i++ )
                if ( frml['chk[]'][i].checked )
                    if ( frml['chk[]'][i].ordno != null ) cds[ idx++ ] = frml['chk[]'][i].ordno;
                    else cds[ idx++ ] = frml['chk[]'][i].value;

        frmp['ordnos'].value = cds.join( ";" );
    }

    var orderPrint = window.open("","orderPrint","width=750,height=600,menubar=yes,scrollbars=yes" );
    frmp.target='orderPrint';
    frmp.action='../order/_paper.php';
    frmp.submit();
    orderPrint.focus();
}

/* 브라우저별 이벤트 처리*/
function addEvent(obj, evType, fn){
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    } else {
        return false;
    }
}

function delEvent(obj, evType, fn){
    if (obj.removeEventListener) {
        obj.removeEventListener(evType, fn, false);
        return true;
    } else if (obj.detachEvent) {
        var r = obj.detachEvent("on"+evType, fn);
        return r;
    } else {
        return false;
    }
}

function getTargetElement(evt)
{
    if ( evt.srcElement ) return target_Element = evt.srcElement; // 익스
    else return target_Element = evt.target; // 익스외
}

function popupEgg(asMallId, asOrderId){
    //창을 화면의 중앙에 위치
    iXPos = (window.screen.width - 700) / 2;
    iYPos = (window.screen.height - 600) / 2;
    var egg = window.open("https://gateway.usafe.co.kr/esafe/InsuranceView.asp?mall_id="+asMallId + "&order_id=" + asOrderId, "egg", "width=700, height=600, scrollbars=yes, left=" + iXPos + ", top=" + iYPos);
    egg.focus();
}

function inArray( needle, haystack )
{
    for ( i = 0; i < haystack.length; i++ )
        if ( haystack[i] == needle ) return true;
    return false;
}

/*** AJAX GRAPH METHOD (AGM) ***/
AGM = {
    bMsg : new Array(),
    iobj : new Array(),
    articles: new Array(),
    running: new Array(),
    interverID: '',

    act: function (c)
    {
        if (c && typeof(c.onStart) == 'function'){
            this.func = c;
            this.func.onStart(this);
            this.start();
        }
        else return;
    },

    start: function ()
    {
        this.running = new Array();
        this.clearinterverid();

        this.layout = "\
        <div id=report>\
            <h1>{title}</h1>\
            <table><tr><th>전송상태</th><td><div id=briefing><ul><li>브리핑 메시지 샘플.</li></ul></div></td></tr></table>\
            <h2 id=report_step>준비중..</h2>\
            <div id=report_line><div id=report_white><div id=report_graph></div></div></div>\
            <p><!--점선--></p>\
            <div id=report_btn><a href='javascript:;'><img src='../img/btn_confirm_s.gif' alt=닫기></a></div>\
        </div>\
        ";
        this.layout = this.layout.replace(/{title}/,this.layoutTitle);
        popupLayer('',550,300);
        document.getElementById('objPopupLayer').innerHTML = this.layout;
        document.getElementById('report_graph').style.width = "0%";

        if (this.articles.length < 1){
            this.briefing(this.bMsg['chkEmpty'], true);
            this.closeBtn();
            return;
        }

        this.briefing(this.bMsg['chkCount'].replace(/__count__/, this.articles.length), true);
        this.briefing(this.bMsg['start']);
        this.request();
    },

    request: function ()
    {
        if (this.running.length < this.articles.length) // 전송중
        {
            var idx = this.articles[ this.running.length ];
            var tmp = new Array(); tmp.push(idx);
            this.running.push(tmp);
            document.getElementById('report_step').innerHTML = '[' + this.iobj[0][idx].getAttribute('subject') + '] 내역 처리중';
            this.func.onRequest(this, idx);
            this.setIntervalId("AGM.graph()", 500);
        }
        else if (this.running.length == this.articles.length){ // 전송완료
            this.clearinterverid();
            this.done();
        }
    },

    complete: function (req)
    {
        this.running[(this.running.length - 1)].push(true);
        var idx = this.running[(this.running.length - 1)][0];
        var subObj = this.iobj[0][idx];
        var response = req.responseText.replace(/{subject}/, subObj.getAttribute('subject'));
        this.briefing(response);
        this.setIntervalId("AGM.graph('continue')", 30);
    },

    error: function (req)
    {
        this.running[(this.running.length - 1)].push(false);
        var idx = this.running[(this.running.length - 1)][0];
        var subObj = this.iobj[0][idx];
        var msg = req.getResponseHeader("Status").replace(/{subject}/, subObj.getAttribute('subject'));
        if (msg == null || msg.length == null || msg.length <= 0)
        {
            this.briefing("Error! Request status is " + req.status);
            this.setIntervalId("AGM.graph('continue')", 30);
        }
        else
        {
            var remsg = '';
            var tmp = msg.split("^");
            for (i = 0; i < tmp.length; i++)
            {
                if (i == 1) remsg += '<ol type="1" style="margin-bottom:10px;">';
                if (i == 0) remsg += tmp[i];
                else remsg += '<li>' + tmp[i] + '</li>';
                if (i > 0 && (i+1) == tmp.length) remsg += '</ol>';
            }
            this.briefing(remsg, false, 'red');

            if (req.status == 600) this.done();
            else this.setIntervalId("AGM.graph('continue')", 30);
        }
    },

    done: function ()
    {
        this.briefing(this.bMsg['end']);
        document.getElementById('report_step').innerHTML = '완료';
        this.closeBtn();
        this.clearinterverid();
    },

    closeBtn: function ()
    {
        var btnDiv = document.getElementById('report_btn');
        btnDiv.childNodes[0].href = "javascript:closeLayer();";
        btnDiv.style.display = "block";
        if (this.func && typeof(this.func.onCloseBtn) == 'function') this.func.onCloseBtn(this, btnDiv);
    },

    setIntervalId: function (func, interval)
    {
        this.clearinterverid();
        this.interverID = setInterval(func.toString(), interval);
    },

    clearinterverid: function ()
    {
        clearInterval(this.interverID);
        this.interverID = '';
    },

    briefing: function (str, emtpy, color)
    {
        var briefing = document.getElementById('briefing').childNodes[(document.getElementById('briefing').childNodes[0].nodeType == 1 ? 0 : 1)];
        if (emtpy == true) while (briefing.childNodes.length > 0) briefing.removeChild(briefing.lastChild);
        var liNode = document.createElement('LI');
        briefing.appendChild(liNode);
        liNode.innerHTML = str;
        if (color != '') liNode.style.color = color;
    },

    graph: function (code)
    {
        var limitPercent = eval(this.running.length) / eval(this.articles.length) * 100;
        var nowPercent = eval(document.getElementById('report_graph').style.width.replace( /%/, ''));
        if (limitPercent > nowPercent) document.getElementById('report_graph').style.width = ++nowPercent + '%';
        else if (code == 'continue') this.request();
    }
}

/**
 * extComma(x), extUncomma(x)
 *
 * 숫자 표시 (3자리마다 콤마찍기, 마이너스 및 소수점 유지)
 *
 * @Usage	var money = -1000.12;
 *			money = extComma(money);
 *			alert(money);	// -1,000.12
 *			alert(extUncomma(money));	// -1000.12
 */
function extComma(x){
    var head = '', tail = '', minus = '';
    if (x < 0){
        minus = '-';
        x = x * (-1) + "";
    }
    if ( x.indexOf(".") >= 0 ) {
        head = comma(x.substring ( 0 , x.indexOf(".") ));
        tail = uncomma(x.substring ( x.indexOf(".") + 1, x.length ));
    }
    else head = comma(x);
    x = minus + head;
    if ( tail.toString().length > 0 ) x += "." + tail;
    return x;
}

function extUncomma(x){
    var head = '', tail = '', minus = '';
    if (x < 0){
        minus = '-';
        x = x * (-1) + "";
    }
    if ( x.indexOf(".") >= 0 ) {
        head = uncomma(x.substring ( 0 , x.indexOf(".") ));
        tail = uncomma(x.substring ( x.indexOf(".") + 1, x.length ));
    }
    else head = uncomma(x);
    x = minus + head;
    if ( tail.toString().length > 0 ) x += "." + tail;
    return x;
}

/*** UI NAVIGATION METHOD (UNM) ***/
UNM = {
    m_no: "",
    m_id: "",
    isOver: false,
    agoMenuNo: "",
    overBgcolor: "#e4ff75",
    outBgcolor: "#ffffff",
    popup: "",

    inner: function ()
    {
        document.onclick = this.mouseDown;
        var navigs = document.getElementsByName('navig');

        for (no = 0; no < navigs.length; no++)
        {
            navigs[no].style.position = "relative";
            content = navigs[no].innerHTML;
            navigs[no].innerHTML = '';
            navigs[no].style.zIndex = 0;

            var va = navigs[no].appendChild(document.createElement('A'));
            va.href = "javascript:UNM.callMenu('" + navigs[no].getAttribute('m_no') + "', '" + navigs[no].getAttribute('m_id') + "', '" + navigs[no].getAttribute('popup') + "');";
            va['onmouseover'] = function(e) { UNM.evtHandler(); };
            va.innerHTML = content;
            va.setAttribute('no', no);

            var vDiv = navigs[no].insertBefore(document.createElement('DIV'), navigs[no].childNodes[0]);
            vDiv.setAttribute('id', 'menuarent' + no);
            with (vDiv.style){
                position = 'absolute';
                display = 'none';
                top = -3;
                left = -132;
            }

            var menu = '';
                menu += '<table width="127" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" style="border:solid 3px #5f5f5f">';
                menu += '<tr> ';
                menu += '<td style="padding:3px 0 0 10px" height="23" onmouseout="UNM.menuOut(this);" onmouseover="UNM.menuOver(event, this);" onclick="UNM.exec(\'EVENT1\');" class=small1><font color=808080>&#149;</font>&nbsp;<font color=404040>CRM (고객관리) 보기</td>';
                menu += '</tr><tr> ';
                menu += '<td height=1 bgcolor=ebebeb></td>';
                menu += '</tr><tr> ';
                menu += '<td style="padding:2px 0 0 10px" height="22" onmouseout="UNM.menuOut(this);" onmouseover="UNM.menuOver(event, this);" onclick="UNM.exec(\'EVENT2\');" class=small1><font color=808080>&#149;</font>&nbsp;<font color=404040>SMS 보내기</td>';
                menu += '</tr><tr> ';
                menu += '<td height=1 bgcolor=ebebeb></td>';
                menu += '</tr><tr> ';
                menu += '<td style="padding:2px 0 0 10px" height="22" onmouseout="UNM.menuOut(this);" onmouseover="UNM.menuOver(event, this);" onclick="UNM.exec(\'EVENT3\');" class=small1><font color=808080>&#149;</font>&nbsp;<font color=404040>메일 보내기</td>';
                menu += '</tr><tr> ';
                menu += '<td height=1 bgcolor=ebebeb></td>';
                menu += '</tr><tr> ';
                menu += '<td style="padding:2px 0 0 10px" height="22" onmouseout="UNM.menuOut(this);" onmouseover="UNM.menuOver(event, this);" onclick="UNM.exec(\'EVENT4\');" class=small1><font color=808080>&#149;</font>&nbsp;<font color=404040>주문내역 보기</td>';
                menu += '</tr><tr> ';
                menu += '<td height=1 bgcolor=ebebeb></td>';
                menu += '</tr><tr> ';
                menu += '<td style="padding:2px 0 0 10px" height="22" onmouseout="UNM.menuOut(this);" onmouseover="UNM.menuOver(event, this);" onclick="UNM.exec(\'EVENT5\');" class=small1><font color=808080>&#149;</font>&nbsp;<font color=404040>적립금내역 보기</td>';
                menu += '</tr></table>';
            vDiv.innerHTML = menu;
        }
    },

    callMenu: function (m_no, m_id, popup)
    {
        this.m_no = m_no;
        this.m_id = m_id;
        this.popup = popup;
    },

    evtHandler: function ()
    {
        if (window.navigator.appName.indexOf("Explorer") == -1) return;
        document.onclick = this.mouseDown;
    },

    mouseDown: function (e)
    {
        var event = e || window.event;
        var evtTarget = event.target || event.srcElement;
        if (evtTarget.toString().indexOf("javascript:UNM.callMenu(") && evtTarget.parentNode != null) evtTarget = evtTarget.parentNode;
        if (evtTarget.toString().indexOf("javascript:UNM.callMenu(") && evtTarget.parentNode != null) evtTarget = evtTarget.parentNode;

        if (!UNM.isOver) UNM.hideAll();
        if (!evtTarget.toString().indexOf("javascript:UNM.callMenu(") && evtTarget.getAttribute('no') != null){
            UNM.agoMenuNo = evtTarget.getAttribute('no');
            _ID('menuarent' + evtTarget.getAttribute('no')).style.display = 'block';
            _ID('menuarent' + evtTarget.getAttribute('no')).parentNode.style.zIndex = document.getElementsByName('navig').length;
        }
        else return;
    },

    menuOver: function (e, obj)
    {
        var event = e || window.event;
        this.isOver = true;
        this.chgBgcolor(obj);
    },

    menuOut: function (obj)
    {
        this.isOver = false;
        this.chgBgcolor(obj);
    },

    chgBgcolor: function (obj)
    {
        if (typeof obj.painted == 'undefined') obj.painted = false;
        obj.style.backgroundColor = obj.painted?this.outBgcolor:this.overBgcolor;
        obj.painted = !obj.painted;
    },

    hideAll: function ()
    {
        try {
            document.getElementById("menuarent" + this.agoMenuNo).style.display = 'none';
            document.getElementById("menuarent" + this.agoMenuNo).parentNode.style.zIndex = 0;
        } catch(e) { return; }
    },

    exec: function (key)
    {
        this.hideAll();
        switch(key) {
        case "EVENT1" :
            (this.popup == '1' ? popup :popupLayer)('../member/Crm_view.php?m_id=' + this.m_id,780,600);
        break;
        case "EVENT2" :
            (this.popup == '1' ? popup :popupLayer)('../member/popup.sms.php?m_id=' + this.m_id,780,600);
        break;
        case "EVENT3" :
            (this.popup == '1' ? popup :popupLayer)('../member/email.php?type=direct&m_id=' + this.m_id,780,600);
        break;
        case "EVENT4" :
            (this.popup == '1' ? popup :popupLayer)('../member/orderlist.php?m_no=' + this.m_no,500,600);
        break;
        case "EVENT5" :
            (this.popup == '1' ? popup :popupLayer)('../member/popup.emoney.php?m_no=' + this.m_no,600,500);
        break;
        }
    }
}

function panel(idnm, section)
{
    if (document.getElementById(idnm) == null) return;
    var ajax = new Ajax.Request( "../proc/indb.php",
    {
        method: "post",
        parameters: "mode=getPanel&idnm=" + idnm + "&section=" + section,
        onComplete: function ()
        {
            var req = ajax.transport;
            if (req.status != 200) return;
            if (req.responseText =='') return;
            var obj = document.getElementById(idnm);
            if (idnm == 'paneltop')
            {
                obj.parentNode.style.textAlign = 'right';
                obj.parentNode.style.width = 808;
            }
            obj.innerHTML = req.responseText;
            if(idnm == 'maxlicense'){
                popupLayerAgree(idnm,530,430);
            }
            if(idnm == 'maxagree'){
                window.onload=function(){popupLayerAgree(idnm,530,430);}
            }
        }
    } );
}

/*** license ***/
function popupLayerAgree(s,w,h)
{
    if (!w) w = 600;
    if (!h) h = 400;

    var pixelBorder = 3;
    var titleHeight = 12;
    w += pixelBorder * 2;
    h += pixelBorder * 2 + titleHeight;

    var bodyW = document.body.clientWidth;
    var bodyH = document.body.clientHeight;

    var posX = (bodyW - w) / 2;
    var posY = (bodyH - h) / 2;

    hiddenSelectBox('hidden');

    /*** 백그라운드 레이어***/
    var obj = document.createElement("div");
    with (obj.style){
        position = "absolute";
        left = 0;
        top = 0;
        width = "100%";
        height = document.body.scrollHeight;
        backgroundColor = "#000000";
        filter = "Alpha(Opacity=70)";
        opacity = "0.5";
    }
    obj.id = "objPopupLayerBg";
    document.body.appendChild(obj);

    /*** 내용프레임 레이어 ***/
    var obj = document.createElement("div");
    with (obj.style){
        position = "absolute";
        left = posX + document.body.scrollLeft;
        top = posY + document.body.scrollTop;
        width = w;
        height = h;
    }
    obj.id = "objPopupLayer";
    obj.innerHTML = document.getElementById(s).innerHTML;
    document.body.appendChild(obj);
}

function inFocus1(i) {
    (i).style.border='2px solid #627dce';
}

function outFocus1(i) {
    (i).style.border='1px solid #cccccc';
}

function LogininFocus(i) {
    (i).style.border='3px solid #00a8ff';
    (i).style.height='22px';
}

function LoginoutFocus(i) {
    (i).style.border='1px solid #242425';
    (i).style.height='22px';
}

/*** 포커스 테두리 넣기 ***/
function linecss(){
    var obj = document.getElementsByTagName('input');
    var obj_txa = document.getElementsByTagName('textarea');
    for( e =0; e < obj.length; e++ ){
        var type = obj[e].getAttribute('type');
        if( type == 'text' || type == 'password' || type == 'file'){
            var isClsnm = false;
            var clsnm = obj[e].className.toString().split(' ');
            for (c = 0; c < clsnm.length; c++){
                if (inArray(clsnm[c], Array('lline', 'line', 'rline', 'cline', 'loginline'))) isClsnm = true;
            }
            if (isClsnm === true){
                addEvent(obj[e], 'focus', function(e) { inFocus1(getTargetElement(e)); });
                addEvent(obj[e], 'blur', function(e) { outFocus1(getTargetElement(e)); });
            }
        }
    }

    for( t =0; t < obj_txa.length; t++ ){
        var clsnm = obj_txa[t].className.toString().split(' ');
        if (inArray("tline", clsnm)){
            addEvent(obj_txa[t], 'focus', function(e) { inFocus1(getTargetElement(e)); });
            addEvent(obj_txa[t], 'blur', function(e) { outFocus1(getTargetElement(e)); });
        }
    }
}

/*** 디자인코디 IFRAME HEIGHT 재설정 ***/
function setHeight_ifrmCodi(){
    if (parent._ID('ifrmCodi')){
        parent._ID('ifrmCodi').style.height = document.body.scrollHeight;
        document.body.style.margin = '0';
        return true;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * input check 전체 체크처리 공통
 * @param {} form
 * @return
 * @type
 */
function MsgUserAllCheck(){

     $("input[type='checkbox']").attr('checked', $('#isall').is(':checked'));
}

/**
 * 팝업 공통 close
 * @param {Y/N} isOpenerReload : 팝업닫을경우 부모창 리로드여부
 * @return N/A
 * @type
 */
function popClose(isOpenerReload){
    if (isOpenerReload == 'Y'){opener.history.go();}
    window.self.close();
}

/**
 * 팝업 공통 close
 * @param {Y/N} isOpenerReload : 팝업닫을경우 부모창 리로드여부
 * @param {} msg : CONFIRM 메시지 내용
 * @return N/A
 * @type
 */
function popCloseCfm(isOpenerReload, msg){
    var confirmwin = window.confirm(msg);
    if (confirmwin){popClose(isOpenerReload);}
}

/**
 * input radio 객체가 체크되었는지 확인
 * @param {} object
 * @return Y|N
 * @type
 */
function isRadioChecked(object){
    var result = "N";
    for(i=0; i<object.length; i++){
        if (object[i].checked == true) {
            result = "Y";
            break;
        }
    }
    return result;
}


/*
 * 버그로인한주석
 * String.prototype.replaceAll = function(str1, str2)
{
    var temp_str = "";

    if (this.trim() != "" && str1 != str2)
    {
        temp_str = this.trim();

        while (temp_str.indexOf(str1) > -1)
        {
            temp_str = temp_str.replace(str1, str2);
        }
    }

    return temp_str;
}
*/
/**
 * 공통엑셀다운로드
 */
function commonExeclDown(title, rowcount){

    if (rowcount > 0){

        var data = document.all.item("resultdata").innerHTML;

        data = data.replaceAll("img", "a");
        data = data.replaceAll("IMG", "a");
        data = data.replaceAll("checkbox", "hidden");

        //alert(data);

        var form = document.createElement("form");
        var obj_title = document.createElement("input");
        var obj_data = document.createElement("input");

        obj_title.name = "sheettitle";
        obj_title.value = title;
        obj_data.name = "data";
        obj_data.value = data;

        form.appendChild(obj_title);
        form.appendChild(obj_data);
        document.body.appendChild(form);

        form.method = "post";
        form.action = "/admin/common/exceldown.jsp";
        form.submit();
    } else {
        alert("검색된 결과가 없습니다.");
    }

}

//오직 숫자 하이픈(-)만 허용
function onlyNum1(id) {
    $('#'+id).numeric({allow:"-"});
    $('#'+id).css("ime-mode","disabled");


}


//오직 숫자만 입력 허용
function onlyNum2(id) {
    $('#'+id).numeric();
    $('#'+id).css("ime-mode","disabled");
}



//오직 숫자만 입력 허용
function onlyNum2_class(classNm) {
    $('.'+classNm).numeric();
    $('.'+classNm).css("ime-mode","disabled");
}

//숫자, 알파벳만 허용
function onlyNumAlpha(id) {
    $('#'+id).numeric({allow:"abcdefghijklmnopqrstuvwxyz"});
    $('#'+id).css("ime-mode","disabled");


}


/**
 * ajax 공통 모듈
 * url :
 * data :
 * dataType : json / html / xml / text
 * callback : 콜백함수
 */
function ajaxSubmit(url, data, dataType, callback){

    $.ajax({
        url : url,
        data : data,
        dataType : dataType,
        type : 'POST',
        success : function(result) {
            callback(result);
        },
        error : function(e) {
            alert("error :" + e.responseText);
        }
    });

}


(function (window, $, _, undefined) {


	
	var sangs = window.sangs = window.sangs || {};

	sangs.areaCombo = {
		_selectorCombo1 : '', 
		_selectorCombo2 : '',
		_selectorCombo3 : '',
		_defaultOption : '<option value="">선택</option>',
		
		
		
		init : function(combo1, combo2, combo3){
			_selectorCombo1  = $('#'+combo1);
			_selectorCombo2  = $('#'+combo2);
			_selectorCombo3  = $('#'+combo3);
			
			this.list(_selectorCombo1, "/admin/lecture/sidoList.do");
			
			//****************    Event   ************//
			_selectorCombo1.change(function(e){
				_selectorCombo3.empty().append(sangs.areaCombo._defaultOption);
				_selectorCombo2.empty().append(sangs.areaCombo._defaultOption);
				sangs.areaCombo.list(_selectorCombo2, "/admin/lecture/guList.do", {sidoCode : $(this).val()});
			});
			
			_selectorCombo2.change(function(e){
				_selectorCombo3.empty().append(sangs.areaCombo._defaultOption);
				sangs.areaCombo.list(_selectorCombo3, "/admin/lecture/dongList.do", {guCode : $(this).val()});
			});
		},
		
		selected : function(comboVal1, comboVal2, comboVal3){
			_selectorCombo1.val(comboVal1).attr('selected', true).trigger('change');
			_selectorCombo2.val(comboVal2).attr('selected', true).trigger('change');
			_selectorCombo3.val(comboVal3).attr('selected', true);
		},
		
		list : function($selector, url, data){
			//console.log(data + "====="+ url + "====" + $selector);
			$.ajax({
		        url : url,   
		        type : "POST",
		        data : data,
		        dataType: "json",
		        async : false,
		        success : function(data, status) {
		        	$selector.empty().append(sangs.areaCombo._defaultOption);
		        	$.each(data.result, function(i, item){
		        		$selector.append('<option value="'+item.CODE+'">'+item.NAME+'</option>');
					 });
		        }
		    });
		}
	};
}(window, jQuery));




//이미지 미리보기 함수
function fnPreviewImg(input) {
if (input.files && input.files[0]) {
	if(fnIsImgFile(input.files[0].name)){ 
	  
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#'+input.id+'Preview').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
      $('#'+input.id+'Preview').show();
  }else{
  	alert('bmp,gif,jpg,png,jpeg 확장자만 등록이 가능합니다.');
  	input.value = '';
  	$('#'+input.id+'Preview').hide();
  }
	  }
}

//첨부파일 확장자  이미지 인지 체크
function fnIsImgFile(filename){
 var _fileLen = filename.length;
 var _lastDot = filename.lastIndexOf('.');
 var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
 var _result;
 
 // 미리보기 가능한 확장자는 배열에 넣기
 var _arrExt = new Array( ".bmp", ".gif", ".jpg", ".png", ".jpeg");

  // 배열 요소를 검사하여 체크
  for(var i=0; i<_arrExt.length; i++) {

      if(_arrExt[i] == _fileExt) {
          _result = true;
          break;
      } else
          _result = false;
  }

  return _result;
}

/**
 * modal alert
 * msg :  text
 * callback : callback 함수
 */
function fnModalMsg(msg, callback){
	modal({
		type: 'alert',
		title: '',
		text: ""+msg+"",
		callback: function(result) {
			if(typeof callback == 'function'){
				callback();
			}
		}
	});
}


//}(window, jQuery, underscore));

/**
 * modal Msg
 * obj  : jquery obj focuse 맞출 이벤트
 * type : confirm, alert (default)
 * iconType : iconType 
 * msg  :  text
 * callback : 확인 버튼 후 후처리
 * 예) fnModal( $('#focusId')
 *            , 'confirm'
 *            ,"등록 하시겠습니까?"
 *            ,function(){
 *            		처리 영역
 * 	          });
 */
//popup  접근성 관련 포커스 강제 이동
var thisFocus;

function modalOpen() {
    var showTarget = $('[data-tooltip-con="pop-alert"]');
    showTarget.show().focus();
}

function modalClose(t) {
    t.parents(".layerpop").hide();
    $('.p_btn_center').html('');
    thisFocus.focus();
}

function fnModalMsg( obj, type, msg, callback ){

    var html = "";
	var openBtn = obj; // 접근성 포커스 이동
	var closeBtn = '.modal-tooltip-close';

    $('.p_btn_center').html('');
    $('.alert_msg').html(msg);

    if(type == 'confirm'){
        html  = '<button type="button" class="btn_bgblue" id ="modalConfirmOk" >확인</button>';
        html += '<button type="button" class="btn_grwhite modal-tooltip-close" data-focus="pop-alert-close" data-focus-next="pop-alert">취소</button>';
    } else {
        html = '<button type="button" class="btn_bgblue" id ="modalConfirmOk" >확인</button>';
    }

    $('.p_btn_center').append(html);
    
	thisFocus = openBtn;
	modalOpen();//modal 메시지
	
    $('#modalConfirmOk').focus();
	
    
    $(closeBtn).click(function(e) {
    	e.preventDefault();
		modalClose($(this));
		
    	if(typeof callback == 'function'){
			if(type == 'confirm'){
        		callback(false);
        	}
		}
    });
    

    $('#modalConfirmOk').click(function() {

        $('.p_btn_center').html('');
        $('.layerpop').hide();

        if(thisFocus.length > 0)thisFocus.focus();
        
        if(typeof callback == 'function'){
        	
        	if(type == 'confirm'){
        		callback(true);
        	} else {
        		callback();
        	}
            
        }
    });
}

function fnLoginModal( obj, callback ){

    var html = "";
    var openBtn = obj; // 접근성 포커스 이동
    closeBtn = '.modal-tooltip-close';
    $('.alert_msg').text("로그인 후 이용하실 수 있습니다.");

    $('.alert_msg').removeClass('ico_chk');
    $('.alert_msg').addClass('ico_lock');

    html  = '<button type="button" class="btn_bgblue" id ="modalConfirmOk" >확인</button>';
    html += '<button type="button" class="btn_grwhite modal-tooltip-close" data-focus="pop-alert-close" data-focus-next="pop-alert">취소</button>';

    $('.p_btn_center').append(html);

    thisFocus = openBtn;
    modalOpen();//modal 메시지
    
    $('#modalConfirmOk').focus();
	
	$(document).on('click', closeBtn, function(e) {
		e.preventDefault();
		modalClose($(this));
	});

    $('#modalConfirmOk').click(function() {

        $('.p_btn_center').html('');
        $('.layerpop').hide();

        if(thisFocus.length > 0)thisFocus.focus();
        
        fnLogin();
    });
    
    
}

    // 우편번호 찾기 화면을 넣을 element
    var element_layer = document.getElementById('layer');

    
    // 주소 검색 시작
    function fnOpenDaumPostAppend( pthis ){
        var postAppend  = '<div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:9999;-webkit-overflow-scrolling:touch;">';
            postAppend += '<img src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">';
            postAppend += '</div>';

            $(pthis).parent().append(postAppend);


            element_layer = document.getElementById('layer');

    }


    function isMobile() {
        return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    


    function closeDaumPostcode() {
        
        // iframe을 넣은 삭제
        $('#layer').remove();
    }

    function openDaumPostcode( pthis , zipcodeObj, addr1Obj) {
        
        fnOpenDaumPostAppend( pthis );

        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data) {
    
                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var fullAddr = data.address; // 최종 주소 변수
                    var extraAddr = ''; // 조합형 주소 변수
    
                    // 기본 주소가 도로명 타입일때 조합한다.
                    if(data.addressType === 'R'){
                        //법정동명이 있을 경우 추가한다.
                        if(data.bname !== ''){
                            extraAddr += data.bname;
                        }
                        // 건물명이 있을 경우 추가한다.
                        if(data.buildingName !== ''){
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                        fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                    }
                    
                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    if(zipcodeObj == null){
                    	$('.ibxCompPostNo').val(data.zonecode) //5자리 새우편번호 사용
                    }else{
                    	zipcodeObj.val(data.zonecode) //5자리 새우편번호 사용
                    }
                    if(addr1Obj == null){
                    	$('.ibxCompAddr1').val(fullAddr) //기본 주소
                    }else{
                    	addr1Obj.val(fullAddr) //5자리 새우편번호 사용
                    }
                    pthis.focus();

                    //document.getElementById('sample2_addressEnglish').value = data.addressEnglish;
                    
                    // iframe을 넣은 element를 안보이게 한다.
                    // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                    element_layer.style.display = 'none';
                    
                    closeDaumPostcode();
                },
                width : '100%',
                height : '100%',
                maxSuggestItems : 5
            }).embed(element_layer);
        });
        // iframe을 넣은 element를 보이게 한다.
        element_layer.style.display = 'block';

        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
        initLayerPosition();
        
        
    }

    
    
    // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
    // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
    // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
    function initLayerPosition(){
        
        var width = 300; //우편번호서비스가 들어갈 element의 width
        if (!isMobile()) {
            width = 620;
        }
        
        var height = 400; //우편번호서비스가 들어갈 element의 height
        var borderWidth = 2; //샘플에서 사용하는 border의 두께

        // 위에서 선언한 값들을 실제 element에 넣는다.
        element_layer.style.width = width + 'px';
        element_layer.style.height = height + 'px';
        element_layer.style.border = borderWidth + 'px solid';
        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth - 6) + 'px';
        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
    }

    // 주소 검색 종료


    function dateFormat( e, oThis) {
		var num_arr = [97,98,99,100,101,102,103,104,105,96,48,49,50,51,52,53,54,55,56,57];

		var key_code = (e.which) ? e.which: e.keyCode;
		if(num_arr.indexOf(Number(key_code)) != -1){
			var len = oThis.value.length;
			if(len == 4) oThis.value += "-";
			if(len == 7) oThis.value += "-";
		}
	}