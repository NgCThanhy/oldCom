// var awsApi = "https://j5wc0nglx2.execute-api.ap-east-1.amazonaws.com/prod/get1item"; // địa chỉ lưu dữ liệu - api
/* api chứa:

    {
    "Count": 1,
    "Items": [
      {
        "IotTs": {"N": "1685047165998"},
        "LocalTime": {"S": "Thu May 25 20:39:25 2023\n"},
        "cps": {"N": "0"},
        "uSv": {"N": "0"},
        "timestamp": {"N": "1685072364"},
        "stationName": {"S": "Tram1"},
        "humidity": {"N": "68"},
        "temperature": {"N": "30.20000076"}
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

const stationUrl_login_POST = "https://8ru1n1y7za.execute-api.ap-east-1.amazonaws.com/prod/login";
const stationUrl_register_POST = "https://8ru1n1y7za.execute-api.ap-east-1.amazonaws.com/prod/register";


var responseData = {}; // data lấy từ dynamoDB
var mappedApiArray = [];// chứa mảng các api của các trạm
var arrDivTempHumiChart = []; // chứa danh sách các tên js- chart
var arrDivRadiChart = [];// chứa danh sách các tên js- chart


// để lắng nghe cần có 1 class để bắt => tạo 1 class js-... để bắt
var divContent = document.querySelectorAll('.js-content');
var divNavbarName = document.querySelectorAll('.js-navbar_name');

var divHome = document.querySelector('.js-content__home');
var divHomeNameBar = document.querySelector('.js-homeNameBar');

var divStation = document.querySelector('.js-content__station');
var divStationNameBar = document.querySelector('.js-stationNameBar');

var divTable = document.querySelector('.js-content__table');
var divTableNameBar = document.querySelector('.js-tableNameBar');

var divGraph = document.querySelector('.js-content__graph');
var divGraphNameBar = document.querySelector('.js-graphNameBar');


var divSelectStation = document.querySelector('.js-selectStation');
var divModalGroup = document.querySelector('.js-ModalGroup');
var tbodyTable = document.querySelector('.js-table');
var chartModal = document.querySelectorAll('.js-chartModal');
var addStationBtn = document.querySelector('.js-addStationBtn');
var accoutBtn = document.querySelector('.js-accout');
var registerBtn = document.querySelector('.js-registerBtn');
var closeSubmitBtn = document.querySelector('.js-submitclose');
var closeLoginBtn = document.querySelector('.js-loginclose');
var closeregisterBtn = document.querySelector('.js-registerclose');

var graphDiv = document.querySelectorAll('.js-graphDiv');

var temperatureGraphDiv = document.querySelector('.js-temperatureGraphDiv'); 
var humidityGraphDiv = document.querySelector('.js-humidityGraphDiv'); 
var cpsGraphDiv = document.querySelector('.js-cpsGraphDiv'); 
var usvGraphDiv = document.querySelector('.js-usvGraphDiv');
 
// login
var loginStatus = false;

////////////////////////////////////////////
// cấu hình chart
const numberElements = 200; // mật độ của chart
const numbergraph = 100; // số phần tử tối đa của graph

// biến đếm
var updateCount1 = 0;
var updateCount2 = 0

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

// biến graph

var tempTimeCategories = []; //x-axis unit
var humiTimeCategories = []; //x-axis unit
var cpsTimeCategories = []; //x-axis unit
var usvTimeCategories = []; //x-axis unit

var temperatureIDDiv = "js-temperatureIDDiv"
var humidityIDDiv = "js-humidityIDDiv"
var cpsIDDiv = "js-cpsIDDiv"
var usvIDDiv = "js-usvIDDiv"

var tempArrStationInfo = []; // chứa danh sách tên station + data
var humiArrStationInfo = [];
var cpsArrStationInfo = [];
var usvArrStationInfo = [];

////////////////////////////////////////////
// data and display

function DisplayStation(data, tempDiv, humiDiv, CpsDiv, uSvDiv, day, time){ // hiển thị ra giá trị của station
  const t = data.Items[0].timestamp.N * 1000
  currentTime = new Date(t);  

  const date = currentTime.getDate();
  const month = currentTime.getMonth()+1; // do hệ đếm của nó chỉ từ 0 - 11
  const year = currentTime.getFullYear();

  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const sec = currentTime.getSeconds() ;

  const dayStr = `${date}/${month}/${year}`;
  const timeStr = `${hour}:${minute}:${sec}`;
  


  day.innerText = dayStr;
  time.innerText = timeStr;

  tempDiv.innerText = `nhiệt độ: ${data.Items[0].temperature.N} °C`;
  humiDiv.innerText = `độ ẩm: ${data.Items[0].humidity.N} %`;
  CpsDiv.innerText = `số đếm trên giây: ${data.Items[0].cps.N} Cps`;
  uSvDiv.innerText = `suất liều hấp thụ: ${data.Items[0].uSv.N} uSv`;
    
}

function DisplayTable(data, tempDiv, humiDiv, CpsDiv, uSvDiv){ // hiển thị ra giá trị của station

  tempDiv.innerText = `${data.Items[0].temperature.N} °C`;
  humiDiv.innerText = `${data.Items[0].humidity.N} %`;
  CpsDiv.innerText = `${data.Items[0].cps.N} Cps`;
  uSvDiv.innerText = `${data.Items[0].uSv.N} uSv`;
    
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
      return responseData; // trả về info của các station từ db
    } else {
      throw new Error("Error: " + response.status);
    }
  } catch (error) {
    console.log(error);
    return null; // Return null or handle the error case as desired
  }
}

async function postStation(stationName, apiVal) { // gửi station info lên db
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  let api = `https://${apiVal}.execute-api.ap-east-1.amazonaws.com/prod/get1item`;
  let apiDown = `https://${apiVal}.execute-api.ap-east-1.amazonaws.com/prod/getitems`;


  const data = {stationName: stationName, api: api, apiDown: apiDown, timestamp: timestamp };

  try {
    const response = await fetch(stationUrl_addstation_POST, {
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
    arrDivTempHumiChart.push(`js-tempHumiChart${station.timestamp.N}`);
    arrDivRadiChart.push(`js-radiChart${station.timestamp.N}`);

    tempArrStationInfo.push({
      name: `${station.stationName.S}`,
      data: []
    });

    humiArrStationInfo.push({
      name: `${station.stationName.S}`,
      data: []
    });

    cpsArrStationInfo.push({
      name: `${station.stationName.S}`,
      data: []
    });

    usvArrStationInfo.push({
      name: `${station.stationName.S}`,
      data: []
    });

    
    const htmlCode_chart = `
    <div class="chartModal-body js-chartModal-body">
        <div class="chartModal__Close btn js-close">
            <i class="fa-solid fa-xmark"></i>
        </div>
        <header class="Modal__Header">
            <i class="fa-solid fa-chart-simple"></i>
            CHART 
        </header>
        <div class="chartModal__Container chartModal__ContainerMobile row col-3">
          <div class="chart">
            <canvas id="js-tempHumiChart${station.timestamp.N}" ></canvas>
          </div>
          <div class="chart">  
            <canvas id="js-radiChart${station.timestamp.N}" ></canvas>
          </div>
        </div>
        <footer class="chartModal__Footer">
            <p>need <a href="#">help?</a></p>
        </footer>
    </div>`;

    const htmlCode_station = `
    <div class="Station__location row col-2">
        <div class="location_clock">
            <i class="fa-solid fa-clock"></i>
            <div class="dayTimeBlock js-time">
            </div>
        </div>

        <div class="location_name">
            <i class="fa-solid fa-house-flag"></i>
            ${station.stationName.S}
        </div>
        

        <div class="location_calendar">
            <i class="fa-solid fa-calendar-days"></i>
            <div class="dayTimeBlock js-day">
            </div>
        </div>
    </div>

    <div class="Station__status row col-3 col-1">
        <div class="mobile_status_section row col-3">
            <div class="status_section js-temperature">nhiệt độ:10</div>
            <div class="status_section js-humidity">độ ẩm: 10</div>
        </div>

        <div class="mobile_status_section row col-3">
            <div class="status_section js-Cps">số đếm trên giây: 10</div>
            <div class="status_section js-uSv">suất liều hấp thụ: 10</div>
        </div>
        
        <!-- <div class="js-time">thời gian: </div> -->
    </div>

    <div class="Station__btn row col-2">
        <button class="btn upWord js-chart">chart</button>
        <button class="btn upWord js-down">download</button>
    </div>`;

    const htmlCode_rowTable = `
      <td class="js-table_name">${station.stationName.S}</td>
      <td class="js-table_temp">10 dd</td>
      <td class="js-table_humi">10 %</td>
      <td class="js-table_cps">1 cps</td>
      <td class="js-table_usv">1 uSv</td>
    `

    const newButton = document.createElement('button');
    newButton.setAttribute('class', 'js-stationButton btn upWord');
    newButton.innerHTML = station.stationName.S;
    divSelectStation.appendChild(newButton);

    const newDiv1 = document.createElement('div');
    newDiv1.setAttribute('class', 'Modal js-chartModal');
    newDiv1.innerHTML = htmlCode_chart;
    divModalGroup.appendChild(newDiv1);

    const newDiv2 = document.createElement('div');
    newDiv2.setAttribute('class', 'Station js-Station center');
    newDiv2.innerHTML = htmlCode_station;
    divStation.appendChild(newDiv2);
    
    const newDiv3 = document.createElement('tr');
    newDiv3.innerHTML = htmlCode_rowTable;
    tbodyTable.appendChild(newDiv3);

  });

  addListen()
  displayReset();

}

async function postUserInfo(userName, pass) { // gửi station info lên db
    const data = {userName: userName, pass: pass};

  try {
    const response = await fetch(stationUrl_register_POST, {
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

async function getUserInfo() { // trả về info của các station từ db
  const data = {};
  
  try {
    const response = await fetch(stationUrl_login_POST, {
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

function checkLogin() {
  const localStorageUserName = localStorage.getItem('localStorageUserName');
  const localStoragePass = localStorage.getItem('localStoragePass');
  const account = document.querySelector('.js-userName');

  if( (localStorageUserName) && (localStoragePass) ){
    loginStatus = true;
    account.innerHTML = `${localStorageUserName}`
  }

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
  
}

function drawGraph1(divId, arrStationInfo, TimeCategories, name){
    const chart = Highcharts.chart(divId, {
        title: {
        text: `${name} DATA GRAPH`
        },
        xAxis: {
        categories: TimeCategories,
        labels: {
            step: 10 // Display every 20th label on the x-axis
        }
        },
        yAxis: {
        title: {
            text: `${name}`
        }
        },
        tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
            + 'Time: {point.category}<br/>'
            + 'Value: {point.y}'
        },
        series: arrStationInfo
    });
    return chart
}

function addData1(dataInput, chart, arrStationInfo, TimeCategories) {
  for(let i = 0; i<arrStationInfo.length; i++){
      arrStationInfo[i].data.push(parseFloat(dataInput[i]));
  }

  // thêm new time cho categories
  const now = new Date();
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const date = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${ampm}`;
  TimeCategories.push(date);

  // loại bỏ phần tử time cũ nhất nếu đạt numbergraph
  if (TimeCategories.length > numbergraph) {
    TimeCategories.shift();
    arrStationInfo.forEach(series => {
      series.data.shift();
    });
  }

  // Update x-axis categories to only display the last numbergraph categories
  chart.xAxis[0].setCategories(TimeCategories.slice(-numbergraph));

  // Update series data
  chart.series.forEach((series, index) => {
    series.setData(arrStationInfo[index].data.slice(-numbergraph));
  });

}


///////////////////////////////////
// button

function showSidebarHome() {
  for (let i = 0; i < divContent.length; i++) { // ẩn hết mấy cái ko liên quan đi
    divContent[i].style.display = "none";
    divNavbarName[i].style.display = "none";
  }
  divHome.style.display = "flex"; //chỉ hiển thị cái cần
  divHomeNameBar.style.display = "block";
}

function showSidebarStation() {
  if(loginStatus == true){
    for (let i = 0; i < divContent.length; i++) { // ẩn hết mấy cái ko liên quan đi
      divContent[i].style.display = "none";
      divNavbarName[i].style.display = "none";
    }
    divStation.style.display = "block"; //chỉ hiển thị cái cần
    divStationNameBar.style.display = "block";
  }
  else{
    alert("login first !!!")
  }
}

function showSidebarTable() {
  
  if(loginStatus == true){
    for (let i = 0; i < divContent.length; i++) { // ẩn hết mấy cái ko liên quan đi
      divContent[i].style.display = "none";
      divNavbarName[i].style.display = "none";
    }
    divTable.style.display = "block"; //chỉ hiển thị cái cần
    divTableNameBar.style.display = "block";
  }
    else{
      alert("login first !!!")
    }
  
}

function showSidebarGraph() {
  
  if(loginStatus == true){
    for (let i = 0; i < divContent.length; i++) { // ẩn hết mấy cái ko liên quan đi
      divContent[i].style.display = "none";
      divNavbarName[i].style.display = "none";
    }
    divGraph.style.display = "block"; //chỉ hiển thị cái cần
    divGraphNameBar.style.display = "block";
  }
    else{
      alert("login first !!!")
    }
  
}


function displayReset(){ // ẩn hết các station - modal

  const station = document.querySelectorAll('.js-Station');
  const submitModal = document.querySelector('.js-submitModal');
  chartModal = document.querySelectorAll('.js-chartModal');
  const loginModal = document.querySelector('.js-loginModal')
  const registerModal = document.querySelector('.js-registerModal')

  for (let i = 0; i < station.length; i++) {
    chartModal[i].style.display = "none";
    station[i].style.display = "none";
    submitModal.style.display = "none";
  }
  divStation.style.display = "none";
  divTable.style.display = "none";
  divGraph.style.display = "none";

  divStationNameBar.style.display = "none";
  divTableNameBar.style.display = "none";
  divGraphNameBar.style.display = "none";

  humidityGraphDiv.style.display = "none";
  cpsGraphDiv.style.display = "none";
  usvGraphDiv.style.display = "none";

  loginModal.style.display = "none";
  registerModal.style.display = "none";
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

  location.reload();
  // displayReset();
}

async function loginBtnBehavior(){ // hành vi của nút login

  const loginModal = document.querySelector('.js-loginModal')

  const divUserName = document.querySelector('.js-form-loginUserName');
  const divPass = document.querySelector('.js-form-loginUserPass');

  let userNameInputVal = divUserName.value;
  let passInputVal = divPass.value;

  stationData = await getUserInfo();
  const mappedArray = stationData.Items;
  const Count = stationData.Count;
  
  for (let i = 0; i < Count; i++){
    if( (mappedArray[i].userName.S == userNameInputVal) && (mappedArray[i].pass.S == passInputVal) ){
      localStorage.setItem('localStorageUserName', userNameInputVal);
      localStorage.setItem('localStoragePass', passInputVal);
      checkLogin();
      loginModal.style.display = "none";
      return 0;      
    }
  }
  alert("Wrong username or password !!!")
  // location.reload();
  // displayReset();
}

async function registerBtnBehavior(){ // hành vi của nút register

  const registerModal = document.querySelector('.js-registerModal')
  

  const divUserName = document.querySelector('.js-form-registerUserName');
  const divPass = document.querySelector('.js-form-registerUserPass');
  const divConfirmPass = document.querySelector('.js-form-registerConfirmPass');

  let userNameInputVal = divUserName.value;
  let passInputVal = divPass.value;
  let confirmPassInputVal = divConfirmPass.value;

  console.log(confirmPassInputVal)
  console.log(passInputVal)

  if(passInputVal == confirmPassInputVal){
    await postUserInfo(userNameInputVal, passInputVal);
    registerModal.style.display = "none";
  }
  else{
    alert("confirm password must be same as password !!!")
  }


  // stationData = await getUserInfo();
  // const mappedArray = stationData.Items;
  // const Count = stationData.Count;
  
  // for (let i = 0; i < Count; i++){
  //   if( (mappedArray[i].userName.S == userNameInputVal) && (mappedArray[i].pass.S == passInputVal) ){
  //     localStorage.setItem('localStorageUserName', userNameInputVal);
  //     localStorage.setItem('localStoragePass', passInputVal);
  //     checkLogin();
  //     loginModal.style.display = "none";
  //     return 0;      
  //   }
  // }
  // alert("Wrong username or password !!!")
  // // location.reload();
  // // displayReset();
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

function showTemperatureGraph(index) { //hiển thị chart
  for (let i = 0; i < graphDiv.length; i++) { // ẩn hết mấy cái ko liên quan đi
    graphDiv[i].style.display = "none";
  }
  temperatureGraphDiv.style.display = "block"; //chỉ hiển thị cái cần
}

function showHumidityGraph(index) { //hiển thị chart
  for (let i = 0; i < graphDiv.length; i++) { // ẩn hết mấy cái ko liên quan đi
    graphDiv[i].style.display = "none";
  }
  humidityGraphDiv.style.display = "block"; //chỉ hiển thị cái cần
}

function showCpsGraph(index) { //hiển thị chart
  for (let i = 0; i < graphDiv.length; i++) { // ẩn hết mấy cái ko liên quan đi
    graphDiv[i].style.display = "none";
  }
  cpsGraphDiv.style.display = "block"; //chỉ hiển thị cái cần
}

function showUsvGraph(index) { //hiển thị chart
  for (let i = 0; i < graphDiv.length; i++) { // ẩn hết mấy cái ko liên quan đi
    graphDiv[i].style.display = "none";
  }
  usvGraphDiv.style.display = "block"; //chỉ hiển thị cái cần
}


////////////////////////////////////////
// lắng nghe

function addListen(){
  // sidebar:
  const reloadBtn = document.querySelector('.js-reloadBtn');

  const sideBarBtn_home = document.querySelector('.js-sideBarBtn_home');
  const sideBarBtn_station = document.querySelector('.js-sideBarBtn_station');
  const sideBarBtn_table = document.querySelector('.js-sideBarBtn_table');
  const sideBarBtn_graph = document.querySelector('.js-sideBarBtn_graph');

  // cập nhật lại tình hình các div
  const loginModal = document.querySelector('.js-loginModal');
  const registerModal = document.querySelector('.js-registerModal');
  const submitModal = document.querySelector('.js-submitModal');
  const submitButton = document.querySelector('.js-submitButton');
  const loginButton = document.querySelector('.js-loginButton');
  const registerButton = document.querySelector('.js-registerButton');
  const StationButton = document.querySelectorAll('.js-stationButton');
  const chartButtons = document.querySelectorAll('.js-chart');
  const closebtn = document.querySelectorAll('.js-close');
  const chartModal = document.querySelectorAll('.js-chartModal');
  const ModalBody = document.querySelectorAll('.js-chartModal-body');

  const temperatureGraphBtn = document.querySelector('.js-temperatureGraphBtn');
  const humidityGraphBtn = document.querySelector('.js-humidityGraphBtn');
  const cpsGraphBtn = document.querySelector('.js-cpsGraphBtn');
  const usvGraphBtn = document.querySelector('.js-usvGraphBtn');

  //
  //mobile
  const homeBtnMobile = document.querySelector('.js-mobile_contentBtn_home');
  const stationBtnMobile = document.querySelector('.js-mobile_contentBtn_station');
  const tableBtnMobile = document.querySelector('.js-mobile_contentBtn_table');
  const graphBtnMobile = document.querySelector('.js-mobile_contentBtn_graph');

  const mobileLogo = document.querySelector('.mobileLogo');
  const mobile_contentBtn = document.querySelector('.mobile_contentBtn');
  const container = document.querySelector('.container');

  mobileLogo.addEventListener('click',()=>{
    mobile_contentBtn.classList.toggle('noneDis');
  });
  
  container.addEventListener('click', ()=> {  // nếu bấm ra ngoài thì cũng đóng form lun nhưng lại dính nổi bọt
    mobile_contentBtn.classList.add('noneDis');
  });

  mobileLogo.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  reloadBtn.addEventListener('click', ()=>{
    localStorage.removeItem("localStorageUserName");
    localStorage.removeItem("localStoragePass");
    location.reload();
  })

  

  sideBarBtn_home.addEventListener('click', ()=>{
    showSidebarHome();
  })
  
  homeBtnMobile.addEventListener('click', ()=>{
    showSidebarHome();
  })

  sideBarBtn_station.addEventListener('click', ()=>{
    showSidebarStation();
  })

  stationBtnMobile.addEventListener('click', ()=>{
    showSidebarStation();
  })

  sideBarBtn_table.addEventListener('click', ()=>{
    showSidebarTable();
  })

  tableBtnMobile.addEventListener('click', ()=>{
    showSidebarTable();
  })

  sideBarBtn_graph.addEventListener('click', ()=>{
    showSidebarGraph();
  })

  graphBtnMobile.addEventListener('click', ()=>{
    showSidebarGraph();
  })

  addStationBtn.addEventListener('click',()=>{
    submitModal.style.display = "flex";
  });

  closeSubmitBtn.addEventListener('click',()=>{
    submitModal.style.display = "none";
  });

  accoutBtn.addEventListener('click',()=>{
    loginModal.style.display = "flex";
  });

  closeLoginBtn.addEventListener('click',()=>{
    loginModal.style.display = "none";
  });

  registerBtn.addEventListener('click',()=>{
    registerModal.style.display = "flex";
  });

  closeregisterBtn.addEventListener('click',()=>{
    registerModal.style.display = "none";
  });
  
  
  submitButton.addEventListener('click', ()=>{
    addStationBtnBehavior();
  });

  loginButton.addEventListener('click', ()=>{
    loginBtnBehavior();
  });

  registerButton.addEventListener('click', ()=>{
    registerBtnBehavior();
  });

  
  temperatureGraphBtn.addEventListener('click', ()=>{
    showTemperatureGraph();
  })

  humidityGraphBtn.addEventListener('click', ()=>{
    showHumidityGraph();
  })

  cpsGraphBtn.addEventListener('click', ()=>{
    showCpsGraph();
  })

  usvGraphBtn.addEventListener('click', ()=>{
    showUsvGraph();
  })




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
  checkLogin()
  // const x = 1686209887641;
  // const current = new Date(); 

  // const date = new Date(x);
  
  var stationData = await getStation();
  var mappedArray = stationData.Items;

  addHtml(mappedArray);
  
  const downloadBtn = document.querySelectorAll('.js-down');

  for (let i = 0; i < mappedArray.length; i++){
    mappedApiArray.push(mappedArray[i].api.S);
    drawChart(arrDivTempHumiChart[i], arrDivRadiChart[i]);

    downloadBtn[i].addEventListener('click', (function(index) {
      return async function() {
        const tApi = await GetData(mappedArray[index].apiDown.S);
        downloadBtnJSON(tApi);
      };
    })(i));
  }

  // const temperatureGraph = drawGraph('js-temperatureGraph', arrStationName, 'Temperature Graph');
  // const humidityGraph = drawGraph('js-humidityGraph', arrStationName, 'Humidity Graph');
  // const cpsGraph = drawGraph('js-cpsGraph', arrStationName, 'Cps Graph');
  // const usvGraph = drawGraph('js-usvGraph', arrStationName, 'uSv Graph');
  const chart = drawGraph1(temperatureIDDiv, tempArrStationInfo, tempTimeCategories,'Temperature')
  const chart1 = drawGraph1(humidityIDDiv, humiArrStationInfo, humiTimeCategories,'Humidity')
  const chart2 = drawGraph1(cpsIDDiv, cpsArrStationInfo, cpsTimeCategories,'Cps')
  const chart3 = drawGraph1(usvIDDiv, usvArrStationInfo, usvTimeCategories,'uSv')
  


  displayReset();

  setInterval( async ()=>{ // lặp lại để hiển thị thời gian thực

    // biến xác định các div trong index.html: '.slider .Station .Station__status'
    const tempDiv = document.querySelectorAll('.js-temperature');
    const humiDiv = document.querySelectorAll('.js-humidity');
    const CpsDiv = document.querySelectorAll('.js-Cps');
    const uSvDiv = document.querySelectorAll('.js-uSv');
    const timeIoTDiv = document.querySelectorAll('.js-time');
    const dayIoTDiv = document.querySelectorAll('.js-day');

    // table:
    const tempTd = document.querySelectorAll('.js-table_temp');
    const humiTd = document.querySelectorAll('.js-table_humi');
    const CpsTd = document.querySelectorAll('.js-table_cps');
    const uSvTd = document.querySelectorAll('.js-table_usv');

    let temperatureArrData = [];
    let humidityArrData = [];
    let cpsArrData = [];
    let usvArrData = [];

    for (let i = 0; i < mappedApiArray.length; i++){
      apiData = await GetData(mappedApiArray[i]);
      DisplayStation(apiData, tempDiv[i], humiDiv[i], CpsDiv[i], uSvDiv[i], dayIoTDiv[i], timeIoTDiv[i]);
      DisplayTable(apiData, tempTd[i], humiTd[i], CpsTd[i], uSvTd[i]);

      addData(drawTempHumiChart[i], apiData.Items[0].temperature.N, apiData.Items[0].humidity.N);
      addData(drawRadiChart[i], apiData.Items[0].cps.N, apiData.Items[0].uSv.N);

      temperatureArrData.push(apiData.Items[0].temperature.N);
      humidityArrData.push(apiData.Items[0].humidity.N);
      cpsArrData.push(apiData.Items[0].cps.N);
      usvArrData.push(apiData.Items[0].uSv.N);
    }
    
    // console.log('test call addGraphData1')
    // addGraphData(temperatureGraph, temperatureArrData);
    // addGraphData(humidityGraph, humidityArrData);
    // addGraphData(cpsGraph, cpsArrData);
    // addGraphData(usvGraph, usvArrData);
    addData1(temperatureArrData, chart, tempArrStationInfo, tempTimeCategories);
    addData1(humidityArrData, chart1, humiArrStationInfo, humiTimeCategories);
    addData1(cpsArrData, chart2, cpsArrStationInfo, cpsTimeCategories);
    addData1(usvArrData, chart3, usvArrStationInfo, usvTimeCategories);
    
  },2000)

}
///////////////////////////////////////////////

main() // gọi hàm main :)

