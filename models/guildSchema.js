const mongoose = require("mongoose");

const guildModel = new mongoose.Schema({
  guildID: { type: String, require: true, unique: true },
//   adminroleID: { type: String, unique: true },
//   modroleID: { type: String, unique: true},
  modchannelID: { type: String, unique: true},
//   autoroleID: { type: String, unique: true}
});

const model = mongoose.model("GuildModels", guildModel);

module.exports = model;