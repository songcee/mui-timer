function getSaishiData(response){
	// getTimerList({},function(response){
		mui('#saishiAllLive')[0].innerHTML=renderLiveList(response.result.process.all_runners,{racingList:response.result.racing_list.all_runners})
		mui('#saishiGroupLive')[0].innerHTML=renderLiveList(response.result.process.team_runners,{racingList:response.result.racing_list.team_runners})
	// })
}
function renderPaihangList(){
	getRank({},function(data){
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
			renderPaihangList();
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


mui.ready(function(){
// 	mui('#saishiMenuBtn')[0].onclick=function(){
// 		getFenzuData()
// 	};
// 	 getSaishiData()
})