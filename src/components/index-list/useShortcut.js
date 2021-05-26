import { ref, computed } from 'vue'

export default function useShortcut (props, groupRef) {
  const ANCHOR_HEIGHT = 20
  const scrollRef = ref(null)

  const shortcutList = computed(() => {
    return props.data.map(group => {
      return group.title
    })
  })

  const touch = {}

  function onShortcutTouchStart (e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove (e) {
    touch.y2 = e.touches[0].pageY
    // 手指实时移动的位置减去开始的位置就是手指y方向偏移的距离
    // 然后除以一个触发点的高度（右侧缩略导航li的一个高度）就是手指偏移了几个楼层 3.11 | 0 向下取整（Math.floor ）
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }

  function scrollTo (index) {
    if (isNaN(index)) {
      return
    }

    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
