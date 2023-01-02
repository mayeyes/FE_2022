/***
 * 공주대학교 캠퍼스 맵 (본교, 천안, 예산)
 * ----------------------------------------------------------------------------
 * @since 2020-02-20
 */

// 버전 정보
var CAMPUS_VERSION = 1.0;
// 상세 정보 URL
var JSON_URL = contextPath+'/'+siteCode+'/api/campusGuide/campus';

// 선택 캠퍼스
var nIdx = 0;
var sIdx = 1;
// 클릭한 마커 Index
var smIdx = -1; 
var isMapLoad = false;
var isViewLoad = false;
var isMapCenter = false;
// 맵 객체 정보
var map = null;
// 마커 객체 배열
var markers = [];

/**
 * 캡퍼스 맵 위도. 경도 좌표, 확대 레벨
 * 0 : 본관 , 1 :  , 2 : 대덕밸리
 */
var CAMPUS_NAME = ['본관', '대덕밸리'];
var map_coordinate = [
     {x: 36.3203508, y: 127.3655642, zoom: 3, marker: null}  /*본관*/
    ,{x: 36.45178639343022, y: 127.13271552090906, zoom: 2, marker: null}
    ,{x: 36.4317554,  y: 127.3890197, zoom: 2, marker: null}  /*대덕밸리*/
];
var color_marker = [
    {'m1':'b', 'm2':'b', 'm3':'b', 'm4':'b', 'm5':'b', 'm6':'b', 'm7':'b', 'm8':'b', 'm9':'b', 'm10':'b' 
    ,'m11':'b', 'm12':'b', 'm13':'b', 'm14':'b', 'm15':'b', 'm16':'b', 'm17':'b', 'm18':'b', 'm19':'b', 'm20':'b'
    ,'m21':'b', 'm22':'b', 'm22-1':'b', 'm23':'b', 'm24':'b', 'm25':'b', 'm26':'b', 'm27':'b', 'm28':'b', 'm29':'b', 'm30':'b'
    ,'m31':'b', 'm32':'b', 'm33':'b', 'm34':'b', 'm35':'b', 'm36':'b', 'm37':'b', 'm38':'b', 'm39':'b', 'm40':'b'
    ,'m41':'b', 'm42':'b', 'm43':'b', 'm44':'b', 'm45':'b', 'm46':'b', 'm47':'b', 'm48':'b', 'm49':'b'}  
    ,{'m1':'b', 'm2':'b'}    
    ,{'m1':'b'}
];
var door_coordinate = [
    [ {x: 36.322532, y: 127.367909, title: '정문', cssname: 'f-door'}
     ,{x: 36.317494, y: 127.368087,  title: '후문', cssname: 'b-door'}
     /*,{x: 36.46650403818977,  y: 127.13724106123945, title: '서문', cssname: 'w-door'}*/]
 
    ,[{x: 36.451841893755685, y: 127.13345323389547, title: '정문', cssname: 'f-door'}
     ,{x: 36.453489254755596, y: 127.1330210052784, title: '후문', cssname: 'b-door'}]

    ,[{x: 36.85047088153115, y: 127.15506830117047, title: '정문', cssname: 'f-door'}
     ,{x: 36.4317554,  y: 127.3890197, title: '후문', cssname: 'b-door'}]
];

function jsonParse(i,obj){
    return {
        id: i,
        seq: obj.campusSeq,
        marker: obj.markerCode,
        title: obj.buildingName,
        latlng: new kakao.maps.LatLng(obj.latCode, obj.lngCode)
    }
}

function init() {
    // 마커 정보 객체 생성    
    var smap_positions = [];
    var cmap_positions = [];

    for (var i in smap_marker) {
        smap_positions.push(jsonParse(i,smap_marker[i]));
    } 

    for (var i in cmap_marker) {
        cmap_positions.push(jsonParse(i,cmap_marker[i]));
    } 
    map_coordinate[0].marker = smap_positions;
    map_coordinate[2].marker = cmap_positions;   

    switch(getParameterByName('map')) {
        case 'smap': nIdx = 0; sIdx = 1; $('.smap').addClass('on'); break;
        case 'cmap': nIdx = 2; sIdx = 1; $('.cmap').addClass('on'); break;
        default : nIdx = 0; sIdx = 1; $('.smap').addClass('on'); break;
    }
}

