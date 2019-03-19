import React from 'react';

export default class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      area: ['beijing', 'shanghai'],
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { options } = e.target;
    const area = Object.keys(options).filter(i => options[i].selected === true).map(i => options[i].value)

    this.setState({
      area,
    })
  }

  render() {
    const { area } = this.state;

    return (
      <div>
        <select
          style={{width:150}}
          multiple={true}
          value={area}
          onChange={this.handleChange}
        >
          <option value='beijing'>北京</option>
          <option value='shanghai'>上海</option>
          <option value='hangzhou'>杭州</option>
        </select>
        <select>
          <option value='beijing'>北京</option>
          <option value='shanghai'>上海</option>
          <option value='hangzhou'>杭州</option>
        </select>
      </div>
    )
  }
}