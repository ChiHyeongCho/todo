import { inject } from 'vue'

// 자바스크릷트 sort 같은 경우에는 배열의 각 값을 UTF-8 형식의 스트링으로 변환하여 비교를 수행
// 따라서, [1, 5, 100].sort() => [1, 100, 5] 로 정렬됨
// 비교함수를 만들어서 sort(fnsort) 이런식으로 비교를 해야됨

export const useFilter = () => {
  const today = inject('today_date')
  const fnSort = (a, b) => {
    const a_date = Date.parse(a.date)
    const b_date = Date.parse(b.date)
    if (a_date > b_date) return 1
    else if (a_date < b_date) return 0
    else return a.id - b.id
  }

  //javascript filter
  // const numbers = [1, 2, 3, 4, 5];
  // const result = numbers.filter(number => number > 3);
  // console.log(numbers); => [1, 2, 3, 4, 5];
  // console.log(result); => [4, 5]

  const getPendingTodos = (todos) => {
    return todos.value
      .filter((todo) => !todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getActiveTodayTodos = (todos) => {
    return todos.value
      .filter((todo) => !todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getCompletedTodayTodos = (todos) => {
    return todos.value
      .filter((todo) => todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getAllTodayTodos = (todos) => {
    return getActiveTodayTodos(todos)
      .concat(getCompletedTodayTodos(todos))
      .slice()
      .sort(fnSort)
  }

  const getAllTodos = (todos) => {
    return todos.value.slice().sort(fnSort)
  }

  return {
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  }
}