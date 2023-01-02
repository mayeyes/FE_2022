var var_sf0201_grid2 = {
		I_VAR : [],
		D_VAR : [],
		FC_TARGET: {'table':'', 'column':'', 'value':''}
	};
$(document).ready(function() {
	fnCategoryList();
	fnGetList();
	//drawGrid();
	//drawGrid2();
	//drawGrid3();

	$('#btnSearch').on({click : function(event) {
		fnGetList();
		}
	});
	

	
	$('#btnSave').on({
		click : function(event) {

			var tableIdVal = $("#table_id").val();

			if (!tableIdVal) {
				alert("데이터 목록에서 데이터를 선택해주세요");
				return;
			//} else if (!$("#grid1").jqGrid('getGridParam', 'selarrrow').length) {
			//	alert('데이터 변수 목록에서 데이터 변수를 선택해주세요');
			//	return;
			} else if (!$("#file_nm").val()) {
				alert('파일명은(는) 필수 입력값입니다.');
				$('#file_nm').focus();
				return;
			} else if (!$('#file_desc').val()) {
				alert('파일설명은(는) 필수 입력값입니다.');
				$('#file_desc').focus();
				return;
			}

			if (confirm('저장 하시겠습니까?')) {
				fn_sf0101insert();
			}
		}
	});
	
	$('#btnAddIVar').on('click', function(event) {
		fn_sf0201_add_ivar_grid("I");
	});
	
	$('#btnDeleteIVar').on('click', function(event) {
		var_sf0201_grid2 = {
				'D_VAR': [],
				'I_VAR': [],
				'FC_TARGET': {'table': '', column: '', value: ''}
			};
		$("#checkboxDVar").prop("checked",false);
		$("#checkboxDVar").val("");
		$("#dependentVarNm").val("");
		$("#dependentVarModelNm").val("");
	});
	
	// 학습구간 종료일
	$('#TRAIN_TILL').on('change', function(event) {
		if($("#dependentVarNm").val() !=""){
			if (confirm('학습구간을 변경하시면 종속변수가 초기화됩니다. 변경하시겠습니까?')) {
				var_sf0201_grid2 = {
						'D_VAR': [],
						'I_VAR': [],
						'FC_TARGET': {'table': '', column: '', value: ''}
					};
				initDependentVar();
				fn_sf0201_on_TEST_FROM();
			}
		}else{
			fn_sf0201_on_TEST_FROM();
		}
		
	});
	$('#TRAIN_FROM').on('change', function(event) {
		if($("#dependentVarNm").val() !=""){
			if (confirm('학습구간을 변경하시면 종속변수가 초기화됩니다. 변경하시겠습니까?')) {
				var_sf0201_grid2 = {
						'D_VAR': [],
						'I_VAR': [],
						'FC_TARGET': {'table': '', column: '', value: ''}
					};
				initDependentVar();
			}
		}
	});
	
	$('#energyType').on('change', function(event) {
		if( $("#energyType").val() == "WIND"){
			if($("#modelId").val() ==""){
				for(var i = 0; i < 24 ; i++){
					$('#rwengDelta'+(i+1)).val("1.00");
				}
			}
		}else{
			if($("#modelId").val() ==""){
					$("#rwengDelta1").val("0.00");
					$("#rwengDelta2").val("0.00");
					$("#rwengDelta3").val("0.00");
					$("#rwengDelta4").val("0.00");
					$("#rwengDelta5").val("0.00");
					$("#rwengDelta6").val("0.00");
					$("#rwengDelta7").val("0.20");
					$("#rwengDelta8").val("0.50");
					$("#rwengDelta9").val("1.00");
					$("#rwengDelta10").val("1.00");
					$("#rwengDelta11").val("1.00");
					$("#rwengDelta12").val("1.00");
					$("#rwengDelta13").val("1.00");
					$("#rwengDelta14").val("1.00");
					$("#rwengDelta15").val("1.00");
					$("#rwengDelta16").val("1.00");
					$("#rwengDelta17").val("0.90");
					$("#rwengDelta18").val("0.80");
					$("#rwengDelta19").val("0.20");
					$("#rwengDelta20").val("0.10");
					$("#rwengDelta21").val("0.00");
					$("#rwengDelta22").val("0.00");
					$("#rwengDelta23").val("0.00");
					$("#rwengDelta24").val("0.00");
					
		}
	}
	});
	
	$('#modelType, #fcLength').on('change', function(event) {
		if ($('#modelId').val() == '') {
			var modelDesc = '';
			
			var modelDesc = "모델유형: "+$("#modelType option:selected").text()+"\n예측기간: "+$('#fcLength').val()+"\n";
			$('#modelDesc').val(modelDesc);
			
			var modelNm = '';
			modelNm += ($('#fcType').val() == 'GF' ? '신재생에너지발전예측 ' : '에너지수요예측 ') + $("#modelType option:selected").text();
			modelNm += ' ' + $('#energyType option:selected').text();
			modelNm += ' ' + "("+$("#TRAIN_FROM").val() +"~" +$("#TRAIN_TILL").val()+ ")";
			$("#modelNm").val(modelNm);
		}
	});
	
	$('#modelType').on('change', function(event) {
		$('.hyperparameter').hide();
		$('#modelParamsArea').hide();
		$('#independentVarArea').hide();
		if(event.currentTarget.value == 'ES' || event.currentTarget.value == 'NN' 
			|| event.currentTarget.value == 'RG' || event.currentTarget.value == 'DL'
			|| event.currentTarget.value == 'LSTM') {
			$('#modelParamsArea').show();
			$('#div' + this.value).show();
		}
		
		if(event.currentTarget.value != 'ES' && event.currentTarget.value != 'AR' 
			&&  event.currentTarget.value != 'LSTM') {
			$('#independentVarArea').show();
		}
	});
	
$('#dtUnit').on('change', function(event) {
		
		if (this.value == 'H') {
			$('#fcLength').show();
		} else if (this.value == 'D') {
			$('#fcLength').hide();
		} else if (this.value == 'W') {
			$('#fcLength').hide();
		} else if (this.value == 'M') {
			$('#fcLength').hide();
		} else {
			$('#fcLength').hide();
		}
	});
	
	
	$('#btnAddNnHiddenLayerSizes').on('click', function(event) {
		if (var_sf0201_on['nn_hidden_layer_sizes'] >= 10) {
			alert('최대 10개까지');
			return;
		}
		if (!confirm('추가하시겠습니까?')) {
			return;
		}
		var_sf0201_on['nn_hidden_layer_sizes']++;
		setHiddenLayer(1,var_sf0201_on['nn_hidden_layer_sizes'], '','NN');
	});
	
	$('#btnDeleteNnHiddenLayerSizes').on('click', function(event) {
		if (var_sf0201_on['nn_hidden_layer_sizes'] <= 1) {
			alert('최소 1개까지');
			return;
		}
		if (!confirm('삭제하시겠습니까?')) {
			return;
		}
		$('#nn_hidden_layer_sizes' + var_sf0201_on['nn_hidden_layer_sizes']).remove();
		var_sf0201_on['nn_hidden_layer_sizes']--;
	});
	
	$('#btnAddDlHiddenLayerSizes').on('click', function(event) {
		if (var_sf0201_on['dl_hidden_layer_sizes'] >= 10) {
			alert('최대 10개까지');
			return;
		}
		if (!confirm('추가하시겠습니까?')) {
			return;
		}
		
		var_sf0201_on['dl_hidden_layer_sizes']++;
		setHiddenLayer(1, var_sf0201_on['dl_hidden_layer_sizes'], '', 'DL');
	});
	
	$('#btnDeleteDlHiddenLayerSizes').on('click', function(event) {
		if (var_sf0201_on['dl_hidden_layer_sizes'] <= 1) {
			alert('최소 1개까지');
			return;
		}
		if (!confirm('삭제하시겠습니까?')) {
			return;
		}
		$('#dl_hidden_layer_sizes' + var_sf0201_on['dl_hidden_layer_sizes']).remove();
		var_sf0201_on['dl_hidden_layer_sizes']--;
			if($("#dl_cold_start").val() =="No"){
				alert("hidden layer sizes의 변경으로 인해 학습 초기화가 Yes로 변경됩니다.");   
			}
			$("#dl_cold_start").val("Yes");
			$('#dl_cold_start option').not(":selected").attr("disabled" ,true);
	});
	$("#save_button").on("click", function(event) {
		fn_sf0201_insert();
	});
$('#btn_new').on('click', function(event) {
		
		$("#model_input").show();
		$("#save_button").show();
		if($('#fcType').val() == "GF"){
			$("#rwengDeltaRow").show();
			$("#rwengDeltaRowText").show();
		}else{
			$("#rwengDeltaRow").hide();
			$("#rwengDeltaRowText").hide();
		}
		
		var_sf0201_on['dl_hidden_layer_sizes'] = 5;
		var_sf0201_on['nn_hidden_layer_sizes'] = 5;
			$('#modelType option').not(":selected").attr("disabled" ,false);
			$('#dl_cold_start option').not(":selected").attr("disabled" ,false);
			$("#dl_hidden_layer_sizes_div").html("");
			$("#nn_hidden_layer_sizes_div").html("");
		
			$(".dl_hidden_layer").html("");
			$(".nn_hidden_layer").html("");
			
			$("#nn_hidden_layer_sizes_div").html("<input type=\"number\" name=\"nn_hidden_layer_sizes\" id=\"nn_hidden_layer_sizes1\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">"
				+"<input type=\"number\" name=\"nn_hidden_layer_sizes\" id=\"nn_hidden_layer_sizes2\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">"
				+"<input type=\"number\" name=\"nn_hidden_layer_sizes\" id=\"nn_hidden_layer_sizes3\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">"
				+"<input type=\"number\" name=\"nn_hidden_layer_sizes\" id=\"nn_hidden_layer_sizes4\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">"
				+"<input type=\"number\" name=\"nn_hidden_layer_sizes\" id=\"nn_hidden_layer_sizes5\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">");
			$("#dl_hidden_layer_sizes_div").html("<input type=\"number\" name=\"dl_hidden_layer_sizes\" id=\"dl_hidden_layer_sizes1\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">"
					+"<input type=\"number\" name=\"dl_hidden_layer_sizes\" id=\"dl_hidden_layer_sizes2\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">"
					+"<input type=\"number\" name=\"dl_hidden_layer_sizes\" id=\"dl_hidden_layer_sizes3\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">"
					+"<input type=\"number\" name=\"dl_hidden_layer_sizes\" id=\"dl_hidden_layer_sizes4\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">"
					+"<input type=\"number\" name=\"dl_hidden_layer_sizes\" id=\"dl_hidden_layer_sizes5\" value=\"30\" style=\"width: 50px; margin-left: 1px;\">");
			
		if (!confirm('신규 예측 모형을 생성하시겠습니까?')) {
			return;
		}
		
		displayTrainButtons(false);
		displayTrainChart(false);
		
		var_sf0201_grid2 = {
			'D_VAR': [],
			'I_VAR': [],
			'FC_TARGET': {'table': '', column: '', value: ''}
		};
		//$('#form1').ready(fn)();
		
		$("#form1").each(function(){
			this.reset();
		})
		
		$('#modelId').val('');
		
		$('#regist').show();
		$('#modelNm').focus();
		
		$('#btnUpdate').hide();
		$('#btnSave').show();
		$('#btnDelete').hide();
		
		$('#divIVar').empty();
		initDependentVar();
		
		$('#tdCreateDt').html("");
		$('#tdPrStatus').html("");
		
//		$('#divDVar').empty();
		fn_sf0201_onload_a();
		fn_sf0201_on_TEST_FROM();
		$('#modelType').trigger('change');
	});
});



function fn_sf0201_insert() {

	fn_sf0201_insert_inputFeatures();
	fn_sf0201_insert_inputParams();
	
	$.ajax({
		url : "/sf/sf0201_insert.json",
		method : "POST",
		data : {
			'modelId': $('#modelId').val(), // 모델ID
			'modelType': $('#modelType').val(), // 모델유형
			'fcType': $('#fcType').val(), // 예측유형
			'energyType': $('#energyType').val(), // 에너지유형
			'dtUnit': $('#dtUnit').val(), // 수집주기
			'fcLength': Number($('#fcLength').val()), // 예측값개수
			'modelNm': $('#modelNm').val(), // 모델이름
			'modelDesc': $('#modelDesc').val(), // 모델설명
			'inputFeatures': $('#inputFeatures').val(), // 입력기능
			'inputParams': $('#inputParams').val(), // 입력매개변수
			'RWENG_DELTA': $('#RWENG_DELTA').val(), // 24
			'trStart': '',
			'trFinish': '',
			'trStatus': 'INCOMPLETE', // 학습상태
			'prStatus': '',
			'prDate': '',
			'saveDate': '',
			'fcTargetTable': var_sf0201_grid2['FC_TARGET']['table'],
			'fcTargetColumn': var_sf0201_grid2['FC_TARGET']['column'],
			'fcTargetValue': var_sf0201_grid2['FC_TARGET']['value']
		},
		dataType : "json",
		success : function(data) {
			if (data.insert > 0) {
				alert('정상적으로 등록되었습니다.');
				$('#modelId').val(data.modelId);
				fnGetList();
			} else {
				alert('생성이 실패하였습니다.');
			}
		},
		error: function(x, o, e){
			alert(x.status + " : "+ o +" : "+e + "111");
		}
	});

}
function fn_sf0201_insert_inputFeatures() {
	var inputFeatures = {};

//	var trainFrom = $('#TRAIN_FROM').val().replace(/-/g, '');
	var trainFromArr = $('#TRAIN_FROM').val().split('-');
	var trainFrom = trainFromArr.join('')
	if (!!trainFrom) {
		inputFeatures.TRAIN_FROM = trainFrom;
	}

//	var trainTill = $('#TRAIN_TILL').val().replace(/-/g, '');
	var trainTillArr = $('#TRAIN_TILL').val().split('-');
	var trainTill = trainTillArr.join('');
	if (!!trainTill) {
		inputFeatures.TRAIN_TILL = trainTill;
	}
	
	var t1 = new Date(trainFromArr[0], Number(trainFromArr[1]) - 1, trainFromArr[2], "00")
	var t2 = new Date(trainTillArr[0], Number(trainTillArr[1]) - 1, trainTillArr[2], "23")
	inputFeatures.TRAIN_LENGTH = ((t2 - t1) / (1000 * 60 * 60)) + 1
	
	var TEST_FROM = $('#TEST_FROM').val().replace(/-/g, '');
	if (!!TEST_FROM) {
		inputFeatures.TEST_FROM = TEST_FROM;
	}

	var TEST_TILL = $('#TEST_TILL').val().replace(/-/g, '');
	if (!!TEST_TILL) {
		inputFeatures.TEST_TILL = TEST_TILL;
	}

	if (var_sf0201_grid2.I_VAR !== undefined) {
		if (var_sf0201_grid2.I_VAR.length > 0) {
			inputFeatures.I_VAR = var_sf0201_grid2.I_VAR;
		}
	}

	if (var_sf0201_grid2.D_VAR !== undefined) {
		if (var_sf0201_grid2.D_VAR.length > 0) {
			inputFeatures.D_VAR = var_sf0201_grid2.D_VAR;
		}
	}

	var JSON_stringify = JSON.stringify(inputFeatures);

	$('#inputFeatures').val(JSON_stringify);
	// $('#inputFeatures').val(JSON_stringify.replace(/,/g, ',\n'));
}

function fn_sf0201_insert_inputParams() {
	var modelType = $('#modelType').val();

	if (modelType === 'ES') {
		fn_sf0201_insert_inputParams_es();
	} else if (modelType === 'AR') {
		fn_sf0201_insert_inputParams_ar();
	} else if (modelType === 'NN') {
		fn_sf0201_insert_inputParams_nn();
	} else if (modelType === 'RG') {
		fn_sf0201_insert_inputParams_rg();
	} else if (modelType === 'DL') {
		fn_sf0201_insert_inputParams_dl();
	} else if (modelType === 'LSTM') {
		fn_sf0201_insert_inputParams_lstm();
	}
}
function fn_sf0201_insert_inputParams_ar() {

}
function fn_close(){
	$("#dialog_background").hide();
	$("#dialog_wrap").hide();
}
function fn_sf0201_add_ivar_grid(flag) {

	/*
	01010000	01000000	전기
	01020000	01000000	가스
	01030000	01000000	수도
	01040000	01000000	난방
	02010000	02000000	태양광
	02020000	02000000	풍력
	04010000	04000000	종관관측
	04020000	04000000	동네예보
	*/
	var cat1 = "";
	var cat2 = "";
	
	if($('#energyType').val() =="SOLAR"){
		cat2 ="02010000";
	}else if($('#energyType').val() =="WIND"){
		cat2 ="02020000";
	}else if($('#energyType').val() =="ELECTRICITY"){
		cat2 ="01010000";
	}else if($('#energyType').val() =="WATER"){
		cat2 ="01030000";
	}else if($('#energyType').val() =="GAS"){
		cat2 ="01020000";
	}else if($('#energyType').val() =="HEAT"){
		cat2 ="01040000";
	}
	
	
	$.ajax({
		url : "/sf/sf0103_grid.json",
		method : "POST",
		data : {'searchStartDate' : $('#TRAIN_FROM').val().replace(/-/g, '') + '00',
			'searchEndDate' : $('#TEST_TILL').val().replace(/-/g, '') + '23',
			'dtUnit' : $('#dtUnit').val(),
			'fc_type': $('#fcType').val(),
			'cat2': cat2,
			'varType': flag
			},
		dataType : "json",
		success : function(data) {
			drawGrid2(data.resultList);
		},
		error: function(x, o, e){
			alert(x.status + " : "+ o +" : "+e + "111");
		}
	});

}
	
function drawGrid2(data){
	$("#dialog_background").show();
	$("#dialog_wrap").show();
	$('#grid2').jqGrid('GridUnload');
    $("#grid2").jqGrid({
        mtype: "POST"
        , postData: {}
        , jsonReader: "{repeatitems: false}"
        , datatype: "local"
        , data: data
        , height: "20%"
        , autowidth: true
        //, cmTemplate: {sortable: true, align: "right"}
        , colNames: [ '구분', '구분', '파일ID', '데이터 이름', 
            '구간최초일시', '구간최초일시', '구간최후일시', 
            '구간최후일시', '수집주기', '수집주기', '저장일시', '저장일시', 
            'fcTargetTable', 'fcTargetColumn', 'fcTargetValue', 
            '선택1', '선택2', '추가', ]
        , colModel: [
    		{ name : 'se', index : 'se', hidden: true, },
   		{ name : 'se_nm', index : 'se_nm', width : 20, }, 
   		{ name : 'file_id', index : 'file_id', hidden : true, },
   		{ name : 'file_nm', index : 'file_nm' }, 
   		{ name : 'start_dt', index : 'start_dt', hidden : true, }, 
   		{ name : 'start_dt_01', index : 'start_dt_01', hidden : true, }, 
   		{ name : 'end_dt', index : 'end_dt', hidden : true, },
   		{ name : 'end_dt_01', index : 'end_dt_01', hidden : true, }, 
   		{ name : 'dtUnit', index : 'dtUnit', hidden : true, }, 
   		{ name : 'dtUnitNm', index : 'dtUnitNm', hidden : true, }, 
   		{ name : 'saveDate', index : 'saveDate', hidden : true, }, 
   		{ name : 'saveDate01', index : 'saveDate01', width : 50, },
   		{ name : 'fc_target_table', index : 'fc_target_table', hidden: true },
   		{ name : 'fc_target_column', index : 'fc_target_column', hidden: true },
   		{ name : 'fc_target_value', index : 'fc_target_value', hidden: true },
   		{ name : 'act1', index : 'act1', width : 60},
   		{ name : 'act2', index : 'act2', width : 60},
   		{ name : 'act', index : 'act', width : 30}
   	]
        , viewsortcols: "[false, 'vertical', false]"
        , rownumbers:false
        , rowNum: 10
        , rowList: [10, 20, 30]
        , viewrecords: true
        , pager: "#pager2"
        //, multiselect : true
        //, sortable: "false"
        , serializeGridData: function(data){
            return JSON.stringify(data);
        },onSelectRow : function(rowid, status, e){            // row를 선택했을 때 발생하는 이벤트
       	 fn_sf0201_grid2_onSelectRow(rowid);
        }
    	,loadComplete  : function(data){
    		
   	}
    });
}

function fn_sf0201_grid2_onSelectRow(rowId) {
	var rowData = $('#grid2').jqGrid('getRowData', rowId);

	var url;

	if (rowData.se == 'EXP') {
		url = '/sf/sf0103_selectExpList.json';
	} else if (rowData.se == 'PP') {
		url = '/sf/sf0103_selectPPList.json';
	}
	if (!url) {
		return;
	}
	var data = {
		"file_id" : rowData.file_id
	};

	$.ajax({
		url : url,
		method : "POST",
		data : data,
		//data : {"" : ""},
		dataType : "json",
		success : function(data) {
			//
			var act = "<button class=\"btn btn-sm radius sub2-color\" onclick=\"fn_sf0201_grid_add('"+rowId+"');\">추가</button>";
			$('#grid2').jqGrid('setRowData', rowId, {
				'act' : act
			});

			var sbox = "<select name=\"sbox"+rowId+"\" id=\"sbox"+rowId+"\"></select>";
			$('#grid2').jqGrid('setRowData', rowId, {
				'act1' : sbox
			});
			var el = $("#sbox" + rowId);

			var html = '';

			$.each(data.resultList, function(i, d) {
				html += '<option value="' + d.column_id
						+ '" data-result="'
						+ encodeURIComponent(JSON.stringify(d))
						+ '">';
				html += d.column_nm;
				html += '</option>';
			});
			$("#sbox" + rowId).append(html);

		},
		error : function(x, o, e) {
			alert(x.status + " : " + o + " : " + e + "111");
		}
	});
}

function fn_sf0201_grid_add(rowId) {
	var rowData = $('#grid2').jqGrid('getRowData', rowId);
	
	if (var_sf0201_grid2.D_VAR !== undefined && var_sf0201_grid2.D_VAR.length > 0) {
		alert('종속변수는 1개 이하 추가해야 합니다.');
		return;
	} else {
		var_sf0201_grid2.D_VAR = [];
	}
	var_sf0201_grid2.D_VAR.push({
		'FILE_TYPE' : rowData['se'],
		'FILE_ID' : rowData['file_id'],
		'FILE_NM': rowData['file_nm'],
		'COLUMN_ID' : $('#sbox' + rowId).val(),
		'COLUMN_NM' : $("#sbox" + rowId ).text(),
		'NEGATIVE' : "",
		'value': var_sf0201_grid2.D_VAR.length + 1,
	});

	var_sf0201_grid2['FC_TARGET']['table'] = rowData.fc_target_table;
	var_sf0201_grid2['FC_TARGET']['column'] = rowData.fc_target_column;
	var_sf0201_grid2['FC_TARGET']['value'] = rowData.fc_target_value;
	
	$("#dependentVarNm").val(rowData['file_nm']);
	$("#dependentVarModelNm").val(rowData['file_nm']);
	
	$("#checkboxDVar").prop("checked",true);
	$("#checkboxDVar").val(1);
	$("#dependentVarNm").val($("#sbox" + rowId ).text());
	$("#dependentVarModelNm").val(rowData['file_nm']);
	
	$("#dialog_background").hide();
	$("#dialog_wrap").hide();
}


function fn_sf0201_onload_a() {
	var modelType = $('#modelType').val();

	//$('#TRAIN_FROM').val(getStrAddDate(getStrAddDate(getToday(),-8,"day"),-3,"month"));
	//$('#TRAIN_TILL').val(getStrAddDate(getToday(),-8,"day"));
}

function fn_sf0201_on_TEST_FROM() {

	if (!$('#TRAIN_TILL').val()) {
		$('#TEST_FROM').val('');
		$('#TEST_TILL').val('');
		return;
	}
	
	var fcLength = Number($('#fcLength').val());
	//$('#TEST_FROM').val(addDay(1));
	//$('#TEST_TILL').val(addDay(8));
	
}


function displayTrainButtons(flag) {
	if(flag){
		$('#trainBtns').show();
	}else{
		$('#trainBtns').hide();
	}
}

function displayTrainChart(flag) {
	if(flag){
		$('#trainedChart').show();
	}else{
		$('#trainedChart').hide();
	}
}
function initDependentVar() {
	$("#checkboxDVar").prop("checked",false);
	$("#dependentVarNm").val("");
	$("#dependentVarModelNm").val("");
}

var var_sf0201_on = {
		'nn_hidden_layer_sizes': 5,
		'dl_hidden_layer_sizes': 5
	};
	
function fnGetList() {
	
	$.ajax({
		url : "/sf/sf0201_grid.json",
		method : "POST",
		data : {fc_type: $("#fcType").val(),
				lv1Category: $("#searchTableLv1").val(),
				lv2Category: $("#searchTableLv2").val()
			},
		//data : {"" : ""},
		dataType : "json",
		success : function(data) {
			drawGrid(data.resultList);
			//$("#user_count").val(data.userCount.user_count)
		},
		error: function(x, o, e){
			alert(x.status + " : "+ o +" : "+e + "111");
		}
	});
}

 function drawGrid(data){
	 $('#grid1').jqGrid('GridUnload');
     $("#grid1").jqGrid({
         mtype: "POST"
         , postData: {}
         , jsonReader: "{repeatitems: false}"
         , datatype: "local"
         , data: data
         , height: "20%"
         , autowidth: true
         //, cmTemplate: {sortable: true, align: "right"}
         , colNames: [
     		'예측모형',
    		'등록일자',
    		'예측단위',
    		'예측단위',
    		'예측기간',
    		'학습시작일시',
    		'학습시작일시',
    		'학습종료일시',
    		'학습종료일시',
    		'오차율 %',
    		'시험오차(RMSE)',
    		'상태',
    		'예측',
    		'학습실행',
    		'수정',
    		'예측적용',
    		'모델ID',
    		'모델유형',
    		'모델유형',
    		'예측유형',
    		'예측유형',
    		'종속변수테이블',
    		'종속변수측컬럼',
    		'종속변수컬럼이름',
    		'종속변수값',
    		'에너지유형',
    		'에너지유형',
    		'예측값개수',
    		'모델설명',
    		'입력기능',
    		'입력매개변수',
    		'모델트레이닝',
    		'학습상태',
    		'학습상태',
    		'프로세스 ID',
    		'생성일시',
    		'갱신일시',
    		'적용/해지상태',
    		'적용/해지상태',
    		'적용/해지 일시',
    		'경과시간',
    		'rwengDelta'
    	]
         , colModel: [
     		{ name : 'model_nm', index : 'model_nm', width: 80, align: 'left' }, 
    		{ name : 'create_dt_01', index : 'create_dt_01', width : 30, align : 'center' }, 
    		{ name : 'dt_unit', index : 'dt_unit', hidden : true }, 
    		{ name : 'dt_unit', index : 'dt_unit', width : 20, align : 'center', hidden: true }, 
    		{ name : 'fc_length', index : 'fc_length', width : 20, align : 'center' },
    		{ name : 'tr_start', index : 'tr_start', hidden : true }, 
    		{ name : 'tr_start_01', index : 'tr_start_01', width: 30, align: 'center' }, 
    		{ name : 'tr_finish', index : 'tr_finish', hidden : true }, 
    		{ name : 'tr_finish_01', index : 'tr_finish_01', width: 30, align: 'center' },
    		{ name : 'err_rate', index : 'err_rate', width : 20, align : 'right' }, 
    		{ name : 'rmse_test', index : 'rmse_test', width : 20, align : 'right' }, 
    		{ name : 'status', index : 'status', width : 60, label : '상태', align : 'center' ,formatter:fn_format_status}, 
    		{ name : 'pr_status', index : 'pr_status', width : 20, label : '예측', align : 'center' ,formatter:fn_format_pr_status},
    		{ name : 'act', index : 'act', width : 20, align : 'center', hidden: true }, 
    		{ name : 'act2', index : 'act2', width : 70, hidden : true }, 
    		{ name : 'act3', index : 'act3', width : 20, hidden: true },
    		{ name : 'model_id', index : 'model_id', hidden : true }, 
    		{ name : 'model_type', index : 'model_type', hidden : true }, 
    		{ name : 'model_type', index : 'model_type', hidden : true }, 
    		{ name : 'fc_type', index : 'fc_type', hidden : true }, 
    		{ name : 'fc_type', index : 'fc_type', hidden : true },
    		{ name : 'fc_target_table', index : 'fc_target_table', hidden : true, },
    		{ name : 'fc_target_column', index : 'fc_target_column', hidden : true, },
    		{ name : 'fc_target_column_nm', index : 'fc_target_column_nm', hidden : true, },
    		{ name : 'fc_target_value', index : 'fc_target_value', hidden : true, },
    		{ name : 'energy_type', index : 'energy_type', hidden : true }, 
    		{ name : 'energy_type', index : 'energy_type', hidden : true }, 
    		{ name : 'fc_length', index : 'fc_length', hidden : true }, 
    		{ name : 'model_desc', index : 'model_desc', hidden : true },
    		{ name : 'input_features', index : 'input_features', hidden : true }, 
    		{ name : 'input_params', index : 'input_params', hidden : true }, 
    		{ name : 'model_trained', index : 'model_trained', hidden : true }, 
    		{ name : 'tr_status', index : 'tr_status', hidden : true },
    		{ name : 'tr_status_nm', index : 'tr_status_nm', hidden : true }, 
    		{ name : 'process_id', index : 'process_id', hidden : true }, 
    		{ name : 'create_dt', index : 'create_dt', hidden : true }, 
    		{ name : 'save_date', index : 'save_date', hidden : true }, 
    		{ name : 'pr_status', index : 'pr_status', hidden : true }, 
    		{ name : 'pr_status_01', index : 'pr_status_01', hidden : true },
    		{ name : 'pr_date', index : 'pr_date', hidden : true }, 
    		{ name : 'elapse_time', index : 'elapse_time', hidden : true },
    		{ name : 'rweng_delta', index : 'rweng_delta', hidden : true }
    	]
         , viewsortcols: "[false, 'vertical', false]"
         , rownumbers:false
         , rowNum: 10
         , rowList: [10, 20, 30]
         , viewrecords: true
         , pager: "#pager1"
         //, sortable: "false"
         , serializeGridData: function(data){
             return JSON.stringify(data);
         },onSelectRow : function(rowid, status, e){            // row를 선택했을 때 발생하는 이벤트
        	 fn_sf0201_grid3_onSelectRow(rowid);
         },loadComplete  : function(){             // 그리드가 완전히 모든 작업을 완료한 후 발생하는 이벤트
         	jqGridResizeGap = 55;
  			jqGridResizeAll();
         }
     });
     //resizeJqGridWidth('grid1', 'grid_container', $("#grid1_div").width(), true); 
 }
 
 function fn_format_status(cellvalue, options, rowObject) {
		if(rowObject.tr_status >=0){
			status ="<ul class=\"status-list\">"+
			            "<li><span class=\"status active\">학습미완료</span></li>"+
			            "<li><span class=\"status\">학습중</span></li>"+
			            "<li><span class=\"status\">학습완료</span></li>"+
			          "</ul>";
			//act += '<a href="#btn" id="btnGrid3Anals' + ids[i] + '" class="btn bg_02 small">학습중지</a>';
		} else if (rowObject.tr_status == 'COMPLETE') {
				status ="<ul class=\"status-list\">"+
	            "<li><span class=\"status\">학습미완료</span></li>"+
	            "<li><span class=\"status\">학습중</span></li>"+
	            "<li><span class=\"status active\">학습완료</span></li>"+
	          "</ul>";
			//act += '<a href="#btn" id="btnGrid3Anals' + ids[i] + '" class="btn bg_02 small">학습실행</a>';
		} else {
			// INCOMPLETE
			status = "<ul class=\"status-list\">"+
			            "<li><span class=\"status\">학습미완료</span></li>"+
			            "<li><span class=\"status active\">학습중</span></li>"+
			            "<li><span class=\"status\">학습완료</span></li>"+
			          "</ul>";
			//act += '<a href="#btn" id="btnGrid3Anals' + ids[i] + '" class="btn bg_02 small">학습실행</a>';
		}
		
		return status;
	}
 
 function fn_format_pr_status(cellvalue, options, rowObject) {
	 if(rowObject.pr_status == "Y"){
		 pr_status ="<span class=\"status active\">예측적용</span>";
			//act += '<a href="#btn" id="btnGrid3Anals' + ids[i] + '" class="btn bg_02 small">학습중지</a>';
		} else {
			// INCOMPLETE
			pr_status = "<span class=\"status\">예측미적용</span>";
			//act += '<a href="#btn" id="btnGrid3Anals' + ids[i] + '" class="btn bg_02 small">학습실행</a>';
		}
		return pr_status;
	}
 
 
 