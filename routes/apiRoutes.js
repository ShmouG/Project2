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
    db.Bidet.create(req.body).then(dbBidets => {
      res.json(dbBidets);
    });
  });

  // Delete an example by id
  app.delete("/api/bidet/:id", (req, res) => {
    db.Bidet.destroy({ where: { id: req.params.id } }).then(dbBidets => {
      res.json(dbBidets);
    });
  });
};
