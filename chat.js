const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;
    
    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  }
  close() { 
    this.emit('close');
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

vkChat.setMaxListeners(2);


webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);
webinarChat.on('message', gettingReady);
vkChat.on('message', gettingReady);
vkChat.on('close', vkClose);

function gettingReady() {
    console.log('Готовлюсь к ответу');
}
function vkClose() {
    console.log('Чат вконтакте закрылся :(')
}

// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');    
vkChat.close();
vkChat.removeListener('message', chatOnMessage);
}, 10000 );

// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

setTimeout( ()=> {
  console.log('Закрываю вебинар!');
webinarChat.removeListener('message', chatOnMessage);
}, 30000 );