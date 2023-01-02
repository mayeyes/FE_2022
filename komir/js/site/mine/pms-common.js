/**
 * PMS 怨듯넻�⑥닔
 * @author
 */

/*****************************************************************************
 * hasChecked
 * @param field_obj
 * @return
*****************************************************************************/
function hasChecked(field_obj) {
    if (field_obj.length > 1) {
        for (var idx = 0; idx < field_obj.length; idx++) {
            if (field_obj[idx].checked) return true;
        }
    } else {
        if (field_obj.checked) return true;
    }
    return false;
}

/*****************************************************************************
 * hasCheckedValue
 * @param field_obj
 * @return
*****************************************************************************/
function hasCheckedValue(field_obj) {
    if (field_obj.length > 1) {
        for (var idx = 0; idx < field_obj.length; idx++) {
            if (field_obj[idx].checked) return field_obj[idx].value;
        }
    } else {
        if (field_obj.checked) return field_obj[idx].value;
    }
    return field_obj[idx].value;
}

/*****************************************************************************
 * trim
 * @param str
 * @return
*****************************************************************************/
function trim(str) {
	str = str.replace(/^\s*/,'').replace(/\s*$/,'');
	return str;
}

/*****************************************************************************
 * �꾩씠�꾨젅�� �ъ씠利� 議곗젅
 * @param objFrame �꾩씠�꾨젅�� ��
 * @param fname �꾩씠�꾨젅�� �쇱씠由�
 * @return
*****************************************************************************/
function ifr_resize(objFrame, fname) {
	try {
		var agt=navigator.userAgent.toLowerCase();

		if (agt.indexOf("msie") != -1) {
			var objBody = eval(fname+".document.body");

			ifrmHeight = objBody.scrollHeight + (objBody.offsetHeight - objBody.clientHeight);

			if (ifrmHeight > 640) {
 				objFrame.style.height = ifrmHeight + 100;
 			} else {
 				objFrame.style.height = 640;
 			}

		} else {
			//�꾩씠�꾨젅�꾩쓽 吏꾩쭨 �믪씠瑜� 媛��몄샃�덈떎.
    		var the_height = objFrame.contentWindow.document.body.scrollHeight;

    		//�꾩씠�꾨젅�꾩쓽 �믪씠瑜� 蹂�寃쏀븯�� �ㅽ겕濡ㅼ쓣 �녾쾶 �⑸땲��.
    		if (the_height > 640) {
				objFrame.height = the_height + 100;
 			} else {
 				objFrame.height = 640;
 			}
		}
    } catch(e) {};
}

/*****************************************************************************
 * �덈룄�� �덉갹
 * @param url 寃쎈줈紐�
 * @param fname �덉갹 �대쫫
 * @param width �덉갹 媛�濡쒗겕湲�
 * @param height �덉갹 �덈줈�ш린
 * * @param scroll �ㅽ겕濡ㅼ뿬遺�
 * @return
*****************************************************************************/
function openWindow(url, name, width, height, scroll)   {
    var top  = screen.height / 2 - height / 2 - 50;
    var left = screen.width / 2 - width / 2 ;
    var scrollbars = "auto";

    if(scrollbars != null) {
    	scrollbars = scroll;
    }

    var win =
        open(url,
            name,
            'width=' + width + ', height=' + height + ', top=' + top +
            ', left=' + left + ', resizable=no, status=yes, toolbar=no, menubar=no, scrollbars=' + scrollbars);
    win.focus();
    return win;
}


/*****************************************************************************
 * 荑좏궎濡쒕뱶
 * @param name 荑좏궎紐�
 * @return
*****************************************************************************/
function getCookie(uName) {
	var flag = document.cookie.indexOf(uName+'=');
	if (flag != -1) {
		flag += uName.length + 1
		end = document.cookie.indexOf(';', flag)


		if (end == -1) end = document.cookie.length
		return unescape(document.cookie.substring(flag, end))
	}
}

/*****************************************************************************
 * 荑좏궎濡쒕뱶
 * @param name 荑좏궎紐�
 * @param value 荑좏궎媛�
 * @param expires 留뚮즺��(Date����)
 * @return
*****************************************************************************/
function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"

    //document.cookie = name + "=" + escape(value) + "; expires=" + expire.toGMTString() + "; path=/";
}

/*****************************************************************************
 * 荑좏궎��젣
 * @param name 荑좏궎紐�
 * @return
*****************************************************************************/
function delCookie(name) {
    var today = new Date();
    today.setTime(today.getTime(-1)); //怨쇨굅 �쒓컙�쇰줈 諛붽씀湲�
    var value = getCookie(name);
    if(value != " ") {
        document.cookie = name + "=" + value + "; expires=" + today.toGMTString() + "; path=/";
    }
}

