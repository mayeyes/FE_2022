var handlebarsMenuTemplate = "<ul>\r\n" + 
	"	{{#}}\r\n" + 
	"	<li class=\"subpage_dept1_menu\">\r\n" + 
	"		<a href=\"javascript:void(0);\">\r\n" + 
	"			<span class=\"icon icon_01\"><i></i></span>\r\n" + 
	"			<span class=\"title\">{{title}}</span>\r\n" + 
	"		</a>\r\n" + 
	"		<ul class=\"sub_menu\">\r\n" + 
	"			{{#submenus}}\r\n" + 
	"			<li>\r\n" + 
	"				<a href=\"javascript:void(0);\">{{subtitle}}</a>\r\n" + 
	"			</li>\r\n" + 
	"			{{/submenus}}\r\n" + 
	"		</ul>\r\n" + 
	"	</li>\r\n" + 
	"</ul>";