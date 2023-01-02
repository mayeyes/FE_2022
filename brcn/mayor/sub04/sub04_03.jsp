<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
	.pas, .uiBoxLightblue, .bottomborder, .uiHeader,.uiHeaderTitle{display:none !important}
	.twitter-timeline{width:100% !important; height: 480px;}
	.pluginSkinLight{width:100% !important; height: 480px;}
	.customisable-border{ border:none !important} 
    ._2p3a,
    iframe div{min-width: 100% !imrpotant; width: 100% !important;}
    .social_fb_area{width: 100%; min-width: 100%; overflow: auto; -webkit-overflow-scrolling: touch;}
    .social_fb_area iframe{width: 100%; height: 100%;}
    .fb_iframe_widget_fluid{display: block; height: 100% !important;}
    .fb_iframe_widget_fluid span{width: 100% !important; height: 100% !important;}
    .fb_iframe_widget_fluid span iframe{position: relative !important; width: 100% !important; height: 100% !important;}
</style>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v14.0" nonce="WkMF15ZN"></script>
<div id="sub_04_03">
    <div class="share_box">
        <ul>
            <li>
                <div class="inner_box">
                    <div class="tit_box">
                        <p>facebook</p>
                        <a target="_blank" href="https://www.facebook.com/manseboryeongsi/" title="보령 페이스북으로 이동 (새창)"></a>
                    </div>

                    <div class="social_fb_area">
                       <div class="fb-page" data-href="https://www.facebook.com/manseboryeongsi/" data-tabs="timeline" data-width="430" data-height="400" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/manseboryeongsi/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/manseboryeongsi/">보령시</a></blockquote></div>
                        <!--<iframe id="social_iframe" style="width: 100%; height: 100%;" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmanseboryeongsi%2F&tabs=timeline&width=&height=&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" scrolling="no" frameborder="0" allowTransparency="true" allowfullscreen="true" title="보령 facebook" ></iframe>		-->
                    </div>	
                    <script>
            $(function(){
                setTimeout(function(){
                    fbResize(); //처음실행
                },1000);
                $(window).resize(function(){
                    fbResize();
                });
            });

            function fbResize(){
                
                var w = $('#sub_04_03>.share_box>ul>li>.inner_box>.social_fb_area').width();
                var h = $('#sub_04_03>.share_box>ul>li>.inner_box>.social_fb_area').height();
                 $('.fb_iframe_widget_fluid span iframe').attr('src','https://www.facebook.com/v14.0/plugins/page.php?adapt_container_width=true&app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df99363bf28954%26domain%3Dbrcn.mayeye.net%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Fbrcn.mayeye.net%252Ff3865b6dec313d8%26relation%3Dparent.parent&container_width=431&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Fmanseboryeongsi%2F&locale=ko_KR&sdk=joey&show_facepile=true&small_header=false&tabs=timeline&width='+w+'&height='+h);
            }
        </script>
	            </div>
            </li>
            <li>
                <div class="inner_box">

                    <div class="tit_box social_title">
                        <p>현장속으로</p>
                        <a href="/cop/bbs/BBSMSTR_000000000401/selectBoardList.do" title="현장속으로페이지 이동 "></a>
                    </div>

                    <div class="social_tt_area">
                        <ul>
                            <jsp:include page="/tmpl/skin/notice/photo_skin_mayor.jsp" >
                                <jsp:param name="code" value="BBSMSTR_000000000401" />
                                <jsp:param name="siteCode" value="mayor" />
                                <jsp:param name="listCnt" value="8" />
                                <jsp:param name="titleLength" value="20" />
                                <jsp:param name="contLength" value="50" />
                            </jsp:include>
                        </ul>

                    </div>

                </div>
            </li>
        </ul>
    </div>

    </div>