# python module needed: rjsmin,  to install it: pip install rjsmin
# To update data just run: python GenerateDatas.py
import urllib.request, json, rjsmin, os

path = os.path.dirname(os.path.abspath(__file__))
print('Working directory: '+path)
os.chdir(path)
os.makedirs('../assets/js/', exist_ok=True)

langs=[{"url": "en","code": "en", "name": "English"}, {"url": "fr","code": "fr", "name": "French"}, {"url": "cn","code": "cn", "name": "Chinese Simplified"}, {"url": "zht","code": "tw", "name": "Chinese Traditional"}]
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
print('Start generating js files...')

for lang in langs:
    url = 'https://api.epicsevendb.com/hero?lang='+lang.get("url")
    urllib.request.urlretrieve(url, '../assets/js/'+lang.get("code")+'.characters.js')
    with open('../assets/js/'+lang.get("code")+'.characters.js', encoding='utf-8') as f:
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
        if my_dict['rarity'] > 1 and my_dict['_id'] != 'straze':
            characters.append(my_dict)
      
    back_json=json.dumps(characters, indent = 4, ensure_ascii=False)

    back_json=rjsmin.jsmin("export const "+lang.get("code")+" ="+back_json+";")
    
    with open("../assets/js/"+lang.get("code")+".characters.js", "w", encoding='utf-8') as outfile: 
        outfile.write(back_json)

    url = 'https://api.epicsevendb.com/artifact?lang='+lang.get("url")
    urllib.request.urlretrieve(url, '../assets/js/'+lang.get("code")+'.artifacts.js')
    
    with open('../assets/js/'+lang.get("code")+'.artifacts.js', encoding='utf-8') as f:
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
    
    back_json=rjsmin.jsmin("export const "+lang.get("code")+" ="+back_json+";")
    
    with open("../assets/js/"+lang.get("code")+".artifacts.js", "w", encoding='utf-8') as outfile: 
        outfile.write(back_json) 
    print('File saved to:'+os.path.abspath("../assets/js/"+lang.get("code")+".artifacts.js"))
    print(lang.get("name")+' Finish')