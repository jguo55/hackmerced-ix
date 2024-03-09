#water optimization for irrigation
from weatherData import weatherData
from flask import Flask


#water optimization for irrigation
from weatherData import weatherData

while True:
    try:
        latitude = float(input("Enter your latitude: \n"))
    except ValueError:
        print("An error occured, please try again.")
        continue
    else:
        break

while True:
    try:
        longitude = float(input("Enter your latitude: \n"))
    except ValueError:
        print("An error occured, please try again.")
        continue
    else:
        break


while True:
    try:
        w = weatherData(latitude,longitude)
    except:
        print("An error occured, please try again.")
        continue
    else:
        break

print (w.getMinTemp())
print(w.getMaxTemp())


res = 0

app = Flask(__name__)

@app.route("/result")
def result():
    return{
        "result": res,
        "cats": ["tabby", "leopard"]
        }

if __name__ == "__main__":
    app.run(debug=True)
