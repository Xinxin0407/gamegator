const Model = require("./../../server/models/events.server.model.js");


exports.print = () => console.log(Model.find());
