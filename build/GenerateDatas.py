# python module needed: rjsmin,  to install it: pip install rjsmin
# To update data just run: python GenerateDatas.py

import urllib.request, json, rjsmin
# English
url = 'https://api.epicsevendb.com/hero?lang=en'
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(url, '../assets/js/en.characters.js')

with open('../assets/js/en.characters.js', encoding='utf-8') as f:
  data = json.load(f)

results=data["results"]

characters = []
for item in results:
    my_dict={}
    my_dict['_id']=item.get('_id')
    my_dict['name']=item.get('name')
    my_dict['rarity']=item.get('rarity')
    my_dict['role']=item.get('role')
    my_dict['attribute']=item.get('attribute')
    my_dict['zodiac']=item.get('zodiac')
    if my_dict['rarity'] > 1:
        characters.append(my_dict)
      
back_json=json.dumps(characters, indent = 4, ensure_ascii=False)

back_json=rjsmin.jsmin("export const en ="+back_json+";")

with open("../assets/js/en.characters.js", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json) 


url = 'https://api.epicsevendb.com/artifact?lang=en'
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(url, '../assets/js/en.artifacts.js')

with open('../assets/js/en.artifacts.js', encoding='utf-8') as f:
  data = json.load(f)

results=data["results"]

artifacts = []
for item in results:
    my_dict={}
    my_dict['_id']=item.get('_id')
    my_dict['name']=item.get('name')
    my_dict['rarity']=item.get('rarity')
    my_dict['role']=item.get('role')
    if my_dict['rarity'] > 2:
        artifacts.append(my_dict)
      
back_json=json.dumps(artifacts, indent = 4, ensure_ascii=False)

back_json=rjsmin.jsmin("export const en ="+back_json+";")

with open("../assets/js/en.artifacts.js", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json) 
print('English Finish')


# French
url = 'https://api.epicsevendb.com/hero?lang=fr'
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(url, '../assets/js/fr.characters.js')

with open('../assets/js/fr.characters.js', encoding='utf-8') as f:
  data = json.load(f)

results=data["results"]

characters = []
for item in results:
    my_dict={}
    my_dict['_id']=item.get('_id')
    my_dict['name']=item.get('name')
    my_dict['rarity']=item.get('rarity')
    my_dict['role']=item.get('role')
    my_dict['attribute']=item.get('attribute')
    my_dict['zodiac']=item.get('zodiac')
    if my_dict['rarity'] > 1:
        characters.append(my_dict)
      
back_json=json.dumps(characters, indent = 4, ensure_ascii=False)

back_json=rjsmin.jsmin("export const fr ="+back_json+";")

with open("../assets/js/fr.characters.js", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json) 


url = 'https://api.epicsevendb.com/artifact?lang=fr'
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(url, '../assets/js/fr.artifacts.js')

with open('../assets/js/fr.artifacts.js', encoding='utf-8') as f:
  data = json.load(f)

results=data["results"]

artifacts = []
for item in results:
    my_dict={}
    my_dict['_id']=item.get('_id')
    my_dict['name']=item.get('name')
    my_dict['rarity']=item.get('rarity')
    my_dict['role']=item.get('role')
    if my_dict['rarity'] > 2:
        artifacts.append(my_dict)
      
back_json=json.dumps(artifacts, indent = 4, ensure_ascii=False)

back_json=rjsmin.jsmin("export const fr ="+back_json+";")

with open("../assets/js/fr.artifacts.js", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json) 
print('French Finish')


# Chinese Simplified
url = 'https://api.epicsevendb.com/hero?lang=cn'
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(url, '../assets/js/cn.characters.js')

with open('../assets/js/cn.characters.js', encoding='utf-8') as f:
  data = json.load(f)

results=data["results"]

characters = []
for item in results:
    my_dict={}
    my_dict['_id']=item.get('_id')
    my_dict['name']=item.get('name')
    my_dict['rarity']=item.get('rarity')
    my_dict['role']=item.get('role')
    my_dict['attribute']=item.get('attribute')
    my_dict['zodiac']=item.get('zodiac')
    if my_dict['rarity'] > 1:
        characters.append(my_dict)
      
back_json=json.dumps(characters, indent = 4, ensure_ascii=False)

back_json=rjsmin.jsmin("export const cn ="+back_json+";")

with open("../assets/js/cn.characters.js", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json) 


url = 'https://api.epicsevendb.com/artifact?lang=cn'
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(url, '../assets/js/cn.artifacts.js')

with open('../assets/js/cn.artifacts.js', encoding='utf-8') as f:
  data = json.load(f)

results=data["results"]

artifacts = []
for item in results:
    my_dict={}
    my_dict['_id']=item.get('_id')
    my_dict['name']=item.get('name')
    my_dict['rarity']=item.get('rarity')
    my_dict['role']=item.get('role')
    if my_dict['rarity'] > 2:
        artifacts.append(my_dict)
      
back_json=json.dumps(artifacts, indent = 4, ensure_ascii=False)

back_json=rjsmin.jsmin("export const cn ="+back_json+";")

with open("../assets/js/cn.artifacts.js", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json) 
print('Chinese Simplified Finish')

# Chinese Traditional
url = 'https://api.epicsevendb.com/hero?lang=zht'
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(url, '../assets/js/tw.characters.js')

with open('../assets/js/tw.characters.js', encoding='utf-8') as f:
  data = json.load(f)

results=data["results"]

characters = []
for item in results:
    my_dict={}
    my_dict['_id']=item.get('_id')
    my_dict['name']=item.get('name')
    my_dict['rarity']=item.get('rarity')
    my_dict['role']=item.get('role')
    my_dict['attribute']=item.get('attribute')
    my_dict['zodiac']=item.get('zodiac')
    if my_dict['rarity'] > 1:
        characters.append(my_dict)
      
back_json=json.dumps(characters, indent = 4, ensure_ascii=False)

back_json=rjsmin.jsmin("export const tw ="+back_json+";")

with open("../assets/js/tw.characters.js", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json) 


url = 'https://api.epicsevendb.com/artifact?lang=zht'
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
urllib.request.urlretrieve(url, '../assets/js/tw.artifacts.js')

with open('../assets/js/tw.artifacts.js', encoding='utf-8') as f:
  data = json.load(f)

results=data["results"]

artifacts = []
for item in results:
    my_dict={}
    my_dict['_id']=item.get('_id')
    my_dict['name']=item.get('name')
    my_dict['rarity']=item.get('rarity')
    my_dict['role']=item.get('role')
    if my_dict['rarity'] > 2:
        artifacts.append(my_dict)
      
back_json=json.dumps(artifacts, indent = 4, ensure_ascii=False)

back_json=rjsmin.jsmin("export const tw ="+back_json+";")

with open("../assets/js/tw.artifacts.js", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json) 
    

print('Chinese Traditional Finish')