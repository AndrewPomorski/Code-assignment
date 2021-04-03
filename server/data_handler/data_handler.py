import tornado.websocket
from datetime import timedelta

class DataHandler():
    def __init__(self, config, data_factory): 
        self.config = config
        self.data_factory = data_factory
        print(self.config)

    def update_config(self, config):
        self.config = config

    def update_data(self):
        try:
            for client in clients:
                data = self.data_factory.get_data(self.config['symbols'], self.config['elements_per_update'])
                client.write_message(json.dumps(data))
        finally:
            tornado.ioloop.IOLoop.instance().add_timeout(timedelta(milliseconds=self.config['update_frequency_milliseconds']), self.update_data)
