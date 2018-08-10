// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

function parseIntQueryFor(query, param) {
  // This is ugly but it works.
  if (query[param].toString() === '[object Object]') {
    // Provides support for queries with $lt, $lte, $gt, $gte, etc.
    // See https://docs.feathersjs.com/api/databases/querying.html
    for (var key in query[param]) {
      query[param][key] = parseInt(query[param][key]);
    }
  } else {
    query[param] = parseInt(query[param]);
  }
}

function parseFloatQueryFor(query, param) {
  // This is also ugly but it works.
  if (query[param].toString() === '[object Object]') {
    // Provides support for queries with $lt, $lte, $gt, $gte, etc.
    // See https://docs.feathersjs.com/api/databases/querying.html
    for (var key in query[param]) {
      query[param][key] = parseFloat(query[param][key]);
    }
  } else {
    query[param] = parseFloat(query[param]);
  }
}

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    // Query params come in as strings, so we parse them.
    if (context.params.query.NumUniqUsers) {
      parseIntQueryFor(context.params.query, 'NumUniqUsers');
    }
    if (context.params.query.NumMessages) {
      parseIntQueryFor(context.params.query, 'NumMessages');
    }
    if (context.params.query.Sentiment) {
      parseFloatQueryFor(context.params.query, 'Sentiment');
    }
    if (context.params.query.AvgResponseTime) {
      parseFloatQueryFor(context.params.query, 'AvgResponseTime');
    }

    return context;
  };
};
