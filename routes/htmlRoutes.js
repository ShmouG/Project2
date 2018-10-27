const db = require("../models");

module.exports = app => {
  // Load index page
  app.get("/", (req, res) => {
    db.Bidet.findAll({}).then(dbBidet => {
      res.render("index", {
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/bidet/:id", (req, res) => {
    db.Bidet.findOne({ where: { id: req.params.id } }).then(dbBidet => {
      res.render("bidet", {
        bidet: dbBidet
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
