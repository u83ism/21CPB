// 絶対的な基準年が存在しないため毎年更新する必要あり
$(function () {
	var nowYear = 2025;
	var age = 30;
	var year = nowYear - age;

	for (var i = 1; year >= 1916; i++) {
		var heisei = year - 1988;
		var showa = year - 1925;
		var taisho = year - 1911;

		if (heisei > 0) {
			$('tr:nth-of-type(' + (i + 1) + ') th').html(age + '歳<br>' + year + '年（平成' + heisei + '年）');
		} else if (heisei === 0) {
			$('tr:nth-of-type(' + (i + 1) + ') th').html(age + '歳<br>' + year + '年（平成元年）');
		} else if (showa > 0) {
			$('tr:nth-of-type(' + (i + 1) + ') th').html(age + '歳<br>' + year + '年（昭和' + showa + '年）');
		} else if (showa === 0) {
			$('tr:nth-of-type(' + (i + 1) + ') th').html(age + '歳<br>' + year + '年（昭和元年）');
		} else {
			$('tr:nth-of-type(' + (i + 1) + ') th').html(age + '歳<br>' + year + '年（大正' + taisho + '年）');
		}
		year--;
		age++;
	}
});