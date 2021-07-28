const fetchUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@";
let apiVersion = "1",
  date = "2021-07-26",
  endpoint = "currencies.json";
let url = `${fetchUrl}${apiVersion}/${date}/${endpoint}`;

async function getJSON(url) {
  let resp = await fetch(url);
  let data = await resp.json();

  let from = document.getElementById("fromcurrency");
  appendOP(from);

  let to = document.getElementById("tocurrency");
  appendOP(to);

  function appendOP(x) {
    for (let e in data) {
      let op = document.createElement("option");
      op.setAttribute("value", e);
      op.innerHTML = `${e.toUpperCase()}: ${data[e]}`;
      x.append(op);
    }
  }
}
getJSON(url);

async function convert() {
  let amount = document.querySelector("input").value;
  if (amount == "") {
    alert("Please enter the amount");
  } else {
    try {
      let from = document.getElementById("fromcurrency").value;
      let to = document.getElementById("tocurrency").value;

      let response = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`
      );
      let exchangeData = await response.json();
      let exchangeValue = exchangeData[to];
      let updatedExchangeValue = amount * exchangeValue;

      let convertedValue = document.createElement("div");
      convertedValue.innerHTML = `${amount}
    ${from.toUpperCase()} = ${updatedExchangeValue.toFixed(2)} 
    ${to.toUpperCase()}`;

      let conv = document.getElementById("convertor");
      conv.innerHTML = "";
      conv.append(convertedValue);
      document.querySelector("form").reset();
    } catch (error) {
      console.log(error);
    }
  }
}
