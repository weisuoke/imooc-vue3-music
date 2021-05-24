import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onUnmounted, onMounted } from 'vue'

// 当content 以及 content 子元素 DOM 改变时，将会触发 scroll 的 refresh 方法
BScroll.use(ObserveDOM)

export default function useScroll (wrapperRef, options) {
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      // 实现自动监听刷新
      observeDOM: true,
      ...options
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
}