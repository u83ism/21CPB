$(function(){
	//imgをクリックという大雑把な開始判定なので改造時注意
	$(document).on('click','img',function(){
		//モーダルウィンドウの表示位置
		var windowHeight = $(window).height();
		var scroll = $(window).scrollTop();
		var modalPosY = (windowHeight/2) + scroll;

		//モーダルウィンドウに表示する画像とそのサイズの取得
		var photoBase = $(this).attr('src');
		var photo = photoBase.replace('thumb','');
		$('.photo').css('top',modalPosY).append('<img src="'+ photo +'">');
		//img生成してからじゃないとサイズ取得できない
		$('.photo img').load(function(){
			var photoHeight = $('.photo img').height();
			var photoWidth = $('.photo img').width();
			$('.photo').css({
				'height' : photoHeight+20,
				'width' : photoWidth+20,
				'margin-top' : -1*(photoHeight+20)/2,
				'margin-left': -1*(photoWidth+20)/2
			});
		});
		
		$('.modal,.photo').fadeIn('slow');
	});
	//ここから削除時処理
	$(document).on('click','.modal,.photo',function(){
		$('.photo img').remove();
		$('.modal,.photo').fadeOut('slow');
	});

});