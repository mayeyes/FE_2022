var type_R_good_cnt = 0;
var type_I_good_cnt = 0;
var type_A_good_cnt = 0;
var type_S_good_cnt = 0;
var type_E_good_cnt = 0;
var type_C_good_cnt = 0;

var topType = '';


var stepCnt = 1;

// 좋아요 클릭 이벤트.
function fn_good(){
	if(stepCnt > 48){ // 마지막 답변 답했을경우.
		saveAnswer();
		$('#cardForm').submit();
	}else{
		saveAnswer();
		
		nextProgressBar();
		changeImgAndText();
		
		stepCnt++;
	}
}

// 싫어요 클릭 이벤트.
function fn_bad(){
	if(stepCnt > 48){ // 마지막 답변 답했을경우.
		$('#cardForm').submit();
	}else{
		nextProgressBar();
		changeImgAndText();
		
		stepCnt++;
	}
}
function printGroupString(){
    var _arguments = arguments;
    $.ajax({"url":"./list.json"}).done(function(data){
        for(var i=0; i<_arguments.length; i++){
            printGroupStringBind(_arguments[i][0], _arguments[i][1], data);
        }
    });
}
function printGroupStringBind(groups, type, groupData){
    var html = '';
    // title
    for(var i = 0 ; i < typeString.length ; i++){
		if(typeString[i].split('||')[0] == type){
			html += typeString[i].split('||')[1];
			break;
		}
	}

	var group = groups.split(',');
	var uniqueGroup = [];
	// 중복된그룹정보 삭제.
	$.each(group, function(i, el){
		if($.inArray(el, uniqueGroup) === -1) uniqueGroup.push(el);
	});
	var jobStr = '';
	var departStr = '';
	for(var j = 0 ; j < uniqueGroup.length ; j++){
		for(var i = 0 ; i < groupData.data.length ; i++){
			if(groupData.data[i].code == uniqueGroup[j]){
				jobStr += '<li>'+groupData.data[i].group+'</li>';
				break;
			}
		}
	}
	
	for(var j = 0 ; j < uniqueGroup.length ; j++){
		for(var i = 0 ; i < groupData.data.length ; i++){
			if(groupData.data[i].code == uniqueGroup[j]){
                for(var r=0; r<groupData.data[i].list.length; r++){
                    departStr += '<a href="'+groupData.data[i].list[r].href+'">'+groupData.data[i].list[r].name+'</a>, ';
                }
                break;
			}
		}
	}
    // console.log(departStr)
    jobStr = jobStr.substring(0,jobStr.length-2);
	departStr = departStr.substring(0,departStr.length-2);
	
	var departArr = departStr.split(',');
	var uniqueDepart = [];
	
	// 중복학과 삭제.
	$.each(departArr, function(i, el){
		if($.inArray(el, uniqueDepart) === -1) uniqueDepart.push(el);
	});
	
	departStr = uniqueDepart.join(',');
	
	var typeTitle = '';
	for(var i = 0 ; i < titleData.length ; i++){
		if(titleData[i].split('||')[0] == type){
			typeTitle = titleData[i].split('||')[1];
			break;
		}
	}
	
	var str = '<h4 class="ty_'+type+'"><span>'+type.toUpperCase()+'</span>'+typeTitle+' 특징이 강한 직업군</h4>';
	str += '<div class="result_list">';
	str += '<ul class="list_01">';
	str += jobStr;
	str += '</ul>';
	str += '</div>';
	
	str += '<h4 class="ty_'+type+'"><span>'+type.toUpperCase()+'</span>'+typeTitle+' 특징에 맞는 학과</h4>';
	str += '<div class="result_list mb_40">';
	str += '<p>';
	str += departStr;
	str += '</p>';
	str += '</div>';
	
	
	// document.write(str);

    html += str;

    $(html).appendTo($("#info"));
	
	
	
	
	
/*
			<h4 class="ty_'+type+'"><span>'+type.toUpperCase()+'</span>실재형 특징이 강한 직업군</h4>
				<div class="result_list">
					<ul class="list_01">
						<li>농림환경(농림수산)</li>
						<li>기계기술(전기/전자)</li>
					</ul>
				</div>
				<h4 class="ty_r"><span>R</span>실재형 특징에 맞는 학과</h4>
				<div class="result_list mb_40">
					<p>생물교육과, 기술·가정교육과, 생명과학과, 식물자원학과, 원예학과, 동물자원학과, 생물산업공학부, 산림자원학과, 조경학과, 식품과학부, 식품공학과</p>
				</div>
	 */
}