function initUI() {
        $('#camp-list').append("<div class='camp-img' />");
        $('#camp-list').append("<div class='camp-lists' />");

    // 상세 정보
    var viewsDOM = "";
        viewsDOM += "<div class='view-title'><span />";
        viewsDOM += "<div class='view-close'><a href='#' onclick='javascript:viewClose(); return false'>닫기</a></div>";
        viewsDOM += "</div>";
        viewsDOM += "<div class='view-image'>";
        viewsDOM += "<a href='#' onclick='javascript:rollingImg(-1); return false' id='img-prev' class='img-control'>이전</a>";
        viewsDOM += "<a href='#' onclick='javascript:rollingImg(1); return false' id='img-next' class='img-control'>다음</a>";
        viewsDOM += "<div id='vimg-list' /></div>";
        viewsDOM += "<div class='view-info'><div class='floor-vtitle'>층별정보</div><div class='floor-vdetails' />";
        viewsDOM += "<div class='dept-vtitle'>학과정보</div><div class='dept-vdetails' /></div>";
        $('#camp-views').append(viewsDOM);
}

function initMap() {
    var container = document.getElementById('daumMap');
    var options = {
        center: new kakao.maps.LatLng(map_coordinate[nIdx].x, map_coordinate[nIdx].y),
        level: map_coordinate[nIdx].zoom
    };

    map = new kakao.maps.Map(container, options);
}

function drawCampusMap() {
    if (isMapLoad) { return }
    isMapLoad = true

    //상세 페이지 숨김처리
    viewClose();
    changeMobileUI();

    // 캠퍼스 지도 이동
    var moveLatLon = new kakao.maps.LatLng(map_coordinate[nIdx].x, map_coordinate[nIdx].y);
    //map.panTo(moveLatLon);    
    map.setCenter(moveLatLon);    
    map.setLevel(map_coordinate[nIdx].zoom, {animate: true});
    
    setTimeout(function() {
        setCampusList(nIdx);
        removeMarker();
        addMapMarker(nIdx);
        isMapLoad = false;
    }, 450);
}

function addMapMarker(n) {
    var content, markercss;
    var positions = map_coordinate[n].marker;

    for (var i = 0; i < positions.length; i++) {
        markercss = color_marker[n]['m'+positions[i].marker] + '-marker';
        if (markercss == undefined || markercss == '') {markercss = 'r-marker'};   
        
        content = "<div class='" + markercss + "' id='cm-" + i + "'>";
        content += "<span onclick=\"javascript: viewInfo('" + i + "'); return false;\">";
        content += positions[i].marker;
        content += "</span></div>";

        var customOverlay = new kakao.maps.CustomOverlay({
            clickable: true,
            position: positions[i].latlng,
            content: content,  
            xAnchor: 0.5,
            yAnchor: 1,
            zIndex: i 
        });

        customOverlay.setMap(map);
        markers.push(customOverlay);
    }

    for (var i = 0; i < door_coordinate[nIdx].length; i++) {
        markercss = door_coordinate[nIdx][i].cssname;
        content = "<div class='" + markercss + "' />";

        var customOverlay = new kakao.maps.CustomOverlay({
            clickable: true,
            position: new kakao.maps.LatLng(door_coordinate[nIdx][i].x, door_coordinate[nIdx][i].y),
            content: content,  
            xAnchor: 0.5,
            yAnchor: 1,
            zIndex: i 
        });

        customOverlay.setMap(map);
        markers.push(customOverlay);
    }
}

function removeMarker() {
    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers.length = 0;
}

