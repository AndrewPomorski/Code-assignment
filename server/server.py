import tornado.websocket
from datetime import timedelta
from config.config import Config
from data_factory.data_factory import DataFactory
import json

PORT = 8888
clients = []

class WebSocketHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        print("New client connected")
        clients.append(self)

    def on_message(self, message):
        print("message: " + message)
        settings = json.loads(message)
        print(settings)


    def on_close(self):
        print("Client disconnected")
        clients.remove(self)


class DataHandler():
    def __init__(self): 
        config = Config()
        self.config = config.get_config()
        self.data_factory = DataFactory()
        print(self.config)

    def update_data(self):
        try:
            for client in clients:
                data = self.data_factory.get_data(self.config['symbols'], self.config['elements_per_update'])
                client.write_message(json.dumps(data))
        finally:
            tornado.ioloop.IOLoop.instance().add_timeout(timedelta(milliseconds=self.config['update_frequency_milliseconds']), self.update_data)


socket = tornado.web.Application([(r"/wss", WebSocketHandler),])
if __name__ == "__main__":
    data_handler  = DataHandler()
    socket.listen(PORT)
    tornado.ioloop.IOLoop.instance().add_timeout(timedelta(milliseconds=300), data_handler.update_data)
    tornado.ioloop.IOLoop.instance().start()
