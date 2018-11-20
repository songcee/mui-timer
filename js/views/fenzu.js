function getFenzuData(){
// 	mui.ajax(
// 		'http://running.10jqka.com.cn/running/index.php?m=api&c=team&a=getlist',
// 		{success:function(response){
// 			
// 		}
// 	});
	// console.log(allList)
	getTeamList({},function(response){
		mui('#teamRunnerTable')[0].innerHTML=renderTableData(response.result.team_runners,{filterColor:true});
		mui('#allRunnerTable')[0].innerHTML=renderTableData(response.result.all_runners);
		mui('#noRunnerTable')[0].innerHTML=renderNoRunnerTableData(response.result.no_runners);
		mui('#teamRunnerTable,#allRunnerTable,#noRunnerTable').on('click','td',function(e){
			renderHoverDetail(e.target)
				mui('#popover').popover('show')
		})
	})
}

function submitChangeData(){
	var params = {};
	params.clientname = window.clientname;
	if(mui('#hoverNameInput')[0].value==''){mui.toast('oh！请填写姓名！');return;}
	params.modify_name = mui('#hoverNameInput')[0].value;
	if(mui('#hoverGroupInput')[0].value==''){mui.toast('oh！请填写组别！');return;}
	params.team = mui('#hoverGroupInput')[0].value;
	if(mui('#hoverIndexInput')[0].value==''){mui.toast('oh！请填写棒别！');return;}
	params.team_idx = mui('#hoverIndexInput')[0].value;
	if(mui('#hoverIDInput')[0].value==''){mui.toast('oh！请填写编号！');return;}
	params.number = mui('#hoverIDInput')[0].value;
// 	if(mui('#hoverSexMale')[0].className.search('primary')!=-1){
// 		params.sex = '男';
// 	}else{
// 		params.sex = '女';
// 	}
	if(mui('#hoverTypeInput')[0].value==''){mui.toast('oh！请选择身份！');return;}
	params.type = mui('#hoverTypeInput')[0].value;
// 	if(mui('#hoverTypeInput')[0].value==''){mui.toast('oh！请填写家属！');return;}
// 	params.number = mui('#hoverTypeInput')[0].value;
	modifyTeamList(params,function(msg){
		if(msg.errorcode==0){
			getFenzuData();
			mui.toast('修改成功');
			mui('#popover').popover('hide')
		}else{
			mui.toast(msg.errormsg);
		}
	});
}


function renderHoverDetail(el){
	var itemData = JSON.parse(el.getAttribute('userdata'));
	
	mui('#hoverNameInput')[0].value=itemData.name;
	mui('#hoverGroupInput')[0].value=itemData.team;
	mui('#hoverIndexInput')[0].value=itemData.team_idx;
	mui('#hoverIDInput')[0].value=itemData.number;
// 	if(itemData.sex=='男'){
// 		mui('#hoverSexMale')[0].setAttribute('class','mui-btn btn-sex mui-btn-primary');
// 		mui('#hoverSexFemale')[0].setAttribute('class','mui-btn btn-sex');
// 	}else{
// 		mui('#hoverSexFemale')[0].setAttribute('class','mui-btn btn-sex mui-btn-primary');
// 		mui('#hoverSexMale')[0].setAttribute('class','mui-btn btn-sex');
// 	}
	// mui('#hoverDepartmentInput')[0].value=itemData.department;
	mui.each(mui('#hoverTypeInput')[0].children,function(index,item){
		if(item.value == itemData.type){
			item.setAttribute('selected','');
		}else{
			item.removeAttribute('selected');
		}
	})
	// mui('#hoverFamilyInput')[0].value=itemData.family;
}
function runderHoverEvent(){
// 	mui('#hoverSexMale')[0].addEventListener('click',function(e){
// 		e.target.setAttribute('class','mui-btn btn-sex mui-btn-primary');
// 		e.target.nextElementSibling.setAttribute('class','mui-btn btn-sex');
// 	});
// 	mui('#hoverSexFemale')[0].addEventListener('click',function(e){
// 		e.target.setAttribute('class','mui-btn btn-sex mui-btn-primary');
// 		e.target.previousElementSibling.setAttribute('class','mui-btn btn-sex');
// 	});
	mui('#hoverCancelBtn')[0].addEventListener('click',function(e){
		mui('#popover').popover('hide')
	})
	mui('#hoverSubmitBtn')[0].addEventListener('click',function(e){
		submitChangeData();
	})
}

/**
 * param{
	 filterColor:true,        //是否高亮全程和女生
 }
 * 
 */
function renderTableData(data,param){
	var tableList = ['<tr>\
							<th width="50px">分组</th>\
							<th>第一棒</th>\
							<th>第二棒</th>\
							<th>第三棒</th>\
							<th>第四棒</th>\
							<th>第五棒</th>\
						</tr>'];
	mui.each(data,function(index,item){
		var listItem = ['<tr><td>第'+index+'组</td>'];
		mui.each(item,function(key,val){
			var tdItem = [''];
			tdItem.push('<td ');
			if(param&&param.filterColor){
				switch(key){
					case '1':val.type=='全程赛'?tdItem.push('class="whole-journey-td"'):'';break;
					case '4':val.sex=='女'?tdItem.push('class="female-runner-td"'):'';break;
				}
			}
			tdItem.push(" userData='"+JSON.stringify(val)+"'>"+val.name+'<br/>'+val.number+"</td>");
			listItem.push(tdItem.join(''));
			// console.log(key,val)
		})
		listItem.push('</tr>');
		tableList.push(listItem.join(''));
	});
	return tableList.join('');
}
/**
 * 渲染工作人员
 */
 function renderNoRunnerTableData(data){
	var tableList = ['<tr>\
							<th width="50px">id</th>\
							<th>姓名</th>\
							<th>部门</th>\
							<th>性别</th>\
							<th>谁的家属</th>\
							<th>身份</th>\
						</tr>'];
						
	mui.each(data,function(index,item){
		var itemTitle = ['id','name','department','sex','family','type'];
		var listItem = ['<tr>'];
		var tdItem = [''];
		for(var i=0;i<itemTitle.length;i++){
			tdItem.push('<td ');
			tdItem.push(" userData='"+JSON.stringify(item)+"'>"+item[itemTitle[i]]+"</td>");
		}
		listItem.push(tdItem.join(''));
		listItem.push('</tr>');
		tableList.push(listItem.join(''));
	});
	return tableList.join('');
}



mui.ready(function() {
	mui('#settingMenuBtn')[0].onclick=function() {
		getFenzuData();
	};
	getFenzuData();
	runderHoverEvent();
	
})