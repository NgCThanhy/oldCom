// để lắng nghe cần có 1 class để bắt => tạo 1 class js... để bắt
// => js-Buy-ticket

var buttons = document.querySelectorAll('.js-Buy-ticket');
var modal = document.querySelector('.js-Modal');


function ShowBuyForm() { // hàm thêm lớp Modal__Open vào trong modal để hiện form
    modal.classList.add('Modal__Open');
}

for(let btn of buttons){
    btn.addEventListener('click', ShowBuyForm);
}

////////////////////

var closebtn = document.querySelector('.js-close');

function HideBuyForm(e) {
    modal.classList.remove('Modal__Open');
}

closebtn.addEventListener('click', HideBuyForm);

modal.addEventListener('click',HideBuyForm); // nếu bấm ra ngoài thì cũng đóng form lun nhưng lại dính nổi bọt

var ModalBody = document.querySelector('.js-Modal-body');
ModalBody.addEventListener('click', (e) => { e.stopPropagation(); }) // ngăn nổi bọt
