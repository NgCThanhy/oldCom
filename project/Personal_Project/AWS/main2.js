// var awsApi = "https://j5wc0nglx2.execute-api.ap-east-1.amazonaws.com/prod/get1item"; // địa chỉ lưu dữ liệu - api
/* api chứa:

    {
    "Count": 1,
    "Items": [
        {
            "IotTs": {
                "N": "1685047165998"
            },
            "LocalTime": {
                "S": "Thu May 25 20:39:25 2023\n"
            },
            "cps": {
                "N": "0"
            },
            "uSv": {
                "N": "0"
            },
            "timestamp": {
                "N": "1685072364"
            },
            "stationName": {
                "S": "Tram1"
            },
            "humidity": {
                "N": "68"
            },
            "temperature": {
                "N": "30.20000076"
            }
        }
    ],
    "LastEvaluatedKey": {
        "stationName": {
            "S": "Tram1"
        },
        "IotTs": {
            "N": "1685047165998"
        }
    },
    "ScannedCount": 1
}

*/

// api:
const stationUrl_addstation_POST = "https://huk30snrx9.execute-api.ap-east-1.amazonaws.com/prod/addstation";
const stationUrl_getstation_POST = "https://huk30snrx9.execute-api.ap-east-1.amazonaws.com/prod/getstation";


var responseData = {}; // data lấy từ dynamoDB
var mappedApiArray = [];// chứa mảng các api của các trạm
var arrDivTempHumiChart = []; // chứa danh sách các tên js- chart
var arrDivRadiChart = [];// chứa danh sách các tên js- chart


// để lắng nghe cần có 1 class để bắt => tạo 1 class js-... để bắt
var divSelectStation = document.querySelector('.js-selectStation');
var divModalGroup = document.querySelector('.js-ModalGroup');
var divSlider = document.querySelector('.js-slider');
var chartModal = document.querySelectorAll('.js-chartModal');
var addStationBtn = document.querySelector('.js-addStationBtn');
var closeSubmitBtn = document.querySelector('.js-submitclose');


////////////////////////////////////////////
// cấu hình chart
var numberElements = 720; // số phần tử tối đa

// biến đếm
var updateCount1 = 0;
var updateCount2 = 0;

// Chart Objects
var drawTempHumiChart = [];// chứa danh sách các chart cần vẽ
var drawRadiChart = [];// chứa danh sách các chart cần vẽ

var chartOptions = { // cấu hình chung của 1 chart
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          displayFormats: {
            millisecond: 'mm:ss:SSS'
          }
        }
      }
    ],
    yAxes: [
      {
          id: 'y-axis-1',
          position: 'left',
          ticks: {
              beginAtZero: true
        }
    },
    {
        id: 'y-axis-2',
        position: 'right',
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    enabled: true
  }
  };

////////////////////////////////////////////
// data and display

function DisplayStation(data, tempDiv, humiDiv, CpsDiv, uSvDiv, timeIoTDiv){ // hiển thị ra giá trị của station
  const t = data.Items[0].IotTs.N*1
  dateFormat = new Date(t);  

  timeIoTDiv.innerText = `thời gian: ${dateFormat}`;
  tempDiv.innerText = `nhiệt độ: ${data.Items[0].temperature.N} °C`;
  humiDiv.innerText = `độ ẩm: ${data.Items[0].humidity.N} %`;
  CpsDiv.innerText = `số đếm trên giây: ${data.Items[0].cps.N} Cps`;
  uSvDiv.innerText = `suất liều hấp thụ: ${data.Items[0].uSv.N} uSv`;
    
}

async function GetData(awsApi) { // hàm lấy giá trị từ api và lưu vào biến:
  const currentDate = new Date();  // tạo một Date object mới => chứa thời gian hiện tại
  const tsValue = currentDate.getTime();  // lấy timestamp in milliseconds
  var data = {"tsValue":tsValue};
  
  try {
    const response = await fetch(awsApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      responseData = await response.json();

      console.log(responseData)    
      return responseData; // trả về info của các station từ db
    } else {
      throw new Error("Error: " + response.status);
    }
  } catch (error) {
    console.log(error);
    return null; // Return null or handle the error case as desired
  }
}

