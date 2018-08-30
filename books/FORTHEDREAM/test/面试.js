/**
 * Created by Jeawon on 2016/7/27.
 */
// var today=new Date();
// var day=today.getDay();
// console.log(day);
//getDate是日期，getDay是星期

function fn(m,n) {
	return Math.floor(Math.random()*(n-m+1))+m;
}

for(var i=0;i<100;i++){
	console.log(fn(30,40));
}




