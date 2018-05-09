import React, { PropTypes } from 'react';
import ListItem from '../ListItem';

const propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function List({items}) {
	items=items.map(item=>(
		<ListItem item={item} key={item.id}/>)
	)

	return(
		<div className="list-component col-md-4 list-group">
			{items}
		</div>
	)
});

List.propTypes = propTypes;

export default List;