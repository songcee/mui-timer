mui.init();
// var userInfo = jsVanish.getVanishUserInfo();
var clientname = '李晓栋';
var personInfo = void 0;
var adminType = {
	'全程赛': 1, // 最低权限
	'分组赛': 4,
	'观众': 1,
	'工作人员': 1,
	'折返点计时': 2, // 最低权限 + 计时
	'起点计时': 3, // 最低权限 + 计时 + 开始
	'管理员': 4 // 所有权限
};
var admin = 1;
var getTimerIntervel = null;
// 获取个人身份信息
getPersonInfo({clientname: clientname}, function (res) {
	if (res.errorcode == 0) {
		personInfo = res.result;
		admin = adminType[personInfo.single_info.type];
		switch(admin) {
			case 1: break;
			case 2: 
				mui('#jishiMenuBtn')[0].style = 'block';
				break;
			case 3: 
				mui('#jishiMenuBtn')[0].style = 'block';
				break;
			case 4: 
				mui('#jishiMenuBtn')[0].style = 'block';
				mui('#settingMenuBtn')[0].style = 'block';
				break;
			default: ;
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


/*
var timeQueue = [], timing = false;
mui('#timeGroup').on('tap', '.mui-btn', function(){
	if (!this.classList.contains('mui-btn-primary')) {
		mui.prompt('请输入正确时间：','格式：HH:MM:SS','修改时间',['取消','确认'],function (data) {
			if (data.index == 0) {
				return;
			} else {
				var regExp1 = new RegExp(/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/);
				var regExp2 = new RegExp(/^(20|21|22|23|[0-1]\d)\uff1a[0-5]\d\uff1a[0-5]\d$/);
				if(!regExp1.test(data.value) && !regExp2.test(data.value)){
				　　mui.alert("时间格式不正确，正确格式为：HH:MM:SS");
				　　return false;	
				} else {
					// @todo 此处需要添加提交正确的时间方法
					mui.alert("提交成功！");	
				}
			}
		},'div')
		return;
	}
	var data = this.getAttribute("data");
	this.classList.add('mui-btn-outlined');
	this.innerText = '统计中';
	timeQueue.push(data);
	if (!timing) {timingApi()}
});

// @todo 汇总接口，并做好同步请求监听
function timingApi () {
	timing = true;
	var num = timeQueue.shift();
	setTimeout(function () {
		console.log(num);
		mui('[data="' + num + '"]')[0].classList.remove('mui-btn-primary');
		mui('[data="' + num + '"]')[0].innerText = '已到达';
		if (timeQueue.length > 0) {
			timingApi();
		} else {
			timing = false;
		}
	}, 1000);
	return;
	// @todo 需要隐藏上部分模拟代码，通过接口发送请求，并加上渲染到达时间的逻辑
	var num = timeQueue.shift();
	mui.post('http://running.10jqka.com.cn/running/index.php?m=api&c=racing&a=timing', {number: num}, function(data){
		mui('[data="' + num + '"]')[0].classList.remove('mui-btn-primary');
		mui('[data="' + num + '"]')[0].innerText = '已到达';
		if (timeQueue.length > 0) {
			timingApi();
		} else {
			timing = false;
		}
	},'json');
}

// 开始比赛
document.getElementById('match_start').addEventListener('tap', function () {
	console.log(2)
});
// 重新开始比赛
document.getElementById('match_restart').addEventListener('tap', function () {
	mui.confirm('确认要重新开始比赛吗？', '', '', function (data) {
		if (data.index == 1) {
			mui.confirm('真的确认要重新开始比赛吗？！', '', '', function (data) {
				if (data.index == 1) {
					
				}
			});
		}
	});
});
// 比赛结束
document.getElementById('match_end').addEventListener('tap', function () {
	mui.confirm('确认结束比赛了吗？', '', '', function (data) {
		if (data.index == 1) {
			mui.confirm('真的确认结束比赛了吗？！', '', '', function (data) {
				if (data.index == 1) {
					
				}
			});
		}
	});
});
*/