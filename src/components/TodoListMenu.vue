<template>
    <div class="row">
        <div class="col text-start">
            <span style="background-color: blue">&nbsp;</span>&nbsp;
            <strong> {{ state }}</strong>
        </div>
      
        <div class="col">
            <div class="btn-group float-end">
                <button
                    class="btn btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    
                >
                    리스트 필터
                </button>
                <!-- dropdown-menu-end 왼쪽으로 dropdown 메뉴가 나옴-->
                <!-- object.keys 는 주어진 객체의 속성 이름들을 일반적인 반복문과 동일한 순서로 순회되는 열겨할 수 있는 배열로 반환-->
                <ul class="dropdown-menu dropdown-menu">
                    <li v-for="key in Object.keys(filters)" :key="key">
                    <a class="dropdown-item" @click="filter = key">{{
                        filters[key].str
                    }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
  import { ref, watch, computed, inject } from 'vue'
  export default {
    name: 'TodoListMenu',

    // emits : 사용자 이벤트를 생성 
    emits: ['change-filter'],
    setup(props, context) {
      const filters = inject('filters')
      const filter = ref(0)
      
      // computed : 원하는 대로 데이터를 변경하게 해줌 (변경사항이 없으면 캐시에서 값을 가져옴)
      const state = computed(() => {
        return filters[filter.value].str
      })

      // watch : 데이터 변화를 감지하여 사용자가 지정한 콜백함수를 호출할 수 있게 해주는 기능
      watch(
        () => filter.value,
        (filter) => {
            //context.emit은 부모 컴포넌트에게 값을 전달
            context.emit('change-filter', filter)
        }
      )
      return {
        state,
        filter,
        filters,
      }
    },
  }
 </script>