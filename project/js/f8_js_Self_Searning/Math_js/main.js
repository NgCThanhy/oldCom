// Object Math cũng như như viện dùng để tính toán


console.log(Math.PI);

console.log(Math.round(0.49)); // làm tròn số chuẩn 5:  5< --> 0
console.log(Math.round(0.5)); // làm tròn số chuẩn 5:   =5 --> 1
console.log(Math.round(0.51)); // làm tròn số chuẩn 5:  >5 --> 1

console.log(Math.ceil(0.9)); // làm tròn lên (có thập phân là lên) --> 1
console.log(Math.ceil(1.0)); // làm tròn lên (ko có thập phân) --> 1
console.log(Math.ceil(1.1)); // làm tròn lên (có thập phân là lên) --> 2 

console.log(Math.floor(0.9)); // làm tròn xuống (bỏ qua phần thập phân) --> 0
console.log(Math.floor(1.0)); // làm tròn xuống (bỏ qua phần thập phân) --> 1
console.log(Math.floor(1.1)); // làm tròn xuống (bỏ qua phần thập phân) --> 1

console.log(Math.abs(-4)); // lấy giá trị tuyệt đối --> 4

console.log(Math.min(-2, -1, 0, 1, 2)); // tìm số nhỏ nhất --> -2
console.log(Math.max(-2, -1, 0, 1, 2)); // tìm số lớn nhất --> 2

console.log(Math.random()); // trả về một số ngẫu nhiên nhỏ hơn 1


// ứng dụng hàm random để gacha:

var char = ['*','**','***','****','*****'];
var fortune = Math.floor( Math.random() * 100 ); // => sẽ ngẫu nhiên ra số từ 0 - 99

function Gacha(fortune, char) {

    if(fortune < 5) // 5% đc 5*
        return char[4];
    else if(fortune < 15) // 10% đc 4*
        return char[3];
    else if(fortune < 30) // 15% đc 3*
        return char[2];
    else if(fortune < 60) // 30% đc 2*
        return char[1];
    else  // 40% đc 1*
        return char[0];
}
alert(Gacha(fortune, char));