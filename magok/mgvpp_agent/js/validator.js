function getStringByte(string){
	var pattern = /[\u0000-\u007f]|([\u0080-\u07ff]|(.))/g;
	var length = string.replace(pattern, "$&$1$2").length;
	return length;
}
function getFileSizePresent(fileByte){
	var unit = ["Byte", "KB", "MB", "GB"];
	var retSize = "";
	if(fileByte < 1024){
		retSize = addComma(fileByte) + unit[0];
	}else if(fileByte < 1024 * 1024){
		retSize = addComma((fileByte / 1024).toFixed(0)) + unit[1];
	}else if(fileByte < 1024 * 1024 * 1024){
		retSize = addComma((fileByte / 1024 / 1024).toFixed(0)) + unit[2];
	}else if(fileByte < 1024 * 1024 * 1024 * 1024){
		retSize = addComma((fileByte / 1024 / 1024 / 1024).toFixed(0)) + unit[3];
	}else{
		retSize = addComma(fileByte) + unit[0];
	}
	return retSize;
}
function getValidEmailAddress(obj){
	var addr = $(obj).val();
	var pattern = /^([\w-\.]+)@([\w-]+).([a-zA-Z]{2,3}.[a-zA-Z]{2,3})$/;
	var validFlag = pattern.test(addr);
	var title = $(obj).attr("title");
	if(typeof title == "undefined") title = $(obj).attr("name");
	var alertMsg = "";
	if(!validFlag){
		if(alertMsg != "") alertMsg += "\n";
		alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
	}
	return {alertMsg: alertMsg, validFlag: validFlag};
}
function getValidCellPhoneNumber(obj){

	var inputNumber = $(obj).val().replace(/-/gi, "");

	var title = $(obj).attr("title");
	if(typeof title == "undefined") title = $(obj).attr("name");

	var validFlag = true;
	var alertMsg = "";
	if(isNaN(inputNumber)){
		if(alertMsg != "") alertMsg += "\n";
		alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
		validFlag = false;
	}
	switch(inputNumber.substring(0, 3)){
	case "010":
		// 010의 경우 하이픈을 제외한 총 길이는 무조건 11자리이며 가운데 4자리의 첫번째 숫자는 0이나 1이 올 수 없음
		if(inputNumber.length == 11){
			if(inputNumber.substring(3, 4) == "0" || inputNumber.substring(3, 4) == "1"){
				if(alertMsg != "") alertMsg += "\n";
				alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
				validFlag = false;
			}
		}else{
			if(alertMsg != "") alertMsg += "\n";
			alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
			validFlag = false;
		}
		break
	case "011":
	case "016":
	case "019":
		// 016 019의 경우 하이픈을 제외한 총 길이는 10자리 또는 11자리이며,
		// 10자리일 경우 가운데 3자리의 첫번째 숫자는 2~8만 허용
		// 11자리일 경우 가운데 4자리의 첫번째 숫자는 9로 시작하는 것만 허용

		// 011의 경우 하이픈을 제외한 총 길이는 10자리 또는 11자리이며,
		// 10자리일 경우 가운데 3자리의 첫번째 숫자는 2~8만 허용
		// 11자리일 경우 가운데 4자리의 첫번째 숫자는 9로 시작하던가 첫번째 두번째 숫자가 17로 시작하는 것만 허용

		if(inputNumber.length == 10){
			if(inputNumber.substring(3, 4) == "0" || inputNumber.substring(3, 4) == "1" || inputNumber.substring(3, 4) == "9"){
				if(alertMsg != "") alertMsg += "\n";
				alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
				validFlag = false;
			}
		}else if(inputNumber.length == 11){
			if(inputNumber.substring(0, 3) == "011"){
				if(inputNumber.substring(3, 4) != "9" && inputNumber.substring(3, 5) != "17"){
					if(alertMsg != "") alertMsg += "\n";
					alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
					validFlag = false;
				}
			}else{
				if(inputNumber.substring(3, 4) != "9"){
					if(alertMsg != "") alertMsg += "\n";
					alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
					validFlag = false;
				}
			}
		}else{
			if(alertMsg != "") alertMsg += "\n";
			alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
			validFlag = false;
		}
		break;
	case "017":
	case "018":
		// 017 018의 경우 하이픈을 제외한 총 길이는 무조건 10자리이며,
		// 가운데 3자리의 첫번째 숫자는 2~8만 허용
		if(inputNumber.length == 10){
			if(inputNumber.substring(3, 4) == "0" || inputNumber.substring(3, 4) == "1" || inputNumber.substring(3, 4) == "9"){
				if(alertMsg != "") alertMsg += "\n";
				alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
				validFlag = false;
			}
		}else{
			if(alertMsg != "") alertMsg += "\n";
			alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
			validFlag = false;
		}
		break;
	default:
		if(alertMsg != "") alertMsg += "\n";
		alertMsg = "\"" + title + "\"(이)가 유효하지 않습니다.";
		validFlag = false;
		break;
	}
	return {alertMsg: alertMsg, validFlag: validFlag};
}
function hotEmailAddressCheck(checkTargetObj, resultTargetId){
	if(checkTargetObj.value != ""){
		var check = getValidEmailAddress(checkTargetObj);
		if(check.validFlag){
			$("#" + resultTargetId).removeClass("red");
			$("#" + resultTargetId).text("");
		}else{
			$("#" + resultTargetId).addClass("red");
			$("#" + resultTargetId).text(check.alertMsg);
		}
	}else{
		$("#" + resultTargetId).removeClass("red");
		$("#" + resultTargetId).text("");
	}
}
function hotCellPhoneNoCheck(checkTargetObj, resultTargetId){
	if(checkTargetObj.value != ""){
		var check = getValidCellPhoneNumber(checkTargetObj);
		if(check.validFlag){
			$("#" + resultTargetId).removeClass("red");
			$("#" + resultTargetId).text("");
		}else{
			$("#" + resultTargetId).addClass("red");
			$("#" + resultTargetId).text(check.alertMsg);
		}
		hotCellPhoneAutoHyphen(checkTargetObj);
	}else{
		$("#" + resultTargetId).removeClass("red");
		$("#" + resultTargetId).text("하이픈(-)은 자동으로 입력됩니다.");
	}
}
function hotCellPhoneAutoHyphen(targetObj){
	var cellPhoneNo = targetObj.value;
	var inputLength = cellPhoneNo.replace(/-/gi, "").length;
	if(inputLength == 4){
		cellPhoneNo = cellPhoneNo.replace(/-/gi, "").substring(0, 3) + "-" + cellPhoneNo.replace(/-/gi, "").substring(3, cellPhoneNo.replace(/-/gi, "").length);
		targetObj.value = cellPhoneNo;
	}else if(inputLength == 6){
		cellPhoneNo = cellPhoneNo.replace(/-/gi, "").substring(0, 3) + "-" + cellPhoneNo.replace(/-/gi, "").substring(3, 6) + "-" + cellPhoneNo.replace(/-/gi, "").substring(6, cellPhoneNo.replace(/-/gi, "").length);
		targetObj.value = cellPhoneNo;
	}else if(inputLength == 11){
		cellPhoneNo = cellPhoneNo.replace(/-/gi, "").substring(0, 3) + "-" + cellPhoneNo.replace(/-/gi, "").substring(3, 7) + "-" + cellPhoneNo.replace(/-/gi, "").substring(7, 11);
		targetObj.value = cellPhoneNo;
	}
}
function hotBytePresent(checkTargetObj, length, resultTargetId){
	var string = checkTargetObj.value;
	var objLength = getStringByte(string);
	
	if(objLength > length){
		$("#" + resultTargetId).addClass("red");
	}else{
		$("#" + resultTargetId).removeClass("red");
	}
	$("#" + resultTargetId).text(objLength);
	$(checkTargetObj).attr("data-byte", objLength);
}
function checkFormValid(formObj){
	
	var retFlag = true;
	var alertMsg = "";
	var checkBoxArr = [];
	
	$(formObj).find("*").each(function(){
		var title = $(this).attr("title");
		if(typeof title == "undefined"){
			title = $(this).attr("name");
		}
		
		// 필수 체크
		var mandatory = $(this).attr("data-validator-mandatory");
		if(typeof mandatory != "undefined" && mandatory == "Y"){
			var isCheckbox = false;
			if($(this).attr("type") == "checkbox") isCheckbox = true;
			if(isCheckbox){
				var checkboxName = $(this).attr("name");
				if(checkBoxArr.indexof(checkboxName) == -1){
					checkBoxArr.push(checkboxName);
					if(typeof $("input[name=" + checkboxName + "]:checked").val() == "undefined"){
						if(alertMsg != "") alertMsg += "\n";
						alertMsg += "\"" + title + "\"(은)는 필수 입력사항 입니다.";
					}
				}
			}else{
				if($(this).val() == ""){
					if(alertMsg != "") alertMsg += "\n";
					alertMsg += "\"" + title + "\"(은)는 필수 입력사항 입니다.";
					retFlag = false;
				}
			}
		}
		
		// 글자 바이트 제한
		var byte = $(this).attr("data-validator-byte");
		if(typeof byte != "undefined"){
			if(getStringByte($(this).val()) > byte){
				if($(this).attr("type") == "checkbox") isCheckbox = true;
				alertMsg += "\"" + title + "\"(은)는 " + byte + "바이트를 넘을 수 없습니다.";
				retFlag = false;
			}
		}
		
		var cellPhone = $(this).attr("data-valid-cellphone");
		if(typeof cellPhone != "undefined" && cellPhone == "Y" && $(this).val() != ""){
			if(!getValidCellPhoneNumber(this).validFlag){
				if(alertMsg != "") alertMsg += "\n";
				alertMsg += getValidCellPhoneNumber(this).alertMsg;
				retFlag = getValidCellPhoneNumber(this).validFlag;
			}
		}

		var eMail = $(this).attr("data-valid-email");
		if(typeof eMail != "undefined" && eMail == "Y" && $(this).val() != ""){
			if(!getValidEmailAddress(this).validFlag){
				if(alertMsg != "") alertMsg += "\n";
				alertMsg += getValidEmailAddress(this).alertMsg;
				retFlag = getValidEmailAddress(this).validFlag;
			}
		}
		
		// 첨부파일 총 용량 제한
		var attachByte = $(this).attr("data-validator-totalFileSize");
		if(typeof attachByte != "undefined"){
			if(attachByte < parseInt($(this).val())){
				if($(this).attr("type") == "checkbox") isCheckbox = true;
				alertMsg += "\"" + title + "\"(은)는 " + getFileSizePresent(attachByte) + "를 넘을 수 없습니다.";
				retFlag = false;
			}
		}
		
	});
	
	if(!retFlag) alert(alertMsg);
	return retFlag;
}

