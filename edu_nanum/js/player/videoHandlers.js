var v_num = 0; 
var global_syncno = ""; 
var global_video_id = ""; 
var global_control_state = 0; 
var global_vod_path = null; 
var global_vod_img_src = null; 
var global_ad_img = null; 
var global_ad_img_link = null; 
var global_ad_intro = null; 
var global_ad_intro_link = null; 
var global_ad_intro_impression = null; 
var global_ad_outro = null; 
var global_ad_outro_link = null; 
var global_ad_outro_impression = null; 
var global_jump_tm = 0; 
var global_video_speed = 0; 
var global_last_duration=0; 

var global_button_onAd = [".vjs-subtitles-button",".vjs-speed-button",".vjs-quality-button"];


function onAdPlayControl(display){
	var displayTxt = "none";
	if(display) displayTxt = "block";
	
	for(var i=0; i<global_button_onAd.length; i++){
		if(document.querySelector(".vjs-default-skin "+ global_button_onAd[i]) != null){
			document.querySelector(".vjs-default-skin "+ global_button_onAd[i]).style.display = displayTxt;
		}
	}
}

// quality, speed, subtitles
function buttonDisplay(target, display){
	
	var displayTxt = "none";
	var displayTarget = "";
	if(display) displayTxt = "block";
	
	if(target == "quality"){
		displayTarget = ".vjs-quality-button";
	}else if(target == "speed"){
		displayTarget = ".vjs-speed-button";
	}else if(target == "subtitles"){
		displayTarget = ".vjs-subtitles-button";
	}
	if(document.querySelector(".vjs-default-skin "+ displayTarget) != null){
		document.querySelector(".vjs-default-skin "+ displayTarget).style.display = displayTxt;
	}
		
}

function noSpeedControl(inCtl)
{	
	if(inCtl == true) {
		changecss('.vjs-default-skin .vjs-speed-button','display','none');
	}
	else {
		changecss('.vjs-default-skin .vjs-speed-button','display','block');
	}
}

function noKey() {
 try {event.keyCode = 0; }catch(e) { }
 event.cancelBubble = true;
 event.returnValue = false;

 return false;
}

function SaveVideoKeyData(inKey, videoID)
{
	global_syncno = inKey; 
	global_video_id = videoID; 
}

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

function CheckJumpPlayBack()
{
	if(global_jump_tm > 0) {
		var nj = global_jump_tm; 
                var myVideo = document.getElementsByTagName('video')[0];
                if(myVideo != null) {
			var ctime = myVideo.currentTime;
			//alert('ctime==>'+ ctime); 
			if(ctime < nj) myVideo.currentTime = nj; 
			else { 
				global_jump_tm = 0; 
			}
		}
	}
}



function SaveVideoPlayBack(duration)
{
var strURL = "";

        if(global_syncno == "") return;
        if(global_video_id == "") return;

	if(duration != null)
	{
		if(duration<0.5) return; 
	}


        if(global_js_path == "") global_js_path = getActiveScript();

        strURL = global_js_path + "/videosave.php?id="+global_video_id+"&syncno="+global_syncno+"&tm="+duration;

        getAjax( strURL , function(data){ });
}




//adimgURL:image url, adimgCLICK: adv owner url. 
function icore_flash(f_width, f_height, intro_vod,intro_link,content_img,content_vod,outro_vod,outro_link,vplaytype,adimgURL,adimgCLICK,adsurl)
{
				var it_img = content_img,		//��Ʈ�� poster�̹���
					  it_vod = intro_vod,		//��Ʈ�� ������ ���ϸ�
					  m_img = content_img,		//���ο��� poster�̹���
					  m_vod = content_vod,		//���ο��� ���ϸ�
					  ot_img = content_img,		//�ƿ�Ʈ�� poster�̹���
					  ot_vod = outro_vod;		//�ƿ�Ʈ�� ������ ���ϸ�
					 autoplay=vplaytype;		//�ڵ� ��� 0=����. 1=�ڵ� 

				//-----------------
				global_ad_intro = it_vod; //intro video 
				global_ad_intro_link = intro_link; //Intro Ad URL 
				global_ad_outro = ot_vod; //outro video 
				global_ad_outro_link = outro_link; //Outro Ad URL 

				global_vod_path = m_vod; 
				global_vod_img_src = m_img; 
				//-----------------

				//alert('global_js_path--->'+ global_js_path); 

				var str = 'hd_player_v27.swf';
				var param = ''; 
				param = param + 'src='+m_vod; 
				param = param + '&img='+m_img; 

				str = str +'?'+param; 

				param = ''; 
				//adv info.
				if(intro_vod.length>1) param = param + '&intro_file='+intro_vod; 
				if(intro_link.length>1) param = param + '&intro_link='+intro_link; 
				if(outro_vod.length>1) param = param + '&outro_file='+outro_vod; 
				if(outro_link.length>1) param = param + '&outro_link='+outro_link; 

				//�̹��� ���� 
				if(adimgURL.length>1) param = param + '&adv_img='+adimgURL; 
				if(adimgCLICK.length>1) param = param + '&adv_imgclick='+adimgCLICK; 

				//ads���� �������� 
				if(adsurl.length>3) param = param + '&adslink='+adsurl; 

				str = str + param; 
				//alert('str-->'+ str); 


				//�÷��̾� �÷��÷� ���� 
				var so = new SWFObject(global_js_path+str, 'player_obj', f_width, f_height, '10', '#000000');
				so.addParam('allowScriptAccess', 'always');
				so.addParam('allowFullScreen', 'true');
				so.addParam('quality', 'high');
				so.write('playercontent');


				return;

}


