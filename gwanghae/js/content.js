$(function(){  
    setTimeout(function(){
        if($("#map").size() != 0){
            kakao.maps.load(function() {
                map_bind();
            });
        }
    },100);
});
function map_bind(){
    function _set(str){
        var lat = str.attr("data-lat");
        var lng = str.attr("data-lng");
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(lat,lng), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption); 
        var markerPosition = new kakao.maps.LatLng(lat,lng);

        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map); 
    }
    for(var i=0; i<$("#map").length; i++){
        _set($("#map").eq(i));
    }
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

SNS 퍼가기

ex)
<a href="#" onclick="facebookOpen();return false;">페이스북</a>
<a href="#" onclick="twitterOpen();return false;">트위터</a>
<a href="#" onclick="blogOpen();return false;">블로그</a>

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//blog
function blogOpen(){
    var titl = $("#txt h3").text();
    titl = titl.replace ('"', '&quot;');
    titl = titl.replace ('"', '&quot;');
    titl = encodeURIComponent(titl);
    var link = encodeURIComponent(location.href); 
    var url = "http://blog.naver.com/openapi/share?url=" + link + "&title=" + titl;
    snswindowOpen (url, 900, 450, 'no');
}
//페이스북
function facebookOpen(){
    var titl = $("#txt h3").text();
    titl = titl.replace ('"', '&quot;');
    titl = titl.replace ('"', '&quot;');
    titl = encodeURIComponent(titl);
    var link = encodeURIComponent(location.href); 
    var url = "http://www.facebook.com/sharer.php?u=" + link + "&t=" + titl;
    snswindowOpen (url, 900, 450, 'no');
}
//twitter
function twitterOpen(){
    var titl = $("#txt h3").text();
    titl = titl.replace ('"', '&quot;');
    titl = titl.replace ('"', '&quot;');
    titl = titl.replace('&gt;','>');
    titl = titl.replace('&gt;','>');
    titl = encodeURIComponent(titl);
    var link = encodeURIComponent(location.href); 
    var url = "http://twitter.com/share?text=" + titl + "&url=" + link;
    snswindowOpen (url, 800, 400, 'yes');
}
function snswindowOpen(){
    var nUrl; var nWidth; var nHeight; var nLeft; var nTop; var nScroll;
    nUrl = arguments[0];
    nWidth = arguments[1];
    nHeight = arguments[2];
    nScroll = (arguments.length > 3 ? arguments[3] : "no");
    nLeft = (arguments.length > 4 ? arguments[4] : (screen.width/2 - nWidth/2));
    nTop = (arguments.length > 5 ? arguments[5] : (screen.height/2 - nHeight/2));
    winopen=window.open(nUrl, 'SNS', "left="+nLeft+",top="+nTop+",width="+nWidth+",height="+nHeight+",scrollbars="+nScroll+",toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no");
}
//naver band
function shareNaverBand() { 
    var content = $("#txt h3").text();
    var url = encodeURIComponent(location.href); 
    var link = 'http://band.us/plugin/share?body='+content+'&route='+url; 
    window.open( link, 'share', 'width=500, height=500' ); 
}
//kakao story
function shareKakaoStory() { 
    var content = $("#txt h3").text();
    var url = encodeURIComponent(location.href); 
    var link = 'https://story.kakao.com/share?url='+url; 
    window.open( link, 'share', 'width=500, height=500' ); 
}