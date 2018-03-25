/*
缺点：需要同时维护数据和视图，模板引擎给我们解决了初始状态二者的对应关系，即初始化时给出一个合理数据就行了，视图会被自动（通过模板渲染）生成。然而在组件状态变化时，依然需要被各自维护。
 */
const wrapper=$('#list-wrapper');

const data={
    list:[1,2,3],
    activeIndex:-1
};

function init() {
    wrapper.on('click','li',function () {
        activate($(this).data('index'));
        wrapper.html(template.render(data))
    })
}

function activate(index) {
    wrapper.find('li').removeClass('active');
    wrapper.find('li[data-index='+index+']').addClass('active');
    data.activeIndex = index;
}

/*

<ul>
    {{each list item index}}
        {{if index===activeIndex}}
            <li data-index="{{index}}" class="active">{{item}}</li>
        {{else}}
            <li data-index="{{index}}">{{item}}</li>
        {{/if}}
    {{/each}}
</ul>

*/