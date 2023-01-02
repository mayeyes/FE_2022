
function formatToSendingHTML(strHtml) {
	/*
	Replaces in the html code some characters, leaving the string in only one line,
	with the < replaced to a left pointing arrow (\u2190) 
	and > replaced to the right	pointing arrow (\u2192)
	This values are needed to then convert the string into html - readeble code.
	003C -> 2190
	003E -> 2192
	0022 -> \\\"
	\n -> ""
	\r -> ""
	&%13 -> ""
	&%10 -> ""
	 */
	var r = /\u0022/g;
	r = /\n/g;
	strHtml = strHtml.replace(r, "");
	r = /\r/g;
	strHtml = strHtml.replace(r, "");
	r = /\u003C/g;
	strHtml = strHtml.replace(r, "\u2190");
	r = /\u003E/g;
	strHtml = strHtml.replace(r, "\u2192");
	r = /&#10;|&#13;/g;
	strHtml = strHtml.replace(r, "");
	return strHtml;
}
