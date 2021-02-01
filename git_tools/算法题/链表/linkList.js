// 实现node节点类
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkList {
  constructor(list) {
    this.size = 0;
    this.linkList = this.saveLinkList(list);
  }
  // 数组转链表
  saveLinkList(list = []) {
    let shaoBin = new Node('哨兵'),
      current = shaoBin;
    list.forEach((val) => {
      current = current.next = new Node(val);
    });
    this.size = list.length;
    return shaoBin;
  }

  getIndex(val) {
    let current = this.getLinkList(),
      count = 0;
    while (current) {
      if (JSON.stringify(current.value) === JSON.stringify(val)) {
        return count;
      }
      current = current.next;
      count++;
    }
  }

  get(index) {
    let current = this.getLinkList(),
      count = 0;
    while (current) {
      if (index === count) {
        return current;
      }
      current = current.next;
      count++;
    }
  }

  remove(index) {
    let current = this.linkList.next,
      prev = this.linkList,
      count = 0;
    while (current) {
      if (index === count) {
        let node = current.next;
        prev.next = node;
        --this.size;
        return true;
      }
      current = current.next;
      prev = prev.next;
      count++;
    }
    return false;
  }

  add() {}

  // 遍历
  each(
    fn = (val, index, ll) => {
      console.log(val, index, ll);
    },
  ) {
    let current = this.getLinkList(),
      result = this.getLinkList(),
      index = 0;
    while (current) {
      fn && fn(current.value, index++, result);
      current = current.next;
    }
  }

  // 获取节点数
  getSize() {
    return this.size;
  }

  // 获取链表
  getLinkList() {
    return this.linkList.next;
  }

  // 末尾加一个节点
  push(val) {
    let current = this.linkList;
    while (current.next) {
      current = current.next;
    }
    current.next = new Node(val);
    return ++this.size;
  }

  // 弹出尾节点
  pop() {
    let current = this.linkList,
      count = 0;
    while (count !== this.size - 1) {
      current = current.next;
      count++;
    }
    let node = current.next;
    current.next = null;
    --this.size;
    return node;
  }

  // 添加头结点
  unshift(val) {
    let current = this.linkList,
      node = new Node(val);
    node.next = current.next;
    current.next = node;
    return ++this.size;
  }

  // 弹出头结点
  shift() {
    let current = this.linkList;
    let node = current.next;
    current.next = node.next;
    --this.size;
    return (node.next = null), node;
  }
}

let ll = new LinkList(Array.from({ length: 9 }, (_, index) => index + 1));

console.log(ll.getLinkList(), 'linkList');
