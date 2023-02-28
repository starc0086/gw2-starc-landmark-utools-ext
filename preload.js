// 引入探索点
const gw2landmark = require("./landmark.json");

// 保存输入的信息
var userInput;

// 保存查询结果
var landmarkQueryResult;

// 保存传送点信息
var landmarkInfo;

// 插件打开时执行
utools.onPluginEnter(({code, type, payload}) => {

  // 设置子输入框
  utools.setSubInput(({ text }) => {
    // 获取子输入框的内容并赋值
    userInput = text;
    
    // 无输入内容时的缺省提示
  }, '你好，指挥官')
})

// 窗口加载后执行
window.onload = function () {

  // 监听键盘按键
  document.addEventListener('keydown', (e) => {

    // 按下回车按键时执行
    if(e.code == "Enter") {

      // 获取查询结果并赋值
      landmarkQueryResult = gw2landmark.landmark.find(funcLandmarkQuery);

      // 赋值前端信息
      funcSetLandmarkInfo(landmarkQueryResult);

      // 获取·传送点信息
      landmarkInfo = '/G1 ' + landmarkQueryResult.landmark_name + ' - ' + landmarkQueryResult.landmark_code + ' - ' + landmarkQueryResult.landmark_map + ' - ' + landmarkQueryResult.landmark_area;
      // 将内容复制到系统剪贴板
      utools.copyText(landmarkInfo);
      // 为显示在UI上做准备
      document.getElementById("landmark").innerText = landmarkInfo;
      // 显示 UI
      funcShow();
    }
  })

  // 表格样式函数
  funcSetTableSytle();
}

// 查询函数
function funcLandmarkQuery(inputLandMark) {

  // 返回查询信息
  return inputLandMark.landmark_name == userInput;

}

function funcSetLandmarkInfo(landmarkQueryResult) {

  document.getElementById("landmark-name").innerText = landmarkQueryResult.landmark_name;
  document.getElementById("landmark-code").innerText = landmarkQueryResult.landmark_code;
  document.getElementById("landmark-map").innerText = landmarkQueryResult.landmark_map;
  document.getElementById("landmark-area").innerText = landmarkQueryResult.landmark_area;

  document.getElementById("queryTips").style.display = "block";
  document.getElementById("queryTips").style.color = utools.isDarkColors() ? 'white' : 'black';

  document.getElementById("landmark").style.display = "block";
  document.getElementById("landmark").style.color = utools.isDarkColors() ? 'white' : 'black';

}

function funcShow() {
  document.getElementById("tabletable").style.display = "block";

  utools.setSubInputValue('');
}

function funcSetTableSytle() {
  var tfrow = document.getElementById('tfhover').rows.length;
  var tbRow = [];
  for (var i = 1; i < tfrow; i++) {
    tbRow[i] = document.getElementById('tfhover').rows[i];
    tbRow[i].onmouseover = function () {
      this.style.backgroundColor = '#f3f8aa';
    };
    tbRow[i].onmouseout = function () {
      this.style.backgroundColor = '#ffffff';
    };
  }
}