// login modal ////
$(() => {
  const $formLogin = $("#login-form");
  const $formLost = $("#lost-form");
  const $formRegister = $("#register-form");
  const $divForms = $("#div-forms");
  const $modalAnimateTime = 300;
  const $msgAnimateTime = 150;
  const $msgShowTime = 2000;

  function modalAnimate($oldForm, $newForm) {
    const $oldH = $oldForm.height();
    const $newH = $newForm.height();
    $divForms.css("height", $oldH);
    $oldForm.fadeToggle($modalAnimateTime, () => {
      $divForms.animate({ height: $newH }, $modalAnimateTime, () => {
        $newForm.fadeToggle($modalAnimateTime);
      });
    });
  }

  function msgFade($msgId, $msgText) {
    $msgId.fadeOut($msgAnimateTime, function() {
      $(this)
        .text($msgText)
        .fadeIn($msgAnimateTime);
    });
  }

  function msgChange(
    $divTag,
    $iconTag,
    $textTag,
    $divClass,
    $iconClass,
    $msgText
  ) {
    const $msgOld = $divTag.text();
    msgFade($textTag, $msgText);
    $divTag.addClass($divClass);
    $iconTag.removeClass("glyphicon-chevron-right");
    $iconTag.addClass(`${$iconClass} ${$divClass}`);
    setTimeout(() => {
      msgFade($textTag, $msgOld);
      $divTag.removeClass($divClass);
      $iconTag.addClass("glyphicon-chevron-right");
      $iconTag.removeClass(`${$iconClass} ${$divClass}`);
    }, $msgShowTime);
  }

  $("form").submit(function() {
    switch (this.id) {
      case "login-form":
        var $lg_username = $("#login_username").val();
        var $lg_password = $("#login_password").val();
        if ($lg_username == "ERROR") {
          msgChange(
            $("#div-login-msg"),
            $("#icon-login-msg"),
            $("#text-login-msg"),
            "error",
            "glyphicon-remove",
            "Login error"
          );
        } else {
          msgChange(
            $("#div-login-msg"),
            $("#icon-login-msg"),
            $("#text-login-msg"),
            "success",
            "glyphicon-ok",
            "Login OK"
          );
        }
        return false;
        break;
      case "lost-form":
        var $ls_email = $("#lost_email").val();
        if ($ls_email == "ERROR") {
          msgChange(
            $("#div-lost-msg"),
            $("#icon-lost-msg"),
            $("#text-lost-msg"),
            "error",
            "glyphicon-remove",
            "Send error"
          );
        } else {
          msgChange(
            $("#div-lost-msg"),
            $("#icon-lost-msg"),
            $("#text-lost-msg"),
            "success",
            "glyphicon-ok",
            "Send OK"
          );
        }
        return false;
        break;
      case "register-form":
        var $rg_username = $("#register_username").val();
        var $rg_email = $("#register_email").val();
        var $rg_password = $("#register_password").val();
        if ($rg_username == "ERROR") {
          msgChange(
            $("#div-register-msg"),
            $("#icon-register-msg"),
            $("#text-register-msg"),
            "error",
            "glyphicon-remove",
            "Register error"
          );
        } else {
          msgChange(
            $("#div-register-msg"),
            $("#icon-register-msg"),
            $("#text-register-msg"),
            "success",
            "glyphicon-ok",
            "Register OK"
          );
        }
        return false;
        break;
      default:
        return false;
    }
    return false;
  });

  $("#login_register_btn").click(() => {
    modalAnimate($formLogin, $formRegister);
  });
  $("#register_login_btn").click(() => {
    modalAnimate($formRegister, $formLogin);
  });
  $("#login_lost_btn").click(() => {
    modalAnimate($formLogin, $formLost);
  });
  $("#lost_login_btn").click(() => {
    modalAnimate($formLost, $formLogin);
  });
  $("#lost_register_btn").click(() => {
    modalAnimate($formLost, $formRegister);
  });
  $("#register_lost_btn").click(() => {
    modalAnimate($formRegister, $formLost);
  });
});
