import unittest
from data_factory import DataFactory

class TestDataFactory(unittest.TestCase):

    def test_data_factory_get_data(self):
        df = DataFactory()
        symbols = ['AAAA', 'BBBB', 'CCCC', 'DDDD']
        elements = 50
        self.assertEqual(len(df.get_data(symbols, elements)), 50)

    def test_data_factory_symbol(self):
        df = DataFactory()
        symbols = ['AAAA']
        elements = 1
        self.assertEqual(df.get_data(symbols, elements)[0]['symbol'], 'AAAA')

    def test_data_factory_price(self):
        df = DataFactory()
        symbols = ['AAAA']
        elements = 1
        price = df.get_data(symbols, elements)[0]['price']
        self.assertEqual(price > 100 and price < 2000, True)
    

if __name__ == '__main__':
    unittest.main()
