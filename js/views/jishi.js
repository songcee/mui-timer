// 渲染秒表及开始结束按钮
function renderStopwatch (res) {
	var now, interval = null;
	if (res.errorcode == -1) {
		// 比赛未开始
		if (admin < 2) {return;}
		mui('#stopwatch_no_start')[0].innerText="尚未开始";
		mui('#stopwatch_no_start')[0].style="block";
		mui('#match_start')[0].style.display="none";
		if (admin >= 3) {
			mui('#match_start')[0].style="block";
			mui('#match_restart')[0].style.display="none";
			mui('#match_end')[0].style.display="none";
		} else {
			mui('#match_start')[0].style="none";
			mui('#match_restart')[0].style.display="none";
			mui('#match_end')[0].style.display="none";
		}
	} else if (res.errorcode == 0) {
		if (!hasTime(res.result.end_time)) {
			// 比赛正在进行中
			now = addSecond(res.result.start_time, res.result.running_time);
			mui('#stopwatch_no_start')[0].style.display="none"
			mui('#stopwatch_start')[0].innerHTML='<span id="timeTabHour">'+now[0]+'</span>:<span id="timeTabMinute">'+now[1]+'</span>:<span id="timeTabSecond">'+now[2]+'</span>';
			mui('#stopwatch_start')[0].style="block";
			clearInterval(interval);
			console.log(interval)
			interval = setInterval(function () {
				now[2] = Number(now[2]) + 1 < 10 ? '0' + (Number(now[2]) + 1) : Number(now[2]) + 1;
				if (now[2] == '60') {
					now[2] = '00';
					now[1] = Number(now[1]) + 1 < 10 ? '0' + (Number(now[1]) + 1) : Number(now[1]) + 1;
				}
				if (now[1] == '60') {
					now[1] = '00';
					now[0] = Number(now[0]) + 1 < 10 ? '0' + (Number(now[0]) + 1) : Number(now[0]) + 1;
				}
				if (now[0] == '24') {
					now[0] = '00';
				}
				mui('#timeTabHour')[0].innerText = now[0];
				mui('#timeTabMinute')[0].innerText = now[1];
				mui('#timeTabSecond')[0].innerText = now[2];
			}, 1000);
			if (admin == 4) {
				mui('#match_start')[0].style.display="none";
				mui('#match_restart')[0].style="block";
				mui('#match_end')[0].style="block";
			}
		} else {
			// 比赛结束
			clearInterval(interval);
			mui('#stopwatch_no_start')[0].innerText="比赛结束";
			mui('#stopwatch_no_start')[0].style="block";
			mui('#stopwatch_start')[0].style.display="none";
			if (admin == 4) {
				mui('#match_restart')[0].style="block";
				mui('#match_start')[0].style.display="none";
				mui('#match_end')[0].style.display="none";
			}
		}
	}
}
// 渲染计时界面
function renderTimerList (res) {
	if (res.errorcode != 0) {
		mui.alert(res.errormsg);
		return;
	}
	var data = res.result.racing_list;
	var html = {
		start: {
			1: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>',
			2: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>',
			3: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>',
			4: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>',
			5: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>'
		},
		half: {
			1: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>',
			2: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>',
			3: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>',
			4: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>',
			5: '<div class="mui-table-view-divider fb black bggrey">全程跑</div>'
		}
	};
	for (var num in data.all_runners) {
		for (var times in data.all_runners[num]) {
			var return_time = data.all_runners[num][times]['return_time'];
			var end_time = data.all_runners[num][times]['end_time'];
			var number = data.all_runners[num][times]['number'];
			var all_idx = data.all_runners[num][times]['all_idx'];
			html.start[times] += '<div class="mui-row time-table-tr timing_end_'+all_idx+'_'+number+'">\
				<div class="mui-col-sm-3 mui-col-xs-12">全程跑</div>\
				<div class="mui-col-sm-3 mui-col-xs-12" time="'+number+'">'+(hasTime(end_time)?renderHMS(end_time):'')+'</div>\
				<div class="mui-col-sm-6 mui-col-xs-12 tar">\
					'+number+'号<button class="mui-btn '+(hasTime(end_time)?'':'mui-btn-primary')+' vam ml15" num="'+number+'" all_idx="'+all_idx+'" time_type="end">'+(hasTime(end_time)?'已到达':'到达')+'</button>\
				</div>\
			</div>';
			html.half[times] += '<div class="mui-row time-table-tr timing_return_'+all_idx+'_'+number+'">\
				<div class="mui-col-sm-3 mui-col-xs-12">全程跑</div>\
				<div class="mui-col-sm-3 mui-col-xs-12" time="'+number+'">'+(hasTime(return_time)?renderHMS(return_time):'')+'</div>\
				<div class="mui-col-sm-6 mui-col-xs-12 tar">\
					'+number+'号<button class="mui-btn '+(hasTime(return_time)?'':'mui-btn-primary')+' vam ml15" num="'+number+'" all_idx="'+all_idx+'" time_type="return">'+(hasTime(return_time)?'已到达':'到达')+'</button>\
				</div>\
			</div>';
		}
	}
	for (var i in html.start) {
		html.start[i] += '<div class="mui-table-view-divider fb black bggrey">分组跑</div>';
		html.half[i] += '<div class="mui-table-view-divider fb black bggrey">分组跑</div>';
	}
	for (var num in data.team_runners) {
		for (var times in data.team_runners[num]) {
			var return_time = data.team_runners[num][times]['return_time'];
			var end_time = data.team_runners[num][times]['end_time'];
			var number = data.team_runners[num][times]['number'];
			var team_idx = data.team_runners[num][times]['team_idx'];
			html.start[times] += '<div class="mui-row time-table-tr timing_end_'+team_idx+'_'+number+'">\
				<div class="mui-col-sm-3 mui-col-xs-12">第'+data.team_runners[num][times]['team']+'组</div>\
				<div class="mui-col-sm-3 mui-col-xs-12" time="'+number+'">'+(hasTime(end_time)?renderHMS(end_time):'')+'</div>\
				<div class="mui-col-sm-6 mui-col-xs-12 tar">\
					'+number+'号<button class="mui-btn '+(hasTime(end_time)?'':'mui-btn-primary')+' vam ml15" num="'+number+'" team_idx="'+team_idx+'" time_type="end">'+(hasTime(end_time)?'已到达':'到达')+'</button>\
				</div>\
			</div>';
			html.half[times] += '<div class="mui-row time-table-tr timing_return_'+team_idx+'_'+number+'">\
				<div class="mui-col-sm-3 mui-col-xs-12">第'+data.team_runners[num][times]['team']+'组</div>\
				<div class="mui-col-sm-3 mui-col-xs-12" time="'+number+'">'+(hasTime(return_time)?renderHMS(return_time):'')+'</div>\
				<div class="mui-col-sm-6 mui-col-xs-12 tar">\
					'+number+'号<button class="mui-btn '+(hasTime(return_time)?'':'mui-btn-primary')+' vam ml15" num="'+number+'" team_idx="'+team_idx+'" time_type="return">'+(hasTime(return_time)?'已到达':'到达')+'</button>\
				</div>\
			</div>';
		}
	}
	for (var i in html.start) {
		mui('#timeStartStick' + i)[0].innerHTML = '<div class="mui-content">' + html.start[i] + '</div>';
		mui('#timeHalfStick' + i)[0].innerHTML = '<div class="mui-content">' + html.half[i] + '</div>';
	}
}

