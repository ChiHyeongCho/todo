
// 가장 먼저 실행되는 javascript 파일 (index.html에서 script 처리되어 있음)

import { createApp, VueElement } from 'vue'
import App from './App.vue'
import './index.css'

// main.js에서 import를 하면 애플리케이션 모든 영역에서 import한 기능을 사용할 수 있음
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js'
import { ref } from 'vue'

// 컴포넌트 시스템은 하나의 커다란 애플리케이션을 작은 요소로 분해해 은닉화 하고 재사용성을 가지게 함.
// 하나의 애플리케이션은 createApp함수를 이용해 생성된 Vue 애플리케이션 인스턴스를 참조해야함.
const app = createApp(App)

// var d= new Date(); // => Tue Feb 07 2020 23:25:32 GMT+0900 (KST)
// var ISOData = d.toISOString(); // 출력형태 2020-02-06T13:39:45.148Z (UTC timezone 기준으로 포맷) 
// var ISODate = ISOData.split("T",1); // 출력형태 2020-02-06
// 따라서 offset을 추가하여 시간대를 맞춤
const today_date = ref();
const today_time = ref();

function getTodayKor() {

    var d = new Date()
    var timezoneOffset = new Date().getTimezoneOffset() * 60000;
    var timezoneDate = new Date(Date.now() - timezoneOffset);

    var date = timezoneDate.toISOString().substring(0, 10)
    var time = timezoneDate.toISOString().substring(11, 19)

    today_date.value = date;
    today_time.value = time;

    setTimeout(getTodayKor, 1000)
}


getTodayKor()

app.provide('today_date', today_date)
app.provide('today_time', today_time)

app.mount('#app')

