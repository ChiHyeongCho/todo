<template>
    <section>
      <div class="container">
        <div class="row justify-content-center m-2">
          <div class="col border border-secondary rounded">

            <!-- v-model Form 요소를 개발할 때 사용하며, 입력 값이 자동으로 뷰 데이터 속성에 연결
                 v-bind와 v-on의 기능의 조합으로 동작
                 - v-bind : 뷰 인스턴스의 데이터 속성을 해당 HTML 요소에 연결할 때 사용
                 - v-on : 해당 HTML 요소의 이벤트를 뷰 인스턴스의 로직과 연결할 때 사용
            -->

            <input
              type="text"
              id="todo_input"
              class="form-control my-2"
              v-model="job"
              placeholder="여기에 할일을 적으세요"
            />
            
            <div class="row my-2 justify-content-end">
                <div class="col-6">
                    <input type="date" v-model="date" :min="today" style='text-align:center'/>

                    <button
                    type="button"
                    class="btn btn-success btn-sm float-end"
                    @click="onAddTodo"
                    >
                    작업추가
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    import { reactive, toRefs, inject } from 'vue'
    export default {
      name: 'TodoListNew',
      setup() {
        
        const today_date = inject('today_date')
        const addTodo = inject('addTodo')
        const val_obj = reactive({
          job: '',
          date: '',
          today: today_date,
        })       

        const onAddTodo = () => {
          if (val_obj.job.length > 0) {
            addTodo(val_obj.job, val_obj.date)
            val_obj.job = ''
            val_obj.date = ''
          }
        }
        return {
          ...toRefs(val_obj),
          onAddTodo,
        }
      },
    }
    </script>
    Footer