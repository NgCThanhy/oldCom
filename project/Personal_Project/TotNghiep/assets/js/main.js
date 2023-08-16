var apiAWS = '';

var classhtml = document.querySelector('.js-value')
var temp = document.querySelector('.js-temperature-1')
var humi = document.querySelector('.js-humidity-1')



var t; 
var h;
// sử dụng fetch:




setInterval(() => {
    fetch('https://esp32-iot-ver1.s3.ap-northeast-1.amazonaws.com/iot') // fetch sẽ return lại 1 promise gọi là stream (luồng) hay response
// => .then thôi promise mà
    .then((response) => response.json()) // mà  response.json() cũng là 1 promise và nó lại trả về JSON.parse 
    .then((apiData) => { // => khi nhận vào apiData thì nó sẽ là javascript type
        t = apiData.temp;
        h = apiData.humi;

        console.log(apiData);

        temp.innerText = `nhiệc độ: ${t} °C`
        humi.innerText = `độ ẩm: ${h} %`
        
    })
    .catch((err) => { // và nếu ko thể lấy api đc thì báo lỗi
        alert('error');
    })
}, 1000)




