const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

let prefix = ayarlar.prefix;

module.exports = client => {
  client.user.setStatus("dnd");
console.log('Bot Kadir Tarafından Yapıldı.');
};