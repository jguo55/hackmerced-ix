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
        self.link = f"https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast/hourly"
        r2 = requests.get(self.link, headers = headers).json()
        periods = r2["properties"]["periods"]
        temps = []
        humidities = []
        windSpeeds = []
        for i in range(24):
            humidities.append(periods[i]["relativeHumidity"]["value"])
            temps.append(periods[i]["temperature"])
            windSpeeds.append(int(periods[i]["windSpeed"].split()[0]))
        self.windSpeed = sum(windSpeeds)/len(windSpeeds)
        self.humidity = sum(humidities)/len(humidities)
        self.minTemp = 100
        self.maxTemp = -100
        for i in temps:
            if i < self.minTemp:
                self.minTemp = i
            elif i > self.maxTemp:
                self.maxTemp = i
        self.city = r["properties"]["relativeLocation"]["properties"]["city"]

            

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
    
    def getCity(self):
        return self.city
    
    def getLink(self):
        return self.link

    def getWindSpeed(self):
        return self.windSpeed


