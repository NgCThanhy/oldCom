/**  Object trong js
 * về cơ bản thì nó giống như Structure trong c hay class trong c++
 * nó hoạt động giống như class và có hình thức nhìn giống kiểu dữ liệu JSON
*/

///////////////////////////////////////////////////////////////

/** cách tạo Object
 * - tạo 1 Object
 * - tạo cặp key - value
 * - các loại key - value
 * - thêm 1 cặp key - value
 * - truy suất value
 * - xóa 1 cặp key - value
 */

var newKey = 'email';

// tạo 1 Object:

var myObject = { // 1 Object đc xác định bằng cặp dấu {}

    /** tạo key - value
     * các key - value cách nhau bằng dấu ','
     * - kiểu tuân theo quy tắc đặt tên biến
     * - kiểu chuỗi (ko cần tuân theo quy tắc đặt tên biến)
     * - kiểu biến từ bên ngoài
     * - kiểu function (tương tự như phương thức bên c++)
     */
    name: 'Nguyễn Chí Thành', // kiểu thông thường
    age: 22, // kiểu thông thường

    'giới tính': 'Nam', // kiểu tên key là chuỗi

    [newKey]: '1chithanh2001@gmail.com', // với tên của key đc chứa trong biến newKey phải là chuỗi

    GetName: function() { // kiểu function
        return this.name // this sẽ tương đương với myObject <=> myObject.name  
    }
};


/** thêm cặp key - value cho Object
 * thêm 1 cặp vào 1 Object đã có trước
 * - thêm key kiểu thường
 * - thêm key kiểu chuỗi
*/
myObject.live = 'Tp Hồ Chí Minh'; // kiểu thường
myObject['home-town'] = 'Tây Ninh'; // kiểu chuỗi


/** truy suất value
 * thông qua key để truy cập vào value của nó
 * - truy suất value của key kiểu thường
 * - truy suất value của key kiểu chuỗi
 * - truy suất value của key kiểu biến
 * - truy suất value của key kiểu function
*/
console.log(myObject.age); // kiểu thường
console.log(myObject["giới tính"]); // kiểu chuỗi
console.log(myObject[newKey]); // kiểu biến
console.log(myObject.GetName()); // kiểu function


/** xóa 1 cặp key - value
 * sử dụng delete lên truy suất key
*/

delete myObject['home-town']
console.log(myObject);




///////////////////////////////////////////////////////////////

/** sử dụng Object constructor
 * tương tự như phương thức constructor bên c++
 * sử dụng toán tử new để tạo Object
 */

function People(name, age, place) {
    this.name = name;
    this.age = age;
    this.place = place;

    // ngoài ra có thể tạo funtion lun
    this.GetInfor = function() {
        return `${this.name} ${this.age} ${this.place} `;
    }
}

// sau khi tạo bản vẽ thì có thể dựa vào đó tạo các đối tượng 

var yami = new People('Yami', 18, 'Japan');
console.log(yami.GetInfor());

console.log(yami.constructor); // cái này là để xem lại bản thiết kế của đối tượng yami



// sau đó có thể thêm các key hay gì đó bình thường

///////////////////////////////////////////////////////////////

/**  Javascript còn là ngôn ngữ OOP (hướng đối tượng)
 * nhưng ban đầu thì nó ko có cơ chế class(lớp)
 * => sử dụng nguyên mẫu (prototype) --> nó có nghĩa rằng thuộc tính và phương thức của object
 *    có thể được chia sẻ thông qua các đối tượng tổng quát (generalized objects) có khả năng mở rộng.
 * nhưng nói chung là prototype dùng để thêm các thuộc tính - phương thức vào bản thiết kế constructor
 * */

People.prototype.lover = 'none';
People.prototype['he he'] = 'sss'
People.prototype.Getfortune = function() {
    return  'badluck'
}

console.log(yami["he he"]);
console.log(yami.Getfortune());
