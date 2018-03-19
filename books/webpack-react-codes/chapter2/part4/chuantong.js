//列表容器
const wrapper = $('#list-wrapper');
//列表所需数据
const data = {
	list :[1,2,3],
	activeIndex:-1
};
//初始化行为
function init(){
	wrapper.on('click','li',function(){
		activeate($(this).data('index'));
	})
	wrapper.html(template.render(data))
}
//选中某项的行为
function activeate(index){
	wrapper.find('li').removeClass('active');
	wrapper.find('li[data-index='+ index +']').addClass('active');
	data.activeIndex= index;
}
<ul>
	{{each list item index}}
		{{if index === activeIndex}}
			<li data-index="{{index}}" class="active">{{item}}</li>
		{{else}}
			<li data-index="{{index}}">{{item}}</li>
		{{/if}}
	{{/each}}
</ul>