function postStation(stationName, api){ // gửi station info lên db
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  let data = {stationName: stationName, api: api, timestamp: timestamp };
  fetch(stationUrl_addstation_POST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.ok) {

        return response.text();
      }
      throw new Error("Error: " + response.status);
    })
    .catch(function (error) {
      console.log(error);
      // throw error;
    });
}

async function getStation() { // trả về info của các station từ db
  const data = {};
  
  try {
    const response = await fetch(stationUrl_getstation_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      responseData = await response.json();

      return responseData;
    } else {
      throw new Error("Error: " + response.status);
    }
  } catch (error) {
    console.log(error);
    return null; // Return null or handle the error case as desired
  }
}

function addHtml(arrayStationData) { // cập nhật html

  arrayStationData.forEach((station) => {
    arrDivTempHumiChart.push(`js-tempHumiChart${station.stationName.S}`);
    arrDivRadiChart.push(`js-radiChart${station.stationName.S}`);
    
    const htmlCode1 = `
      <div class="chartModal-body js-chartModal-body">
          <div class="chartModal__Close btn js-close">
              <i class="fa-solid fa-xmark"></i>
          </div>
          <header class="Modal__Header">stationButton
              <i class="fa-solid fa-chart-simple"></i>
              CHART 
          </header>
          <div class="chartModal__Container row col-3">
              <canvas id="js-tempHumiChart${station.stationName.S}" class="chart"></canvas>
              <canvas id="js-radiChart${station.stationName.S}" class="chart"></canvas>
          </div>
          <footer class="chartModal__Footer">
              <p>need <a href="#">help?</a></p>
          </footer>
      </div>`;

    const htmlCode2 = `
      <div class="Station__location">
          <i class="fa-solid fa-house-flag"></i>
          <a class="btn" href="#">${station.stationName.S}</a>
      </div>
  
      <ul class="Station__status">
          <li class="js-temperature-1">nhiệt độ: </li>
          <li class="js-humidity-1">độ ẩm: </li>
          <li class="js-Cps-1">số đếm trên giây: </li>
          <li class="js-uSv-1">suất liều hấp thụ: </li>
          <li class="js-time-1">thời gian: </li>
      </ul>
  
      <div class="Station__btn row col-2">
          <button class="btn js-chart">chart</button>
          <button class="btn js-down">download</button>
      </div>`;

      const newButton = document.createElement('button');
      newButton.setAttribute('class', 'js-stationButton btn');
      newButton.innerHTML = station.stationName.S;
      divSelectStation.appendChild(newButton);

      const newDiv1 = document.createElement('div');
      newDiv1.setAttribute('class', 'Modal js-chartModal');
      newDiv1.innerHTML = htmlCode1;
      divModalGroup.appendChild(newDiv1);

      const newDiv2 = document.createElement('div');
      newDiv2.setAttribute('class', 'Station js-Station center');
      newDiv2.innerHTML = htmlCode2;
      divSlider.appendChild(newDiv2);

  });

  addListen()
  displayReset();

}


///////////////////////////////////
// chart