/*****************************************************************************
* �앹뾽議�/諛곕꼫 �대┃�� 議고쉶�� �낅뜲�댄듃
*****************************************************************************/
function jsPopupzoneUpdate(seq) {

	//$.ajax
	jQuery.ajax({
		type: "POST",
		url: "/common/bannerReadUpdate.do",
		data: "seq_n="+seq
	});

	return false;
}


/*****************************************************************************
* �섏씠吏� 留뚯”�� �듦퀎����.
 * @param {Form} form
 * @param {Boolean} commentCheckFlag 而ㅻ찘�� check�щ� {true: 泥댄겕, false; 誘몄껜��}
 * 171016 JYG �쒓�源⑥쭚 > �좊땲肄붾뱶濡� ��泥�
*****************************************************************************/
function jsPageStatistics(form, commentCheckFlag) {

	if (commentCheckFlag) {
        if (form.comment_v.value == "") {
            //alert("�섍껄�� �낅젰�� 二쇱떗�쒖삤.");
        	alert("\uC758\uACAC\uC744 \uC785\uB825\uD574 \uC8FC\uC2ED\uC2DC\uC624.");
            form.comment_v.focus();
            return false;
        }
    }

    var menuSeq = form.menu_seq_n.value;
    var comment = form.comment_v.value;
    var cdSeq = "";
    var cdSeqs = form.cd_seq_n;
    if (cdSeqs.length > 1) {
        for (var idx = 0; idx < cdSeqs.length; idx++) {
            if (cdSeqs[idx].checked) cdSeq = cdSeqs[idx].value;
        }
    } else {
        if (cdSeqs.checked) cdSeqs = cdSeqs[idx].value;
    }

    if(cdSeq == ""){
    	//alert("留뚯”�꾨� �좏깮�� 二쇱떗�쒖삤.");
    	alert("\uB9CC\uC871\uB3C4\uB97C \uC120\uD0DD\uD574 \uC8FC\uC2ED\uC2DC\uC624.");
    	return false;
    }

    jQuery.ajax({
        type: "POST",
        url : "/common/pageStat.do",
        data: "menu_seq_n="+ menuSeq +"&cd_seq_n="+ cdSeq +"&comment_v="+comment,
        success: function(message) {
            alert(message);
            form.comment_v.value = "";
        }
    });

    return false;
}

/*****************************************************************************
 * 硫붿씤�섏씠吏� �묒냽 �듦퀎����.
 * @param {Form} form
 * @param {Boolean} commentCheckFlag 而ㅻ찘�� check�щ� {true: 泥댄겕, false; 誘몄껜��}
 *****************************************************************************/
function jsMainVist(url) {

	jQuery.ajax({
		type: "POST",
		url : url + "/common/mainVisit.do"
	});

	return false;
}
/*****************************************************************************
 * 硫붾돱 �묒냽 �듦퀎����.
 * @param {Form} form
 * @param {Boolean} commentCheckFlag 而ㅻ찘�� check�щ� {true: 泥댄겕, false; 誘몄껜��}
 *****************************************************************************/
function jsMenuVist(uri, seq) {

	jQuery.ajax({
		type: "POST",
		url : "/common/menuVisit.do?menu_seq=" + seq +"&uri=" + uri
	});

	return false;
}




/* 寃��됱뼱 �뱀닔臾몄옄 �낅젰諛⑹� _ 151022 _ �꾩쁺洹� */
function jsSearch(){
        var checkResult = true;
		var objEv = document.getElementById('searchKeyword');
		var num = "{}[]<>?_|~`!@#$%^&*-+\"'\\/";

		for(var i = 0; i < objEv.value.length; i++){
			if(-1 != num.indexOf(objEv.value.charAt(i))){
				checkResult = false;
			}
		}
		if(!checkResult){
			//alert("�뱀닔臾몄옄�� �낅젰�섏떎 �� �놁뒿�덈떎.");
			document.getElementById('searchKeyword').value = "";
			window.location.reload();
		}else{
			document.sForm.submit();
			document.dForm.submit();
			document.form.submit();
		}

}
/*
function exitOut(){
	var iX = window.document.body.offsetWidth - window.event.clientX;
	var iY = window.event.clientY;
	if(iX <=30 && iY < 0){
//		jQuery.ajax({
//			type:"POST",
//			url:"/manage/pms/login/logout.do"
//		});
		//alert("test 0");
		location.href="/manage/pms/login/logout.do";
		//alert("test 0.1");
		//java.lang.System.out.println("00000");
		return false;
	}
}


window.onunload=function(){
	if(event.clientX < 0 && event.clientY < 0){
		alert("test 1");
		java.lang.System.out.println("11111");
	}
}
*/
/* example*/
/*
$(window).bind('unload', function(){
	if((event.clientY <0)||(event.altKey)||(event.ctrlKey)||((event.clientY < 129)&&(event.clientY > 107))){
		//alert("test 2");
		$.ajax({
			type:"POST",
			url:"/manage/pms/login/logout.do"
		});
		//alert("test 2-2");
		//java.lang.System.out.println("22222");
		return false;
	}
});
*/