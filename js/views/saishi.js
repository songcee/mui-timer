function getSaishiData(){
// 	mui.ajax('http://running.10jqka.com.cn/running/index.php?m=api&c=racing&a=getlist',{
// 		success:function(response){}
// 	})
	
	mui('#saishiAllLive')[0].innerHTML=renderLiveList(racingList.result.process.all_runners,{racingList:racingList.result.racing_list.all_runners})
	mui('#saishiGroupLive')[0].innerHTML=renderLiveList(racingList.result.process.team_runners,{racingList:racingList.result.racing_list.team_runners})
	
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
		if(param&&param.racingList){
			name = param.racingList[index][Math.ceil(item)]['number'];
		}else{
			name = ''; 
		}
		saishiItem.push('<li class="mui-table-view-cell saishi-item">');
		saishiItem.push('<span>第'+allRunnerCount+'组</span>');
		saishiItem.push('<ul class="saishi-timeline"><span class="mui-badge mui-badge-primary start-icon">起</span><span class="iconfont icon-qizi"></span>');
		saishiItem.push('<span class="iconfont icon-paobu" style="margin-left:'+Math.floor(item*20)+'%"></span><span class="icon-paobu-name" style="margin-left:'+Math.floor(item*20)+'%">'+name+'</span>');
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
	mui('#saishiMenuBtn')[0].onclick=function(){
		getFenzuData()
	};
	 getSaishiData()
})