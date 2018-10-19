const React = require('react');
const auth = require('../auth');

const Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState : function() {
    return {
      error: false
    }
  },
  componentDidMount: function() {
    $('#myLogin').modal('show')
  },

  handleSubmit : function(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const password = this.refs.password.value

    auth.login(email, password, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })
      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        var user_id = {
        user_id: parseInt(localStorage.user_id)
        }
        $.post('/toto/private', user_id)
          .done((data)=>{
            localStorage.myToto = JSON.stringify(data)
          })
          .error((error)=>{
            console.log('Error getting privat toto!', error);
          })
        this.context.router.replace('/')
      }
    })
    $('#myLogin').modal('hide')
  },
  render : function() {
    return (
      <div id="myLogin" role="dialog" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">×</button>
              <h4><span className="glyphicon glyphicon-heart" /> Login</h4>
            </div>

            <div className="modal-body" id="loginform">
              <form role="form" onSubmit={this.handleSubmit}>

                <div className="input-group input-group-md col-md-6 col-md-offset-3" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-envelope"></span>
                  </span>
                  <input ref="email" type="email" id="inputEmail" className="form-control"  placeholder="Email address" autofocus />
                </div>

                <div className="input-group input-group-md col-md-6 col-md-offset-3" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" />
                </div>

                <button type="submit" className="btn" style={{marginTop: 10}}>Login
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

module.exports = Login;