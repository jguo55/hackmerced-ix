#water optimization for irrigation
from weatherData import weatherData
from flask import Flask, request
import math

app = Flask(__name__)

@app.route("/result")
def result():
    try:
        w = weatherData(request.args.get('latitude'), request.args.get('longitude'))
    except:
        return {"code": 400}
    #calculations here

    if(w.getMinTemp()>0):
        temp = (w.getMinTemp()-32)/1.8+273.15
    else:
        temp = 256
    vaporPressure = math.exp(20.386-(5132/(w.getMinTemp()+273.15)))
    if request.args.get('evaRate') is None:
        evaRate = ((7.4*vaporPressure*float(request.args.get('area'))*43560*(0.447*w.getWindSpeed())**0.78)/((w.getMinTemp()+459.67)))/1.4
    else:
        evaRate = 4047*float(request.args.get('area'))*float(request.args.get('evaRate'))
    #totalWater = plantUsage + evaRate
    return{
        "code": 200,
        "link": w.getLink(),
        "latitude": w.getLatitude(),
        "longitude": w.getLongitude(),
        "humidity": w.getHumidity(),
        "windSpeed": w.getWindSpeed(),
        #"water": totalWater
        "evaRate": evaRate
        }


if __name__ == "__app__":
    app.run(debug=True)
