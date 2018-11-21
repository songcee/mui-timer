mui.init();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.001 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
// var vConsole = new VConsole();
var clientname = '';
try {
	var userInfo = eval('(' + jsVanish.getVanishUserInfo() +')');
	clientname = userInfo.ClientName;
}
catch(e) {
	console.log(e)
	clientname = '李晓栋';
}
var personInfo = void 0;
var adminTypeList = {
	'全程赛': 1, // 最低权限
	'分组赛': 1,
	'观众': 1,
	'工作人员': 1,
	'折返计时': 2, // 最低权限 + 计时
	'起点计时': 3 // 最低权限 + 计时 + 开始
};
var adminType = 1;
var is_admin = 0; // 管理员拥有最高权限
var getTimerIntervel = null;
// 获取个人身份信息
getPersonInfo({clientname: clientname}, function (res) {
	if (res.errorcode == 0) {
		personInfo = res.result;
		admin = adminTypeList[personInfo.single_info.type];
		// console.log(personInfo.single_info.type)
		// console.log(admin)
		is_admin = personInfo.single_info.is_admin;
		switch(admin) {
			case 1: break;
			case 2: 
				mui('#jishiMenuBtn')[0].style = 'block';
				break;
			case 3: 
				console.log(1)
				mui('#jishiMenuBtn')[0].style = 'block';
				break;
		}
		if (is_admin) {
			getFenzuData();
			mui('#jishiMenuBtn')[0].style = 'block';
			mui('#settingMenuBtn')[0].style = 'block';
		}
		// 时间判断（赛事界面、计时界面秒表栏 判断比赛是否开始、结束）
		getTimer();
		// 获取比赛计时列表
		getTimerList();
		
		getTimerIntervel = setInterval(function () {
			getTimer({}, function (res) {
				if (res.errorcode == 0 && hasTime(res.result.end_time)) {
					clearInterval(getTimerIntervel);
				}
			});
			getTimerList()
		}, 60000);
	}
});