//�÷��̾�� ��Ʈ��,����,�ƿ�Ʈ�� �������� Ȯ���ϰ� �����Ű������ �Լ�.---
/*
				var it_img = content_img,		//��Ʈ�� poster�̹���
					  it_vod = intro_vod,		//��Ʈ�� ������ ���ϸ�
					  m_img = content_img,		//���ο��� poster�̹���
					  m_vod = content_vod,		//���ο��� ���ϸ�
					  ot_img = content_img,		//�ƿ�Ʈ�� poster�̹���
					  ot_vod = outro_vod,		//�ƿ�Ʈ�� ������ ���ϸ�
					  video_type = vtype,		
					 autoplay=vplaytype;
*/

function icore_vplayer(intro_vod,intro_link,intro_impression
			,content_img,content_vod
			,outro_vod,outro_link,outro_impression
			,vtype,vplaytype
			,fsyncno,fsaveid,njumptm)
{
				
				var it_img = content_img, 
				it_vod = intro_vod, 
				m_img = content_img, 
				m_vod = content_vod, 
				ot_img = content_img, 
				ot_vod = outro_vod, 
				video_type = vtype,
				autoplay=vplaytype;



				global_jump_tm = njumptm;
				//-------------------
				global_ad_intro = it_vod; 
				global_ad_intro_link = intro_link; 
				global_ad_intro_impression = intro_impression;	
				global_ad_outro = ot_vod; 
				global_ad_outro_link = outro_link; 
				global_ad_outro_impression = outro_impression;	

				global_vod_path = m_vod; 
				global_vod_img_src = m_img; 
				global_control_state = 0;
				//-------------------




				var myVideo = _V_("transact_video_1");		//video�±� ���� (���� �±׿� �̺�Ʈ �߰��ϱ� ���� ����)  

				var vod_type = [it_vod.substr(it_vod.lastIndexOf(".")), m_vod.substr(m_vod.lastIndexOf(".")), ot_vod.substr(ot_vod.lastIndexOf("."))];	//�Ѿ�� ��������� Ȯ���ڸ� Ȯ���ϱ� ���� ����

				for(var i = 0;i<vod_type.length;i++){														//vod_type�迭��ŭ for��
								
								if(vod_type[i]!=".mp4" ){								//Ȯ���� .mp4�� �ν� �ƴѰ�� �˸�â(��Ʈ��,�ƿ�Ʈ�� ������ �������� �����Ƿ� "" ����)
												if(vod_type[i]!=""){
																return alert("�߸��������� �������Դϴ�.");
												}
								}

				}//for��-��


				if(myVideo == null) {
					return alert("�÷��̾� �⵿�� ���� �Ͽ����ϴ�");
				}

				if(document.getElementsByTagName('video')[0]==null) return;
//alert('autop--->'+autoplay); 
		
				//20210114
				setKeyboardControl(myVideo);
				
				//��������� 
				var vadlink = document.getElementById('transact_video_add');
				if(vadlink != null) vadlink.innerHTML = "<span bgcolor='#FF9900' style='border:1px solid white;'><a id='vadbtn' class='vjs-skiptitles' onclick='' alt='����ũ'>���������</a></span>";
				var vaddbtn = document.getElementById('vadbtn'); 
				if(vaddbtn != null) vaddbtn.onclick = function onclick(event){ onAdJump(); return; }; 
				
				changecss('.vjs-default-skin div.vjs-ad span','display','none');   //������ ���� ����
			


				//show_ad_image('http://ads.knn.co.kr/www/images/531981da29c64e1dbd8891e0fde5b87f.jpg', 'http://www.naver.com');


				//changecss('.vjs-default-skin div.vjs-adimg span','display','block'); //�̹��� ���� 
				changecss('.vjs-default-skin div.vjs-adimg span','display','none'); //�̹��� ���� ���� 



				//���� SKIP��ư ��Ȱ�� 
				//document.getElementById("transact_video_skipad").style.display ="block";
				var vskipad = document.getElementById('transact_video_skipad'); 
				if(vskipad != null) vskipad.innerHTML = "<span bgcolor='#FF9900' style='border:1px solid white;'><a id='skipbtn' class='vjs-skiptitles' onclick='' alt='���� ����'><font size=2>����ǳʶٱ⢺</font></a></span>";
				var vskipbtn = document.getElementById('skipbtn'); 
				if(vskipbtn != null) vskipbtn.onclick = function onclick(event){ onVideoStop(); return; }; 

				changecss('.vjs-default-skin div.vjs-skipad span','display','none');   //��ŵ �Ⱥ��̱� 
			


				if(video_type == 0){
					var icore_video_player = document.getElementsByTagName('video')[0];		//�����±� ����
					icore_video_player.poster = m_img;
					icore_video_player.src = m_vod;
					document.getElementById("transact_video_control").style.display ="none";
					document.getElementById("transact_video_add").style.display ="none";
					icore_video_player.controls = true;
					icore_video_player.load();
					icore_video_player.play();
					icore_video_player.pause();
					global_last_duration = 0; 
				}
				else 
				{

								function onComplete(){
												
												changecss('.vjs-default-skin div.vjs-skipad span','display','none');	//��ŵ��ư ���� 

												changecss('.vjs-default-skin div.vjs-ad span','display','none');   //������ ���� ����

												changecss('.vjs-default-skin div.vjs-adimg span','display','none'); //�̹��� ���� ����



//alert('lhb---3---->'+ v_num); 


																		//��Ʈ��,�ƿ�Ʈ�� ������ ������� ���ο����� ����ϱ� ���� �Լ�

												document.getElementById("transact_video_add").style.display ="none";
												document.getElementById("transact_video_control").style.display ="block";

												_V_.PlayToggle=_V_.Button.extend({										//�����󿡼� ��� �� ��Ŭ���� �Ͻ�����,�Ͻ����� �� ��Ŭ���� ���(video.js���� ����)
																						buttonText:"Play",
																						init:function(player,options){
																													this._super(player,options);
																													player.addEvent("play",_V_.proxy(this,this.onPlay));
																													player.addEvent("pause",_V_.proxy(this,this.onPause))
																												},
																						buildCSSClass:function(){
																														return"vjs-play-control "+this._super()},
																						onClick:function(){


																												if(this.player.paused()){
					
																																global_last_duration = 0; 

																																this.player.play()
																												}else{this.player.pause()}},
																						onPlay:function(){
																												_V_.removeClass(this.el,"vjs-paused");
																												_V_.addClass(this.el,"vjs-playing")},
																						onPause:function(){
																												_V_.removeClass(this.el,"vjs-playing");
																												_V_.addClass(this.el,"vjs-paused")
																												}
																			});
											
												var main_video = document.getElementsByTagName('video')[0];//�����±� ����
												
												main_video.poster = m_img;									//���ο��� poster�̹��� ��� �߰�
												main_video.src = m_vod;											//���ο��� ��� �߰�
												myVideo.load();																	//video �ε� ����
												
												if(it_vod!=""){																		//��Ʈ�� ������ ������� ���ο��� ���

																//���� ��� 
																myVideo.addEvent("play", onIntroPlay);			

																
																myVideo.play();

																//myVideo.pause();
																if(v_num==1) myVideo.pause();
																if(myVideo.ended){
																	onAdPlayControl(true);
																}

																//if(autoplay==1) myVideo.play(); else myVideo.pause();

												}
										
												if(ot_vod!=""){
																//-- KNN 2016.11.11
												
																//��Ʈ�� ���� ���� ī���� �ε� -- 2016.11.11 KNN
																var img_impression_obj = document.getElementById('video_impression_img');
																if(img_impression_obj!=null) {
																	img_impression_obj.src = global_ad_outro_impression; 
																	img_impression_obj.width = 0; 
																	img_impression_obj.height = 0; 
																}
											




																//���� ��� 
																myVideo.addEvent("play", onOutroPlay);			


																if(myVideo.ended){
																				myVideo.addEvent("ended", outtro);						//�ƿ�Ʈ�� ������ ������� ���� ���� ������ outtro�Լ� ����
																				onAdPlayControl(true); 
																}
												}else{


																myVideo.addEvent("ended", endV);						//�ƿ�Ʈ�� ������ ������� ���� ���� ������ endV�Լ� ����
												}
								}//onComplete()-��



								//���� ����� 
								function onIntroPlay(){
									if(v_num == 0 || v_num == 1000){onAdPlayControl(false);}
									
									changecss('.vjs-default-skin div.vjs-ad span','display','block');
									//��Ծ����� ���� 
									myVideo.removeEvent("play", onIntroPlay);

									v_num = 10;
								}
								function onOutroPlay(){
									
									changecss('.vjs-default-skin div.vjs-ad span','display','block');
									//��Ծ����� ���� 
									myVideo.removeEvent("play", onOutroPlay);

									v_num = 1000;
								}

								function outtro(){																				//�ƿ�Ʈ�� ������ ������� �ƿ�Ʈ�� ������ ����ϱ� ���� �Լ�
									var outtro = document.getElementsByTagName('video')[0];				//�����±� ����

									changecss('.vjs-default-skin div.vjs-adimg span','display','none'); //�̹��� ���� ����


									document.getElementById("transact_video_control").style.display ="block";
									document.getElementById("transact_video_add").style.display ="block";
									_V_.PlayToggle=_V_.Button.extend({										//������ ��Ŭ���� �ƹ� �̺�Ʈ �߻����ϵ�����.(video.js���� ����)
									});
									outtro.poster = ot_img;														//�ƿ�Ʈ�� ���� poster�̹��� ��� �߰�
									outtro.src =  ot_vod;															//���ο��� ��� �߰�

									ot_vod = ''; //�ʱ�ȭ 


									_V_.PlayToggle=_V_.Button.extend({													//������ ��Ŭ���� �ƹ� �̺�Ʈ �߻����ϵ�����.(video.js���� ����)
												});
									myVideo.load();																				//video �ε� ����
									myVideo.play();																				//video ��� ����

									myVideo.removeEvent("ended", onComplete);

									myVideo.addEvent("ended", endV);													//���� ���� ������ endV�Լ� ����

								}//outtro()-��









								function endV(){																					//���������� ���ο����� ����ϱ� ���� �Լ�(�� �Լ� ���ķδ� ��,�ƿ�Ʈ�� ����ȵ�)
									var endvod = document.getElementsByTagName('video')[0];				//�����±� ����

									global_last_duration=0; 


									document.getElementById("transact_video_add").style.display ="none";
									document.getElementById("transact_video_control").style.display ="block";
									
									_V_.PlayToggle=_V_.Button.extend({										//�����󿡼� ��� �� ��Ŭ���� �Ͻ�����,�Ͻ����� �� ��Ŭ���� ���(video.js���� ����)
																					buttonText:"Play",
																					init:function(player,options){
																												this._super(player,options);
																												player.addEvent("play",_V_.proxy(this,this.onPlay));
																												player.addEvent("pause",_V_.proxy(this,this.onPause))
																											},
																					buildCSSClass:function(){
																													return"vjs-play-control "+this._super()},
																					onClick:function(){
																											if(this.player.paused()){
																															this.player.play()
																											}else{this.player.pause()}},
																					onPlay:function(){
																											_V_.removeClass(this.el,"vjs-paused");
																											_V_.addClass(this.el,"vjs-playing")},
																					onPause:function(){
																											_V_.removeClass(this.el,"vjs-playing");
																											_V_.addClass(this.el,"vjs-paused")
																											}
																		});
	

									changecss('.vjs-default-skin div.vjs-adimg span','display','none'); //�̹�������off
									changecss('.vjs-default-skin div.vjs-ad span','display','none');   //������ ���� ����
									changecss('.vjs-default-skin div.vjs-skipad span','display','none');   //��ŵ �Ⱥ��̱�

									
									endvod.poster = m_img;													//���ο��� poster�̹��� ��� �߰�
									endvod.src = m_vod;															//���ο��� ��� �߰�

									myVideo.load();																				//video �ε� ����
									myVideo.pause();																			//video �Ͻ� ���� (�ڵ� ����� �������� ���)

									if(autoplay==1 && v_num<10) myVideo.play(); else myVideo.pause();								
									myVideo.removeEvent("ended", onComplete);


								}//endV()-��

								//alert('it_vod-->'+ it_vod); 

								//������ ���� ������� ������ ���� �÷��̾� ���� ���ǹ�
								if(it_vod!=""&&m_vod!=""&&ot_vod!=""){			
																																					//��Ʈ��,����,�ƿ�Ʈ�� ������ ��� �����Ұ�� -- 


												//��Ʈ�� ���� ���� ī���� �ε� -- 2016.11.11 KNN
												var img_impression_obj = document.getElementById('video_impression_img');
												if(img_impression_obj!=null) {
													img_impression_obj.src = global_ad_intro_impression; 
													img_impression_obj.width = 0; 
													img_impression_obj.height = 0; 
												}
											
											

												var intro = document.getElementsByTagName('video')[0];		//�����±� ����

												//���� ��Ʈ�� 
												//document.getElementById("transact_video_control").style.display ="none";
												document.getElementById("transact_video_control").style.display ="block";
												document.getElementById("transact_video_add").style.display ="block";



												
												myVideo.addEvent("ended", onComplete);								//��Ʈ�� ������ ������� onComplete���� �̺�Ʈ �߰�

												//���� ��� 
												myVideo.addEvent("play", onIntroPlay);			


												intro.poster = it_img;											//��Ʈ�� poster�̹��� ��� �߰�
												intro.src = it_vod;													//��Ʈ�� ���� ��� �߰�

												//alert('src-->'+ it_vod); 

												myVideo.load();																	//video �ε� ����
												//myVideo.play();																	//video ��� ����

                                                                                                if(autoplay==1 && ot_vod!="") myVideo.play(); else myVideo.pause();

												
												_V_.PlayToggle=_V_.Button.extend({			});								//������ ��Ŭ���� �ƹ� �̺�Ʈ �߻����ϵ�����.(video.js���� ����)



								}else if(it_vod==""&&m_vod!=""&&ot_vod!=""){									//����,�ƿ�Ʈ�� ������ �����Ұ��

												onComplete();																	//onComplete()�Լ� ����

								}else if(it_vod!=""&&m_vod!=""&&ot_vod==""){									//��Ʈ��,���� ������ �����Ұ��
												var intro = document.getElementsByTagName('video')[0];		//�����±� ����
												//document.getElementById("transact_video_control").style.display ="none";
												document.getElementById("transact_video_control").style.display ="block";
												document.getElementById("transact_video_add").style.display ="block";

												_V_.PlayToggle=_V_.Button.extend({										//������ ��Ŭ���� �ƹ� �̺�Ʈ �߻����ϵ�����.(video.js���� ����)
												});


												myVideo.addEvent("ended", onComplete);								//��Ʈ�� ���� ����� onComplete�Լ� ����
												//���� ��� 
												myVideo.addEvent("play", onIntroPlay);			



												intro.poster = it_img;											//��Ʈ�� poster�̹��� ��� �߰�
												intro.src = it_vod;													//��Ʈ�� ���� ��� �߰�
												
												if(autoplay==1) myVideo.play(); else myVideo.pause();
												
												




								}else if(it_vod==""&&m_vod!=""&&ot_vod==""){									//���� ���� ������ ���

												changecss('.vjs-default-skin div.vjs-ad span','display','none');   //������ ���� ����
												changecss('.vjs-default-skin div.vjs-skipad span','display','none');   //��ŵ �Ⱥ��̱�

												endV();																				//endV()�Լ� ����
								}else if(m_vod==""){																			//���� ������ �������
												return alert("���� ������ �������� �ʽ��ϴ�.");						//���â ����
								}else{																									//��� �ش������ �������
												return alert("�ý������ �Դϴ�. �����ڿ��� �����ϼ���.");		//���â ����
								}//�÷��̾� ���� ���ǹ�-��











								//���� ��ũ ��â ���� 
								function onAdJump(){

												changecss('.vjs-default-skin div.vjs-skipad span','display','none');	//��ŵ��ư ���� 

												changecss('.vjs-default-skin div.vjs-ad span','display','none');   //������ ���� ����

												changecss('.vjs-default-skin div.vjs-adimg span','display','none'); //�̹��� ���� ����

												document.getElementById("transact_video_add").style.display ="none";
												document.getElementById("transact_video_control").style.display ="block";

												var main_video = document.getElementsByTagName('video')[0];//�����±� ����
												
												main_video.src = '';	//���ο��� ��� �߰�
												myVideo.load();		//video �ε� ����
												myVideo.play();	

												if(ot_vod != '' || v_num<1000) {
													//alert('open --> '+ global_ad_intro_link ); 
													if( global_ad_intro_link.length > 1 ) window.open( global_ad_intro_link ); 																											
													onComplete(); 
												}
												else {
													//alert('open --> '+ global_ad_outro_link); 
													if( global_ad_outro_link.length > 1 ) window.open( global_ad_outro_link ); 																											
													myVideo.removeEvent("ended", onComplete);
													myVideo.addEvent("ended", endV);
													endV(); 
												}

								}




								//���� ���� ���� 
								function onVideoStop(){


												changecss('.vjs-default-skin div.vjs-skipad span','display','none');	//��ŵ��ư ���� 

												changecss('.vjs-default-skin div.vjs-ad span','display','none');   //������ ���� ����

												changecss('.vjs-default-skin div.vjs-adimg span','display','none'); //�̹��� ���� ����

												document.getElementById("transact_video_add").style.display ="none";
												document.getElementById("transact_video_control").style.display ="block";

												var main_video = document.getElementsByTagName('video')[0];//�����±� ����
												
												main_video.src = '';	//���ο��� ��� �߰�
												myVideo.load();		//video �ε� ����
												myVideo.play();	

												if(ot_vod != '' || v_num<1000) onComplete(); 
												else {
													myVideo.removeEvent("ended", onComplete);
													myVideo.addEvent("ended", endV);
													endV(); 
												}

								}



























				}


	SaveVideoKeyData(fsyncno, fsaveid); 


}//icore_vplayer(a,b,c,d,e,f)-��



