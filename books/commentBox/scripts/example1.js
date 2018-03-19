var CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({
          data: data
        })
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  handleCommentSubmit: function (comment) {
    console.log(comment);
    var comments = this.state.data;
    comment.id = Date.now();
    // var newComments = comments.push(comment);
    var newComments = comments.concat([comment]);
    this.setState({
      data: newComments
    });
    $.ajax({
      url: this.props.url,
      type: 'POST',
      dataType: 'json',
      data: comment,
      success: function (data) {
        this.setState({
          data: data
        })
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({
          data:comments
        })
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  getInitialState: function () {
    return {data: []}
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render:function () {
    return(
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    )
  }
});

var CommentForm=React.createClass({
  getInitialState:function () {
    return {author:'',text:''}
  },
  handleAuthorChange:function (e) {
    this.setState({
      author:e.target.value
    })
  },
  handleTextChange:function (e) {
    this.setState({
      text:e.target.value
    })
  },
  handleSubmit:function (e) {
    e.preventDefault();
    var author = this.state.author.trim(),
      text= this.state.text.trim();
    if(!author||!text){
      return
    }
    this.props.onCommentSubmit({author,text});
    this.setState({
      author:'',
      text:''
    })
  },
  render:function () {
    return(
      <form onSubmit={this.handleSubmit} className="commentForm">
        <input type="text" placeholder="you name" onChange={this.handleAuthorChange} value={this.state.author}/>
        <input type="text" placeholder="say somthing" onChange={this.handleTextChange} value={this.state.text}/>
        <input type="submit" value="post"/>
      </form>
    )
  }
})

var CommentList=React.createClass({
  render:function () {
    var commentNodes=this.props.data.map(function (comment) {
      return(
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      )
    });
    return(
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
});

var Comment=React.createClass({
  rawMarkup:function () {
    var md=new Remarkable();
    var rawMarkup=md.render(this.props.children.toString());
    return {__html:rawMarkup};
  },
  render:function () {
    return(
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </div>
    )
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval="2000"/>,
  document.getElementById('content')
)