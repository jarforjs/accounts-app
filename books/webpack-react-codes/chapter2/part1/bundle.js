(function(modules) { // webpackBootstrap
	// module缓存对象
	var installedModules = {};
	// require函数
	function __webpack_require__(moduleId) {
	// 检查module是否在cache中
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// 新建一个module并且放入cache中
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// 执行module函数
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// 标记module已经加载
		module.l = true;
		// 返回module的导出模块
		return module.exports;
	}
 	// 暴露modules对象(__webpack_modules__)
 	__webpack_require__.m = modules;
 	//暴露modules缓存
 	__webpack_require__.c = installedModules;
 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, {
				configurable: false,
				enumerable: true,
				get: getter
			});
		}
 	};
 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
 	};
 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) {
 		return Object.prototype.hasOwnProperty.call(object, property);
 	};
 	// 设置webpack公共路径__webpack_require__
 	__webpack_require__.p = "";
 	// 读取入口模块并且返回exports导出
 	return __webpack_require__(__webpack_require__.s = 0);
})([(function(module, exports, __webpack_require__) {
		var text = __webpack_require__(1);
		console.log(text);
	}),(function(module, exports) {
		module.exports = 'Hello world!';
	})]);