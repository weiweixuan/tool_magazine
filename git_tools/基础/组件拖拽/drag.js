function dragHanddle(zjFather, emptyDom) {
  let dragItem = null, //第一次添加到组件里
    changeItem = null, //交换组件里的位置
    fatherIsAdd = true //父组件是否执行drop事件
  let addList = []
  // 为可选择的组件添加事件
  function addDragHandle([...childList]) {
    childList.forEach(item => {
      item.addEventListener('dragstart', function() {
        dragItem = this
        changeItem = null
        fatherIsAdd = true
      })
    })
  }
  emptyDom.addEventListener('dragover', e => {
    e.preventDefault()
  })
  emptyDom.addEventListener('drop', function() {
    if (!dragItem || !fatherIsAdd) return
    let newItem = dragItem.cloneNode(true)
    addListener(newItem)
    addList.push(newItem)
    dragItem = null
    render()
  })

  // 为添加过的组件注册事件方便后期交互数据
  function addListener(newItem) {
    newItem.addEventListener('dragstart', function() {
      dragItem = null
      changeItem = this
      fatherIsAdd = true
    })

    newItem.addEventListener('dragover', e => {
      e.preventDefault()
    })
    newItem.addEventListener('drop', function() {
      // 添加
      if (dragItem) {
        let newItem = dragItem.cloneNode(true)
        addListener(newItem)
        let index = addList.indexOf(this)
        addList.splice(index + 1, 0, newItem)
        render()
      }
      // 交换
      if (changeItem) {
        let beforeIndex = addList.indexOf(changeItem),
          nextIndex = addList.indexOf(this)
        addList[beforeIndex] = this
        addList[nextIndex] = changeItem
        render()
      }
      changeItem = null
      dragItem = null
      fatherIsAdd = false
    })

    // 添加点击事件，删除元素
    newItem.addEventListener('click', function(e) {
      e.stopPropagation()
      let className = this.className
      if (className.indexOf('active') != -1) {
        let index = addList.indexOf(this)
        addList.splice(index, 1)
        render()
      } else {
        this.className = this.className + ' active'
      }
    })
  }

  // 父组件添加点击事件，取消删除
  emptyDom.addEventListener('click', e => {
    addList = addList.map(item => {
      item.className = item.className.replace(' active', '')
      return item
    })
    render()
  })
  // 容器渲染列表
  function render() {
    emptyDom.innerHTML = ''
    let Fragment = document.createDocumentFragment()
    addList.forEach(item => {
      Fragment.appendChild(item)
    })
    emptyDom.appendChild(Fragment)
  }

  addDragHandle(zjFather)
}
