// vô https://jsonplaceholder.typicode.com/ để lấy đại 1 cái api nào đó:
// => https://jsonplaceholder.typicode.com/todos/1

var apiFree = 'https://esp32-iot-ver1.s3.ap-northeast-1.amazonaws.com/x';

// sử dụng fetch:

fetch(apiFree) // fetch sẽ return lại 1 promise gọi là stream (luồng) hay response
// => .then thôi promise mà
    .then((response) => response.json()) // mà  response.json() cũng là 1 promise và nó lại trả về JSON.parse 
    .then((apiData) => { // => khi nhận vào apiData thì nó sẽ là javascript type
        console.log(apiData);
    })
    .catch((err) => { // và nếu ko thể lấy api đc thì báo lỗi
        console.log('error'); 
    })