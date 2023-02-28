import yfinance as yf
import json

symbols = ['TROW', 'MKC', 'UA', 'ENOV', 'LAUR']
data = yf.download(symbols, start="2023-02-25", end="2023-02-25")
prices = data['Close'].iloc[-1]
stock_data = " | ".join([f"{symbol}: {price:.2f}" for symbol, price in prices.items()])

response = requests.get("https://api.simpleswap.io/v1/ticker")
data = json.loads(response.text)
cryptos = ["BTC", "ETH", "LTC", "XMR", "DOGE"]
crypto_data = " | ".join([f"{crypto}: {data[crypto.upper()]['rate']:.2f}" for crypto in cryptos])

print(f"{stock_data}|{crypto_data}")
