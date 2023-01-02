function pres_check(j_page_cnt){
	alert('???');
	if ( j_page_cnt != "" ){
		j_book_mark_url = top.study_data.document.location.href;		

		pres_check_book(j_page_cnt,j_book_mark_url);
	}
}

function pres_check_book(j_page_cnt,j_book_mark_url){
	alert();
	if ( j_page_cnt != "" ){

		top.pres_data.f_pres_data.CURRENT_PAGE.value = j_page_cnt;		
		top.pres_data.f_pres_data.CURRENT_STUDY_URL.value = j_book_mark_url;
		top.pres.document.location.href="/servlet/Controller?VEVENT=LUSC022G&CURRENT_PAGE="+j_page_cnt+"&BOOK_MARK_URL="+escape(j_book_mark_url);	
	}	
}

function getTotalPage(){
//	return top.pres_data.f_pres_data.CONTENTS_WEB_FRAME_CNT.value;	
}	

function pres_check_unload(j_page_cnt){
	if ( j_page_cnt != "" ){
		j_book_mark_url = top.study_data.document.location.href;				
		pres_check_unload_book(j_page_cnt,j_book_mark_url);
	}
}

function pres_check_unload_book(j_page_cnt,j_book_mark_url){
	if ( j_page_cnt != "" ){
		alert();
//		j_book_mark_url = top.study_data.document.location.href;		
		top.pres_data.f_pres_data.CURRENT_PAGE.value = j_page_cnt;
		top.pres_data.f_pres_data.CURRENT_STUDY_URL.value = j_book_mark_url;
		
		var treeno = top.pres_data.f_pres_data.treeno.value ;
		var cuserno = top.pres_data.f_pres_data.cuserno.value ;
		var courseno = top.pres_data.f_pres_data.courseno.value ;
		var cseqno = top.pres_data.f_pres_data.cseqno.value ;
		top.opener.document.location.href="/classdesk/online/prog.do?subcmd=prog_exec&treeno="+treeno+"&cuserno="+cuserno+"&courseno="+courseno+"&cseqno="+cseqno+"&CURRENT_PAGE="+j_page_cnt+"&UNLOAD=1&BOOK_MARK_URL="+escape(j_book_mark_url);	
		top.opener.top.init.document.location.reload();
		self.close();
		
	}	
}


//특정 페이지로 직접 이동시
function move_contents(j_contents_id,j_contents_seq, j_page, j_page_url)
{
	document.location.href='/classdesk/online/prog.do?subcmd=prog_exec&VEVENT=LUSC023G&CONTENTS_ID='+j_contents_id+'&CONTENTS_SEQ='+j_contents_seq+'&CURRENT_PAGE='+j_page+'&PAGE_URL='+escape(j_page_url);
}