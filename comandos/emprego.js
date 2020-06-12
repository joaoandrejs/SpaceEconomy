const db = require("quick.db") // Puxando a livraria quick.db
const Discord = require("discord.js") // Puxando a livraria Discord.js

exports.run = async (client, message, args) => {
  
  let emprego = await db.get(`emprego_${message.author.id}`) // Puxando o emprego do usuario
  if (emprego === 1) return message.reply(`Você ja possui um empredo de: \`💻 Programador\`, Você deve pedir demissão.`) // Se o usuario tiver 1 na db no caso emprego de programador ele retornara esta mensagem.
  if (emprego === 2) return message.reply(`Você ja possui um empredo de: \`⛏️ Minerador\`, Você deve pedir demissão.`) // Se o usuario tiver 1 na db no caso emprego de minerador ele retornara esta mensagem.

  let embed = new Discord.RichEmbed() // Criando uma embed
  .setDescription(`**Agencia de empregos**\n\nClique em uma reação\n\n💻 **»** Programador\n⛏️ **»** Minerador`)
  .setColor('BLUE')
  
  message.channel.send(embed).then(msg => { // definindo a função 'then' como 'msg'

    msg.react('💻').then(() => msg.react('⛏️')) // reagindo com dois emojis, referentes à cada emprego

    const filter = (reaction, user) => { // Criando um filtro para quem clicou no emoji
      return ['💻', '⛏️'].includes(reaction.emoji.name) && user.id === message.author.id; // caso o ID do usuário que clicou, seja igual ao do que puxou, iremos fazer a ação
    };
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) // retornnando com as reações
      .then(collected => { // mais uma função 'then', definida como 'collected'
        const reaction = collected.first();
    
        if (reaction.emoji.name === '💻') { // Caso o usuário clique no emoji referente à Programador
          message.reply('parabéns! Agora você trabalha-ra como um 💻 Programador'); 
          db.set(`emprego_${message.author.id}`, 1) // iremos adicionar 1 (um) na DB, que iremos usar como Programador
        } 
    
       if (reaction.emoji.name === '⛏️') { // Agora, caso o usuário clique no outro emoji, referente à Minerador
         message.reply('parabéns! Agora você trabalha-ra como um ⛏️ Minerador')
         db.set(`emprego_${message.author.id}`, 2) // iremos adicionar 2 (dois) na DB, que iremos definir como Minerador
       }
      
      })
      .catch(collected => { // Caso o usuário não clique em 30s, iremos declarar como cancelado
        message.reply('O tempo acabou. Utilize o comando novamente para poder escolher um emprego.');
      });
    })
  }

exports.help = {
  name: 'emprego',
  aliases: ['trabalho', 'empregos']
}
