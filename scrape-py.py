from urllib.request import urlopen, Request
import re

inputUrl = input("What website do you want to search: ")
req = Request(
        url=str(inputUrl),
        headers={'User-Agent': 'Mozilla/5.0'}
)
page = urlopen(req).read()
print(page)
word = input("What word do you want to search for?: ")

page = page.decode('ISO-8859-1')
#print(re.findall("python", page))
totalExactFound = 0
totalFound = 0

for x in re.findall(str(word), page):
    totalExactFound = totalExactFound + 1

totalFound = totalExactFound
for x in re.findall(str(word).lower(), page):
    totalFound = totalFound + 1

print("In exact total there are " + str(totalExactFound) + " occurences of " + str(word) + "!")

if(str(word).lower() == str(word)):
    print("In exact total there are " + str(totalExactFound) + " occurences of " + str(word) + "!")
else:
    print("In total (ignoring case sensitivity), there are " + str(totalFound) + " occurences of " + str(word.lower()) + "!")



#print(page.find(str(word)))
#print("Done")