function changecss(theClass,element,value){			//css���� �������ִ� �Լ�(��罺Ÿ�Ͻ�Ʈ�� �˻��ؼ� �ش� Ŭ������ �Ӽ��� ���� �������ش�.)css�� class�� �ߺ��� error����
				var cssRules;

				if(document.all){
								cssRules = 'rules';
				}else if(document.getElementById){
								cssRules = 'cssRules';
				}

				var added = false;

				for(var S=0;S<document.styleSheets.length;S++){
								if(document.styleSheets[S][cssRules]==null) continue;
								for(var R=0;R<document.styleSheets[S][cssRules].length;R++){
												if(document.styleSheets[S][cssRules][R].selectorText==theClass){
																if(document.styleSheets[S][cssRules][R].style[element]){
																				document.styleSheets[S][cssRules][R].style[element]=value;
																				added=true;
																				break;
																}
												}
								}
								if(!added){
												if(document.styleSheets[S].insertRule){
																document.styleSheets[S].insertRule(theClass+'{'+element+':'+value+';}',document.styleSheets[S][cssRules].length);
												}else if(document.styleSheets[S].addRule){
																document.styleSheets[S].addRule(theClass,element+':'+value+';');
												}
								}
				}
}

//�̹��� �ڸ� �缳�� 
function show_ad_image_pos_reset(mode){
		var img_obj = document.getElementById('ad_img_obj');

		if(img_obj != null) {
			if(mode == "full") 
				changecss('.vjs-default-skin div.vjs-adimg span','top','86%');
			else 
				changecss('.vjs-default-skin div.vjs-adimg span','top','75%');
		}
}	


