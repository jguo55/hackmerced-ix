#water optimization for irrigation
from weatherData import weatherData
from flask import Flask


w = weatherData(37.3645,-120.4254)

print (w.getMinTemp())
print(w.getMaxTemp())
print(w.getCity())

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
