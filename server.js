const { spawn } = require('child_process');
let gitService = require('./gitService');

let ws = require('nodejs-websocket');
let connection;

// Scream server example: "hi" -> "HI!!!"
ws.createServer(function (conn) {
    connection = conn;
    conn.on('text', function (data) {
        const parsedData = JSON.parse(data);
        switch (parsedData.type) {
        case 'executeCommand':
            execute(parsedData.commandString);
            break;
        case 'statusSync':
            getScmStatus();
            break;
        default:
            break;
        }
    });
    conn.on('close', function () {
        console.log('Connection closed');
    });
}).listen(8001);


function getScmStatus() {
    gitService.getStatus().then(data => {
        connection.sendText(JSON.stringify({
            type: 'statusSync',
            status: 'completed',
            data
        }));
    });
}

function execute(commandString) {
    const commandArray = commandString.split(' ');
    const program = commandArray.shift();
    const commandExector = spawn(program, commandArray);

    commandExector.stdout.on('data', (data) => {
        const message = uint8ArrayToString(data);
        connection.sendText(JSON.stringify({
            type: 'executeCommand',
            status: 'completed',
            commandString,
            message
        }));
    });


    commandExector.stderr.on('data', (data) => {
        const message = uint8ArrayToString(data);
        connection.sendText(JSON.stringify({
            type: 'executeCommand',
            status: 'failed',
            commandString,
            message
        }));
    });

    commandExector.on('close', (code) => {
        connection.sendText(JSON.stringify({
            type: 'executeCommand',
            status: 'closed',
            errCode: code,
            commandString,
            message: code ? `command end with error code:${code}` : 'command end successfully.'
        }));
    });
}


function uint8ArrayToString(fileData) {
    let dataString = '';
    for (let i = 0; i < fileData.length; i++)
        dataString += String.fromCharCode(fileData[i]);
    return dataString;
}



process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});