curl curl http://5aa906004cf36300144e95db.mockapi.io/api/v1/ 加上资源名

curl http://5aa906004cf36300144e95db.mockapi.io/api/v1/records

mockapi.io

npm install -g json-server
json-server --watch db.json -port 3004

使用本地json用postman post数据时在body处需要选择x-www-urlencoded
而使用网站方式(mockapi.io)时需要选择raw格式

现代浏览器可以用fetch语法不像以前需要使用jquery,访问远程数据
fetch("http://5aa906004cf36300144e95db.mockapi.io/api/v1/records").then(function(response){
    return response.json();
}).then(function(json){
    console.log(json);
})

访问本地数据
fetch("http://localhost:3004/records").then(function(response){
    return response.json();
}).then(function(json){
    console.log(json);
})

npm install axios 安装的会写进package.json
cnpm安装的不会比如:cnpm install jquery