// function printTypeString(type){
// 	for(var i = 0 ; i < typeString.length ; i++){
// 		if(typeString[i].split('||')[0] == type){
// 			document.write(typeString[i].split('||')[1]);
// 			break;
// 		}
// 	}
	
// }

// 좋아요 눌렀을때 대답 저장.
function saveAnswer(){
	var data = questArray[(stepCnt-2)].split(',');
	$('#cardForm').append('<input type="hidden" name="'+data[1]+'" value="'+data[2]+'" />');
//	switch(data[1]){
//	case 'R':
//		type_R_good_cnt++;
//		break;
//	case 'I':
//		type_I_good_cnt++;
//		break;
//	case 'A':
//		type_A_good_cnt++;
//		break;
//	case 'S':
//		type_S_good_cnt++;
//		break;
//	case 'E':
//		type_E_good_cnt++;
//		break;
//	case 'C':
//		type_C_good_cnt++;
//		break;
//	}
}

// 이미지 및 문항 변경.
function changeImgAndText(){
	
	var data = questArray[(stepCnt-1)].split(',');
	
	var number = Number(data[0]);
	while(number > 8){
		number = number - 8;
	}
	
	var title = data[3];
	
	$('#cardIconImg').attr('src','./img/ty_'+data[1].toLowerCase()+'_ico0'+number+'.png');
	$('#cardIconImg').attr('alt',title);
	$('#questionText').text(title);
	
	$('#bgDiv').attr('class','card ty_'+data[1].toLowerCase());
}


// 하단 프로그레스 바 설정. 다음단계로이동.
function nextProgressBar(){
	$('div.graph_bar').attr('id','step'+stepCnt);
	$('#indexNum').text(stepCnt + '/48');
	js_card ();
}

// 배열 섞기.
function shuffle(d){
	for(var c = d.length - 1; c > 0; c--){
		var b = Math.floor(Math.random() * (c + 1));
		var a = d[c]; d[c] = d[b]; d[b] = a;
	}
	return d;
}

// Map 객체
function newMap() {
	var map = {};
	map.value = {};
	map.getKey = function(id) {
		return "k_" + id;
	};
	map.put = function(id, value) {
		var key = map.getKey(id);
		map.value[key] = value;
	};
	map.contains = function(id) {
		var key = map.getKey(id);
		if (map.value[key]) {
			return true;
		} else {
			return false;
		}
	};
	map.get = function(id) {
		var key = map.getKey(id);
		if (map.value[key]) {
			return map.value[key];
		}
		return null;
	};
	map.remove = function(id) {
		var key = map.getKey(id);
		if (map.contains(id)) {
			map.value[key] = undefined;
		}
	};

	return map;
}


// chart
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    
	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

function describeArc(x, y, radius, startAngle, endAngle){
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    
    //var arcSweep = 1;
    start.x = start.x - 0.0001;//100%일때 오류 수정
	var d = ["M", x, y, "L", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y, "z"].join(" ");
	return d;       
}

