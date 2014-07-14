var mun = angular.module('mun')
// 使用全局变量方便一点。


var Store = {}
Store._data = {}
Store._lastModify = 0
Store._storeToLocal = function(){
	// Serialize the data in mem
	data = JSON.stringify(this._data)
	date = new Date()
	localStorage.setItem('data',data)
	localStorage.setItem('lastModify',JSON.stringify(date.valueOf()))
	console.log(date.toLocateString() + ": localStorage Date written.")
}
Store._recoverToLocal = function(){
	data = localStorage.getItem('data');
	lastModify = localStorage.getItem('lastModify');

	this._data = data ? JSON.parse(data) : {};
	this._lastModify = lastModify ? JSON.parse(lastModify) : 0;

	now = new Date();
	last = new Date();
	if (lastModify == "0"){
		console.warn(now.toLocateString() + ": Last Time Data Not Found. The mem data is overwritten.")
	} else{
		console.log(now.toLocateString() + ": Found Last Time Data, Data recovered.")
	}
}

mun.value('store',Store)
