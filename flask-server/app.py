#water optimization for irrigation
from weatherData import weatherData
from flask import Flask, request

''' while True:
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
        break '''

res = 0

app = Flask(__name__)

@app.route("/result")
def result():
    try:
        w = weatherData(request.args.get('latitude'), request.args.get('longitude'))
    except:
        return {
            "result": "An error occurred. Ensure that your parameters are valid."
        }
    #calculations here

    return{
        "result": res,
        "cats": ["tabby", "leopard"]
        }


if __name__ == "__main__":
    app.run(debug=True)
