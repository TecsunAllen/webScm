import config from '../config/config.js';


let ws;
let listeners = [];
function initConnection() {
    return new Promise((resolve, reject) => {
        ws = new WebSocket(`ws://${config.wsHost}:${config.wsPort}`);
        ws.onopen = function () {
            console.log('连接服务器成功');
            resolve(ws);
        };
        ws.onmessage = function (event) {
            console.log(event.data);
            listeners.forEach(listener => listener(JSON.parse(event.data)));
        };
        ws.onclose = function () {
            console.log('服务器关闭');
        };
        ws.onerror = function () {
            console.log('连接出错');
            reject('连接出错');
        };
    });

}

function watchData(listener) {
    listeners.push(listener);
}

function statusSync() {
    ws.send(JSON.stringify({
        type: 'statusSync'
    }));
}

function executeCommand(commandString) {
    ws.send(JSON.stringify({
        commandString,
        type: 'executeCommand'
    }));
}

export default {
    initConnection,
    executeCommand,
    statusSync,
    watchData
};