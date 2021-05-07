const net = require('net');
const number = 42;

const server = net.createServer((socket) => {
  console.log('Guess my number between 1 and 100\nYour guess?');

  socket.on('data', (buffer) => {

        var guess = parseInt(buffer.toString('utf-8'));
        if(guess < number){
            socket.write('My number is higher\nGuess my number between 1 and 100\nYour guess?');
        } else if(guess > number){
            socket.write('My number is lower\nGuess my number between 1 and 100\nYour guess?');
        } else if(guess == number) {
            socket.write('You guessed it!\nGuess my number between 1 and 100\nYour guess?');
            socket.end();
        }
  });

  socket.on('end', () => {
  });
});

server.maxConnections = 20;
server.listen(54321);

// client
// nc 127.0.0.1 54321
const readline = require('readline');

const client = new net.Socket();
client.connect(54321, process.argv[2], () => {
  //console.log('Connected to server');
});
client.on('data', (data) => {
  console.log(data.toString('utf-8'));
});

const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
  client.write(`${line}\n`);
});
rl.on('close', () => {
  client.end();
});
