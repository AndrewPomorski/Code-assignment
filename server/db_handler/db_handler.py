import sqlite3

class DbHandler():

    def __init__(self):
        self.db_conn = sqlite3.connect('historical_data.db')
        self.db_conn.execute('''
            CREATE TABLE IF NOT EXISTS HISTORICAL_DATA (SYMBOL TEXT, PRICE INT)
        ''')

    def save_to_db(self, data):
        for element in data:
            print(data)
            symbol = data['symbol']
            price = data['price']
            self.db_conn.execute(f'INSERT INTO HISTORICAL_DATA (SYMBOL, PRICE) VALUES({symbol},{price})')

    def get_from_db(self, offset, limit):
        rows = self.db_conn.execute(f'SELECT * FROM HISTORICAL_DATA LIMIT {limit},{offset}')