// dùng vòng for:

/**
 * for: lặp qua với điều kiện đúng
 * for/in: lặp qua key của object
 * for/of: lặp qua value của Array
 * 
 * while: lặp liên tục khi điều kiện còn đúng
 * do/while: lặp 1 lần -> check điều kiện cem có lặp tiếp ko
 * 
 */

// for
for(var i = 0; i < 10; i++)
    console.log(i);


// for/in:
var MyObject = {
    name: 'thành',
    age: 22,
    sex: 'male'
}

for(var i in MyObject){ // số vòng lặp = độ lớn của MyObject
    console.log(`${i} --> ${MyObject[i]}`);
}
// ngoài ra còn duyệt qua đc chuỗi lun á ( chuỗi cũng là mảng mà)


// for/of thật ra mún lặp của object cũng đc nhưng rườm rà vl sài for in cho lẹ
 var MyArray = [
    'a',
    'b',
    'c'
 ]

 for( var i of MyArray){ // in ra chuỗi cũng ok lun
    console.log(i);
 }


 // while
 var i = 0
 while(i < 10){
    console.log(i);
    i++; // nhớ điều kiên lặp nhá
 }


 // do while:
var j = 10
 do{
    console.log(j);
    j--; // nhớ điều kiên lặp nhá
 }while(j > -1)