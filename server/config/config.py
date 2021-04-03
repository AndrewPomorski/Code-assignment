import configparser

class Config():

    def __init__(self):
        self.symbols = ['AAAA', 'BBBB', 'CCCC', 'DDDD']
        self.update_frequency_milliseconds = 300
        self.elements_per_update = 50


    def get_config(self):
        return {
            "symbols" : self.get_default_symbols(),
            "update_frequency_milliseconds" : self.get_default_frequency(),
            "elements_per_update": self.get_default_elements_per_update()
        }

    def get_default_symbols(self):
        return self.symbols
    
    def get_default_frequency(self):
        return self.update_frequency_milliseconds

    def get_default_elements_per_update(self):
        return self.elements_per_update