# pull weather data
# 1. user inputs longitude, latitude (can use general area ex. merced = x,y)
# 2. api call https://api.weather.gov/points/{latitude},{longitude}
# 3. get .properties.gridId, gridX, gridY
# 4. api call https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast
# 5. parse and return values

import requests

class weatherData:
    def __init__(self, latitude, longitude):
        self.longitude = longitude
        self.latitude = latitude
        headers = {'User-Agent': 'irrigationOptimizer'}
        r = requests.get(f"https://api.weather.gov/points/{latitude},{longitude}", headers = headers).json()
        office = r["properties"]["gridId"]
        gridX = r["properties"]["gridX"]
        gridY = r["properties"]["gridY"]
        r2 = requests.get(f"https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast/hourly", headers = headers).json()
        periods = r2["properties"]["periods"]
        temps = []
        humidities = []
        for i in range(24):
            humidities.append(periods[i]["relativeHumidity"]["value"])
            temps.append(periods[i]["temperature"])
        total = 0
        for x in humidities:
            total += x
        self.humidity = total/len(humidities) #avg humidity
        self.minTemp = 100
        self.maxTemp = -100
        for i in temps:
            if i < self.minTemp:
                self.minTemp = i
            elif i > self.maxTemp:
                self.maxTemp = i

            

    def getLatitude(self):
        return self.latitude

    def getLongitude(self):
        return self.longitude
    
    def getHumidity(self):
        return self.humidity
    
    def getMaxTemp(self):
        return self.maxTemp
    
    def getMinTemp(self):
        return self.minTemp



