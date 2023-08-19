import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import math

url = "https://querobolsa.com.br/cursos-e-faculdades/todos"

headers = { 'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36" }

site = requests.get(url, headers=headers)
soup = BeautifulSoup(site.content, 'html.parser')
cursos = soup.find_all('a', class_=re.compile("canonical-course-directory__course-link"))

dic_cursos = {'nome':[], 'link':[]}

for curso in cursos:
    nome = curso.get_text().strip()
    if nome[0] != '':
        dic_cursos['nome'].append(nome)
        dic_cursos['link'].append(f'https://querobolsa.com.br/cursos-e-faculdades/{curso["href"]}')

df = pd.DataFrame(dic_cursos)
df.to_csv('./cursos.csv', encoding='utf-8', sep=';')