function show_ad_image_disable()
{
	//alert('disable!'); 
	//global_image_ad_timer = -100;
	changecss('.vjs-default-skin div.vjs-adimg span','display','none');
}

function browser_ver_check()
{
      var transact_br_chk = window.navigator.userAgent.toLowerCase();

      if (transact_br_chk.indexOf("chrome") != -1) transact_br_chk = 'Chrome';

      if (transact_br_chk.indexOf("opera") != -1) transact_br_chk =  'Opera';

      if (transact_br_chk.indexOf("staroffice") != -1) transact_br_chk =  'Star Office';

      if (transact_br_chk.indexOf("webtv") != -1) transact_br_chk =  'WebTV';

      if (transact_br_chk.indexOf("beonex") != -1) transact_br_chk =  'Beonex';

      if (transact_br_chk.indexOf("chimera") != -1) transact_br_chk =  'Chimera';

      if (transact_br_chk.indexOf("netpositive") != -1) transact_br_chk =  'NetPositive';

      if (transact_br_chk.indexOf("phoenix") != -1) transact_br_chk =  'Phoenix';

      if (transact_br_chk.indexOf("firefox") != -1) transact_br_chk =  'Firefox';

      if (transact_br_chk.indexOf("safari") != -1) transact_br_chk =  'Safari';

      if (transact_br_chk.indexOf("skipstone") != -1) transact_br_chk =  'SkipStone';

      if (transact_br_chk.indexOf("msie") != -1) transact_br_chk =  'Internet Explorer'; // * IE 10 ���� X

      if (transact_br_chk.indexOf("trident") != -1) transact_br_chk =  'Internet Explorer11'; // * ���� üũ ����

      if (transact_br_chk.indexOf("netscape") != -1) transact_br_chk =  'Netscape';

      if (transact_br_chk.indexOf("mozilla/5.0") != -1) transact_br_chk =  'Mozilla';


      if(transact_br_chk=="Internet Explorer"){
		return "msie"; 
      }else if(transact_br_chk=="Internet Explorer11"){
		return "msie"; 
      }else{
		var strname = transact_br_chk.toLowerCase(); 
		return strname; 
      }

}