function drawChart(divTempHumi, divRadi){ // khởi tạo chart

   const drawTHChart = new Chart(divTempHumi, { // chart của temp và humi
    type: 'bar',
    data: {
      datasets: [
        {
          type: 'line',
          label: "Temperature",
          data: [],
          fill: true,
          lineTension: 0,
          borderColor: '#f32424',
          borderWidth: 2,
          yAxisID: 'y-axis-1' // Assign the dataset to the first y-axis
        },
        {
          type: 'bar',
          label: "humidity",
          data: [],
          backgroundColor: '#0077ff',
          yAxisID: 'y-axis-2' // Assign the dataset to the second y-axis
        }
      ]
    },
    options: Object.assign({}, chartOptions, {
      title: {
        display: true,
        text: "Temperature - humidity Chart",
        fontSize: 18
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              displayFormats: {
                millisecond: 'mm:ss:SSS'
              }
            }
          }
        ],
        yAxes: [
          {
            id: 'y-axis-1',
            position: 'left',
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value + '°C'; // Add the unit to the first y-axis
              }
            },
            type: 'linear' // Use linear scale for the first y-axis
          },
          {
            id: 'y-axis-2',
            position: 'right',
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value + '%'; // Add the unit to the second y-axis
              }
            },
            type: 'linear' // Use linear scale for the second y-axis
          }
        ]
      }
    })
  });

   const drawRChart = new Chart(divRadi, { // chart của cps và usv
      type: 'bar',
      data: {
        datasets: [
          {
            type: 'line',
            label: "Cps",
            data: [],
            fill: false,
            lineTension: 0,
            borderColor: '#70480b',
            borderWidth: 2,
            yAxisID: 'y-axis-1' // Assign the dataset to the first y-axis
          },
          {
            type: 'bar',
            label: "uSv",
            data: [],
            backgroundColor: '#d7e60d',
            yAxisID: 'y-axis-2' // Assign the dataset to the second y-axis
          }
        ]
      },
      options: Object.assign({}, chartOptions, {
        title: {
          display: true,
          text: "Cps - uSv Chart",
          fontSize: 18
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                displayFormats: {
                  millisecond: 'mm:ss:SSS'
                }
              }
            }
          ],
          yAxes: [
            {
              id: 'y-axis-1',
              position: 'left',
              ticks: {
                beginAtZero: true
              },
              type: 'linear' // Use linear scale for the first y-axis
            },
            {
              id: 'y-axis-2',
              position: 'right',
              ticks: {
                beginAtZero: true
              },
              type: 'linear' // Use linear scale for the second y-axis
          }
          ]
        }
      })
  });

  drawTempHumiChart.push(drawTHChart)
  drawRadiChart.push(drawRChart)

}



function addData(drawChart,data1, data2) { // hàm cập nhật dữ liệu chart

  // console.log(data1, data2);
  if (data1 && data2) {
    drawChart.data.labels.push(new Date());
    drawChart.data.datasets[0].data.push(data1);
    drawChart.data.datasets[1].data.push(data2);

    if (updateCount1 > numberElements) {
      drawChart.data.labels.shift();
      drawChart.data.datasets[0].data.shift();
      drawChart.data.datasets[1].data.shift();
    } else {
      updateCount1++;
    }
    drawChart.update();
  } else if (data1 == 0 && data2 == 0) {
    drawChart.data.labels.push(new Date());
    drawChart.data.datasets[0].data.push(0);
    drawChart.data.datasets[1].data.push(0);
    
    if (updateCount1 > numberElements) {
      drawChart.data.labels.shift();
      drawChart.data.datasets[0].data.shift();
      drawChart.data.datasets[1].data.shift();
    } else {
      updateCount1++;
    }
    drawChart.update();
  }
  
};

///////////////////////////////////
// button

function displayReset(){ // ẩn hết các station - modal

  const station = document.querySelectorAll('.js-Station');
  const submitModal = document.querySelector('.js-submitModal');
  chartModal = document.querySelectorAll('.js-chartModal');

  for (let i = 0; i < station.length; i++) {
    chartModal[i].style.display = "none";
    station[i].style.display = "none";
    submitModal.style.display = "none";
  }
}

async function addStationBtnBehavior(){ // hành vi của nút submit

  const divStationName = document.querySelector('.js-form-stationName');
  const divApi = document.querySelector('.js-form-api');

  let stationNameVal = divStationName.value;
  let apiVal = divApi.value;

  postStation(stationNameVal, apiVal);
  
  stationData = await getStation();
  const mappedArray = stationData.Items;

  addHtml(mappedArray);

}

function showChart(index) { //hiển thị chart
  for (let i = 0; i < chartModal.length; i++) { // ẩn hết mấy cái ko liên quan đi
    chartModal[i].style.display = "none";
  }
  chartModal[index].style.display = "flex"; //chỉ hiển thị cái cần
}

function showStation(index) { // hiển thị station
  
  const station = document.querySelectorAll('.js-Station');
  for (let i = 0; i < station.length; i++) {
    station[i].style.display = "none";
  }
  station[index].style.display = "block";
}

function closeChart() { // đóng
  for (let i = 0; i < chartModal.length; i++) {
    chartModal[i].style.display = "none";
  }
}

function downloadBtnJSON(json) {
  //  json = { "key1": "value1", "key2": "value2" }; // Replace with your JSON object

  var jsonString = JSON.stringify(json); // thành chuỗi json
  var blob = new Blob([jsonString], { type: "application/json" });
  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = url;
  link.download = "data.json";
  link.click();
}

