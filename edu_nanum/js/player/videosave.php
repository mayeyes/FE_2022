<?
include "../../include/common.inc";
include "../../include/dbconn.inc";


//ajax crossdomain
header("Access-Control-Allow-Origin: *");




$Query = "DESC video_position_tb";
$cnn = mysql_query($Query);
$poRecords = @mysql_fetch_assoc($cnn);

//테이블이 없으면 생성 한다
if($poRecords[Field]=="")
{
$Query = "
CREATE TABLE `video_position_tb` (
  idx int(11) unsigned NOT NULL auto_increment,
  npos int(11) NOT NULL default '0',
  strpos varchar(60) NOT NULL default '',
  user_id varchar(60) NOT NULL default '',
  syncno varchar(128) NOT NULL default '',
  svrip varchar(80) NOT NULL default '',
  wrdate datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`idx`),
  KEY (syncno),
  KEY (user_id)
);
";
        @mysql_query($Query);

}

if($_GET[id]=="") { echo "IDNOTFOUND"; exit; } 
if($_GET[syncno]=="") { echo "SYNCNONOTFOUND"; exit; } 
if($_GET[tm]=="") { echo "TIMENOTFOUND"; exit; } 


$Query = "SELECT * FROM video_position_tb WHERE user_id='{$_GET[id]}' AND syncno='{$_GET[syncno]}' "; 
$cnn = mysql_query($Query);
$tmRecords = @mysql_fetch_assoc($cnn);

$Query = ""; 
if($tmRecords[idx] == "") 
	$Query = "INSERT INTO video_position_tb SET npos='{$_GET[tm]}',strpos='{$_GET[tm]}',user_id='{$_GET[id]}',syncno='{$_GET[syncno]}',wrdate=now() "; 
else 
	$Query = "UPDATE video_position_tb SET npos='{$_GET[tm]}',strpos='{$_GET[tm]}',user_id='{$_GET[id]}',syncno='{$_GET[syncno]}',wrdate=now() WHERE syncno='{$_GET[syncno]}' AND user_id='{$_GET[id]}' "; 
@mysql_query($Query);

?>
