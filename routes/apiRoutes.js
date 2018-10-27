const db = require("../models");

module.exports = app => {
  // Get all examples
  app.get("/api/bidet", (req, res) => {
    db.Bidet.findAll({}).then(dbBidets => {
      res.json(dbBidets);
    });
  });

  // Create a new example
  app.post("/api/bidet/create", (req, res) => {
    db.Bidet.create({
      buildingName: req.body.buildingName,
      address: req.body.address,
      toiletType: req.body.toiletType,
      extraDetails: req.body.extraDetails,
      img: req.body.img
    }).then(() => {
      res.redirect('/');
    });
  });

  // Delete an example by id
  app.delete("/api/bidet/:id", (req, res) => {
    db.Bidet.destroy({ where: { id: req.params.id } }).then(dbBidets => {
      res.json(dbBidets);
    });
  });
};
