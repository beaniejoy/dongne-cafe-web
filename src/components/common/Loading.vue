<template>
  <div 
    v-if="displayLoading" 
    class="loading"
  >
    <v-progress-circular 
      indeterminate 
      color="brown" 
      :size="100"
      :width="10" 
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('common', ['displayLoading'])
  }
}
</script>

<style lang="scss" scoped>
.loading {
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /*z-index: 1000; 기존, 안뜨는 이슈로 수정함 10000 -> 1001*/
  z-index: 1000;
}
</style>