
// 刷新数据
var person_refresh_flag = 0;
document.getElementById('person_refresh').addEventListener('tap', function () {
	if (person_refresh_flag > 0) {
		mui.toast('请勿连续刷新数据！请'+person_refresh_flag+'秒后再试！');
		return;
	}
	mui.toast('刷新成功！');
	person_refresh_flag = 30;
	var refreshInterval = setInterval(function () {
		person_refresh_flag--;
		if (person_refresh_flag <= 0) {
			person_refresh_flag = 0;
			clearInterval(refreshInterval);
		}
	}, 1000);
});
