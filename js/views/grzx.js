// 渲染个人数据
function renderPersonInfo (res) {
	console.log(res)
	if (res.errorcode == 0) {
		var single_info = res.result.single_info || {};
		var single_html = '\
			<li class="mui-table-view-divider black bggrey fb">基本信息<span id="person_refresh" class="mui-icon iconfont icon-shuaxin person-shuaxin"></span></li>\
			<li class="mui-table-view-cell">姓名：'+single_info.name+'</li>\
			<li class="mui-table-view-cell">性别：'+single_info.sex+'</li>\
			<li class="mui-table-view-cell">部门：'+single_info.department+'</li>\
			<li class="mui-table-view-cell">出行方式：'+single_info.travel+'</li>\
			<li class="mui-table-view-cell">身份：'+single_info.type+'</li>';
		if (single_info.travel == '蹭车') {
			single_html += '<li class="mui-table-view-cell">出行方式：'+single_info.travel+'--'+single_info.car_owner+'</li>';
		} else {
			single_html += '<li class="mui-table-view-cell">出行方式：'+single_info.travel+'</li>';
		}
		if (single_info.type == '分组赛') {
			single_html += '<li class="mui-table-view-cell">分组：第'+single_info.team+'组</li>\
			<li class="mui-table-view-cell">棒次：第'+single_info.team_idx+'棒</li>';
		} else if (single_info.type == '全程赛') {
			if (single_info.team != '0') {
				single_html += '<li class="mui-table-view-cell">分组：第'+single_info.team+'组</li>\
				<li class="mui-table-view-cell">棒次：第'+single_info.team_idx+'棒</li>';
			}
		}
		single_html += '<li class="mui-table-view-divider black bggrey fb">家属信息</li>';
		if (res.result.family_infos && res.result.family_infos.length > 0) {
			for (var i in res.result.family_infos) {
				single_html += '<li class="mui-table-view-cell">家属姓名：'+res.result.family_infos[i].name+'</li>';
				single_html += '<li class="mui-table-view-cell">家属性别：'+res.result.family_infos[i].sex+'</li>';
				single_html += '<li class="mui-table-view-cell">家属出行方式：'+res.result.family_infos[i].travel+'</li>';
				single_html += '<li class="mui-table-view-cell">家属身份：'+res.result.family_infos[i].type+'</li>';
			}
		}
		single_html += '<li class="mui-table-view-divider black bggrey fb">个人赛况详情</li>';
		mui('#person_ul')[0].innerHTML = single_html;
	}
}

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
