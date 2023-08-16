/**         đệ quy
 * là một phương pháp giải toán mà trong đó hàm sẽ gọi lại chính bản thân nó
 *  về cơ bản thì nó thay cho vòng lặp 
 *  sài loop -> tốn CPU
 *  sài đệ quy -> tốn ram
 * 
 * */ 

// đề bài toán: xóa các phần tử trùng trong mảng:
// input: ['a', 'b', 'c', 'd', 'a', 'b', 'a']
// output: ['a', 'b', 'c', 'd']

/** giải:
 *  - giải dùng vòng for
 *  - giải dùng đối tượng set
 *  - dùng đệ quy
 * 
 */


// giải thông thường:
// chọn phần tử đầu tiên làm 1 mảng mới
// so sánh phần tử kế của mảng cũ vs từng phần tử trong mảng mới
// nếu khác thì cho vô
// ko thì thôi


var input = ['a', 'b', 'c', 'd', 'a', 'b', 'a'];

function Fillter(input) {
    
    function IsEqual(x, array) {
        for(var i = 0; i < array.length; i++){
            if(array[i] === x)
                return true;
        }
        return false;
    }
    
    
    var x = [input[0]];
    var ix = 0;
    for (var i = 1; i < input.length; i++){
        if( !IsEqual(input[i],x) ){
            ix++;
            x[ix] = input[i];
        }
    }

    return x;

}

console.log(Fillter(input));


// giải dùng đối tượng set
// đây là một đối tượng mới đc thêm vào ES6 
// với đặc tính unique của nó chỉ cho phép 1 phần tử có giá trị và kiểu tồn tại duy nhất
//=> nếu có 2 cái giống nhau sẽ tự động bỏ 1 cái

var useSet = new Set (input) // tạo 1 set từ array

console.log([...useSet]) // đổi từ set thành array
// đọc phần map-set để biết thêm chi tiết



