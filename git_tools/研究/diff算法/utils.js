// dom类
class CreateElement {
  constructor(type, attrObj = {}, children = []) {
    this.type = type;
    this.attrObj = attrObj;
    this.children = children;
  }
}

// 创建一个type类
function createElement ({ type, attrObj, children = "" }) {
  return new CreateElement(type, attrObj, children);
}

// 设置属性和value
function setAttr (node, key, value) {
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
function createVirtualDom (virtual) {
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
function render (virtualDom) {
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
function renderDom (dom, parent) {
  parent.appendChild(dom);
}

// diff部分 =====================================================================

// 声明补丁常量
const REPLACE = 'REPLACE', TEXT = 'TEXT', UPDATE = 'UPDATE', REMOVE = 'REMOVE'

// 判断节点是否为CreateElement创建的节点
function isElement (node) {
  return node instanceof CreateElement;
}

// diff 
function diff (oldNode, newNode, index, patches) {
  // 先创建个补丁包
  let patch = [];
  // 比较新旧节点
  // 1. 判断是否是CreateElement 创建的节点
  if (isElement(oldNode) || isElement(newNode)) {
    // 2.比较节点类型
    if (oldNode?.type === newNode?.type) {
      // 3.比较属性
      let attrPatch = diffAttrs(oldNode.attrObj, newNode.attrObj);
      //  如果有不同的属性，添加到补丁包里
      if (Object.keys(attrPatch).length > 0) {
        patch.push({ type: UPDATE, attrPatch })
      }
      // 4. 比较子节点
      diffChildren(oldNode.children, newNode.children, patches)
    } else {
      // 节点不同，替换节点
      patch.push({ type: REPLACE, newNode })
    }
  } else {
    // 两者都不是对象节点 直接比较
    // 判断 新节点是否存在
    if (newNode === undefined) {
      patch.push({ type: REMOVE })
    } else if (newNode !== oldNode) {
      patch.push({ type: TEXT, text: newNode })
    }
  }
  if (patch.length > 0) {
    patches[index] = patch;
  }
}

/**
 * diff比较属性
 */
function diffAttrs (oldAttrs, newAttrs) {
  // 创建补丁包
  let patch = {};
  // 判断新属性 对 老属性的变化
  for (let oldKey in oldAttrs) {
    if (oldAttrs[oldKey] !== newAttrs[oldKey]) {
      patch[oldKey] = newAttrs[oldKey]
    }
  }
  // 判断新增加的属性
  for (let newKey in newAttrs) {
    if (!oldAttrs.hasOwnProperty(newKey)) {
      patch[newKey] = newAttrs[newKey]
    }
  }
  console.log(patch, 'patch');
  return patch
}

/**
 * diff 比较子节点
 */
function diffChildren (oldChildren, newChildren, patches) {
  let children = oldChildren.length - newChildren.length > 0 ? oldChildren : newChildren;
  children.forEach((oldItem, idx) => {
    diff(oldChildren[idx], newChildren[idx], ++Index, patches)
  })
}