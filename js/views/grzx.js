var person_info = null;
var personNum = []; // 记录个人及家属的编号，与item_infos数组相对应
// 渲染个人数据
function renderPersonInfo (res) {
	console.log(res)
	if (res.errorcode == 0) {
		person_info = res.result;
		var single_info = res.result.single_info || {};
		var single_html = '\
			<li class="mui-table-view-divider black bggrey fb">基本信息<span id="person_refresh" class="mui-icon iconfont icon-shuaxin person-shuaxin"></span></li>\
			<li class="mui-table-view-cell">姓名：'+single_info.name+'</li>\
			<li class="mui-table-view-cell">性别：'+single_info.sex+'</li>\
			<li class="mui-table-view-cell">部门：'+single_info.department+'</li>\
			<li class="mui-table-view-cell">活动身份：'+single_info.type+'</li>';
		if (single_info.travel == '蹭车') {
			single_html += '<li class="mui-table-view-cell">出行方式：'+single_info.travel+'--'+single_info.car_owner+'</li>';
		} else {
			single_html += '<li class="mui-table-view-cell">出行方式：'+single_info.travel+'</li>';
		}
		if (single_info.type == '分组赛') {
			single_html += '<li class="mui-table-view-cell">分组：第'+single_info.team+'组</li>\
			<li class="mui-table-view-cell">棒次：第'+single_info.team_idx+'棒</li>\
			<li class="mui-table-view-cell">编号：'+single_info.number+'</li>';
		} else if (single_info.type == '全程赛') {
			if (single_info.team != '0') {
				single_html += '<li class="mui-table-view-cell">分组：第'+single_info.team+'组</li>\
				<li class="mui-table-view-cell">棒次：第'+single_info.team_idx+'棒</li>\
				<li class="mui-table-view-cell">编号：'+single_info.number+'</li>';
			}
		}
		personNum.push({number: single_info.number, type: single_info.type});
		single_html += '<li class="mui-table-view-divider black bggrey fb">家属信息</li>';
		if (res.result.family_infos && res.result.family_infos.length > 0) {
			for (var i in res.result.family_infos) {
				single_html += '<li class="mui-table-view-cell">家属姓名：'+res.result.family_infos[i].name+'</li>';
				single_html += '<li class="mui-table-view-cell">家属性别：'+res.result.family_infos[i].sex+'</li>';
				single_html += '<li class="mui-table-view-cell">家属出行方式：'+res.result.family_infos[i].travel+'</li>';
				single_html += '<li class="mui-table-view-cell">家属活动身份：'+res.result.family_infos[i].type+'</li>';
				if (res.result.family_infos[i].type == '分组赛') {
					single_html += '<li class="mui-table-view-cell">家属分组：第'+res.result.family_infos[i].team+'组</li>\
					<li class="mui-table-view-cell">家属棒次：第'+res.result.family_infos[i].team_idx+'棒</li>\
					<li class="mui-table-view-cell">家属编号：'+res.result.family_infos[i].number+'</li>';
				} else if (res.result.family_infos[i].type == '全程赛') {
					if (res.result.family_infos[i].team != '0') {
						single_html += '<li class="mui-table-view-cell">家属分组：第'+res.result.family_infos[i].team+'组</li>\
						<li class="mui-table-view-cell">家属棒次：第'+res.result.family_infos[i].team_idx+'棒</li>\
						<li class="mui-table-view-cell">家属编号：'+res.result.family_infos[i].number+'</li>';
					}
				}
				personNum.push({number: res.result.family_infos[i].number, type: res.result.family_infos[i].type});
			}
		}
		mui('#person_ul')[0].innerHTML = single_html;
	}
}

// 渲染个人比赛详情
function renderPersonMatchInfo (res) {
	if (!person_info) {
		return;
	}
	if (res.errorcode == 0) {
		var match_info = res.result.racing_list;
		var match_html = '<li class="mui-table-view-divider black bggrey fb">个人赛况详情</li>';
		if (person_info.family_infos && person_info.family_infos.length > 0) {
			match_html += '<div class="mui-segmented-control" style="width: 80%; margin: 10px 0 10px 10%;">';
			match_html += '<a class="mui-control-item mui-active" href="#outs_'+person_info.single_info.number+'">' + person_info.single_info.name + '</a>';
			for (var i in person_info.family_infos) {
				match_html += '<a class="mui-control-item" href="#outs_'+person_info.family_infos[i].number+'">' + person_info.family_infos[i].name + '</a>';
			}
			match_html += '</div>';
		}
		if (person_info.item_infos && person_info.item_infos.length > 0) {
			match_html += '<div class="mui-content-padded">';
			for (var i in person_info.item_infos) {
				var item_infos = person_info.item_infos[i];
				if (personNum[i].type == '分组赛') {
					match_html += '\
						<div class="mui-control-content '+(i==0?'mui-active':'')+'" id="outs_'+personNum[i].number+'">\
							<div class="mui-content">\
								<ul class="timeline-ul">';
					for (var j in item_infos) {
							match_html += '\
								<li class="timeline-li done-item">\
									<span class="mui-icon icon-circle"></span>\
									<h4>第'+(Number(j)+1)+'棒：'+item_infos[j].name+'【'+item_infos[j].number+'】</h4>\
									<ul class="timeline-item-ul">';
							var single_match_info = match_info.team_runners[item_infos[j].team][item_infos[j].team_idx];
							if (!hasTime(single_match_info.start_time)) {
								match_html += '<li class="timeline-item-wait"><p>未开始</p></li>';
							} else if (!hasTime(single_match_info.return_time)) {
								match_html += '<li><p>起点时间：'+renderHMS(single_match_info.start_time)+'</p></li>';
								match_html += '<li class="timeline-item-doing"><p>进行中...</p></li>';
							} else if (!hasTime(single_match_info.end_time)) {
								match_html += '<li><p>起点时间：'+renderHMS(single_match_info.start_time)+'</p></li>';
								match_html += '<li><p>折返时间：'+renderHMS(single_match_info.return_time)+'</p></li>';
								match_html += '<li class="timeline-item-doing"><p>进行中...</p></li>';
							} else {
								match_html += '<li><p>起点时间：'+renderHMS(single_match_info.start_time)+'</p></li>';
								match_html += '<li><p>折返时间：'+renderHMS(single_match_info.return_time)+'</p></li>';
								match_html += '<li><p>终点时间：'+renderHMS(single_match_info.end_time)+'</p></li>';
							}
							match_html += '\
									</ul>\
								</li>';
					}
					match_html += '\
								</ul>\
							</div>\
						</div>';
				} else if (personNum[i].number == '全程赛') {
				} else  {
					// 玩的开心
				}
			}
			match_html += '</div>';
		}
		mui('#person_match_info')[0].innerHTML = match_html;
	}
}

// 刷新数据
var person_refresh_flag = 0;
mui('#person_ul').on('tap', '#person_refresh', function(){
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
