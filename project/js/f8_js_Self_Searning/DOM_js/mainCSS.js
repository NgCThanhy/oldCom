// tương tự như HTML DOM nhưng cái này là sài cho CSS

var boxElement = document.querySelector('.box');

var cssDOM = boxElement.style; // thuộc tính style sẽ trả về một đối tượng "CSS Style Declaration"
//  => đối tượng này sẽ cung cấp những get/set để tương tác vs css của đối tượng. 

// set: nó sẽ xem như đây là 1 dòng style IN LINE trong html => có cấp cao nhất(chỉ sau !important)

// cssDOM.width = '100px';
// cssDOM.height = '200px';
// cssDOM.backgroundColor = 'red';
// cssDOM.boxSizing = 'border-box';

// viết như trên thì hơi mệt  => sử dụng assign (phân phối) (lên google tìm hiểu đê)
// nó sẽ sử dụng thuộc tính assign của đối tượng Object để gán (phân phối 1 object cho 1 object khác)
Object.assign(cssDOM, { // trong trường hợp này nó sẽ phân phối từng phần tử của object {} cho cssDOM (boxElement.style)
    width: '100px',
    height: '200px',
    backgroundColor: 'red',
    boxSizing: 'border-box',
})



// get: 
console.log(cssDOM.backgroundColor) // lấy ra GIÁ TRỊ của thuộc tính css backgroundColor
// => ko phải lấy ra bản thân thuộc tính css
