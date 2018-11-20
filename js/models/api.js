// 获取个人信息接口（需要参数：clientname=xxx）
function getPersonInfo (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=person&a=getinfo',
		params,
		function(data){
			cb && cb(data);
			renderPersonInfo(data);
		},
		'json'
	);
}

// 获取所有分组接口（暂时不需要额外参数）
function getTeamList (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=team&a=getlist',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}

// 修改分组成员接口
function modifyTeamList (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=person&a=modify',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}

// 开始比赛接口（暂时不需要额外参数）（需要参数：clientname=xxx）
function startMatch (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=racing&a=start',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}

// 重置比赛计时数据接口（需要参数：clientname=xxx）
function restartMatch (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=racing&a=restart',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}

// 结束比赛接口（需要参数：clientname=xxx）
function finishMatch (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=racing&a=finish',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}

// 获取比赛计时列表接口（暂时不需要额外参数）
function getTimerList (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=racing&a=getlist',
		params,
		function(data){
			cb && cb(data);
			renderTimerList(data); // 渲染计时界面列表
			renderPersonMatchInfo(data);
			getSaishiData(data);
		},
		'json'
	);
}

// 比赛计时接口
// ——a：自动计时值为timing；手动计时值为modifytime；
// ——clientname：当前登录的人员姓名（用于验证）
// ——number：编号
// ——all_idx：第几棒（统计全程跑的时间时需要）
// ——time_type：终点计时、折返计时
// ——time：手动修改的时间
function timing (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=racing',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}

// 获取比赛计时器接口（暂时不需要额外参数）
function getTimer (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=racing&a=gettimer',
		params,
		function(data){
			cb && cb(data);
			checkSaishi(data);
			renderStopwatch(data);
		},
		'json'
	);
}

// 获取管理员列表接口（暂时不需要额外参数）
function getAdmins (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=person&a=getadmins',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}

// 获取排名接口（暂时不需要额外参数）
function getRank (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=racing&a=ranking',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}

// 修改人员信息接口
// ——clientname：当前登录的人员姓名（用于验证）
// ——modify_name：被修改的人员姓名
// ——number：编号
// ——team：第几组
// ——team_idx：第几棒
// ——type：工作人员、分组赛、全程赛、观众、起点计时、折返计时
function changePerson (params, cb) {
	mui.get(
		'http://running.10jqka.com.cn/running/index.php?m=api&c=person&a=modify',
		params,
		function(data){
			cb && cb(data);
		},
		'json'
	);
}



