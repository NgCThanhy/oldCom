/**  ClassList 
 * là một thuộc tính trả về 1 đối tượng DOMTokenList chứa các lớp trong Element giống như array
 * đối tượng đó sẽ giúp quản lý các class trong một Element:
 * 
 * - add
 * - contants
 * - remove
 * - toggle
 */

var boxElement = document.querySelector('.box a');

console.log(boxElement.classList);

// add: thêm class vào Element:
boxElement.classList.add('btn', 'black', 'red');  // ta có thể thêm cả những class ko tồn tại (bình thường mà)


// contants: kiểm tra xem 1 class có tồn tại trong element ko (trả về boolean)
console.log(boxElement.classList.contains('red'));


// remove: xóa class đang tồn tại trong element
// js sẽ thực thi theo tuần tự => code chạy đến remove mới xóa

boxElement.classList.remove('red') // nếu ko có thì ko sao (ko có ở nghĩa nào cũng v)
// setTimeout(() => {boxElement.classList.remove('black')}, 3000); //=> sau 3s sẽ xóa 


// toggle(chuyển đổi): là sự kết hợp của add và remove
//  => nếu class có tồn tại thì xóa ko thì thêm vào

setInterval(
    () => {boxElement.classList.toggle('black')}
    , 500
); // ứng dụng để làm chữ nhấp nháy