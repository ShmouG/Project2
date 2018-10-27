$(document).ready(() => {
  $("#submitbidet").on("submit", function (event) {
    event.preventDefault();

    const bidetLocation = $(this)
      .children("")
      .val();
    const bidet = {
      buildingName: "sfd"
    };
    $.post("/api/bidet/create", {});
  });
})

