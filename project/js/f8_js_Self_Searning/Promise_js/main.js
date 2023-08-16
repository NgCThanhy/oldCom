/** Javascript là một ngôn ngữ bất đồng bộ có nền tảng đơn luồng
 *  không như các ngôn ngữ khác (c++, java) sử lý các tác vụ bất đồng bộ bằng đa luồng
 *  js sử lý thứ tự các dòng lệnh:
 *      - các dòng lệnh sẽ đc đọc từ trên xuống
 *      - khi gặp 1 dòng lệnh thì nó sẽ đc cho vào 1 stack để sử lý
 *      - sau khi sử lý xong(có kết quả và dữ liệu) thì xóa khỏi stack đó
 *  tuy nhiên khi gặp 1 lệnh bất đồng bộ (setTimeout chẳng hạn): 
 *      - vẫn như trên
 *      - các dòng lệnh sẽ đc đọc từ trên xuống
 *      - khi gặp 1 dòng lệnh thì nó sẽ đc cho vào 1 stack để sử lý
 *      - tuy nhiên do không biết khi nào lệnh sẽ xong nên nó sẽ đc đưa qua 1 bên thứ 2 (Web API) để sử lý
 *      - xóa lệnh bất đồng bộ khỏi stack và đọc lệnh tiếp theo ...
 *      - sau khi Web API sử lý lệnh bất đồng bộ trong nó thì đưa kết quả sang 1 queue
 *      - xóa lệnh bất đồng bộ khỏi Web API và đợi đc đưa cho lệnh mới
 *      - các kết quả trong queue chỉ đc đưa vào lại stack một khi stack trống (ko còn lệnh nào phải sử lý)
 * 
 * như đã biết thì 1 stack hoạt động theo FIFO còn queue thì FILO
 * => các lệnh bất đồng bộ thường đc trả kết quả sau khi tất cả các lệnh thường đã xong
 * 
 */
//vd:
// setTimeout(() => {console.log("1")},1) // sẽ luôn ra sau dù time set rất bé
// for(let i = 0; i <10000; i++)
// console.log("2");


/** dựa trên việc sử lý như trên thì các lệnh đa luồng thường dùng callback để hoạt động
 * => đưa function của nó vô Web API ok hơn
 * 
 * tuy nhiên việc ứng dụng callback đôi khi lại dẫn chúng ta vào call back hell:
 * là việc lồng quá nhiều hàm vào nhau
 */

/** Promise 
 * để giải quyết vẫn đề hell thì t dùng Promise:
 * 
 * tạo 1 Promise :
 * - tạo 1 Promise bằng new Object constructor của đối tượng Promise 
 * - truyền vào constructor một function Executor(thực thi) // tên gì chả đc nhưng đặt v cho có ý nghĩa
 * - trong function Executor() sẽ đc truyền vào 2 đối số là 2 hàm chứa logic:
 *      + resolve: khi logic thành công
 *      + reject: khi logic o thành công
 *      +** tên gì chả đc miễn là đúng thứ tự
 * - sau khi truyền resolve hoặc reject vào r thì cơ bản đã thành công tạo 1 Promise
 * 
 * => sử dụng Promise (giống try cacth vl)
 * Promise có 3 phương thức chính với đối số là 1 hàm: 
 *     - .then( function() {} ) 
 *          sẽ đc hệ thống gọi đến khi promise đc truyền resolve (là thành công á)
 * 
 *     - .cacth( function() {} )
 *          sẽ đc hệ thống gọi đến khi promise đc truyền reject (là thất bại á)
 * 
 *     - .finally( function() {} )
 *          luôn đc gọi đến sau khi gọi 1 trong 2 hàm phương thức trên
 */

var myPromise = new Promise (

    function Executor(resolve, reject) { // Executor 
        resolve(123);
    }    

);

myPromise
    .then( function(x) {
        console.log(x);
        console.log('successfully');
        return 321; // return về giá trị gì thì sẽ nhận đc ở dưới
    } )
    .then(function(data) {  // tính chất chuỗi cho phép có nhìu .then(catch)
        console.log(data); 
    })
    .catch( function() {
        console.log('failure')
    } )
    .finally( function() {
        console.log('done');
    } )

// vd 1 bài toán callback hell
// 1s in ra 1 số ko sài setInterval

setTimeout(
    () => {
        console.log(1)
        setTimeout(
            () => {
                console.log(2)
                setTimeout(
                    () => {
                        console.log(3)
                    }
                    , 1000
                );                
            }
            , 1000
        );        
    }
    , 1000
);

// ko muốn nhìn kiểu hell này thì viết kiểu chain


function counterNum(ms) {
    return new Promise(
        (resolve) => { // Executor
            setTimeout(resolve,4000); // sau 4s sẽ báo thành công (resolve)
        }
    );  
}