function commas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
var chart = {
    set:function(str){
        var obj = str;
            obj.data = JSON.parse(str.attr('data-json'));

        var svgs = '';
        var w = 400;
        var h = w;
        var maxH = 8;

        svgs = '<svg id="chart-svg" width="'+w+'" height="'+h+'" viewbox="0 0 '+(w)+' '+(h)+'">';
        var ww = w-100;
        var fontSize = w*0.036;
        for(var i=0; i<obj.data.item.length; i++){
            var mosuri = polarToCartesian((w/2),(h/2),(ww/2),((360/obj.data.item.length)*i) - 90);
            var mosuri2 = polarToCartesian((w/2),(h/2),((w-40)/2),((360/obj.data.item.length)*i) - 90);
            svgs += '<line x1="'+(w/2)+'" y1="'+(h/2)+'" x2="'+mosuri.x+'" y2="'+mosuri.y+'" opacity="0.2" stroke="black" />';
            svgs += '<text x="'+(mosuri2.x - 18)+'" y="'+mosuri2.y+'" font-size="'+(fontSize)+'" fill="#444" opacity="1">'+obj.data.item[i]+'</text>';
        }
        for(var t=0; t<5; t++){
            var points = "";
            for(var i=0; i<obj.data.item.length; i++){
                var mosuri = polarToCartesian((w/2),(h/2),((ww/2)-(((ww/2)/5)*t)),((360/obj.data.item.length)*i) - 90);
                points += mosuri.x+","+mosuri.y+" ";

                if(i===0){
                    svgs += '<text x="'+(mosuri.x - 15)+'" y="'+mosuri.y+'" opacity="1" font-size="'+fontSize+'" fill="#444">'+((10/5) * (4-t))+'</text>';
                }
            }
            svgs += '<polygon points="'+points+'" fill="none" stroke="#ddd" opacity="1"></polygon>';
        }
        //data
        var points = "";
        for(var i=0; i<obj.data.value.length; i++){
            var mosuri = polarToCartesian((w/2),(h/2),((ww/2)-(((ww/2)/5)*(4 - (obj.data.value[i]*0.5)))),((360/obj.data.item.length)*i) - 90);
            
            points += (mosuri.x)+","+(mosuri.y)+" ";
        }
        svgs += '<polygon points="'+points+'" stroke="none" fill="#339AF0" opacity="0.1"></polygon>';
        svgs += '<polygon points="'+points+'" stroke="#339AF0" stroke-width="2" fill="none" opacity="1"></polygon>';

        for(var i=0; i<obj.data.value.length; i++){
            var mosuri = polarToCartesian((w/2),(h/2),((ww/2)-(((ww/2)/5)*(4 - (obj.data.value[i]*0.5)))),((360/obj.data.item.length)*i) - 90);

            svgs += '<rect id="mosuri_'+(i+1)+'" x="'+(mosuri.x-4)+'" y="'+(mosuri.y-4)+'" width="8" height="8" rx="8" ry="8" stroke="none" fill="#339AF0" opacity="1" style="cursor:pointer;"></rect>';

            svgs += '<rect id="mosuri_'+(i+1)+'_bx" x="'+(mosuri.x-4-40)+'" y="'+(mosuri.y-4-30)+'" width="80" height="26" rx="15" ry="15" stroke="#339AF0" stroke-width="2" fill="#fff" style="display:none;"></rect>';
            svgs += '<text id="mosuri_'+(i+1)+'_tx" x="'+(mosuri.x-4-40+12)+'" y="'+(mosuri.y-4-30+17)+'" font-size="13" fill="#003893" style="display:none;">좋아요 '+obj.data.value[i]+'개</text>';
        }
        
        svgs += '</svg>';

        $(svgs).appendTo(obj);

        $('[id*="mosuri_"]').on("mouseover",function(){
            var ids = $(this).attr("id");
            $("#"+ids+"_bx").fadeIn(200);
            $("#"+ids+"_tx").fadeIn(200);
        });
        $('[id*="mosuri_"]').on("mouseleave",function(){
            var ids = $(this).attr("id");
            $("#"+ids+"_bx").fadeOut(200);
            $("#"+ids+"_tx").fadeOut(200);
        });

        $(window).on("resize",function(){
            var w = $("#chart-svg").parent().width();
                w = (w > 400) ? 400:w;
            $("#chart-svg").attr({"width":w,"height":w});
        });
    },
    init:function(){
        if($(".chart").size() !== 0){
            this.set($(".chart"));
        }
    }
}
$(function(){
    chart.init();
});