/** Trong Javascript có 2 loại số:
 * - Các số thông thường trong Javascript được lưu trữ dưới dạng 64 bit IEEE-754 (còn được gọi là các số phẩy động). 
 * Trong hầu hết các trường hợp khi làm việc với Javascript là chúng ta sử dụng loại số này.
 * 
 * - Số BigInt là loại số sử dụng để biểu thị số nguyên có độ dài tùy ý.
 * Vì mức độ thông dụng nên ở đây chúng ta chỉ tìm hiểu về loại số thông thường.
 */


 /** Cách khai báo
 * Cách thông thường khi ta khai báo một số. 
 */
 var million = 1000000; // 1000000 (một triệu)

//  Cũng là khai báo số 1000000 nhưng có cách viết khác.
//  Bạn có thể thêm chữ e vào sau số 1 và chỉ định số số không phía sau chữ e như sau:
 var tenMillion = 1e7; // tương tự: 10000000
 var billion = 2e9; // tương tự: 2000000000 (hai tỏi à nhầm hai tỉ)


//  Đối tượng "Number" trong Javascript là đối tượng giúp chúng ta định nghĩa số và làm việc với số.
// Chúng ta thường sử dụng các phương thức sau của đối tượng Number khi làm việc với số trong Javascript

 Number.isFinite() //	Xác định xem giá trị đã cho có phải là số hữu hạn hay không. Trả về boolean
 Number.isInteger() //	Xác định xem giá trị đã cho có phải là số nguyên hay không. Trả về boolean
 Number.parseFloat() //	Chuyển đổi chuỗi đã cho thành một số dấu phẩy động
 Number.parseInt() //	Chuyển đổi chuỗi đã cho thành một số nguyên
 Number.prototype.toFixed() //	Làm tròn và trả về chuỗi đại diện cho số đã cho
 Number.prototype.toString() //	Chuyển đổi và trả về số đã cho dưới dạng chuỗi

 //  Ví dụ: 
 Number.isFinite(20 / 5); // true
 Number.isFinite(million); // true
 Number.isFinite(2 / 0); // false
 Number.isFinite(0 / 0); // false
 
 Number.isInteger(999999999); // true
 Number.isInteger(0.2);       // false
 Number.isInteger(Math.PI);   // false
 
 Number.parseFloat('10') // 10
 Number.parseFloat('10.00') // 10
 Number.parseFloat('238,21') // 238
 Number.parseFloat('237.22') // 237.22
 Number.parseFloat('34 56 78') // 34
 Number.parseFloat(' 37 ') // 37
 Number.parseFloat('18 is my age') // 18
 
 Number.parseInt('10') // 10
 Number.parseInt('10.00') // 10
 Number.parseInt('238,21') // 238
 Number.parseInt('237.22') // 237
 Number.parseInt('34 56 78') // 34
 Number.parseInt(' 37 ') // 37
 Number.parseInt('18 is my age') // 18
 

 //chỉ có mớ sau này mới ko thông qua Number
 var numberObject = 1234.56789;
 
 numberObject.toFixed(); // '1235'
 numberObject.toFixed(1); // '1234.6'
 numberObject.toFixed(6); // '1234.567890'
 
 (11).toString();    // '11'
 (18).toString();     // '18'
 (17.3).toString();   // '17.3'