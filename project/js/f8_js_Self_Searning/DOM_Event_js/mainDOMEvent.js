/**có 2 cách để bắt các event trong dom:
 * 
 * - Attribute event: sử dụng như 1 Attribute của element đó
 * => sài inline
 * 
 * - Assign event (element node)
 * => cần phải truy cập đến thông qua document => sử dụng trong file .js
 * 
 * ** KHI DÙNG THÌ CÚ PHÁP LÀ on<event muốn bắt>
 * */ 

/** Attribute event => qua html mà coi
 * nó sẽ trả về đối tượng "this" => là bản thân node element sử dụng Attribute event 
 * (là mấy cái lấy đc khi get thông qua document á) => có thể dùng nó để làm mấy thứ trong DO
 * 
 * hoặc có thể trả về nội dung của event bằng từ khóa "event" (viết tawrt là "e") với event.taget = this :)
 * 
 * việc tương tác với 1 element con thì nó sẽ gây ra ảnh hưởng tương đương vs thẻ cha theo thứ tự từ con -> cha
 * => click trên thẻ button thì thẻ html cũng có event tương đương
 * */ 


/**  Assign event
 * giống trên nhưng phải gán bằng function
 * => function chỉ hoạt động khi có event
 * 
 * có thể thay thế "this" như trên Attribute event = cái node đc truy suất đến (người nhà quê)
 * hoặc có thể dùng "event" cho đẹp ( nhớ truyền tham số "event" vào function)
 * 
 */

var vdBTN = document.querySelector('.VdClick .vd__2');

vdBTN.onclick = (e) => {
    console.log('haha');
    console.log(e.target);
}

