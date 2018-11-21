function hasTime (time) {
	if (time === undefined || time === null || time === '' || time === '0000-00-00 00:00:00') {
		return false;
	}
	return true;
}

function renderHMS (time) {
	return time.substr(11, 8);
}

function addSecond (time, second) {
	var newDate = new Date(new Date(time.replace(/-/g, '/')).valueOf() + second * 1000);
	return formatDate(newDate, 'hh:mm:ss').split(':');
}

function formatDate (date, pattern) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds() //秒
    };
    if (/(y+)/.test(pattern))
        pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(pattern))
                pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                return pattern;
}
