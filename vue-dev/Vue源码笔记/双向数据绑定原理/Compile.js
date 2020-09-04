class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      // 2-1.将 el节点内的所有 DOM移动到内存中（性能优化）
      let fragment = this.node2fragment(this.el);
      // 2-2 模板编译 提取元素节点 v-model 和 文本节点 {{}}
      this.compile(fragment, this.el);
      this.el.appendChild(fragment);
    }
  }
  isElementNode(node) {
    // console.log(node, node.nodeType);
    return node.nodeType === 1;
  }
  node2fragment(el) {
    let fragment = document.createDocumentFragment();
    // let fragment2 = document.createDocumentFragment()
    let firstChild;
    // const childrenArr = el.children;
    // console.log(fragment, el.children)
    // for (let index = 0; index < childrenArr.length; index++) {
    //   fragment.appendChild(childrenArr[index])
    // }
    // 此处进行了两步操作，首先是赋值地址，然后是比较 firstChild是否为 true
    // 其次 appendChild是移动，因为此处赋值的是地址，所以在移动时会移动走此处 el的 firstChild
    // 直到最后一个 子元素被移动走 el.firstChild为 null 结束循环
    // 节点会 先拿 tag标签 <div>123</div>
    // 然后 拿到里边 textContent的 123，然后是换行符
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  compile(fragment) {
    //拿到所有子节点
    let childNodes = fragment.childNodes; //伪数组
    Array.from(childNodes).forEach((node) => {
      // 2-3. 因为 node2fragment 会带有换行或空行所以需要过滤进行分别调用
      if (this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node); //递归至所有节点，指导只剩下 text类型
        // console.log(node);
      } else {
        this.compileText(node);
      }
    });
  }
  compileElement(node) {
    /*辅助的方法 得到所有 v- 的指令*/
    function isDirective(name) {
      return name.includes("v-");
    }
    let attrs = node.attributes; //attributes的伪数组
    //遍历 DOM上所有的 属性拿到 v- 的指令
    Array.from(attrs).forEach((attr) => {
      let attrName = attr.name;
      // 2-4. 得到 v- 指令的 key和value （区分指令的作用）
      // 根据后边的 model或其他值 进行 compileUtil工具函数调用
      if (isDirective(attrName)) {
        let expr = attr.value;
        let [, type] = attrName.split("-");
        // console.log(type, expr);
        compileUtil[type](node, this.vm, expr);
      }
    });
  }
  compileText(node) {
    // 2-5. 如果文本中有 {{}} 调用 compileUtil工具函数
    let expr = node.textContent;
    // console.log(node, expr);
    let reg = /\{\{([^}]+)\}\}/g; // 正则是否包含{{}}
    if (reg.test(expr)) {
      compileUtil["text"](node, this.vm, expr);
    }
  }
}

const compileUtil = {
  text(node, vm, expr) {
    // 文本处理
    let updateFn = this.updater["textUpdater"];
    let value = this.getTextVal(vm, expr);
    expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1], (newValue) => {
        // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
        updateFn && updateFn(node, this.getTextVal(vm, expr));
      });
    });

    updateFn && updateFn(node, value); // node.textContent = value;
  },
  model(node, vm, expr) {
    // 输入框处理
    let updateFn = this.updater["modelUpdater"];
    new Watcher(vm, expr, (newValue) => {
      // 当值变化后会调用cb 将新的值传递过来
      updateFn && updateFn(node, newValue);
    });
    node.addEventListener("input", (e) => {
      let newValue = e.target.value;
      // 监听输入事件将输入的内容设置到对应数据上
      this.setVal(vm, expr, newValue);
    });

    // 这里应该加一个监控 数据变化了 应该调用这个watch的callback
    // 如果是 model的形式 .需要多进行一步分割，然后再替换{{值}}
    updateFn && updateFn(node, this.getVal(vm, expr)); // node.value = value;
  },
  setVal(vm, expr, value) {
      expr = expr.split(".");
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        return (prev[next] = value);
      }
      return prev[next];
    }, vm.$data);
  },

  getTextVal(vm, expr) {
    let res = expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      // 依次去去数据对应的值
      return this.getVal(vm, arguments[1]); // arguments[1]是，message.b.c
    });

    return res;
  },
  getVal(vm, expr) {
      expr = expr.split(".");
    // {{message.a}}{{message.b.c}}
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data); //相当于 vm.$data[prev[next]]
  },
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    },
  },
};