function show_ad_image_reprint(v_width,v_height)
{
	var nimg_center_pos=0;
	var img_obj = document.getElementById('ad_img_obj');
	var img_close_btn = document.getElementById('ad_img_close_btn');
	var js_path = getActiveScript();

	changecss('.vjs-default-skin div.vjs-adimg span','display','block');
	//alert('onload repaint!!'); 

	if(img_obj != null) {
			nimg_center_pos = (v_width / 2) + ( img_obj.width / 2); 
			nimg_center_per = (nimg_center_pos/v_width) * 100; 
			nimg_center_per = nimg_center_per + '%'; 
			
			var ad_img_sz = (img_obj.width / 2) - 10; 
			//alert('ad_img_sz-->'+ad_img_sz+'/ vplay size:'+ v_width +'/img_obj.width-->'+ img_obj.width); 

			if(img_close_btn!=null) 
			{
				if( global_js_path != null) img_close_btn.src=global_js_path+'closebtn.gif'; 
				else 
				img_close_btn.src='./closebtn.gif'; 

				//alert('src-->'+ img_close_btn.src); 

				img_close_btn.onclick = function onclick(event){show_ad_image_disable();return;};

				var btype = browser_ver_check(); 
				var vclosebtn_area = document.getElementById('closebtn_area');
				//alert('type--->'+btype); 

				if(vclosebtn_area!=null) 
				{
					if(btype == "msie") {
						//alert('pos-->'+ img_obj.width ); 
						vclosebtn_area.style.left = ((img_obj.width / 2)-10)+'px'; 
					}
					else {
						vclosebtn_area.style.left = ad_img_sz+'px'; 
					}
				}
				else {
					vclosebtn_area.style.display = 'none'; 
				}
			}
	}

	changecss('.vjs-default-skin div.vjs-adimg span','display','none');


}



