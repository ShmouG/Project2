const React = require('react');
const auth = require('../auth');

const Create = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState : function() {
    return {
      error: false
    }
  },
  componentDidMount: function() {
    $('#userinput').modal('show')
  },

  handleSubmit : function(event) {
    event.preventDefault()
    const name = this.refs.name.value
    const location = this.refs.location.value
    const description = this.refs.description.value
    const newToto = {
      user_id: parseInt(localStorage.user_id),
      name: name,
      location: location,
      description: description
    }
    $.post('/bidet', newBidet)
      .done((data)=>{
        console.log(data);
        $.post('/bidet/private', user_id)
          .done((data)=>{
            delete localStorage.myBidet
            localStorage.myToto = JSON.stringify(data)
          })
          .error((error)=>{
            console.log('Error getting my bidet!', error);
          })
        this.context.router.replace('/')
      })
      .error((error)=>{
        console.log('Error posting YAY BIDET!');
      })
    $('#myCreate').modal('hide')

  },
  render : function() {
    return (
      <div id="myCreate" role="dialog" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">×</button>
              <h4><span className="glyphicon glyphicon-heart" /> Add my profile!</h4>
            </div>

            <div className="modal-body" id="loginform">
              <form role="form" onSubmit={this.handleSubmit}>
              <div className="input-group input-group-md col-md-6 col-md-offset-3" style={{marginBottom: 10}}>
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-tint"></span>
                </span>
                <input ref="name" type="text" className="form-control"  placeholder="name" autofocus />
              </div>

              <div className="input-group input-group-md col-md-6 col-md-offset-3" style={{marginBottom: 10}}>
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-map-marker"></span>
                </span>
                <input ref="location" type="text" id="location" className="form-control"  placeholder="location" autofocus />
              </div>

                <div className="input-group input-group-md col-md-6 col-md-offset-3" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-list-alt"></span>
                  </span>
                  <input ref="description" type="text" className="form-control" placeholder="description" />
                </div>

                <button type="submit" className="btn" style={{marginTop: 10}}>Add it!
                  <span className="glyphicon glyphicon-ok" />
                </button>

              </form>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-danger btn-default pull-left" data-dismiss="modal">
                <span className="glyphicon glyphicon-remove" /> Cancel
              </button>
              <p>Need <a href="#">help?</a></p>
            </div>
            {this.state.error && (
            <p>Password and email do not match</p>
            )}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Create;