//mảng trong js thì cũng giống với mảng trong java

// khởi tạo mảng:
var languages = [ // thay vì dấu {} của Object thì array sài dấu []
    'Javacript',
    'PHP',
    'Ruby',
    'Dart'
];

/**
 * mảng là một phiên bản đặt biệt của kiểu dữ liệu Object:
 * khi xuất ra bằng console.log(languages)
 * thì ta sẽ thấy cấu trúc tương tự với Object với các key đc đánh chỉ số tự động 
 * ngoài ra thì ko có khác biệt gì so với Object, thậm chí là các loại phần tử trong array ko cần phải cùng loại
 * 
*/
console.log(languages);
// do 2 kiểu Object và Array đề thuộc Object type
// => typeof của 2 tụi nó đều trả về chuỗi 'object' (ko phân biệt đc)
console.log(typeof {}); // trả về object 
console.log(typeof []); // trả về object 

console.log(Array.isArray(languages)); // trả về true hoặc false => phân biệt ok 

//truy suất:
console.log(languages.length); // độ dài mảng
console.log(languages[3]); // truy suất đến phần tử có chỉ mục = 3


// ngoài ra còn có:
var MyString = 'Nguyễn Chí Thành';


MyString.split(' '); // đổi chuỗi thành array

languages.join(' '); // đổi tương tự như split() từ array thành chuỗi

languages.toString(); // cũng đổi từ array sang chuỗi nhung cách nhau bằng dấu ',' tương tự với .join(',')

console.log(languages.pop()); // xóa phần tử ở cuối và trả về phần tử đã xóa và tất nhiên mảng cũ sẽ giảm

console.log([].pop()); // nếu mảng rỗng thì trả về undefined

console.log(languages.shift()); // xóa phần tử ở đầu và trả về phần tử đã xóa

console.log(languages.push('python', 'java')); //thêm phần tử vào cuối mảng sau đó xuất ra kích thước mảng mới  

console.log(languages.unshift('Javacript')); // thêm phần tử vào đầu mảng sau đó xuất ra kích thước mảng mới
// và tổng họp của các cái trên:

// đặt con trỏ tại chỉ mục '1' sau đó xóa bỏ '2' phần tử tính từ con trỏ cuối cùng chèn vào chuỗi 'hahaha' tại vị trí con trỏ
console.log(languages.splice(1,2,'hahaha')); // nếu ko thích cái nào thì để trống

console.log(languages.concat(['hihi','hehe'])); // nối mảng vào cuối mảng languages

console.log(languages.slice(1,3)); // cắt từ index 1 đến 3. nếu mún cắt đến hết thì bỏ chỉ số cuối. nếu mún copy thì để 0

console.log(languages.includes('java',0)) // tìm từ chỉ mục số '0' xem coi có phần tử 'java' ko

 ///////////////////////////////////////////////////////////////////

 // ngoài ra còn có một số phương thức của mảng cần phải truyền function vào:
 // thường sẽ dùng khi đó là một mảng các Object

 /**
  * - forEach()
  * - every()
  * - some()
  * - find()
  * - filter()
  * - map()
  * - reduce()
  */

 var myArrays = [
    {
        name: 'một',
        age: 1
    },

    {
        name: 'hai',
        age: 2
    },

    {
        name: 'ba',
        age: 3
    },

    {
        name: 'bốn',
        age: 3
    }
]


// forEach(): dùng để duyệt qua từ đầu đến hết từng phần tử của mảng:
// truyền vào forEach 1 function với 2 tham số lần lượt là 'từng phần tử của mảng' và 'từng index của mảng' 
myArrays.forEach(function(PhanTu, index) {
    console.log(index);
    console.log(PhanTu);
});


// every(): thường dùng để kiểm tra tất cả các phần tử trong mảng phải thỏa một điều kiện gì đó.
// => nó sẽ duyệt từ trên xuống nếu có 1 cái ko thỏa thì sẽ ngừng và trả về false ko thì true
var All3 = myArrays.every(function(PhanTu, index) {
    return PhanTu.age === 3; // kiểm xem tất cả phần age có phải bằng 3 hay ko
}); // bắt buộc có return nhá

console.log(All3);


// some(): thường dùng để kiểm tra 1 trong các phần tử trong mảng có thỏa một điều kiện gì đó.
// => nó sẽ duyệt từ trên xuống nếu có 1 cái thỏa thì sẽ ngừng và trả về true ko thì false
// nói chung là ngược lại vs every
var Is3 = myArrays.some(function(PhanTu, index) {
    return PhanTu.age === 3; // kiểm xem có phần age nào bằng 3 hay ko
}); // bắt buộc có return nhá

console.log(Is3);