//isrc=�̹��� ��� 
//ilink=Ŭ���� �̵� ��� 
function show_ad_image(player_width, player_height, isrc, ilink){	

		var img_close_btn = document.getElementById('ad_img_close_btn');
		var img_obj = document.getElementById('ad_img_obj');
		var img_link = document.getElementById('ad_img_link');

		//var myVideo = _V_("transact_video_1"); 
		//var myVideo = document.getElementsByTagName('video')[0];

		var v_width = player_width; 
		var v_height = player_height; 
		var nimg_center_pos=0;


		global_ad_img = isrc; 		//ad image url 
		global_ad_img_link = ilink; 	//ad image link 

		//�ʱ� ���� 
		changecss('.vjs-default-skin div.vjs-adimg span','display','block');
		//changecss('.vjs-default-skin div.vjs-adimg span','align','center');

		if(img_obj != null) {
			img_obj.src = isrc;
			//alert('img-->'+ img_obj.src + '/width:'+ img_obj.width); 
			img_obj.onload = function onload(event){show_ad_image_reprint(player_width,player_height);return false};
		}

		if(img_link != null) {
			img_link.onclick = function onclick(event){show_ad_image_disable();window.open(ilink,'_blank');return false};
		}

		//�Ⱥ��̰� �ؾ��� 
		changecss('.vjs-default-skin div.vjs-adimg span','display','none');

		//�׽�Ʈ�� 
		//changecss('.vjs-default-skin div.vjs-adimg span','display','block');

		//changecss('.vjs-default-skin div.vjs-adimg span','left','20%');

}



function icore_logo_view_info(logouse,logolink,logosize,logoimg,type,left,top){		//�ΰ� ��뿩�ο� ��ũ�ּ�,�ΰ��̹��� ũ��,�ΰ��̹��� ���, �ΰ���ġ Ÿ��, �ΰ���ġ ����

				var logo_use = logouse,
						logo_link_add = logolink,
						logo_size = logosize,
						logo_img = logoimg;

				if(logo_use==""){
								logo_use = "n";
				}

				if(logo_use=="y"){
								changecss('.vjs-default-skin div.vjs-logo span','display','block');

								var player_logo = document.getElementById('logo');
								var logo_element = document.getElementById('logo_img');

								if(logo_size==""){
												logo_size=100;
								}

								if(logo_link_add == ""){
												player_logo.onclick = "";
								}else{
												player_logo.onclick = function onclick(event){window.open(logo_link_add,'_blank','width=900px,height=600px');return false};
								}
								logo_element.src = logo_img;
								logo_element.width = logo_size;

								if(type==7){
												changecss('.vjs-default-skin div.vjs-logo span','left','10%');
												changecss('.vjs-default-skin div.vjs-logo span','top','10%');
								}else if(type==9){
												changecss('.vjs-default-skin div.vjs-logo span','left','80%');
												changecss('.vjs-default-skin div.vjs-logo span','top','10%');
								}else if(type==5){
												changecss('.vjs-default-skin div.vjs-logo span','left','43%');
												changecss('.vjs-default-skin div.vjs-logo span','top','70%');
								}else if(type==1){
												changecss('.vjs-default-skin div.vjs-logo span','left','10%');
												changecss('.vjs-default-skin div.vjs-logo span','top','70%');
								}else if(type==3){
												changecss('.vjs-default-skin div.vjs-logo span','left','80%');
												changecss('.vjs-default-skin div.vjs-logo span','top','70%');
								}else{
												if(left!=""){
																var left = left+"%";
																changecss('.vjs-default-skin div.vjs-logo span','left',left);
												}else{
																changecss('.vjs-default-skin div.vjs-logo span','left','10%');
												}
												if(top!=""){
																var top = top+"%";
																changecss('.vjs-default-skin div.vjs-logo span','top',top);
												}else{
																changecss('.vjs-default-skin div.vjs-logo span','top','10%');
												}
								}

				}else if(logo_use=="n"){
								changecss('.vjs-default-skin div.vjs-logo span','display','none');
								var logo_element = document.getElementById('logo_img');
								if(logo_element==null) return; 
								logo_element.width = 0;
								logo_element.src = "";
				}else{
								changecss('.vjs-default-skin div.vjs-logo span','display','none');
								alert("�ΰ��뿩�� ������ �߸� ���ԵǾ����ϴ�.");
				}

				
}
function video_play(){//���� ���
	var myVideo = _V_("transact_video_1");	
	myVideo.play();
}
function video_stop(){//���� ����
	var myVideo = _V_("transact_video_1");	
	myVideo.pause();
}


