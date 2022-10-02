<template>
    <todo-list-menu v-on:change-filter="onChangeFilter" class="p-3" />
        
        <div v-for="key in Object.keys(filtered_todos)" :key="key" class="mb-3">
            <div v-if="use_category">
                <em>{{ key }}</em>
            </div>

            <todo-list :data="filtered_todos[key]" />
        </div>

        <div class="mt-5 text-start p-3">
            <span style="background-color: red">&nbsp;</span>&nbsp;
            <strong>처리하지 못한 작업들</strong>
        </div>

    <todo-list :data="pending_todos" />
</template>

<script>
import { ref, provide, inject, watch } from 'vue'
import { useFilter } from '../compositions/filters'
import TodoListMenu from './TodoListMenu.vue'
import TodoList from './TodoList.vue'
export default {
    name: 'TodoListMain',
    components: { TodoList,
                  TodoListMenu,
                },
    setup(props) {
        const {
            getPendingTodos,
            getActiveTodayTodos,
            getCompletedTodayTodos,
            getAllTodayTodos,
            getAllTodos,
            } = useFilter()

        const filter = ref(0)
        const filtered_todos = ref([])
        const pending_todos = ref([])
        const use_category = ref(true)
        const todos = inject('todos')
        
        const filters = {
        0: {
          str: '해야 할 작업들',
          func: getActiveTodayTodos,
          category: true,
           },
        1: {
          str: '완료한 작업들',
          func: getCompletedTodayTodos,
          category: true,
           },
        2: {
          str: '오늘의 모든 기록',
          func: getAllTodayTodos,
          category: true,
           },
        3: {
          str: '모든 작업',
          func: getAllTodos,
          category: true,
           },
        }

        provide('filters', filters)

        const groupBy = (todos) => {
            return todos.reduce((acc, cur) => {
            acc[cur['date']] = acc[cur['date']] || []
            acc[cur['date']].push(cur)
            return acc
            }, {})
        }
        const onChangeFilter = (filter_idx) => {
            filter.value = Number(filter_idx)
        } 
        
        watch(
            [() => filter.value, todos.value],
            ([new_filter, new_todos], [old_filter, old_todos]) => {
            pending_todos.value = getPendingTodos(todos)
                if (typeof new_filter != 'undefined') {
                    let temp_todos = filters[new_filter].func(todos)
                    filtered_todos.value = groupBy(temp_todos)
                    console.log(filtered_todos.value)
                    use_category.value = filters[new_filter].category
                }
            },
            { immediate: true }
         )
        return {
            filter,
            pending_todos,
            filtered_todos,
            use_category,
            onChangeFilter,
        }
    },
 }
  </script>