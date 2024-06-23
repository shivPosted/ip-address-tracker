'use-strict';

const inputIP = document.querySelector('.search--input');
const searchBtn = document.querySelector('.search--btn');
const infoDetails = document.querySelectorAll('.info--details');

const diplayIPDetails = function (data) {
  infoDetails.forEach(node => {
    const dataAtt = node.dataset.whatInfo;
    if (dataAtt === 'location') {
      node.textContent = `${data.location.country}, ${data.location.city}`;
      return;
    }
    if (dataAtt === 'timezone') {
      console.log(data.location.timezone);
      node.textContent = `UTC ${data.location.timezone}`;
      console.log(node.textContent);
      return;
    }

    node.textContent = data[dataAtt];
  });
};

const getIP = async function (ip, domain) {
  try {
    console.log('fetching data');
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_kf4MKhnorE17rQrJPsKuUxzAeUOAv&ipAddress=${ip}&domain=${domain}`
    );
    if (!res.ok)
      throw new Error('Server not reachable or incorrect API endpoint');
    const data = await res.json();
    console.log(data);

    diplayIPDetails(data);
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

// getIP();

searchBtn.addEventListener('click', function (e) {
  isFinite(parseInt(inputIP.value.trim()))
    ? getIP(inputIP.value, '')
    : getIP('', inputIP.value);
});