// 캠퍼스 맵 목록 생성
function setCampusList(n) {
    $('#camp-list .camp-lists').empty();
    $('#camp-list .camp-lists').scrollTop(0);

    // 상단 캠퍼스 이미지 
    $('#camp-list .camp-img').removeClass('cimg0 cimg1 cimg2 cimg3');
    $('#camp-list .camp-img').addClass('cimg' + n);
    $('#camp-list .camp-img').text(CAMPUS_NAME[n]);
    
    // 캠퍼스 목록
    var title, marker;
    var strlink, strlist;
    var listDOM = "<ul class='list'>";
    for (var i in map_coordinate[n].marker) {
        title = map_coordinate[n].marker[i].title;
        marker = map_coordinate[n].marker[i].marker;

        strlink = "<a href='#' onclick='javascript:viewInfo(" + i + "); return false;'>";
        strlist = "<span>" + marker + "</span>" + title + "</a>";

        listDOM += ("<li class='list-" + i + "'>" + strlink + strlist + "</li>");
    }
    listDOM += "</ul>";

    $('#camp-list .camp-lists').append(listDOM);
}

function initEventListener() {
    
    // 캠퍼스 선택
    $('.map-area a').click(function(event) {
        event.preventDefault();

        if (isMapLoad) { return }        

        $('.smap').removeClass('on');
        $('.cmap').removeClass('on');

        var area = $(this).data('camp');
        switch (area) {
            case 'smap': nIdx = 0; sIdx = 1; $('.smap').addClass('on'); break;
            case 'cmap': nIdx = 2; sIdx = 1; $('.cmap').addClass('on');  break;
            default: nIdx = 3; break;
        }
        smIdx = -1;
        
        drawCampusMap()
    })

    // 캠퍼스 상세
    $('#close-btn').click(function(event) {
        event.preventDefault();
        
        if (!$(this).hasClass('on')) {
            $(this).addClass('on');
            $('#camp-list').addClass('on');
            $('#shadow-bg').addClass('on');
        } else {
            $(this).removeClass('on');
            $('#camp-list').removeClass('on');
            $('#shadow-bg').removeClass('on');

            smIdx = -1;

            if (!$('#camp-views').hasClass('on')) {
                $('html, body').animate({scrollTop:0}, 'slow');
            }
        }
    })

    $('#shadow-bg').click(function(event) {
        $('#close-btn').trigger('click');
    })

    window.addEventListener('resize', debounce(function() {
        changeMobileUI();
    }, 500));
}

function changeMobileUI() {
    var windowWidth = $(window).width();

    if (windowWidth < 1200) {
        $('#camp-list').removeClass('on');
        $('#close-btn').removeClass('on');
        $('#shadow-bg').removeClass('on');
    }      
}

// resize 대한 중복 이벤트 방지
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}

// 캡퍼스 맵 상세 정보
function viewInfo(n) {
    if (isViewLoad) { return }
    isViewLoad = true;

    var markerflag = findMarkName(nIdx, smIdx);
    $('#cm-' + smIdx).removeClass(markerflag);
    $('.list-' + smIdx).removeClass('r-on g-on b-on x-on');

    changeMobileUI();

    if (isMapCenter) {
        var mapX = map_coordinate[nIdx].marker[n].latlng.Ha; 
        var mapY = map_coordinate[nIdx].marker[n].latlng.Ga; 
        var moveLatLon = new kakao.maps.LatLng(mapX, mapY);
        map.panTo(moveLatLon);
    }
    
    setTimeout(function() {    
        smIdx = n;
        markerflag = findMarkName(nIdx, smIdx);
        $('#cm-' + smIdx).addClass(markerflag);

        var mc = markerflag.substr(0,1);
        if (checkIsNull(mc)) {
            $('.list-' + smIdx).addClass('x-on');
        } else {
            $('.list-' + smIdx).addClass(mc + '-on');

            // 목록 위치 조정
            var top_index1 = $('.list-' + smIdx).offset().top;
            var top_index2 = $('.list-' + smIdx).parent().offset().top;
            var top = top_index1 - top_index2;
            $('#camp-list .camp-lists').animate({ scrollTop: top},300);
        }        

        if (!$('#camp-views').hasClass('on')) {
            $('#camp-views').addClass('on');
            $('#daumMap').addClass('on');
        }
    
        // 데이터 로딩
        var vid = map_coordinate[nIdx].marker[n].seq; // 전달 parms
        
        //원본
        //$.getJSON(JSON_URL, { campusSeq : vid }, this.loadCampusData);        
        //임시
       $.getJSON('/pcu_cmap/json/'+vid+'.json', { campusSeq : vid }, this.loadCampusData);
    },450);    
}

