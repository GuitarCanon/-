$(function() {
	waterfall();
	var dataInt = {
		data: [{
			'src': '1.jpg'
		}, {
			'src': '2.jpg'
		}, {
			'src': '3.jpg'
		}, {
			'src': '4.jpg'
		}, {
			'src': '5.jpg'
		}, ]
	}
	$(window).scroll(function() {
		if ($(window).scrollTop() > $("#head").outerHeight()) {
			$("#head-copy").show();
		} else {
			$("#head-copy").hide();
		} //窗口滚动判断fixed绝对定位，搜索框显示
		if (checkScrollSlide) {
			$.each(dataInt.data, function(key, value) {
				var oPic = $('<div>').addClass('pic').appendTo($('#main'));
				var oImg = $('<img>').appendTo(oPic);
				oImg.attr('src', 'images/' + $(value).attr('src'));
			})
			waterfall();
		} //窗口滚动判断，然后加载图片

	})
});

function waterfall() {
	var $pic = $('#main').find('.pic');
	var w = $pic.eq(0).outerWidth(); //获取图片宽度
	var cols = Math.floor($("#main").width() / w);
	var hArr = []; //定义一个空数组接收第一行图片高度
	$pic.each(function(index, value) {
		if (index < cols) {
			hArr.push($(value).outerHeight());
		} else {
			var minH = Math.min.apply(null, hArr);
			var minIndex = $.inArray(minH, hArr); //获取最小高度及其下标
			$(value).css({
				position: "absolute",
				top: minH,
				left:w * minIndex
			})
		
			 hArr[minIndex] += $(value).outerHeight();
			//让接下来每张图片都接到最小高度列的底下
		}

	});
}

function checkScrollSlide() { //判定页面是否加载图片条件的函数
	var $pic = $('#main').find('.pic');
	var h = $pic.last().outerHeight() + $pic.last().offset().top;
	var scrollH = $(window).scrollTop();
	var screenH = $(window).height();
	return h < screenH + scrollH ? true : false;
}