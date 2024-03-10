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
        return {"code": 400}
    #calculations here

    return{
        "code": 200,
        "latitude": w.getLatitude(),
        "longitude": w.getLongitude(),
        "humidity": w.getHumidity()
        }


if __name__ == "__main__":
    app.run(debug=True)
