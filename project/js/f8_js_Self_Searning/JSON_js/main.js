/** JavaScript Object Notation ( JSON )
 * JSON là một định dạng dữ liệu (ko phải kiểu dữ liệu) 
 * 
 * => được thể hiện bằng bất cứ kiểu dữ liệu gì (viết ra giấy cũng ok)
 * 
 * trong js thì JSON đc thể hiện bằng 1 chuỗi
 * và JSON có thể thể hiện được một số kiểu dữ liệu:
 *  number, boolean, char-String, array, object, null
 * 
 * các quy tắc khi viết JSON trong js:
 *   - trong js thì JSON đc thể hiện = kiểu chuỗi được bao bằng dấu '' => gọi là chuỗi JSON
 *   - phân tách giữa các phần tử trong JSON bằng dấu ,
 *   - thể hiện của các kiểu dữ liệu trong chuỗi JSON:
 *        + number: '1, 2, 3'
 *        + boolean: 'true, false'
 *        + String: ' "nguyễn", "chí", "Thành" '
 *        + array: ' ["haha", "hihi", "hehe"] '
 *        + object: ' {"name":"Thành", "age":22} '
 *        + null: 'null'
 *   
 *   - nếu ko giống mớ trên thì lỗi:
 *        + ' "nguyễn", "chí", "Thành" ,'     => lỗi dư dấu , 
 *        + 'abc'     => lỗi abc là chuỗi nên phải như lày '"abc"'
 * 
 * 
 * một số hàm trong js phục vụ việc sử dụng JSON:
 *   - Stringify: chuyển từ các kiểu dữ liệu khác -> chuỗi JSON
 *   - Parse: từ chuỗi JSON -> nhận được dữ liệu dưới dạng các kiểu dữ liệu khác
 */

// vd:

var myObject = {
    name: 'thành',
    age: 22,
    isMale: true,
    love: null
};

var myJSON = ' {"name":"yami","age":18,"love":null}';

console.log(JSON.parse(myJSON));
console.log(JSON.stringify(myObject));

