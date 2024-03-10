#water optimization for irrigation
from weatherData import weatherData
from flask import Flask, request
import math

app = Flask(__name__)

@app.route("/result")
def result():
    file = open("crops.txt", "r")
    crops = {}
    cropName = ""

    while True:
        currentLine = file.readline()
        if not currentLine:
            break
        for i in range(len(currentLine)):
            if(currentLine[i] != " "):
                cropName = cropName + (currentLine[i])
            else:
                values = []
                value = ""
                for j in range(i + 1,len(currentLine)):
                    if(currentLine[j] != " "):
                        value = value + currentLine[j]
                    else:
                        values.append(float(value))
                        value = ""
                else:
                    values.append(float(value))
                    break
        crops[(cropName).lower()] = values
        cropName = ""
    file.close()

    area = request.args.get('area')
    evaRate = request.args.get('evaRate')
    crop = request.args.get('crop').lower()
    cropStage = request.args.get('stage').lower()
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    spacing = request.args.get('spacing')

    try:
        w = weatherData(latitude, longitude)
    except:
        return {"code": 400}
    #calculations here

    if(w.getMinTemp()>0):
        temp = (w.getMinTemp() - 32) / 1.8 + 273.15
    else:
        temp = 256
    vaporPressure = math.exp(20.386 - (5132 / (w.getMinTemp() + 273.15)))
    if evaRate == '':
        evaRate = ((7.4 * vaporPressure * float(area) * 43560 * (0.447 * w.getWindSpeed()) ** 0.78) / ((w.getMinTemp() + 459.67))) / 1.4
    else:
        evaRate = 4047 * float(area) * float(evaRate)
    
    waterUsage = crops[crop][0]
    if(cropStage == "initial"):
        mult = crops[crop][1]
    elif(cropStage == "development"):
        mult = crops[crop][2]
    elif(cropStage == "final"):
        mult = crops[crop][4]
    else:
        mult = crops[crop][3] #middle

    plantUsage = waterUsage * mult * float(area)*43560/float(spacing)**2

    totalWater = plantUsage + evaRate
    return{
        "code": 200,
        "link": w.getLink(),
        "latitude": w.getLatitude(),
        "longitude": w.getLongitude(),
        "humidity": w.getHumidity(),
        "windSpeed": w.getWindSpeed(),
        "water": format(totalWater, ".2f") ,
        "evaRate": evaRate,
        "area": area
        }


if __name__ == "__app__":
    app.run(debug=True)
