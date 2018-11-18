function getSaishiData(response){
	mui('#saishiAllLive')[0].innerHTML=renderLiveList(response.result.process.all_runners,{racingList:response.result.racing_list.all_runners})
	mui('#saishiGroupLive')[0].innerHTML=renderLiveList(response.result.process.team_runners,{racingList:response.result.racing_list.team_runners})
}
function getPaihangList(){
	getRank({},function(data){
		mui('#paihangTeamList')[0].innerHTML = renderPaihangList(data.result.team_res,{id:'team'});
		mui('#paihangRunnerList')[0].innerHTML = renderPaihangList(data.result.runner_res,{id:'number'});
		mui('#paihangAllList')[0].innerHTML = renderPaihangList(data.result.all_res,{id:'number'});
		console.log(data)
		mui.each(mui('.saishi-paihang-ul'),function(index,item){
			item.setAttribute('style','display:block');
		})
	})
}
function checkSaishi(response){
	mui.each(mui('.saishi-running-ul,.saishi-paihang-ul,.saishi-nostart-ul'),function(index,item){
		item.setAttribute('style','display:none')
	})
	try{
		clearTimeout(window.saishiTimer)
	}catch(e){}
	if(response.errorcode==-1){
		//比赛未开始
		mui.each(mui('.saishi-nostart-ul'),function(index,item){
			item.setAttribute('style','display:block');
		});
	}else{
		if(response.result.end_time!='0000-00-00 00:00:00'){
			//比赛结束
			getPaihangList();
		}else{
			//比赛进行
			mui.each(mui('.saishi-running-ul'),function(index,item){
				item.setAttribute('style','display:block')
			})
			// getSaishiData()
		}
		
	}
}
/**
 * param{
	 racingList:[]		//分组运动员或全程运动员列表
 }
 */
function renderLiveList(data,param){
	var allRunnerCount = 1;
	var saishiHtml = [''];
	mui.each(data,function(index,item){
		var saishiItem = [];
		var name = '';
		saishiItem.push('<li class="mui-table-view-cell saishi-item">');
		saishiItem.push('<span>第'+allRunnerCount+'组</span>');
		saishiItem.push('<ul class="saishi-timeline"><span class="mui-badge mui-badge-primary start-icon">起</span><span class="iconfont icon-qizi"></span>');
		saishiItem.push('<span class="iconfont icon-paobu-flash" style="margin-left:'+Math.floor(item*20)+'%"></span>');
		for(var i=0;i<10;i++){
			saishiItem.push('<li class="saishi-timeline-item"></li>');
		}
		saishiItem.push('</ul></li>');
		saishiHtml.push(saishiItem.join('\n')+'\n');
		allRunnerCount++;
	})
	return saishiHtml.join('')
}
/**
 * 渲染排行榜
 * param{
	 id:'number',	//取名字的参数名
 }
 */
function renderPaihangList(data,param){
	if(data.length==0){
		return '';
	}
	var paihangHtml=[];
	mui.each(data,function(index,item){
		switch(Number(index)){
			case 0:paihangHtml.push('<li class="mui-table-view-cell">\
							<div class="podium-area">\
							<span class="podium-first">第'+item[param.id]+'组<br/>'+item.total_time+'</span>\
							');break;
			case 1:paihangHtml.push('<span class="podium-second">第'+item[param.id]+'组<br/>'+item.total_time+'</span>');break;
			case 2:paihangHtml.push('<span class="podium-third">第'+item[param.id]+'组<br/>'+item.total_time+'</span></div></li>');break;
			default:paihangHtml.push('<li class="mui-table-view-cell podium-item">\
							<span class="podium-count">'+(Number(index)+1)+'</span><span>第'+item[param.id]+'组</span><span>'+item.total_time+'</span>\
						</li>');break;
		}
	})
	return paihangHtml.join('')
}


mui.ready(function(){
// 	mui('#saishiMenuBtn')[0].onclick=function(){
// 		getFenzuData()
// 	};
// 	 getSaishiData()
})