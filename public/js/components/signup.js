const React = require('react');
const auth = require('../auth');

const Signup = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentDidMount: function() {
    $('#mySignup').modal('show')
  },
  handleSubmit : function(event) {
    event.preventDefault()
    $('#inputVali').remove()
    const email = this.refs.email.value
    const password  = this.refs.password.value
    if(email && password){
      const signupInfo = {
        email: email,
        password: password
      }
      if(password === this.refs.confirmPassword.value){
        $.post('/guests', signupInfo)
        .done((data) => {
          if(data) {
            $('#signupform').append("<p id='inputVali' style='margin-top:10px;color:red'>Signup Error, Email Already Exists!</p>")
          }else {
          }
        })
        .error((error) => {
          console.log('Successfully signup!', error);
          $("#mySignup").modal('hide');
          this.context.router.replace('/')
        })
      }else{
        $('#signupform').append("<p id='inputVali' style='margin-top:10px;color:red'>Password does not match confirm password!!</p>")
      }
    }else{
      $('#signupform').append("<p id='inputVali' style='margin-top:10px;color:red'>Input cannot be empty!</p>")
    }
  },

  render : function() {
    return (
      <div id="mySignup" role="dialog" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">×</button>
              <h4><span className="glyphicon glyphicon-asterick" /> Signup</h4>
            </div>

            <div className="modal-body" id="signupform">
              <form role="form" ref="formSignup" onSubmit={this.handleSubmit}>

                <div className="input-group input-group-md col-md-6 col-md-offset-3" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-envelope"></span>
                  </span>
                  <input ref="email" type="email" id="inputEmail" className="form-control" placeholder="Email address"/>
                </div>
                <div className="input-group input-group-md col-md-6 col-md-offset-3" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input ref="password"  type="password" id="inputPassword" className="form-control" placeholder="Password" />
                </div>
                <div className="input-group input-group-md col-md-6 col-md-offset-3" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input ref="confirmPassword"  type="password" id="inputPassword" className="form-control" placeholder="Type your password again" />
                </div>
                <button type="submit" className="btn" style={{marginTop: 10}}>Signup
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
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Signup;