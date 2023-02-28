from flask import Flask
import yfinance as yf

app = Flask(__name__)

@app.route("/ticker")
def ticker():
    # Fetch stock data using yfinance
    symbols = ['TROW', 'MKC', 'UA', 'ENOV', 'LAUR']
    data = yf.download(symbols, {module: 'quote', interval: '1d', period: '1d'})
    prices = data['quote']['regularMarketPrice']
    stockData = " | ".join(f"{symbol}: {price}" for symbol, price in prices.items())

    # Fetch crypto data from SimpleSwap API
    response = requests.get("https://api.simpleswap.io/v1/ticker")
    data = response.json()
    cryptos = ["BTC", "ETH", "LTC", "XMR", "DOGE"]
    cryptoData = " | ".join(f"{crypto}: {data[crypto.upper()]['rate']}" for crypto in cryptos)

    return f"{stockData}|{cryptoData}"

if __name__ == "__main__":
    app.run()
