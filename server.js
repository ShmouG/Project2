require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log( // eslint-disable-line
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;


// login modal ////
$(function() {
    
  var $formLogin = $('#login-form');
  var $formLost = $('#lost-form');
  var $formRegister = $('#register-form');
  var $divForms = $('#div-forms');
  var $modalAnimateTime = 300;
  var $msgAnimateTime = 150;
  var $msgShowTime = 2000;

  $("form").submit(function () {
      switch(this.id) {
          case "login-form":
              var $lg_username=$('#login_username').val();
              var $lg_password=$('#login_password').val();
              if ($lg_username == "ERROR") {
                  msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
              } else {
                  msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
              }
              return false;
              break;
          case "lost-form":
              var $ls_email=$('#lost_email').val();
              if ($ls_email == "ERROR") {
                  msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
              } else {
                  msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
              }
              return false;
              break;
          case "register-form":
              var $rg_username=$('#register_username').val();
              var $rg_email=$('#register_email').val();
              var $rg_password=$('#register_password').val();
              if ($rg_username == "ERROR") {
                  msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
              } else {
                  msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
              }
              return false;
              break;
          default:
              return false;
      }
      return false;
  });
  
  $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
  $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
  $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
  $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
  $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
  $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
  
  function modalAnimate ($oldForm, $newForm) {
      var $oldH = $oldForm.height();
      var $newH = $newForm.height();
      $divForms.css("height",$oldH);
      $oldForm.fadeToggle($modalAnimateTime, function(){
          $divForms.animate({height: $newH}, $modalAnimateTime, function(){
              $newForm.fadeToggle($modalAnimateTime);
          });
      });
  }
  
  function msgFade ($msgId, $msgText) {
      $msgId.fadeOut($msgAnimateTime, function() {
          $(this).text($msgText).fadeIn($msgAnimateTime);
      });
  }
  
  function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
      var $msgOld = $divTag.text();
      msgFade($textTag, $msgText);
      $divTag.addClass($divClass);
      $iconTag.removeClass("glyphicon-chevron-right");
      $iconTag.addClass($iconClass + " " + $divClass);
      setTimeout(function() {
          msgFade($textTag, $msgOld);
          $divTag.removeClass($divClass);
          $iconTag.addClass("glyphicon-chevron-right");
          $iconTag.removeClass($iconClass + " " + $divClass);
    }, $msgShowTime);
  }
});
