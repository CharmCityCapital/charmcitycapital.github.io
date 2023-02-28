const stockTicker = document.getElementById("stock-ticker");
const cryptoTicker = document.getElementById("crypto-ticker");

function updateTicker() {
  // Fetch stock data from Yahoo Finance API
  fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=TROW,MKC,UA,ENOV,LAUR")
    .then(response => response.json())
    .then(data => {
      // Update stock ticker with new data
      const stocks = data.quoteResponse.result;
      stockTicker.innerText = stocks.map(stock => `${stock.symbol}: ${stock.regularMarketPrice}`).join(" | ");
    })
    .catch(error => {
      console.error(error);
    });

  // Fetch crypto data from SimpleSwap API
  fetch("https://api.simpleswap.io/v1/ticker")
    .then(response => response.json())
    .then(data => {
      // Update crypto ticker with new data
      const cryptos = ["BTC", "ETH", "LTC", "XMR", "DOGE"];
      const cryptoData = cryptos.map(crypto => `${crypto}: ${data[crypto.toUpperCase()].rate}`).join(" | ");
      cryptoTicker.innerText = cryptoData;
    })
    .catch(error => {
      console.error(error);
    });
}

// Update ticker every 5 seconds
setInterval(updateTicker, 5000);