function validateForm(formId){
	var validFlag = true;
	
	var emptyRequire = false;
	var overByte = false;
	var isDifferntSameTarget = false;
	var unvalidRegexp = false;

	var msg = "";

	$("#" + formId).find("[data-mandatory]").each(function(idx, item){
		var type = $(item).attr("type");
		var currValue = null;
		var desc = $(item).attr("data-desc");
		switch(type){
		case "checkbox": 
			currValue = $(item).prop("checked");
			break;
		default:
			currValue = $(item).val();
			break;
		}
		if(currValue == null || currValue == ""){
			emptyRequire = true;
			msg += '"' + desc + '"(은)는 필수 항목 입니다.\r\n';
		}
	});

	$("#" + formId).find("[data-byte]").each(function(idx, item){
		var maxByte = $(item).attr("data-max-byte");
		var currByte = $(item).attr("data-byte");
		var desc = $(item).attr("data-desc");
		if(parseInt(maxByte) < parseInt(currByte)){
			overByte = true;
			msg += '"' + desc + '"(은)는 ' + maxByte + ' 바이트를 초과할 수 없습니다.\r\n';
		}
	});

	$("#" + formId).find("[data-same-target]").each(function(idx, item){
		var desc = $(item).attr("data-desc");
		var targetId = $(item).attr("data-same-target");
		var targetDesc = $("#" + targetId).attr("data-desc");
		var currValue = $(item).val();
		var targetValue = $("#" + targetId).val();
		if(currValue != targetValue){
			isDifferntSameTarget = true;
			msg += '"' + desc + '"(은)는 ' + targetDesc + '(와)과 같은 값을 입력해야 합니다.\r\n';
		}
	});

	$("#" + formId).find("[data-regexp-pattern]").each(function(idx, item){
		var desc = $(item).attr("data-desc");
		var placeholder = $(item).attr("placeholder");
		var currValue = $(item).val();
		var regPattern = new RegExp($(item).attr("data-regexp-pattern"));
		var testResult = regPattern.test(currValue);
		if(testResult == false){
			unvalidRegexp = true;
			msg += '"' + desc + '"(은)는 ' + placeholder + '(와)과 같이 입력해야 합니다.\r\n';
		}
	});


	validFlag = (emptyRequire || overByte || isDifferntSameTarget || unvalidRegexp) ? false : true;

	return {
		status: validFlag
		, msg: msg
	}

}