import random

class DataFactory():
    
    def get_data(self, symbols, elements):
        data = []
        for el in range(elements):
            data.append({
                "symbol": self.get_symbol(symbols),
                "price": self.get_random_price()
            })
        return data

    def get_symbol(self, symbols):
        return random.choice(symbols)
    
    def get_random_price(self):
        return random.randint(100, 2000)