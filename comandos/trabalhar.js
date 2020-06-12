const db = require('quick.db') // Puxando a DataBase. *Instale utilizando: npm i quick.db --save
const ms = require('parse-ms') // Puxando a NPM parse-ms, que iremos utilizar para criar o timeout. *Instale utilizando: npm i parse-ms --save

exports.run = async (client, message, args) => {
    
// Lista funções de um Programador irá fazer
let programmer = ['BOT para discord.js', 'aplicativo para celular', 'site profissional para seu bot', 'plataforma de stream', 'comando para seu bot', 'criou um aplicativo para ver o tempo', 'um site para sua empresa']
// Lista funções de um miner
let miner = ['Ouro', 'Diamante', 'Aluminio', 'Rubi', 'Safira', 'Esmeralda', 'Ametista', 'Topázio', 'Turqueza', 'Quartzo'] 

    let timeout = 1.8e+7 // Definindo um tempo para utilizar o comando, no caso desse, 5 horas (em milisegundos)
    let quantia = Math.floor(Math.random() * 1000) + 400; // Definindo quanto o usuário pode ganhar 
    let trabalho = await db.get(`work_${message.author.id}`); // Puxando da DataBase o 'work', que vai definir que o mesmo trabalhou

    if (trabalho !== null && timeout - (Date.now() - trabalho) > 0) { // Puxando o trabalho e iremos dar o timeout
     let time = ms(timeout - (Date.now() - trabalho)); // Definindo que 'time' será os tempos
      
      message.channel.send(`Você ja trabalhou recentemente.\nVocê podera trabalhar novamente em: **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
   
     } else {
        let emprego = await db.get(`trabaio_${message.author.id}`) // Puxando o 'trabaio', que utilizamos como emprego
        if (emprego === null) { // Caso o 'trabaio' do usuário seja 'null', ou seja, zero, iremos avisar que ele precisa de um emprego
          return message.reply(`Para poder trabalhar você deve possuir um emprego: \`SL!empregos\`.`)
        } else {
          
        } // Caso o usuário seja um Programador, que definimos como Um (1)
        if (emprego === 1) {                                      // Puxando a lista que criamos no início
          message.channel.send(`💻 Você programou um: **${programmer[Math.floor(Math.random() * programmer.length)]}** na venda você recebeu: **R$ ${quantia}**`)
          db.add(`dinheiro_${message.author.id}`, quantia) // setando a 'quantia' de dinheiro por trabalhar hoje
          db.set(`work_${message.author.id}`, Date.now()) // Setando o timeout que criamos acima, no 'work', salvando na DataBase 
       } // Caso o usuário seja um Programador, que definimos como Dois (2)
       
        if (emprego === 2) {                                     // Puxando a lista que criamos no início
          message.channel.send(`⛏️ Você minerou um: **${miner[Math.floor(Math.random() * miner.length)]}** na venda você recebeu: **R$ ${quantia}**`)
          db.add(`dinheiro_${message.author.id}`, quantia) // setando a 'quantia' de dinheiro por trabalhar hoje
          db.set(`work_${message.author.id}`, Date.now()) // Setando o timeout que criamos acima, no 'work', salvando na DataBase
       }
    }
}

exports.help = {
    name: 'trabalhar',
    aliases: ['work']
}
