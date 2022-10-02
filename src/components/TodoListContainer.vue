
<!-- 실제 HTML 태그가 들어가는 템플릿 -->
<template>

    <todo-list-new />

    <!-- 
    <article> tag는 문서 혹은 요소가 독립적으로 존재할 수 있을 때 사용
    <section> tag는 논리적으로 관계 있는 문서 혹은 요소를 분리할 때 사용
    <div> 요소간 논리적 관계와는 상관없이 요소를 나눠야 할 필요가 있을 경우 사용
    -->
    <section class="container"> 
        <div class = "row m-2">
            <todo-list-main />
        </div>
    </section>

</template>

<!-- 스크립트를 정의하는 부분 -->
<script>

import { ref, readonly, provide} from 'vue'
import TodoListNew from './TodoListNew.vue'
import TodoListMain from './TodoListMain.vue'
import { useStorage } from '../compositions/stoage'

// export default 된 부분이 외부에서 import로 사용할 수 있음.
export default {
    components: { TodoListNew, 
                  TodoListMain    
                },
  
    name:'TodoListContainer',
    // 자바스크립트로 코드를 작성하고, 리턴값을 주는 함수
    setup() {

        // const : 변수 재선언, 재할당 모두 불가능하나 배열 및 객체의 값은 변경 가능
        // ref : 내부에 값을 가지고 반응적이고 변경 가능한 ref 반응형 객체를 반환, ref 객체에는 .value 속성을 통해 값을 자유롭게 변경 가능
        const todos = ref([])
        const {saveTodos, storage_id} = useStorage();

        provide('todos', readonly(todos))

        // push : 배열의 끝에 요소를 추가 
        const addTodo = (job, date) => {
            todos.value.push({
                id : storage_id.value++,
                job : job,
                date : date,
                completed : false,
            })
            saveTodos(todos)
        }

        const removeTodo = (id) => {
            // slice는 복사본을 새로운 배열 객체로 반환 / splice는 배열의 기존요소를 삭제, 교체 
            // slice() : var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] -> var arr1 = arr.slice(3, 5); => [4, 5]
            // splice() arr.splice(3, 4) ==> [4, 5, 6 ... ] 
            todos.value.splice(id, 1)
            
            // forEach : current value, index, array 매개변수와 함께 배열의 각 요소에 적용하게 될 콜백 함수를 전달
            todos.value.forEach((todos, index) => {
                todos.id = index
            })
            saveTodos(todos)
        }

        const completeTodo = (id) => {
            todos.value.find((todos) => todos.id == id).completed = true
            saveTodos(todos)
        }

        provide('addTodo', addTodo)
        provide('removeTodo', removeTodo)
        provide('completeTodo', completeTodo)

    }
}



</script>