const dashboard = require('./dashboard/dashboard.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(dashboard);
};
