function getFenzuData(){
// 	mui.ajax(
// 		'http://running.10jqka.com.cn/running/index.php?m=api&c=team&a=getlist',
// 		{success:function(response){
// 			
// 		}
// 	});
	console.log(allList)
	mui('#teamRunnerTable')[0].innerHTML='<h4>分组情况</h4>'+renderTableData(allList.result.team_runners,{filterColor:true});
	mui('#teamRunnerTable').on('click','td',function(e){
		renderHoverDetail(e.target)
			mui('#popover').popover('show')
	})
	mui('#allRunnerTable')[0].innerHTML='<h4>全程运动员</h4>'+renderTableData(allList.result.all_runners);
}

function submitChangeData(){
	console.log('提交修改')
}

function renderHoverDetail(el){
	var itemData = JSON.parse(el.getAttribute('userdata'));
	console.log(itemData);
	
	mui('#hoverNameInput')[0].value=itemData.name;
	mui('#hoverGroupInput')[0].value=itemData.team;
	mui('#hoverIndexInput')[0].value=itemData.team_idx;
	mui('#hoverIDInput')[0].value=itemData.number;
	if(itemData.sex=='男'){
		mui('#hoverSexMale')[0].setAttribute('class','mui-btn btn-sex mui-btn-primary');
		mui('#hoverSexFemale')[0].setAttribute('class','mui-btn btn-sex');
	}else{
		mui('#hoverSexFemale')[0].setAttribute('class','mui-btn btn-sex mui-btn-primary');
		mui('#hoverSexMale')[0].setAttribute('class','mui-btn btn-sex');
	}
	mui('#hoverDepartmentInput')[0].value=itemData.department;
	mui('#hoverTypeInput')[0].value=itemData.type;
}
function runderHoverEvent(){
	mui('#hoverSexMale')[0].addEventListener('click',function(e){
		e.target.setAttribute('class','mui-btn btn-sex mui-btn-primary');
		e.target.nextElementSibling.setAttribute('class','mui-btn btn-sex');
	});
	mui('#hoverSexFemale')[0].addEventListener('click',function(e){
		e.target.setAttribute('class','mui-btn btn-sex mui-btn-primary');
		e.target.previousElementSibling.setAttribute('class','mui-btn btn-sex');
	});
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
	var tableList = ['<table border="" cellspacing="" cellpadding="" class="runner-table">\
						<tr>\
							<th width="90px">分组</th>\
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
			tdItem.push(" userData='"+JSON.stringify(val)+"'>"+val.name+"</td>");
			listItem.push(tdItem.join(''));
			// console.log(key,val)
		})
		listItem.push('</tr>');
		tableList.push(listItem.join(''));
	});
	tableList.push('</table>');
	return tableList.join('');
}

mui.ready(function(){
	mui('#settingMenuBtn')[0].onclick=function(){
		getFenzuData()
	};
	runderHoverEvent();
	// getFenzuData()
})