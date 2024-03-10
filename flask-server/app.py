#water optimization for irrigation
from weatherData import weatherData
from flask import Flask, request
import math
res = 0

app = Flask(__name__)

@app.route("/result")
def result():
    try:
        w = weatherData(request.args.get('latitude'), request.args.get('longitude'))
    except:
        return {"code": 400}
    #calculations here
    if(w.getMinTemp<0):
        temp = (w.getMinTemp-32)/1.8+273.15
    else:
        temp = 1;
    vaporPressure = math.exp(20.386-5132/(temp+273.15))
    evoRate = 7.4*vaporPressure*request.args.get("area")*43560(0.447*w.getWindSpeed)**0.78/(w.getMinTemp+459.67)/1.4
    
    return{
        "code": 200,
        "latitude": w.getLatitude(),
        "longitude": w.getLongitude(),
        "humidity": w.getHumidity()
        }


if __name__ == "__main__":
    app.run(debug=True)
