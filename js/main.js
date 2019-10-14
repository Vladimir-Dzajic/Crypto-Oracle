function displayCryptoAssets(respObj) {
	var cryptoArr = respObj.data;
	var len = cryptoArr.length;
	var tableContent = document.querySelector('table > tbody');

	for (var i = 0; i < len; i++) {

		var entry = document.createElement('tr')
	
		// ========= Rank ===========
		var rank = document.createElement("td");
		rank.className = 'center';
		rank.innerHTML = cryptoArr[i].rank;

		// ========= Coin Details ===========
		var coinImg = document.createElement("img");
		coinImg.src = 'images/icon/' + cryptoArr[i].symbol + '.png';

		var symbol = document.createElement('p');
		symbol.style = 'font-size:11px; opacity: 0.7'
		symbol.innerText = cryptoArr[i].symbol;

		var nameContainer = document.createElement('div');
		nameContainer.style = 'display:inline-block; vertical-align:middle'
		nameContainer.innerText =  cryptoArr[i].name;
		nameContainer.appendChild(symbol);

		var coinDetails = document.createElement("td")
		coinDetails.className = 'left';
		coinDetails.appendChild(coinImg)
		coinDetails.appendChild(nameContainer)
		
		// ========= Price ===========
		var price = document.createElement("td")
		price.innerHTML = '$' + Number.parseFloat(cryptoArr[i].priceUsd).toFixed(2);
		
		// ========= Market Cap ===========
		var marketCap = document.createElement("td")
		marketCap.innerHTML = ('$' + Number.parseFloat(cryptoArr[i].marketCapUsd / 1000000000).toFixed(2) + 'b');
		
		// ========= Supply ===========
		var supply = document.createElement("td")
		supply.innerHTML = ('$' + Number.parseFloat(cryptoArr[i].supply / 1000000).toFixed(2)  + 'm');

		// ========= Change percentage ===========
		var change = document.createElement("td")
		change.innerHTML = Number.parseFloat(cryptoArr[i].changePercent24Hr).toFixed(2) + '%';

		if (cryptoArr[i].changePercent24Hr.startsWith('-')) {
			change.className = 'red-text';
		} else {
			change.className = 'green-text';
		}
		
		// create entry
		entry.appendChild(rank);
		entry.appendChild(coinDetails);
		entry.appendChild(price);
		entry.appendChild(marketCap);
		entry.appendChild(supply);
		entry.appendChild(change);
		
		tableContent.appendChild(entry)
	}
}

function clearTable() {
	document.querySelector('table > tbody').innerHTML = "";
}

function loadCryptoAssets() {
	function reqListener() {
		var response = JSON.parse(this.responseText);
		clearTable();
		displayCryptoAssets(response);
	}
		
	function reqError(err) {
		console.log('Fetch Error : ', err);
	}
	
	// Load data
	var oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.onerror = reqError;
	oReq.open('get', 'https://api.coincap.io/v2/assets', true);
	oReq.send();
}

function init() {
	loadCryptoAssets();

	// refresh every 5 seconds
	setInterval(loadCryptoAssets, 5000);
}

window.addEventListener('load', init);