// 开始比赛
document.getElementById('match_start').addEventListener('tap', function () {
	startMatch({}, function (res) {
		if (res.errorcode == 0) {
			getTimer();
		} else {
			mui.alert(res.errormsg);
		}
	})
});
// 重新开始比赛
document.getElementById('match_restart').addEventListener('tap', function () {
	mui.confirm('确认要重新开始比赛吗？', '', '', function (data) {
		if (data.index == 1) {
			mui.confirm('真的确认要重新开始比赛吗？！', '', '', function (data) {
				if (data.index == 1) {
					restartMatch({clientname: clientname}, function (res) {
						if (res.errorcode == 0) {
							window.location.reload();
						} else {
							mui.alert(res.errormsg);
						}
					})
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
					finishMatch({clientname: clientname}, function (res) {
						if (res.errorcode == 0) {
							window.location.reload();
						} else {
							mui.alert(res.errormsg);
						}
					})
				}
			});
		}
	});
});

// 点击到达/已到达按钮
mui('#timeStartGroup, #timeHalfGroup').on('tap', '.mui-btn', function(e){
	var num = this.getAttribute("num"); // 序号
	var all_idx = this.getAttribute("all_idx"); // 棒次 （只有全程赛有这个概念）
	var team_idx = this.getAttribute("team_idx"); // 棒次 （只有分组赛有这个概念）
	var time_type = this.getAttribute("time_type"); // 半程计时点还是起点计时点
	params = {
		number: num,
		time_type: time_type,
		clientname: clientname
	};
	if (all_idx != undefined) {
		params.all_idx = all_idx;
	}
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
					params.time = '2018-11-25 ' + data.value;
					timing(params, function (res) {
						if (res.errorcode == 0) {
							mui('.timing_' + time_type + '_' + (all_idx || team_idx) + '_' + num).each(function (i, val) {
								// @todo 添加渲染到达时间的逻辑
								val.children[1].innerText = renderHMS(res.result);
							});
						} else {
							mui.toast('计时失败，失败原因：' + res.errormsg)
						}
					});
				}
			}
		},'div')
		return;
	}
	this.classList.add('mui-btn-outlined');
	this.innerText = '统计中';
	timing(params, function (res) {
		if (res.errorcode == 0) {
			mui('.timing_' + time_type + '_' + (all_idx || team_idx) + '_' + num).each(function (i, val) {
				val.children[2].children[0].classList.remove('mui-btn-primary');
				val.children[2].children[0].innerText = '已到达';
				// @todo 添加渲染到达时间的逻辑
				val.children[1].innerText = renderHMS(res.result);
			});
		} else {
			mui.toast('计时失败，失败原因：' + res.errormsg)
		}
	});
});













/*
var timeQueue = [], timing = false;
// 点击到达/已到达按钮
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
		mui('[data="' + num + '"]')[0].classList.remove('mui-btn-primary');
		mui('[data="' + num + '"]')[0].innerText = '已到达';
		mui('[time="' + num + '"]')[0].innerText = '11:11:11';
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
*/