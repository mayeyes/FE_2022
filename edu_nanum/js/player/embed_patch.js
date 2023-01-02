function PrintEmbed(emb_id){
    document.write(document.getElementById(emb_id).value);
}

function show_swf(src,swf_name,width,height,wmode){
        return "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\" width="+width+" height="+height+" id="+swf_name+"><param name=\"allowScriptAccess\" value=\"always\" /><param name=\"allowFullScreen\" value=\"true\" /><param name=wmode value="+wmode+" /><param name=movie value="+src+" /><param name=quality value=\"high\" /><embed src="+src+" quality=high wmode="+wmode+" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash\" allowfullscreen=\"true\" width="+width+" height="+height+"></embed></object>";

}

function Print_swf(src,swf_name,width,height,wmode){
        return "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\" width="+width+" height="+height+" id="+swf_name+"><param name=\"allowScriptAccess\" value=\"always\" /><param name=\"allowFullScreen\" value=\"true\" /><param name=movie value="+src+" /><param name=quality value=\"high\" /><embed src="+src+" quality=high type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash\" allowfullscreen=\"true\" salign=\"TL\" width="+width+" height="+height+"></embed></object>";
}

// write document contents
function documentwrite(src){
        document.write(src);
}

function Flash_swf(src,swf_name,width,height,wmode){
        return "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0\" width="+width+" height="+height+" id="+swf_name+"><param name=\"allowScriptAccess\" value=\"always\" /><param name=\"allowFullScreen\" value=\"true\" /><param name=movie value="+src+" /><param name=quality value=\"high\" /><embed src="+src+" quality=high type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash\" allowfullscreen=\"true\" salign=\"TL\" width="+width+" height="+height+"></embed></object>";

}


