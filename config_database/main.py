import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

print(os.getenv('DATABASE'))

conn = psycopg2.connect(
    database=os.getenv('DATABASE'),
    host=os.getenv('HOST'),
    user=os.getenv('USER'),
    password=os.getenv('PASSWORD')
)

cursor = conn.cursor()

sql = 'create table cidade (id serial primary key, nome varchar(100), uf varchar(2))'
cursor.execute(sql)
sql = "insert into cidade values (default,'São Paulo,'SP')"
cursor.execute(sql)
conn.commit()

cursor.execute('select * from cidade')

recset = cursor.fetchall()
for rec in recset:
    print(rec)
conn.close()