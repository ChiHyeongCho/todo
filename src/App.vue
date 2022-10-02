<template>
  <header>
    <!-- HTML <hgroup> 요소는 문서 구획의 다단계 제목을 나타냄 -->
    <div class = "my-2">
      <h1> TO-DO </h1>
      <!-- <em> 태그는 강조된 텍스트(emphasized text)를 표현할 때 사용 -->
      <em> {{ today_date }} {{today_time}} </em>
    </div>
  </header>

  <todo-list-container />

</template>


<script>
import { inject } from 'vue';
import TodoListContainer from './components/TodoListContainer.vue';

export default {
  name: 'App',
  components: { TodoListContainer },

  setup(){
    const today_date = inject('today_date')
    const today_time = inject('today_time')
    return {
          today_date,
          today_time
    }
  }
}
</script>


<style scoped>
hgroup {
  text-align: center;
  font-family:'Arial Bold';
}

hgroup h1 {
  font-weight: bolder;
}
</style>