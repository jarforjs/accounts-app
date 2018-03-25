import React,{PropTypes} from 'react';
import marked from 'marked';

function ItemShowLaryer({item}) {
	// 如果没有传入Item，直接返回静态提示
	if (!item||!item.id) {
		return(
			<div className='col-md-8 item-show-layer-component'>
				<div className='no-select'>
					请选择左侧列表里面的文章
				</div>
			</div>
		)
	}

	let content = marked(item.content);
	return(
		<div className='col-md-8 item-show-layer-component'>
			<div className='control-area'>
				<button className='btn btn-primary'>编辑</button>
				<button className='btn btn-danger'>删除</button>
			</div>
			<h2>{item.title}</h2>
			<div className='item-text'>
				<div dangerouslySetInnerHTML={{__html:content}}/>
			</div>
		</div>
	)
}

ItemShowLaryer.propTypes = propTypes;

export default ItemShowLaryer;