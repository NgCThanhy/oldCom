//  đối tượng date được dùng để tương tác với ngày và giờ

var date = new Date(); //=> biến date đã là 1 đối tượng

console.log(date); // => trả về thứ, tháng, ngày, năm, giờ, phút, giây, múi giờ

// ngoài ra còn một số phương thức:

console.log(date.getFullYear()); // năm
console.log(date.getMonth() + 1); // tháng nhưng nó chỉ có từ 0 -> 11 => +1 vào
console.log(date.getDate());

console.log(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
console.log(`${date.getTime()}`);