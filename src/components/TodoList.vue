<template>
    <main>

      <!-- v-for 디렉티브 : 자바스크립에서 선언한 배열을 활용해서, 앨리먼트와 그 자식 노드들은 반복문 횟수만큼 생성
      -->
      <div v-for="(todo, idx) in data" :key="todo.id">
        <div class="input-group my-2 input-group-sm">

          <!-- 이벤트란 : 웹 브라우저가 알려주는 HTML 요소에 대한 사건의 발생을 의미
                        자바스크립트는 이렇게 발생한 이벤트에 반응하여 특정 동작을 수행할 수 있음
                        따라서 클라이언트 측 자바스크립트를 비동기식 이벤트 중심(event-driven) 프로그래밍 모델이라고 부름
          -->

          <!-- v-on(@) 디렉티브 : HTML태그 및 사용자가 만든 컴포넌트에서 발생된 이벤트를 캡쳐할 때 사용 (이벤트와 뷰 인스턴스의 로직과 연결)
               v-on:click="스크립트 및 함수 호출"
               @click="스크립트 및 함수 호출"
          -->
          <div class="input-group-text">
            <input
              class="form-check-input mt-0"
              type="checkbox"
              :checked="todo.completed"
              :disabled="todo.completed"
              @click="completeTodo(todo.id)"
            />
          </div>

          <div class="input-group-text">
            <input
              class="form-input mt-0"
              type="date"
              :min="today"
              disabled
              :value="todo.date"
            />
          </div>

          <input type="text" class="form-control" :value="todo.job" />
          <button
            class="btn btn-outline-success dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            할일 관리
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li v-for="item in menu" :key="item.str">
              <a class="dropdown-item" @click="item.func(todo.id)">{{
                item.str
              }}</a>
            </li>
          </ul>
        </div>

        <!-- v-if vs v-show 
        v-if 는 조건이 변경되면 DOM 앨리먼트를 처음부터 다시 그림.
        v-show 는 모든 조건의 DOM 앨리먼트를 그린후 조건에 맞지 않는 앨리먼트는 Hide함 (자주 변경될 시, 사용)
        -->
        <div v-show="idx + 1 < data.length" class="col border border-second" />
      
      </div>
    </main>
  </template>
  
  <script>
  import { inject } from 'vue'
  export default {
    name: 'TodoList',

    // Props는 컴포넌트에 데이터를 넘겨줄 수 있는 사용자 지정 속성
    props: {
      data: {
        type: Array,
        default: [],
      },
    },
    setup() {

      const today = inject('today_date')

      const removeTodo = inject('removeTodo')
      const completeTodo = inject('completeTodo')
      
      const menu = [
        {
          str: '할일 삭제',
          func: removeTodo,
        },
        {
          str: '할일 완료',
          func: completeTodo,
        },
      ]
      return {
        menu,
        today,
        completeTodo,
      }
    },
  }
  </script>