<template>
  <div class="a">sfc {{ a }}</div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const a = ref(10);

    setTimeout(() => {
      a.value++
    }, 1000);
    

    return {
      a
    }
  }
}
</script>

<style>
.a {
  font-size: 18px;
}
</style>