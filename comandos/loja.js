const Discord = require("discord.js");
const config = require('../config.json')

exports.run = (client, message, args) => {
  
  let embed = new Discord.RichEmbed()
  
  .setTitle('Loja - StackLab')
  .setDescription(`Space Lab - Loja`)
  .addField(`**CARGOS:**`, `Atualmente temos os seguintes cargos: \n 💎 \`Vip\` \n Utilize \`${config.prefix}cargos\` para comprar.`)
  .setThumbnail('https://cdn.glitch.com/b98b4389-f89f-445c-b6db-65281520d07b%2Ficons8-online-store-64.png?v=1591924550503')
  .setColor('#ff4545')
  
  message.channel.send(embed)
}

exports.help = { 
  name: 'loja',
  aliases: ['comprar']
}
