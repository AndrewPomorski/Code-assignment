import unittest
from config import Config

class TestConfig(unittest.TestCase):

    def test_config_get_default_symbols(self):
        config = Config()
        self.assertEqual(config.get_default_symbols(), ['AAAA', 'BBBB', 'CCCC', 'DDDD'])

    def test_config_get_default_frequency(self):
        config = Config()
        self.assertEqual(config.get_default_frequency(), 300)

    def test_config_get_default_elements_per_update(self):
        config = Config()
        self.assertEqual(config.get_default_elements_per_update(), 50)



if __name__ == '__main__':
    unittest.main()