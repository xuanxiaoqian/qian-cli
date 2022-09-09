<template>
  <div>
    <img :src="props.src" @click="imgClick" alt="qian-cli图片" />

    <Transition name="modal">
      <div class="enlarge-img" v-if="isShow" @click="isShow = false">
        <img :src="props.src" alt="qian-cli图片" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['src'])

let isShow = ref(false)
const imgClick = () => {
  console.log(1)

  isShow.value = true
}

// 这个组件是图片点击放大的组件
</script>

<style scoped>
.enlarge-img {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(18, 18, 18, 0.65);

  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

</style>
