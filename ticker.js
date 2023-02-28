const stockTicker = document.getElementById("stock-ticker");
const cryptoTicker = document.getElementById("crypto-ticker");

function updateTicker() {
  // Fetch stock data using yfinance
  const symbols = ['TROW', 'MKC', 'UA', 'ENOV', 'LAUR'];
  const dataPromise = yf.download(symbols, {module: 'quote', interval: '1d', period: '1d'})
  
  // Update stock ticker with new data
  dataPromise.then(data => {
    const prices = data['quote']['regularMarketPrice'];
    const stockData = Object.entries(prices).map(([symbol, price]) => `${symbol}: ${price}`).join(' | ');
    stockTicker.innerText = stockData;
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
