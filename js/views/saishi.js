function getSaishiData(){
	getTimerList({},function(response){
		console.log(response)
		mui('#saishiAllLive')[0].innerHTML=renderLiveList(response.result.process.all_runners,{racingList:response.result.racing_list.all_runners})
		mui('#saishiGroupLive')[0].innerHTML=renderLiveList(response.result.process.team_runners,{racingList:response.result.racing_list.team_runners})
	})
}
function checkSaishi(){
	getRank({},function(response){
		if(response.result.all_res.length){
			//比赛结束
		}else{
			//比赛进行
			getSaishiData()
		}
	})
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