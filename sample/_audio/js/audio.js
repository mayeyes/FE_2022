$(function(){
    _audio.init();
});
var _audio = {
    set:function(str){
        if($("[data-skin='audio']").length !== 1){
            $('<div data-skin="audio" />').prependTo("body");
        }
        obj = $("[data-skin='audio']");
        var mp3 = $.trim(str.attr('data-audio'));
        var auctx = new(window.AudioContext || window.webkitAudioContext)();
        var buffer, src, analyser, buffLen;
        var barWidth, dataArray;
        var obj,w,h,r,total_line,req_ani,ts,sVal;
        var audio_play = false;
        var __controll;

        __controll = {
            start:function(){
                _this = this;
                this.stop();
                obj.empty();
                
                var url = mp3; // nice url
                var request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.responseType = 'arraybuffer';
                request.onload = function() {
                    auctx.decodeAudioData(request.response, function(buffer) {
                        function _setDraw(auctx){
                            if(auctx.state === 'running') {
                                auctx.suspend().then(function() {
                                    console.log("running");
                                });
                                setTimeout(function(){
                                    _setDraw(auctx);
                                }, 1000);
                            } else if(auctx.state === 'suspended') {
                                auctx.resume().then(function() {
                                    obj.fadeIn(300);
                                    audio_play = true;
                                    console.log("suspended!!!");
                                    buffer = buffer;
                                    src = auctx.createBufferSource();
                                    src.buffer = buffer;
                                    src.loop = false;
                                    src.connect(auctx.destination);
                                    src.start(0);
                                    analyser = auctx.createAnalyser();
                                    src.connect(analyser);
                                    analyser.connect(auctx.destination);
                                    analyser.fftSize = 512;
                                    buffLen = analyser.frequencyBinCount;
                                    dataArray = new Uint8Array(buffLen);
                                    barWidth = ((analyser.fftSize*2) - 2 * buffLen - 4) / buffLen * 2.5;
                                    _this.draw();
                                });
                            }
                        }
                        _setDraw(auctx);
                        // $(document).on("click",function(){
                        //     if(!audio_play){
                        //         _setDraw(auctx);
                        //     }
                        // });
                    }); 
                }
                request.send();
            },
            draw:function(){
                var _this = this;
                var svgs = "";
                var ids = "svg_audio";
                w = obj.innerWidth();
                h = obj.innerHeight();
                r = (obj.innerWidth() < obj.innerHeight()) ? obj.innerWidth():obj.innerHeight();
                r = r/4;
                r = (r > 200) ? 200:r;

                $('<div class="in" />').appendTo(obj);
                
                var allCnt = 0;
                var lineW = Math.floor(r/15);//라인크기
                svgs = '<svg id="'+ids+'" width="'+w+'" height="'+h+'" viewbox="0 0 '+w+' '+h+'">';
                svgs +=   '<rect id="audio_bg" x="0" y="0" width="'+w+'" height="'+h+'" fill="#000" />';
                svgs +=   '<path id="audio_bar_bg" fill="transparent" stroke="#fff" stroke-width="'+lineW+'" stroke-opacity="0.2" stroke-linecap="round" d="M '+(w/2)+','+(h/2)+' m 0, -'+(r-20)+' a '+(r-20)+', '+(r-20)+', 0, 0, 0, -'+(r-20)+', '+(r-20)+'" transform="translate(0,0) rotate('+(180)+','+(w/2)+','+(h/2)+')"></path>';
                svgs +=   '<path id="audio_bar" fill="transparent" opacity="1" stroke="#6e00ff" stroke-width="'+lineW+'" stroke-opacity="1" stroke-linecap="round" d="M '+(w/2)+','+(h/2)+' m 0, -'+(r-20)+' a '+(r-20)+', '+(r-20)+', 0, 0, 0, -'+(r-20)+', '+(r-20)+'" transform="translate(0,0) rotate('+(180)+','+(w/2)+','+(h/2)+')"></path>';
                svgs +=   '<text id="audio_count_start" font-size="'+(lineW*1.8)+'" fill="#fff">';
                svgs +=       '<textPath href="#audio_bar_bg" startOffset="0%" text-anchor="start" baseline-shift="'+lineW+'">00:00</textPath>';
                svgs +=   '</text>';
                svgs +=   '<text id="audio_count_end" font-size="'+(lineW*1.8)+'" fill="#fff">';
                svgs +=       '<textPath href="#audio_bar_bg" startOffset="100%" text-anchor="end" baseline-shift="'+lineW+'">00:00</textPath>';
                svgs +=   '</text>';
                
                total_line = buffLen;
                for(var i=0; i<total_line; i++){
                    svgs +=   '<rect id="audio_rect_'+(i+1)+'" x="0" y="0" fill="#fff" />';
                    svgs +=   '<rect id="audio_rect_bg_'+(i+1)+'" x="0" y="0" fill="#fff" />';
                }

                svgs += '</svg>';
                obj.find(">.in").append(svgs);
                
                $('<div class="controll"><button data-audio="close">닫기</button><button data-audio="pause">일시정지</button><button data-audio="play">제생</button></div>').appendTo(obj);
                obj.find(' [data-audio="close"]').on("click",function(){src.stop();obj.fadeOut(300);});//정지
                obj.find(' [data-audio="pause"]').on("click",function(){
                    obj.find(' [data-audio="play"]').show();
                    obj.find(' [data-audio="pause"]').hide();
                    auctx.suspend();
                });//일시정지
                obj.find(' [data-audio="play"]').hide().on("click",function(){
                    obj.find(' [data-audio="play"]').hide();
                    obj.find(' [data-audio="pause"]').show();
                    auctx.resume();
                });//재생

                this.set();
            },
            hsltorgb:function(h,s,l){
                s /= 100;
                l /= 100;
                const k = n => (n + h / 30) % 12;
                const a = s * Math.min(l, 1 - l);
                const f = n =>
                    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
                return [255 * f(0), 255 * f(8), 255 * f(4)];
            },
            time:function(str){
                var m = Math.floor(str/60);
                    m = (m<10) ? "0"+m:m;
                var s = Math.floor(str%60);
                    s = (s<10) ? "0"+s:s;
                return m+":"+s;
            },
            stop:function(){
                cancelAnimationFrame(req_ani);
            },
            interval:function(){
                var _this = this;
                function _set(){
                    var radius = Math.PI*r*2;
                    var rect_w = (radius/total_line)/2;
                    analyser.getByteFrequencyData(dataArray);
                    ts = auctx.getOutputTimestamp();
                    sVal = (ts.contextTime > src.buffer.duration) ? src.buffer.duration:ts.contextTime;
                    var time_s = _this.time(Math.floor(sVal));
                    var time_e = _this.time(Math.floor(src.buffer.duration));
                    
                    $("#audio_count_start>textPath").text(time_s);
                    $("#audio_count_end>textPath").text(time_e);

                    if(obj.find(' #audio_bar').length < 1) return false;
                    var path = obj.find(' #audio_bar')[0];
                    var total_length = path.getTotalLength();
                    path.style.strokeDasharray = total_length + " " + total_length;
                    path.style.strokeDashoffset = total_length;
                    $(path).css({"strokeDashoffset" : total_length});

                    var bar_per = (ts.contextTime/src.buffer.duration)*100;
                    bar_per = total_length-(total_length*((bar_per)/100));
                    $(path).css({"strokeDashoffset" : bar_per});
                    

                    for(var i=0; i<total_line; i++){
                        var ids = $("#audio_rect_"+(i+1));
                        var bgs = $("#audio_rect_bg_"+(i+1));
                        var num = dataArray[i];
                            num = (num>200) ? 200:num;
                            num = 100-(((num/200)*100)/2);
                            
                        var c = _this.hsltorgb(266,100,num);
                        var rectHeight = (dataArray[i]/2);
                        ids.attr({
                            'fill':'rgba('+c[0]+','+c[1]+','+c[2]+',1)',
                            'width':rect_w,
                            'height':rectHeight,
                            'transform':'translate('+((w/2)-(rect_w/2))+','+((h/2)-r-rectHeight)+') rotate('+((360/total_line)*(i*2))+','+((rect_w/2))+','+(rectHeight+r)+')'
                        });
                        bgs.attr({
                            'fill':'rgba('+c[0]+','+c[1]+','+c[2]+',1)'
                        });
                    }

                    if(src.buffer.duration-ts.contextTime < -3){
                        cancelAnimationFrame(req_ani);
                        $(path).css({"strokeDashoffset" : total_length});
                    } else {
                        req_ani = requestAnimationFrame(_set);
                    }
                }
                _set();
            },
            set:function(){
                var radius = Math.PI*r*2;
                var rect_w = (radius/total_line)/2;
                for(var i=0; i<total_line; i++){
                    var bgs = $("#audio_rect_bg_"+(i+1));
                    var bgH = (i%2===0)?5:10;
                    
                    bgs.attr({
                        'opacity':0.4,
                        'width':rect_w,
                        'height':bgH,
                        'transform':'translate('+((w/2)-(rect_w/2))+','+((h/2)-r-(bgH/2))+') rotate('+((360/total_line)*(i*2))+','+((rect_w/2))+','+(r+(bgH/2))+')'
                    });
                }
                this.interval();
                this.resize(obj);
            },
            resize:function(obj){
                $(window).resize(function(){
                    var re_w = (obj.innerWidth() < 10) ? 10 : obj.innerWidth();
                    var re_h = (obj.innerHeight() < 10) ? 10 : obj.innerHeight();
                    obj.find(" svg")
                        .attr("width",re_w)
                        .attr("height",re_h);
                    
                });
                $(window).trigger("resize");
            }
        }
        __controll.start();
    },
    init:function(){
        var _this = this;
        $('[data-audio]').on("click",function(){_this.set($(this));});
    }
}