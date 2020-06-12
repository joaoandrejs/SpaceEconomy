const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {
    if (err) console.error(err);

  let arquivojs = files.filter(f => f.split(".").pop() == "js");
  arquivojs.forEach((f, i) => {
    let props = require(`./comandos/${f}`);
    console.log(`${f} - Comando iniciado`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on('ready', () => { // setando o evento com nosso Discord.Client
    console.log(`${client.user.username} foi iniciado com sucesso`);
    
    let tabela = [ 
      
        {name: 'SpaceLab', type: 'PLAYING'},
        {name: 'as moedas caindo', type: 'LISTENING'},
        {name: 'meu prefixo e: SE!', type: 'WATCHING'}
    ];
  
    function setStatus() {
        let altstatus = tabela[Math.floor(Math.random() * tabela.length)]
        client.user.setPresence({game: altstatus})
    }
    setStatus(); 
    setInterval(() => setStatus(), 15000) 
});  

client.on('message', message => {
    if (message.author.bot) return; // Para o bot não responder outros bots
    if (message.channel.type === "dm") return; //para o bot não responder na DM

    let prefix = config.prefix; // puxando o prefixo do nosso bot
    
  let args = message.content.substring(config.prefix.length).split(" ");
  
    if (!message.content.startsWith(config.prefix)) return;
     let cmd = args.shift().toLowerCase();
     if (!message.content.startsWith(prefix) || message.author.bot) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (command) {
    command.run(client, message, args);
  } else {
    message.reply(
      `Não consegui reconhecer este comando em minha lista!`
    );
  }
});

//codigo pra deixar o o bot sempre online
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Recebido");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000); // Código que deixa o Bot Online

client.login(config.token);