function loadCampusData(res) {
    if (checkIsNull(res.buildingName)) {
        $('.view-title span').text(' ');
    } else {
        $('.view-title span').text("" + res.buildingName);
    }
    if (checkIsNull(res.floorInfo)) {
        $('.floor-vdetails').html('<span class="no-data">층별안내 정보가 없습니다.</span>');
    } else {
        $('.floor-vdetails').html("" + replaceText(res.floorInfo));
    }
    if (checkIsNull(res.mayorInfo)) { 
        $('.dept-vdetails').html('<span class="no-data">학과정보가 없습니다.</span>');
    } else {
        $('.dept-vdetails').html("" + replaceText(res.mayorInfo));
    }    

    $('#vimg-list').empty();
    var imageDOM = '';

    if (res.fileList.length == 0) {
        imageDOM = "<span class='no-photo'></span>";
        $('#vimg-list').append(imageDOM);

    } else {
        for (var i in res.fileList) {
            imageDOM = "<img src='"+contextPath + "/attach/image/" +res.fileList[i].atchFileId +"/"+ res.fileList[i].fileSn+"' alt='캠퍼스 사진 이미지' />";
            $('#vimg-list').append(imageDOM);
        }
    }

    // 이미지 롤링 화살표 활성화
    if (res.fileList.length <= 1) {
        $('#img-prev').css({'display': 'none'});
        $('#img-next').css({'display': 'none'});
    } else {
        $('#img-prev').css({'display': 'block'});
        $('#img-next').css({'display': 'block'});
    }

    isViewLoad = false;
    $('html, body').animate({ scrollTop: $(document).height()},800);
}

function checkIsNull(res) {
    var isNull = false;

    if (res == undefined || res == '') {
        isNull = true;
    } 

    return isNull;
}

function replaceText(res) {
    var stxt = res;
    
    stxt = stxt.replace(/</g,"&lt;");
    stxt = stxt.replace(/>/g,"&gt;");
    stxt = stxt.replace(/\"/g,"&quot;");
    stxt = stxt.replace(/\'/g,"&#39;");
    stxt = stxt.replace(/(\n|\r\n)/g, '<br>');

    return stxt;
}

// 상세 정보 닫기
function viewClose() {
    $('#camp-views').removeClass('on');
    $('#daumMap').removeClass('on');
    
    var markerflag = findMarkName(nIdx, smIdx);
    $('#cm-' + smIdx).removeClass(markerflag);
    $('.list-' + smIdx).removeClass('r-on g-on b-on x-on');
    smIdx = -1;

    $('html, body').animate({scrollTop:0}, 'slow');
}

// 선택된 marker 조회
function findMarkName(nid, smid) {
    var mname, mcss;

    if (smid > -1) {
        mname = 'm' + map_coordinate[nid].marker[smid].marker;
        mcss = color_marker[nid][mname] + '-marker-on';
    } else {
        mcss = '00-marker-on';
    }
    
    return mcss;
}

// 이미지 롤링
function rollingImg(n) {
    if (n < 0) {
        $('#vimg-list img:first').css({'display': 'none'});
        $('#vimg-list img:first').appendTo( $('#vimg-list') );

        $('#vimg-list img:last').fadeIn('slow',function() {
           $(this).css("display", "block");
        })
    } else {
        $('#vimg-list img:last').fadeOut('slow',function() {
            $(this).prependTo( $('#vimg-list') );
            $('#vimg-list img:first').css({'display': 'block'});
        })
    }
}

// 파라메터 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}