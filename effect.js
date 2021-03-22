$(function(){
	scrollLink();

	function scrollLink(){
		var url = $(location).attr('href');
		if (url.indexOf("?id=") == -1) {
			// スムーズスクロール以外の処理（必要なら）
		}else{
			// スムーズスクロールの処理
			var url_sp = url.split("?id=");
			var hash   = '#' + url_sp[url_sp.length - 1];
			var tgt    = $(hash);
			var pos    = tgt.offset().top -20;
			$("html, body").animate({scrollTop:pos},1000, "swing");
		}
	}

});