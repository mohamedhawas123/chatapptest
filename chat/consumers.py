import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Message
from django.contrib.auth import get_user_model
from .views import last10message, get_user_contact, get_current_chat

User = get_user_model()


class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        messages = last10message(data['chatID'])
        print(messages)
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }

        self.send_message(content)

    def new_message(self, data):
        user_contact = get_user_contact(data['from'])
       # author_user = User.objects.filter(username=author)[0]
        message = Message.objects.create(
            contact=user_contact, content=data['message'])

        current_chat = get_current_chat(data['chatId'])
        current_chat.messages.add(message)
        current_chat.save()

        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_ssage(content)

    def messages_to_json(self, messages):
        results = []
        for message in messages:
            results.append(self.message_to_json(message))

        return results

    def message_to_json(self, message):
        return {
            'id': message.id,
            'author': message.contact.user.username,
            'content': message.content,
            'timetemp': str(message.tiemstemp)
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group

    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