////////////////////////////////////////
// lắng nghe

function addListen(){
  // cập nhật lại tình hình các div
  const submitModal = document.querySelector('.js-submitModal');
  const submitButton = document.querySelector('.js-submitButton');
  const StationButton = document.querySelectorAll('.js-stationButton');
  const chartButtons = document.querySelectorAll('.js-chart');
  const closebtn = document.querySelectorAll('.js-close');
  const chartModal = document.querySelectorAll('.js-chartModal');
  const ModalBody = document.querySelectorAll('.js-chartModal-body');

  addStationBtn.addEventListener('click',()=>{
    submitModal.style.display = "flex";
  });

  closeSubmitBtn.addEventListener('click',()=>{
    submitModal.style.display = "none";
  });

  submitButton.addEventListener('click', ()=>{
    addStationBtnBehavior();
  });

  for (let i = 0; i < StationButton.length; i++) {
    StationButton[i].addEventListener('click', (function(index) {
      return function() {
        showStation(index);
      };
    })(i));
  }

  /*
  Trong đoạn code trên, chúng ta tạo ra một hàm đóng kín bằng cách bọc addEventListener callback trong một IIFE   
  IIFE - immediately-invoked function expression :  biểu thức xâm nhập tức thời

  IIFE sẽ bắt giá trị hiện tại của (i) và return lại 1 function mới với đối số (index) dựa trên i bắt đc
  => có thể đưa hàm có đối số làm callback của addEventListener (bình thường thì ko đc)
  */

  for (let i = 0; i < chartButtons.length; i++) {
    chartButtons[i].addEventListener('click', (function(index) {
      return function() {
        showChart(index);
      };
    })(i));
  }

  for (let i = 0; i < closebtn.length; i++) {
    closebtn[i].addEventListener('click', (function(index) {
      return function() {
        closeChart(index);
      };
    })(i));

    chartModal[i].addEventListener('click', (function(index) {  // nếu bấm ra ngoài thì cũng đóng form lun nhưng lại dính nổi bọt
      return function() {
        closeChart(index);
      };
    })(i));

  }

  for (let i = 0; i < ModalBody.length; i++) { // sử lý nổi bọt
    (function(i) {
      ModalBody[i].addEventListener('click', function(e) {
        e.stopPropagation();
      });
    })(i);
  }


}


//////////////////////////////////////////////
// main

async function main() {

  var stationData = await getStation();
  var mappedArray = stationData.Items;

  addHtml(mappedArray);
  
  const downloadBtn = document.querySelectorAll('.js-down');

  for (let i = 0; i < mappedArray.length; i++){
    mappedApiArray.push(mappedArray[i].api.S);
    drawChart(arrDivTempHumiChart[i], arrDivRadiChart[i]);

    downloadBtn[i].addEventListener('click', (function(index) {
      return async function() {
        const tApi = await GetData(mappedArray[index].api.S);
        downloadBtnJSON(tApi);
      };
    })(i));
  }




  displayReset();

  // setInterval( async ()=>{ // lặp lại để hiển thị thời gian thực

    // biến xác định các div trong index.html: '.slider .Station .Station__status'
    const tempDiv = document.querySelectorAll('.js-temperature-1');
    const humiDiv = document.querySelectorAll('.js-humidity-1');
    const CpsDiv = document.querySelectorAll('.js-Cps-1');
    const uSvDiv = document.querySelectorAll('.js-uSv-1');
    const timeIoTDiv = document.querySelectorAll('.js-time-1');

    for (let i = 0; i < mappedApiArray.length; i++){
      apiData = await GetData(mappedApiArray[i]);
      DisplayStation(apiData, tempDiv[i], humiDiv[i], CpsDiv[i], uSvDiv[i], timeIoTDiv[i]);
      
      addData(drawTempHumiChart[i], apiData.Items[0].temperature.N, apiData.Items[0].humidity.N);
      addData(drawRadiChart[i], apiData.Items[0].cps.N, apiData.Items[0].uSv.N);
    }

  // },1000)
}
///////////////////////////////////////////////

main() // gọi hàm main :)

