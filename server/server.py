import tornado.websocket
from datetime import timedelta
from config.config import Config
from data_factory.data_factory import DataFactory
from db_handler.db_handler import DbHandler
import json

PORT = 8888
clients = []

class DataHandler():
    def __init__(self): 
        config = Config()
        self.dbh = DbHandler()
        self.config = config.get_config()
        self.data_factory = DataFactory()
        print(self.config)

    def update_config(self, config):
        self.config = config

    def update_data(self):
        try:
            for client in clients:
                data = self.data_factory.get_data(self.config['symbols'], self.config['elements_per_update'])
                # self.dbh.save_to_db(data)
                client.write_message(json.dumps(data))
        finally:
            tornado.ioloop.IOLoop.instance().add_timeout(timedelta(milliseconds=self.config['update_frequency_milliseconds']), self.update_data)

data_handler = DataHandler()

class WebSocketHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        print("New client connected")
        clients.append(self)

    def on_message(self, message):
        settings = json.loads(message)
        print(settings)
        config = {
            "symbols": settings['symbols'],
            "update_frequency_milliseconds": int(settings['updateFrequency']),
            "elements_per_update": int(settings['elementsPerUpdate'])
        }
        data_handler.update_config(config)


    def on_close(self):
        print("Client disconnected")
        clients.remove(self)





socket = tornado.web.Application([(r"/wss", WebSocketHandler),])
if __name__ == "__main__":
    data_handler  = DataHandler()
    socket.listen(PORT)
    tornado.ioloop.IOLoop.instance().add_timeout(timedelta(milliseconds=300), data_handler.update_data)
    tornado.ioloop.IOLoop.instance().start()
