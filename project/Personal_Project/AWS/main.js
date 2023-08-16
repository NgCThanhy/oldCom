var awsApi = 'https://s3.ap-east-1.amazonaws.com/graduation-topic-2.2/iotData';

var temp = document.querySelector('.js-temperature-1');
var humi = document.querySelector('.js-humidity-1');
var Cps = document.querySelector('.js-Cps-1');
var uSv = document.querySelector('.js-uSv-1');
var timeIoT = document.querySelector('.js-time-1');


var t; 
var h;
var tCps;
var tuSv;
var ts;

var dateFormat;


// setInterval(() => {
    fetch(awsApi) 

    .then((response) => response.json()) 
    .then((apiData) => { 
        t = apiData.Temperature;
        h = apiData.Humidity;
        tCps = apiData.Cps;
        tuSv = apiData.uSv;
        ts = apiData.timeStamp;
        console.log(ts);
        dateFormat = new Date(ts+1681869800000);

        temp.innerText = `Nhiệt độ: ${t} °C`;
        humi.innerText = `Độ ẩm: ${h} %`;
        Cps.innerText = `Số đếm trên giây: ${tCps} Cps`;
        uSv.innerText = `Suất liều hấp thụ: ${tuSv} uSv`;

        timeIoT.innerText = `Thời gian: ${dateFormat}`;

    })
    .catch((err) => { 
        console.log('error');
    })
// }, 1000)