function video_gostep(value) {//���� ���� ������ �ǳʶٱ�

	var myVideo = _V_("transact_video_1");	
	var value =  value;
	var current = myVideo.currentTime();
	var nextr = current + value;
	var duration = myVideo.duration();
	var kiptime = duration - current;
	if(kiptime>11){
	myVideo.currentTime(nextr);
	}else{
		return false;
	}

}
function video_backstep(value) {//���� ���� �ڷ� �ǳʶٱ�

	var myVideo = _V_("transact_video_1");	
	var value =  value;
	var current = myVideo.currentTime();
	var nextr = current - value;
	
	if(current>11){
	myVideo.currentTime(nextr);
	}else{
		return false;
	}

}

function video_speedup() {//���� ����ӵ� ������
	var myVideo = document.getElementsByTagName('video')[0];
	var nspeed =  myVideo.playbackRate;
	var nowspeed = Math.round(nspeed*10)/10;
	var sp_t;
	


	if(nowspeed<(2.0)){
		myVideo.playbackRate = nowspeed + (0.1);
		var sptext = myVideo.playbackRate;
		var sptext_f = sptext.toFixed(1)+"x";
		document.getElementById('speedtextview').value = "���� ����� x"+sptext.toFixed(1)+"�Դϴ�.";
		document.all.speed_text.innerHTML = sptext.toFixed(1)+"x";

		for(var i = 1;i<=17;i++){
			sp_t = document.all.ta_vs_speed_menu[i].innerHTML;
				if (sptext_f==sp_t){
							document.all.ta_vs_speed_menu[i].className = "vjs-menu-item vjs-selected";
				}else{
							document.all.ta_vs_speed_menu[i].className = "vjs-menu-item";
				}
			}
	}
}

function video_speeddown() {
	var myVideo = document.getElementsByTagName('video')[0];
	var nspeed =  myVideo.playbackRate;
	var nowspeed = Math.round(nspeed*10)/10;
	var sp_t;

	if(nowspeed>(0.5)){
		myVideo.playbackRate = nowspeed - (0.1);
		var sptext = myVideo.playbackRate;
		var sptext_f = sptext.toFixed(1)+"x";
		document.getElementById('speedtextview').value = "���� ����� x"+sptext.toFixed(1)+"�Դϴ�.";
		document.all.speed_text.innerHTML = sptext.toFixed(1)+"x";
		
	
			for(var i = 1;i<=17;i++){
			sp_t = document.all.ta_vs_speed_menu[i].innerHTML;
				if (sptext_f==sp_t){
							document.all.ta_vs_speed_menu[i].className = "vjs-menu-item vjs-selected";
				}else{
							document.all.ta_vs_speed_menu[i].className = "vjs-menu-item";
				}
			}

		

	}else //if (nowspeed<=(0.5))
	{
		return false;
	}
	
}

function video_jump(value) {
	var myVideo = _V_("transact_video_1");	
	var value =  value;
	var current = myVideo.currentTime();
	var nextr = current + value;
	var duration = myVideo.duration();
	var kiptime = duration - current;
	if(kiptime>11){
	myVideo.currentTime(nextr);
	}else{
		return false;
	}
}

function video_goto(value) {
	var myVideo = _V_("transact_video_1");	
	var value =  value;
	var current = myVideo.currentTime();
	var duration = myVideo.duration();

	if(myVideo==null) {
		alert('video Error!'); 
		return; 
	}
	if(value>duration) value=duration; 
	if(value<0) value=0; 

	myVideo.currentTime(value);
}


function video_setspeed(gspeed) {//
	var myVideo = document.getElementsByTagName('video')[0];
	var nspeed =  myVideo.playbackRate;
	var nowspeed = Math.round(nspeed*10)/10;
	var sp_t;
	var gspeed = gspeed;

		if(gspeed<(2.1)&&gspeed>(0.4)){
						if(nowspeed<(2.0)&&nowspeed>(0.5)){
										myVideo.playbackRate = gspeed;
										var sptext = myVideo.playbackRate;
										var sptext_f = sptext.toFixed(1)+"x";
										document.getElementById('speedtextview').value = "���� ����� x"+sptext.toFixed(1)+"�Դϴ�.";
										document.all.speed_text.innerHTML = sptext.toFixed(1)+"x";

										for(var i = 1;i<=17;i++){
											sp_t = document.all.ta_vs_speed_menu[i].innerHTML;
												if (sptext_f==sp_t){
															document.all.ta_vs_speed_menu[i].className = "vjs-menu-item vjs-selected";
												}else{
															document.all.ta_vs_speed_menu[i].className = "vjs-menu-item";
												}
										}
						}
		} else {
			alert("����� 0.5~2.0�� �����մϴ�.");
			return false;
		}
}

function myVideoReturn() {
	var myVideo = _V_("transact_video_1");
	return myVideo; 
}

function video_jump_enable(){
	global_control_state = 0; 
}
function video_jump_disable(){
	global_control_state = 1; 
}
function video_jump_after_disable(){
	global_control_state = 2; 
}

function video_nowtime(){//���� ���� ����ð�
	var myVideo = _V_("transact_video_1");	
	var nowtime = parseInt(myVideo.currentTime());

	//alert("���� ��������� "+nowtime+"�� �Դϴ�.");
	return nowtime;
}

function video_totaltime(){//���� �� ����ð�
	var myVideo = _V_("transact_video_1");	
	var totaltime = parseInt(myVideo.duration());

	//alert("�� ��� �ð��� "+totaltime+"�� �Դϴ�.");
	return totaltime;
}

function get_video_url(){ 
if(global_vod_path != null) return global_vod_path; 
var myVideo = document.getElementsByTagName('video')[0];
if(myVideo == null || myVideo == undefined) return transact_video_src; 
return myVideo.src; 
} 

