class List extends React.Component{
	constructor(props){
		super(props);
		this.state={
			list:[1,2,3],
			activeIndex:-1
		};
	}
	activate(index){
		this.setState({activeIndex:index})
	}
	render(){
		const {list,activeIndex}=this.state;
		const lis=list.map((item,index)=>{
			const cls=index===activeIndex?'active':'';
			return (
				<li key={index}
					className={cls}
					onClick=>{()=>this.activate(index)}>
				</li>
			)
		});
		return (
			<ul>{lis}</ul>
		)
	}
}

//以框架本身复杂的代码实现换取了业务代码逻辑的清晰简单.