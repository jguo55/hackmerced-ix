#water optimization for irrigation
from weatherData import weatherData
from flask import Flask, request
res = 0

app = Flask(__name__)

@app.route("/result")
def result():
    try:
        w = weatherData(request.args.get('latitude'), request.args.get('longitude'))
    except:
        return 400
    #calculations here

    return{
        "result": res,
        "cats": ["tabby", "leopard"],
        "latitude": w.getLatitude(),
        "longitude": w.getLongitude()
        }


if __name__ == "__main__":
    app.run(debug=True)
