const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
  require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require('jimp');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};


// İSİM YAŞ İSİM DEĞİŞTİRME 

client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag;
  //splashen
  member.setNickname(`${tag} İsim • Yaş`);
});

// İSİM YAŞ İSİM DEĞİŞTİRME SON

client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam, Canım :)');
  }
});

//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.roles.add(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.roles.add(kayıtsızROL)
})

/// kayıtsız rolü son



// BOT OTOROL

client.on('guildMemberAdd', async member => {//splashen
  if(member.user.bot)
  member.setRoles(['807590452081459210'])
  })
  // GİRİŞ 
    client.on("guildMemberAdd", member => { 
      const moment = require('moment');
    const kanal = ayarlar.giriskanal;
    let user = client.users.get(member.id);
    require("moment-duration-format");
      const tarih = new Date().getTime() - user.createdAt.getTime();  
    const embed = new Discord.RichEmbed()
    let rol = ayarlar.kayıtsızROL
   member.addRole(rol)//splashen
  
    var kontrol;
  if (tarih < 1296000000) kontrol = '<a:no1:756946138342621295> __**Bu Kullanıcı Şüpheli**__'
  if (tarih > 1296000000) kontrol = '<a:tik3:756946140825649214> __**Bu Kullanıcı Güvenli**__'
    moment.locale("tr");
    let kanal1 = client.channels.get(kanal);
      let giris = new Discord.RichEmbed()
     .setTitle(`<a:kraltac:740610303628279808> | \`Sunucuya Bir Üye Katıldı!\` | <a:kraltac:740610303628279808>`)
      .setDescription(`
  • ** __Hoşgeldin! ${member}__ **
  
  •  <a:pembeh:751553654561046619> **__Seninle Birlikte ${member.guild.memberCount} Kişiyiz.__ **
  
  • \`{ ${ayarlar.tag} }\`** __Tagımızı alarak ekibimize katılabilirsin.__ **
  
  • <a:alarm1:756946152938799225> ** <@&${ayarlar.yetkiliROL}> __seninle ilgilenicektir.__ **
  
  • <a:sari3:751558669585612830> ** __Hesabın Oluşturulma Tarihi:__** \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`
  
  •  ${kontrol} 
  
  • <a:duyur:766652129678721074> ** __ Ses teyit odasında kaydınızı yaptırabilirsiniz. __ ** 
  
  `)//splashen
      .setThumbnail(member.user.avatarURL || 'https://cdn.discordapp.com/attachments/766342468576608318/766343451994226778/af8039261a387be71514bb4c2e5e54b5.gif')
      .setImage('https://cdn.discordapp.com/attachments/766342468576608318/766343451994226778/af8039261a387be71514bb4c2e5e54b5.gif')
      .setTimestamp()
  kanal1.send(giris)
    });

// GİRİŞ SON

// TAG LOG
client.on("userUpdate", async (oldUser, newUser) => {//splashen
  if (oldUser.username !== newUser.username) {
    let tag = ayarlar.tag
  
    let rol = ayarlar.tagROL;
    
    
    let embed1 = new Discord.RichEmbed()
    .setDescription(`${newUser} ${tag} tagını aldığı için <@&${rol}> rolünü kazandı!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    let embed2 = new Discord.RichEmbed()
    .setDescription(`${newUser} ${tag} tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    if (newUser.username.includes(tag) && !client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(ayarlar.tagLOG).send(embed1)
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).removeRole(rol)
      client.channels.get(ayarlar.tagLOG).send(embed2)
    }

  }
})



//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {//splashen
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.addRole(botrol)
})

// BOT ROLÜ SON

//Otorol

const roldb = require('quick.db');
client.on("guildMemberAdd", member => {       
    var ronney = roldb.fetch(`otorolrolu_${member.guild.id}`);
  var rol = member.guild.roles.cache.get(ronney)
 if(!rol) return; //Eğer sunucudaki rol silinirse otorol ayarı silinir
   member.roles.add(rol.id)
//-----Rol(ÜST)Yazı(ALT)-----\\
var ales = roldb.fetch(`otorolkanali_${member.guild.id}`);
var kanal = member.guild.channels.cache.get(ales)
if(!kanal) return;
kanal.send(`<@${member.id}> kişisi sunucuya katıldı, ${rol} rolü verildi. Hoşgeldin ${member.user.username}!`)
});


client.on('guildMemberAdd', async (member) => {
  /////////////////////////
     //Kanal Tanımı
     ////////////////////////////////////////
    let viruskanal = client.channels.cache.get("807593016466473020")
  ////////////////////////////////////////
  //Güvenlik TanımlarıS
  ////////////////////////////////////////
  let virususer = client.users.cache.get(member.id);
  let viruskullanıcı = client.users.cache.get(member.id)
  const virushesapkurulus = new Date().getTime()- viruskullanıcı.createdAt.getTime();
  let viruj;
  if (virushesapkurulus < 1296000000) viruj = ' Güvenilir Değil!'
  if (virushesapkurulus > 1296000000) viruj = ' Güvenilir!'
  
  /////////////////////// /////////////////
  //Embed
  ////////////////////////////////////////
    const hgembed = new Discord.MessageEmbed()
    .setDescription(`
    
     ゃ Aramıza Hoşgeldin **${virususer.username}** !
  
     ゃ Seninle Birlikte **${member.guild.memberCount}** Kişiyiz
  
     ゃ <@&808047543371825173> Rolundekiler Senle En Kısa Zamanda İlgilenicek
  
     ゃ İsmini Ve Yaşını Yazıp Kayıt Olabilirsin.

     ゃ Hesabın Kuruluş Tarihi ${moment(member.user.createdAt).format("**DD MMMM YYYY hh:mm:ss**") }
  
     ゃ Hesabın Güvenlik Durumu: **${viruj}**
  
     ゃ Ayrıca Tagımızı Alarak Bize Destek Olabilirsin "ゃ"
    
    `)
    .setColor("#2f3136")
    //.setImage("https://cdn.discordapp.com/attachments/706505340417736736/794296050121965568/ezgif-6-9ab9144abf46.gif")
    .setTitle("Aramıza Yeni Birisi Katıldı !")
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor(member.guild.name,member.guild.iconURL({dynamic:true}))
    .setFooter("Rakun Kingdom Bot Kayıt Sistemi")
    ////////////////////////////////////////
    //Kanala Gönderme
    ////////////////////////////////////////
    viruskanal.send(`<@&807666304983105616> <@${member.id}>`, hgembed) ;
  })



client.login(ayarlar.token);
