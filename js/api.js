var requestQueue = [];
var requesting = false;

/* 
 * url			请求的url
 * params		请求的传参
 * callback		请求的回调
 */
function request (data) {
	requestQueue.push(data);
	if (!requesting) {
		_startReq()
	}
}

function _startReq () {
	requesting = true;
	var data = requestQueue.shift();
	mui.post(data.url, data.params, function (res) {
		data.callback && data.callback(res);
		if (requestQueue.length > 0) {
			_startReq();
		} else {
			requesting = false;
		}
	},'json');
}