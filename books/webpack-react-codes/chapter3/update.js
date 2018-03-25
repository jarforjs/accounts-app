/*
缺点：缺点比上一种做法更突出：
1.每次数据变动都要整体重新渲染，性能会非常差，尤其在数据变动频繁、界面复杂时。
2.每次渲染都会重新生成所有DOM节点，那么在这些DOM节点上绑定的事件及外部持有的对这些DOM节点的引用都将失效。
 */
const wrapper = $('#list-wrapper');

const data ={
    list:[1,2,3],
    activeIndex:-1
};

function render() {
    wrapper.html(template.render(data))
}

function init() {
    wrapper.on('click','li',function () {
        activate($(this).data(index))
    });
    render()
}

function activate(index) {
    data.activeIndex=index;
    render();
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
