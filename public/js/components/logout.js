const React = require('react');
const auth = require('../auth');

const Logout = React.createClass({
  componentDidMount : function() {
    auth.logout()
    // $('#create').remove()
    // $('#logout').remove()
  },

  render : function() {
    return <p></p>
  }
})

module.exports = Logout;