counterNum(4000)
        .then(() => {  
            console.log(4)  
            return counterNum(1000) 
            // khi return về 1 promise thì nó sẽ phải chờ các hàm trong promise mới         
        })

        .then(() => { // khi đó .then tiếp theo sẽ xem như là của promise đc return ở trên
            console.log(5)            
            return counterNum(1000)
        })

        .then(() => {
            console.log(6)            
            return counterNum(1000)
        })
// tuy bên trên luôn xuất ra resolve nhưng thực tế thì đôi khi lại có lỗi => cần phải reject
        .then(() => {
            console.log()            
            return new Promise((resolve,reject) => {
                reject();
            });
        })
        .then(() => { // có reject thì sẽ ko chạy tiếp then
            console.log(7)            
            return counterNum(1000)
        })
        .catch(() => { // mà nó nhảy sang catch để báo lỗi
            console.log("error");            
        })


// ngoài ra Promise còn có 1 số phương thức nhằm rút gọn cách viết:
// khi tạo 1 Promise luôn resolve (thường ko có logic): 
var shortResolve = Promise.resolve("shortcut successfully")
        .then((data) => {
            console.log(data)
        })

// khi tạo 1 Promise luôn reject (thường ko có logic): 
var shortReject = Promise.reject("shortcut error")
        .catch((data) => {
            console.log(data)
        })


// khi mà có nhiều promise cần chạy song song => ko thể nối then nhau (v là tuần tự)
// => cho chạy bằng Promise.all

var Promise1 = new Promise( // khi trong Promise cần có logic thì sài cách viết 1
        (resolve) => { // Executor
            setTimeout( () =>{
                resolve([1])
            },2000); // sau 2s sẽ xong
        }
    );  


var Promise2 = new Promise(
        (resolve) => { // Executor
            setTimeout( () =>{
                resolve([2, 3])
            },4000); // sau 4s sẽ xong
        }
    );  
// => nếu chạy tuần tự thì mất 6s , chạy song song thì 4s
var parallelPromise = Promise.all([Promise1, Promise2]) // hàm sẽ trả về 1 mảng chứa những resolve của thành phần
        .then((data) => { // khi tất cả các Promise thành phần phải resolve
            console.log(data)
            var arr1 = data[0];
            var arr2 = data[1];
            console.log(arr1.concat(arr2))
        })
        .catch(() => { // khi một trong các Promise thành phần reject
            console.log('some error')
        })
///////////////////////////////////////////////////////////////////////

/** vd thực tế chương trình mô phỏng comment
 * 
 * một lần comment sẽ bao gồm thông tin về người comment và nội dung comment
 * và backend sẽ cho frontend 2 api dưới dạng url chứa 2 thông tin trên
 * sau đó bên frontend sẽ lấy comment và thông tin user để hiển thị
 */

// tạo một array chứa thông tin của nhìu user
var users = [
    {
        id: 1,
        userName: "Thành"
    },

    {
        id: 2,
        userName: "yami"
    },

    {
        id: 3,
        userName: "haha"
    }

];
var usersJSON = JSON.stringify(users);

// tạo một array chứa thông tin của các comment
var comments = [
    {
        id: 1,
        userId: 1, // dùng như 1 key để kết nối vs bảng users
        contents: "Thành đập chai"
    },

    {
        id: 2,
        userId: 2,
        contents: "yami Muhahahahaha"
    },

    {
        id: 3,
        userId: 3,
        contents: "haha heheheheeh"
    }

];
var commentsJSON = JSON.stringify(comments);

// hàm face api nhằm mô phỏng việc lấy info qua api 

function getComments() { // hàm face api
    return new Promise(
        (resolve) => { //Executor
            setTimeout( // mạng lag nên delay 1s
                () => {
                    resolve(JSON.parse(commentsJSON))   // sau 1s trả về mảng comments
                }
                ,1000 
            );
        }
    );
}


function getUsersByIds(userIds) { // hàm lấy các user theo id
    return new Promise(
        (resolve) => { //Executor  
            var result = users.filter((user) => userIds.includes(user.id) ); // lọc ra các user có id trong userIds
            resolve(result);
        }
    );
}


getComments() // lấy thông tin qua api
    .then((comments) => {
        console.log(comments);

        var userIds = comments.map(function(PhanTu) { // lấy userIds
            return PhanTu.userId;
        }); 
        console.log('mảng userId:',userIds);

        return getUsersByIds(userIds); // return lại 1 Promise
    })
    .then((user) => {
        return {
            user: user,
            comments: comments,
        };
    })
    .then((data) => {
        console.log(data);
        var htmlComment = document.querySelector('.Comment');
        var html = '';
        data.comments.forEach((comment) => { // lặp theo mảng
            var user = data.user.find((user) => { // lấy r a mảng có thứ tự tương ưng vs nhau
                return user.id === comment.userId;
            });
            html += `<li>${user.userName}: ${comment.contents}</li>`
        });
        htmlComment.innerHTML = html
    })
