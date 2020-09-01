// dom类
class CreateElement {
  constructor(type, attrObj = {}, children = []) {
    this.type = type;
    this.attrObj = attrObj;
    this.children = children;
  }
}

// 创建一个type类
function createElement({ type, attrObj, children = "" }) {
  return new CreateElement(type, attrObj, children);
}

// 设置属性和value
function setAttr(node, key, value) {
  switch (key) {
    case "value":
      if (
        node.tagName.toUpperCase() === "INPUT" ||
        node.tagName.toUpperCase() === "TEXTAREA"
      ) {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

// 生成虚拟dom
function createVirtualDom(virtual) {
  // 文本节点
  if (typeof virtual === "string") {
    return virtual;
  }
  let vDom = createElement(virtual);
  vDom.children = virtual.children
    ? virtual.children.map((child) => createVirtualDom(child))
    : [];
  return vDom;
}

// 渲染
function render(virtualDom) {
  let dom = document.createElement(virtualDom.type);
  for (let key in virtualDom.attrObj) {
    setAttr(dom, key, virtualDom.attrObj[key]);
  }
  for (item of virtualDom.children) {
    let node;
    if (item instanceof CreateElement) {
      node = render(item);
    } else {
      node = document.createTextNode(item);
    }
    dom.appendChild(node);
  }
  return dom;
}

// 挂载真实dom
function renderDom(dom, parent) {
  parent.appendChild(dom);
}
