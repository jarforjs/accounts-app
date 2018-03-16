const wrapper = $('#list-wrapper');
const data = {
	list :[1,2,3],
	activeIndex:-1
}

function render(){
	wrapper.html(template.render(data))
}

function init() {
	wrapper.on('click','li',function(){
		activate($(this).data('index'));
	});
	render();
}

function activate(index) {
	data.activeIndex=index;
	render();
}