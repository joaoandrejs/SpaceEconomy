const Discord = require('discord.js') // Puxando a livraria Discord.js
const db = require('quick.db'); // Puxando a livraria quick.db

exports.run = (client, message, args) => {
  let member = message.author || message.mentions.users.first() // Se não mencionar nenhum usuario mostrara o saldo do autor.
  
  let saldo = db.get(`dinheiro_${member.id}`) // Puxando na database o saldo do usuario
  if (saldo === null ) saldo = 0; // Para não aparecer 'null' no codigo retornaremos 0
  
  
  message.channel.send(`Usuario: ${member.username} possui: ${saldo}`)
}

exports.help = { //exportanto para a handler
    name: 'saldo',
    aliases: ['bal', 'balance']
}
