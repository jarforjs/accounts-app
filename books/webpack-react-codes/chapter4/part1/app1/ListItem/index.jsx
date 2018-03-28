import React , { PropTypes } from 'react';

const propTypes = {
	item:PropTypes.object.isRequired,
	onClick:PropTypes.func.isRequired
}

function ListItem({item}) {
	return(
		<a href='#' className='list-group-item item-component'>
			<span className='label label-default label-pill pull-xs-right'>
				{item.time}
			</span>{item.title}
		</a>
	)
}

ListItem.propTypes = propTypes;

export default ListItem;