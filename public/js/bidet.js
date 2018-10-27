$(document).ready(() => {
  $(".addBidetFormm").on("submit", function(event) {
    event.preventDefault();
    const buildingName = $(this)
      .children("#buildingName")
      .val();
    const address = $(this)
      .children("#address")
      .val();
    const toiletType = $(this)
      .children("#toiletType")
      .val();
    const extraDetails = $(this)
      .children("#extraDetails")
      .val();
    const img = $(this)
      .children("#img")
      .val();

    const bidet = {
      buildingName,
      address,
      toiletType,
      extraDetails,
      img
    };
    $.post("/api/bidet/create", bidet, () => {
      window.location.href = "/";
    });
  });
});
