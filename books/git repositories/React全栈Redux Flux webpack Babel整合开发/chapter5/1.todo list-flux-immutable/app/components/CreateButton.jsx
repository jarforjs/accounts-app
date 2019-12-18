import React, { PropTypes } from 'react';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  onUndo: PropTypes.func.isRequired
};
class CreateButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const inputValue = this.state.value;
    if (!inputValue.trim()) {
      return;
    }

    this.props.onClick(inputValue);
    this.setState({ value: '' });
  }

  render() {
    return (
      <div className="createButtonComponent">
        <form onSubmit={this.onSubmit}>
          <input value={this.state.value} onChange={this.onInputChange} />
          <button type="submit">创建新的Todo</button>
          <button type="button" onClick={this.props.onUndo}>撤销</button>
        </form>
      </div>
    );
  }
}


CreateButton.propTypes = propTypes;

export default CreateButton;
