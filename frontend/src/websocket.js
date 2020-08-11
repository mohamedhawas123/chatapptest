class WebSocketService {

    static instance = null;

    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();

        }
        return WebSocketService.instance
    } 

    constructor() {
        this.socketRef = null
    }

    connect(chatUrl) {
        const path = `ws://127.0.0.1:8000/ws/chat/${chatUrl}/`;
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen  = () => {
            console.log("websuck my dick")
        }

       // this.socketNewMessage(JSON.stringify({
           // command: 'fetch_messages'
      //  }))
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)
        }

        this.socketRef.onerror = e => {
            console.log(e.message)
        }
        this.socketRef.onclose = () => {
            console.log("closed")
            this.connect();
        }
    }

    disconnect() {
        this.socketRef.close();
        
    }


    socketNewMessage(data) {
        const parseData = JSON.parse(data)
        const command = parseData.command;
        if(Object.keys(this.callbacks).length == 0) {
            return;
        }

        if (command === 'messages') {
            this.callbacks[command](parseData.messages)
        }
        if (command === 'new_message') {
            this.callbacks[command](parseData.message)
        }
        
    }

    state() {
        return this.socketRef.readyState;
      }

    fetchMessages(username, chatID) {
        this.sendMessage({command : 'fetch_messages', username : username, chatID: chatID});
    }

    newChatMessage(message) {
        this.sendMessage({command: 'new_message',
         from : message.from,
         message: message.content,
         chatId : message.chatId
        })
    }

    addCallbacks(messageCallback, newMessageCallback) {
        this.callbacks['messages'] = messageCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({...data}))
        } catch(err) {
            console.log(err.message)
        }
    }

    waitForSocketConnection(callback) {
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;

        setTimeout(
            function() {
                if(socket.readyState === 1) {
                    console.log("Connection is secure");
                    if (callback != null) {
                        callback()
                    }
                    return;

                } else {
                    console.log("wating for connection");
                    recursion(callback)
                }
            }, 1)
    }

}

const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance;