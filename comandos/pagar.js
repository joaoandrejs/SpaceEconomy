const Discord = require("discord.js") // puxando a livraria discord.js
const db = require('quick.db') // puxando o npm quick.db (uma database, para instalar, utilize: npm i quick.db)

exports.run = async (client, message, args) => { 

    let member = message.mentions.members.first() // Puxando o usuario para poder pagar.

    let saldo = db.get(`dinheiro_${message.author.id}`) //Puxando o dinheiro na DB
    
    if (!member) { // Para avisarmos que não
        return message.reply('Você deve mencionar um usuario para poder pagar.')
    }
  
    if (member === message.author) { //Para não ter bugs retornaremos uma mensagem para que não possa se pagar.
        return message.reply(`Você não pode se enviar dinheiro.`)
    }
  
    if (!args[1]) { // Se o usuario não definir uma quantia
        return message.reply('Digite uma quantia')
    }

    if (args[1] < 1) { // Para o usuario não enviar falor abaixo de 0 e abusar retornaremos esta mensagem
      return message.reply(`Vocẽ deve enviar uma quantia maior que **R$ 1**`)
    }

    if (message.content.includes('-')) { // Para não bugar o saldo do usuario.
        return message.reply(`Você não pode enviar dinheiro negativo.`)
    }
  
   if (isNaN(args[1])) { // Caso o usuario não digite um numero
     return message.channel.send(`Isto não e um numero.`)
   }

    if (saldo < args[1]) { // Se o usuario não possuir o dinheiro para pagar o usuario
        return message.channel.send(`Você não possui **R$ ${args[1]}** para poder enviar.`)
    }
  
          message.reply(`Usuario pago com sucesso.`) // Retornando uma mensagem para avisar q o usuario foi pago.
      
         db.add(`dinheiro_${member.id}`, args[1]) // Adicionando a quantia do membro mencionado.
         db.subtract(`dinheiro_${message.author.id}`, args[1]) // Removendo o dinheiro do autor.
}

exports.help = {
    name: 'pagar',
    aliases: ['pay']
}