function get_video_poster(){ 
if(global_vod_img_src!=null) return global_vod_img_src; 
var myVideo = document.getElementsByTagName('video')[0]; 
if(myVideo == null || myVideo == undefined) return transact_video_poster; 
return myVideo.poster; 
}


function get_video_ad_img(){ 
return global_ad_img; 
}

function get_video_ad_img_link(){ 
return global_ad_img_link; 
}

function get_intro_vod(){ 
return global_ad_intro; 
}
function get_intro_vod_link(){ 
return global_ad_intro_link; 
}
function get_outro_vod(){ 
return global_ad_outro; 
}
function get_outro_vod_link(){ 
return global_ad_outro_link; 
}

//20210114
function setKeyboardControl(myVideo){

	var transact_br_chk = window.navigator.userAgent.toLowerCase();

	if (transact_br_chk.indexOf("msie") != -1) return; 
	else 
        if (transact_br_chk.indexOf("trident") != -1) return; 

	myVideo.addEvent("click", function(event){
		event.stopPropagation();
		event.cancelBubble = true;
		window.addEventListener("keydown", setKeyBoard, true);
	});
	
	myVideo.addEvent("keydown", function(event){
		event.stopPropagation();
		event.cancelBubble = true;
		window.addEventListener("keydown", setKeyBoard, true);
	});
	
	window.onclick = function(e){
		window.removeEventListener("keydown", setKeyBoard, true);
		event.cancelBubble = true;
		e.stopPropagation();
	}

}

//20210114 video.js video_gostep ����
function video_gostepc(value) {//���� ���� ������ �ǳʶٱ�
	var myVideo = _V_("transact_video_1");	
	var current = myVideo.currentTime();
	var nextr = current + value;
	myVideo.currentTime(nextr);

}

//20210114
function setKeyBoard(e){
	
	if(e == "undefined") return;
	
	var defaultSkipSec = 5; // default skip seconds
	var defaultSkipMaxSec = 10; // max skip seconds
	
	var myVideo = _V_("transact_video_1");	
	var dur = myVideo.duration();
	var volume = myVideo.volume();
	
	// 1�� �̻��� 10��
	if(dur > 60){
		defaultSkipSec = defaultSkipMaxSec;
	}
	
	if(defaultSkipSec > dur){
		defaultSkipSec = Math.round(dur/2);
	}
	
	// switch
	var keyCode = e.which;
	switch(keyCode){
		case 37 : //����
			video_gostepc(-defaultSkipSec);
			break;
		case 39 : //����
			video_gostepc(defaultSkipSec);
			break;
		case 32 : // spacebar
			if (myVideo.paused()){
				myVideo.play();
			}else{
				myVideo.pause();
			}
			break;
		case 38 : //��
			myVideo.muted(false); // mute�� �Ǹ� ������ �ȵ�.
			myVideo.volume(myVideo.volume() + 0.1);
			break;
		case 40 : //�Ʒ�
			myVideo.volume(myVideo.volume() - 0.1);
			break;
		case 9 : //tab
			var cl = document.getElementById("transact_video_control");
			_V_.removeClass(cl, "vjs-fade-out");
			_V_.addClass(cl, "vjs-fade-in");
			break;
		default :
			break;
	}
	
}





function setQualityButton(qOptions){	

	if(qOptions.length <= 1) return;
	
	_V_.ControlBar.prototype.options.components['srcButton'] = {};
	
	_V_.Player.prototype.setSrc = function(src){
		var cTime = this.currentTime();
		this.tech.el.src = src;
		this.src = src;
		
		this.currentTime(cTime);
		this.play();
		this.triggerEvent("srcChange");
	};
	
	_V_.SrcMenuItem = _V_.MenuItem.extend({
		init: function(player, options){
			this.src = options.src;
			options.label = options.text;
			options.selected = (this.src == qOptions[0].src);
			this._super(player, options);
			this.player.addEvent ("srcChange", _V_.proxy(this, this.update));
		},

		onClick: function(){
			this._super();
			this.player.setSrc(this.src);
		},

		update: function(){
			console.log(this.player.src);
			
			if (this.player.src == this.options.src) {
				this.selected(true);
			} else {
				this.selected(false);
			}
		}
	});
	
	_V_.SrcButton = _V_.Button.extend({
		buttonText: "화질선택",
		className: "vjs-quality-button",

		init: function(player, options){
			this._super(player, options);
			// Hide in Flash which does not support playbackRate.
			if (player.techName != 'html5') {
				this.el.style.display = 'none';
				return;
			}
			this.createMenu();
			this.text = _V_.createElement("span", { className: 'vjs-quality-text', innerHTML: 'Quality',id:"quality_text"});
			this.el.firstChild.appendChild(this.text);
		},

		createMenu: function(){
			this.menu = new _V_.Menu(this.player);
			// Add menu items to the menu
			
			for(var qn in qOptions){
				this.menu.addItem(new _V_.SrcMenuItem (this.player, qOptions[qn]));
			}
			// Add list to element
			this.addComponent(this.menu);
		},

		buildCSSClass: function(){
			return this.className + " vjs-menu-button " + this._super();
		},

		// Focus - Add keyboard functionality to element
		onFocus: function(){
			// Show the menu, and keep showing when the menu items are in focus
			var menus = document.getElementsByClassName("vjs-menu");
			for(var i=0; i<menus.length; i++){
				menus[i].style.display = 'none';
			}
			this.menu.lockShowing();
		},
		// Can't turn off list display that we turned on with focus, because list would go away.
		onBlur: function(){},

		onClick: function(){
			// When you click the button it adds focus, which will show the menu indefinitely.
			// So we'll remove focus when the mouse leaves the button.
			// Focus is needed for tab navigation.
			this.one("mouseout", this.proxy(function(){
				this.menu.unlockShowing();
				this.el.blur();
			}));
		}
	});
}



