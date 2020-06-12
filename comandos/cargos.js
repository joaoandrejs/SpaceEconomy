const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, membro, args) => {
  
  let dinheiro = await db.get(`dinheiro_${message.author.id}`)
  if (dinheiro === null) dinheiro = 0;
  
let embed = new Discord.RichEmbed()

  .setTitle(`Cargos - SpaceLab`)
  .addField(`💎 **Vip:**`, `Custo: **R$: 10000**`)
  .addField (`**Info:**`, `Para comprar o \`cargo\` basta clicar\nno emoji de acordo com o cargo.`)
  .setColor('#ff4747')
  .setThumbnail('https://cdn.glitch.com/b98b4389-f89f-445c-b6db-65281520d07b%2Ficons8-online-store-64.png?v=1591924550503')
  .setFooter(`Versão Beta`)

message.channel.send({embed}).then(msg=>{
      msg.react('💎')
  
message.delete(embed)
  
  const vipfilter = (reaction, user) => reaction.emoji.name === '💎' && user.id === message.author.id;
  const vipL = msg.createReactionCollector(vipfilter);
  
  vipL.on('collect', r2 => { 
    r2.remove(message.author.id);
    
      embed = new Discord.RichEmbed()
    
          .setDescription(`Você comprou o cargo 💎 **VIP**, foi descontado: **R$10,000** da sua conta.`)
          .setThumbnail("https://cdn.glitch.com/b98b4389-f89f-445c-b6db-65281520d07b%2Ficons8-online-store-64.png?v=1591924550503")
          .setColor("#ff4747")
    
      if (dinheiro < 10000) return message.reply('Para poder comprar este cargo você deve possuir **R$: 10000** de dinheiro!')
      db.subtract(`dinheiro_${message.author.id}`, 10000)
    
    let cargo = message.guild.roles.get("720812270615134250");
    
    let filtro = (reaction, usuario) => reaction.emoji.name === "💎" && usuario.id === membro.id;
    let coletor = msg.createReactionCollector(filtro, {max: 1});    
    
    message.member.addRole(cargo.id);
    message.channel.send(embed);
  })
  
});
};
exports.help = { 
    name: 'cargos',
    aliases: ['roles']
}
