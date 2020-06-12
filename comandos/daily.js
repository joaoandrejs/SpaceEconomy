const db = require('quick.db') // Puxando a livraria quick.db
const ms = require('parse-ms') // Puxando a livraria parse-ms
const Discord = require('discord.js') // puxando a livraria Discord.js

exports.run = async (client, message, args) => {
  
       let timeout = 86400000 // O tempo que poderá ser utilizado o comando, (24 horas em mili segundos)
       let saldo = Math.floor(Math.random() * 1500) + 500; // Sistema randomico que será entrem 1500 a 500 que será adicionado.

        let daily = db.fetch(`daily_${message.author.id}`);
    
       if (daily !== null && timeout - (Date.now() - daily) > 0) { // pegando o 'daily' e verificando se o timeout expirou
         let time = ms(timeout - (Date.now() - daily)); // definindo os tempos na variável 'time'
           
           message.reply(`Você ja trabalhou recentemente.\nTente novamente em: **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
       } else { // Se o tempo ja tiver passado ele retornara:
          
            message.channel.send(`Você recebeu: **R$ ${saldo}** no dia de hoje.`)
    
        db.add(`dinheiro_${message.author.id}`, saldo) // Adicionando o dinheiro para o usuario
        db.set(`daily_${message.author.id}`, Date.now()) // Adicionando o tempo na DB
        }
    }
exports.help = {
    name: 'daily',
    aliases: ['diário', 'diario']
}