// khi có nhiều thẻ cùng lớp cần lấy event:
var vdBTNS = document.querySelectorAll('.VdClick .vd__3'); // cái này giống 1 mảng
for(let i = 0; i < vdBTNS.length; i++){
    vdBTNS[i].onclick = (e) => {
        console.log('haha');
        console.log(e.target);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////

/** một số vd 
 * 
 * - lấy thông tin từ input
 * - lấy thông tin khi tương tác với bàn phím
 * 
 */

// lấy thông tin từ input
var vdInputText = document.querySelector('input[type = "text"]');
var vdInputCheck = document.querySelector('input[type = "checkbox"]');
var vdInputSelect = document.querySelector('select');

console.log(vdInputText); // có 2 loại event thường được bắt: onchange và oninput
vdInputText.onchange = (e) => { // chỉ trả về khi nó ko còn đc focus (bấm ra ngoài khung nhập)
    console.log(e.target.value); // trả về giá trị trong khung nhập
}

vdInputText.oninput = (e) => { // khi giá trị value thay đổi thì nó trả về
    console.log(e.target.value);
}
/////
console.log(vdInputCheck); // nếu có tích vào thì true
vdInputCheck.onchange = (e) => {
    console.log(e.target.checked); 
}
/////
console.log(vdInputSelect);
vdInputSelect.onchange = (e) => {
    console.log(e.target.value); // trả về giá trị trong ATTRIBUTE VALUE 
}


/** lấy thông tin từ bàn phím
 * 
 * thường có 3 loại event thường dùng:
 * - keyup: khi nhấn xuống rồi THẢ ra 
 * - keydown: khi NHẤN xuống
 * - keypress: khi nhấn GIỮ => trigger liên tục
 * 
 * ngoài ra có thể chọn document để bắt event
 * => chỉ cần focus vào trang wed thì có thể ấn phím để trigger event
 *  */ 

var docEvent = document.onkeydown = (e) => {
    console.log(e.which) // với which là chỉ số của các phím trên bàn phím (mỗi phím có 1 số). hiển thị để xem chơi
    switch(e.which){
        case 13:
            console.log('nút enter');
            break;
        case 9:
            console.log('nút tab');
            break
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** một số phương thức khác của event
 * - PreventDefault: ngăn chặn hành vi mặc định (tính năng) của 1 thẻ 
 * - StopPropagation: ngừng sự nổi bọt
 * - hủy lắng nghe (bắt) event
 */


// PreventDefault
// vd có 2 link, muốn rằng khi nhấp vào link nào có chuỗi 'kurogane' thì mới chạy

var aElement = document.querySelectorAll('.Prevent a');

console.log(aElement);

for (let i = 0; i < aElement.length; i++){
    aElement[i].onclick = (e) => {
        if(! e.target.href.includes('kurogane') )
            e.preventDefault(); // hàm ngăn cản hành vi đi đến link của thẻ a        
    }
}

// vd mô phỏng khung tìm kiếm:
// với việc khi bấm focus vào khung tìm kiếm thì nó mới hiện phần ul, khi bấm vào các li trong ul 
// thì nó lại bỏ focus => mất ul => ko bấm đc
// => ko muốn như v thì bỏ mặc định của của việc bấm vô ul sẽ bỏ focus khỏi khung tìm kiếm
// => bỏ mặc định nhận bấm chuột xuống ul

var searchElement = document.querySelector('.Search ul');
searchElement.onmousedown = (e) => {
    e.preventDefault();
    console.log('event trigged');
    console.log(e.target);
}


/** StopPropagation
 * như ta đã biết về hiện tượng nổi bọt của event
 * khi một event đc kích hoạt ở một element con thì các lớp cha cũng nhận biết đc event đó 
 * và có thể bắt đc THÔNG TIN CỦA EVENT(bao gồm nội dung cũng như lệnh)
 * => nếu dev có yêu cầu bắt event tại lớp con và lớp cha 
 *    thì khi event ở lớp con kích hoạt thì nó sẽ chạy lệnh của nó trước xong r sẽ chạy lệnh của lớp cha
 *  */ 
document.onclick = (e) => { // vd nhận event tại lớp ông cố nội :)
    console.log(e.target);
}

// nếu ko thích bị v thì sài StopPropagation tại lớp con để nó ko bị nổi lên ảnh hưởng đến lớp cha
var btnPropagation = document.querySelector('.btnPropagation button');
btnPropagation.onclick = (e) => {
    e.stopPropagation();
    console.log('event trigged and didn\'t affect to document.onclick event');
}


// nếu ko mún bắt event nữa thì ghi đè function bằng 1 hàm rỗng

setTimeout(function() {
    document.onclick = () => {}
},5000); // sau 5s thì ko bắt event tại document nữa



///////////////////////////////////////////////////////////////////////////////
/** Event Listener 
 * ngoài việc sử dụng DOM Event để bắt sự kiện thì ta có thể dùng tính năng mới trong ES6
 * 
 * Event Listener về cơ bản thì cũng giống DOM, cũng truyền vào 1 event và 1 function
 * tuy nhiên điểm khác biệt nằm ở cơ chế sử lý bắt:
 *  - ko như DOM, nó có thể xóa 1 lần bắt sự kiện (hay xóa function tại sự kiện) mà ko cần ghi đè
 *  - do ko có cơ chế ghi đè => có thể viết nhiều lần bắt sự kiện(cái nào viết  trước thì thực hiện trước)
 *  - mặc dù viết có hơi hài dòng tuy nhiên khi số lượng dòng code lớn thì lại rất ok
*/

// bắt sự kiện:
var btnListener = document.querySelector('.Listener button'); // đâu tiên vẫn phải truy cập element

/** thay vì sài DOM như v:
 * btnListener.onclick = (e) => {console.log(e.target)};
 */

// thì sài Event Listener bắt event:
// với việc tách function ra riêng thì dễ quản lý hơn
var viec1 = () => {console.log('Ahhhhh!')}
var viec2 = (e) => {console.log(e.target)}
btnListener.addEventListener('click', viec1);
btnListener.addEventListener('click', viec2);

// mún ko bắt nữa thì:
setTimeout(
    btnListener.removeEventListener('click', viec2),
    10000
);



