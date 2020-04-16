const express = require("express");

const DB = require("./models");
const apiRoute = require("./routes/api");
const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];

const app = express();
app.use(express.json());

app.use('/api', apiRoute);
app.use('/', express.static('public'))

// Default Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err
  })
})

DB.sequelize.sync({
  alter: config.DB.SYNC_ALTER,
  force: config.DB.SYNC_FORCE,
}).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:3000`);
  });
});