// find(): thường dùng để trả về phần tử trong mảng có thỏa một điều kiện gì đó.
// => nó sẽ duyệt từ trên xuống nếu có 1 cái thỏa ĐẦU TIÊN thì sẽ ngừng và trả về cái phần tử đó ko thì undefined
// nói chung là giống some nhưng trả về phần tử
var Find3 = myArrays.find(function(PhanTu, index) {
    return PhanTu.age === 3; // kiểm xem có phần age nào bằng 3 hay ko
}); // bắt buộc có return nhá

console.log(Find3);


// filter(): thường dùng để trả về một list phần tử trong mảng có thỏa một điều kiện gì đó.
// => nó sẽ duyệt từ trên xuống nếu có cái thỏa thì sẽ trả về cái phần tử đó sau đó lại duyệt tiếp ko thì undefined
// nói chung là giống find nhưng trả về nhiều phần tử
var Filter3 = myArrays.filter(function(PhanTu, index) {
    return PhanTu.age === 3; // kiểm xem có phần age nào bằng 3 hay ko
}); // bắt buộc có return nhá

console.log(Filter3);




// map(): thường dùng để trả về mảng mới dựa trên chỉnh sửa mảng cũ 
// => nó sẽ duyệt từ trên xuống cứ có phần tử là nó sẽ tạo 1 phần tử trong mảng mới.
// nếu trong function ko có gì thì sẽ trả về undefined
var mapNew = myArrays.map(function(PhanTu, index) {
    return {
        name: `tên là: ${PhanTu.name}`,
        age: PhanTu.age,
        index: index,
        originArray: PhanTu
    }
    
}); 
console.log(mapNew);




/**   reduce(): dùng để tính toán và lấy tổng một cái gì đó trong mảng
 * 
 * đặt ra bài toán:
 * tính tổng age trong array
 * 
 * => có 4 cách làm:
 *      - vòng for thường
 *      - vòng for/of
 *      - reduce()
 *      - reduce() + lambda
 * */ 


// sài for:
var y = 0 // biến lưu trữ kết quả 
for(var i = 0; i < myArrays.length; i++){ // vòng lặp
    y += myArrays[i].age
}
console.log(y)



// sài for/of:
var x = 0 // biến lưu trữ kết quả 
for(var i of myArrays){ // vòng lặp
    x += i.age; // tiến hành lưu trữ
}
console.log(x)



/**  sài reduce():
 *  bao gồm 2 đối số là :
 *      - function: là một hàm đc gọi mỗi lần lặp đến 1 phần tử mới trong mảng
 *          + accumulator: là biến lưu trữ (đc gán initial Value tại lúc đầu ) (là x á)
 *          + currentValue: giá trị hiện tại của phần tử đc lặp đến (currentValue.age là age của phần tử hiện tại trong vòng lặp)
 *          + currentIndex: chỉ mục của currentValue
 *          + originArray: là mảng ban đầu (là myArrays Á)
 *          => thường dùng 2 cái đầu 
 * 
 *      - initial Value: là giá trị biến lưu trữ ban đầu (là '0' trong x = 0 á)
 *          đây là thứ để định hình giá trị trả về (muốn lấy số thì khởi đầu là số....)
 *          => nếu ko có thì trong vòng lặp đầu tiên hệ thống sẽ lấy PHẦN TỬ đầu tiên làm initial Value
 *             và currentValue sẽ đc dịch xuống phần tử kế   
 * 
 * */

var reduceSumAge = myArrays.reduce(
    function(accumulator, currentValue) {
        return accumulator + currentValue.age; // nó return cái gì thì ở lượt chạy kế: accumulator lưu trữ cái đó
    },

    0
);
/** thông thường thì:
var reduceSumAge = myArrays.reduce(
    function(a, b) { return a + b.age;}, 0
);
 */
console.log(reduceSumAge)



/** sài reduce() + lambda:
 * là rút gọn function: 
 */

var reduceLdSumAge = myArrays.reduce( (a, b) => a + b.age, 0 );
console.log(reduceLdSumAge)


/////////////////////////////////////////////////////////////////////////////////////////
// vd sử dụng reduce:

// làm phẳng mảng: cho 1 'mảng sâu' (trong mảng có mảng) => yêu cầu đưa về 1 mảng (flatArray)

var deepArray = [1, 2, [3, 4], 5, 6, [7, 8, 9]];

var flatArray = deepArray.reduce(
    function(flat, item) {
        return flat.concat(item); // xem mỗi item là 1 mảng con để nối vào
    },
    [] // muốn trả về mảng nên cần khởi tạo mảng
);
console.log(flatArray)


// chuyển đổi array thành object:
var arr = [
    ['name', 'yami'],
    ['age', 18],
];

function arrToObj(arr) {
    return  arr.reduce(function(store,next) {
         store[next[0]] = next[1]; return store
     }, {});
 }
 
 // Expected results:
 console.log(arrToObj(arr)); // { name: 'Sơn Đặng', age: 18 }
 






