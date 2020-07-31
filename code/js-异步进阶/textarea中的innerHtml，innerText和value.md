### 记录今天所遇到textarea标签取值的问题
首先创建一个```textarea```标签

```html
<textarea id="textareaTest"   cols="30" rows="10">我是初始化文本</textarea>
```

此时分别```console.log```打印```innerText```,```innerHtml```,```value```

```javascript
    console.log('innerText:',textareaTest.innerText)  //innerText: 
    console.log('innerHTML:',textareaTest.innerHTML)   //innerHTML: 我是初始化文本
    console.log('value:',textareaTest.value)         //value: 我是初始化文本
```
发现默认写入的字符串也给```textarea```中的```value```进行赋值，界面中的文本框和控制台内```textarea```标签中也有默认文本

接下来我们在有默认值“我是初始化文本”的情况下分别对```innerText```,```innerHtml```,```value```进行赋值操作看看变化
##### innerText
```javascript
    textareaTest.innerText = 'innerText'
    console.log('innerText:', textareaTest.innerText)  //innerText: 
    console.log('innerHTML:', textareaTest.innerHTML)   //innerHTML: innerText
    console.log('value:', textareaTest.value)         //value: innerText
```

##### innerHtml
```javascript
    textareaTest.innerHtml = 'innerHtml'
    console.log('innerText:', textareaTest.innerText)  //innerText: 
    console.log('innerHTML:', textareaTest.innerHTML)   //innerHTML: innerHtml
    console.log('value:', textareaTest.value)         //value: innerHtml
```
##### value
```javascript
    textareaTest.value = 'value'
    console.log('innerText:', textareaTest.innerText)  //innerText: 
    console.log('innerHTML:', textareaTest.innerHTML)   //innerHTML: 我是初始化文本
    console.log('value:', textareaTest.value)         //value: value
```
此时我们再次进行```innerHtml```和```innerText```赋值
```javascript
    textareaTest.innerHtml = 'innerHtml'
    console.log('innerText:', textareaTest.innerText)  //innerText: 
    console.log('innerHTML:', textareaTest.innerHTML)   //innerHTML: innerHtml
    console.log('value:', textareaTest.value)         //value: value
```
```javascript
    textareaTest.innerText = 'innerText'
    console.log('innerText:', textareaTest.innerText)  //innerText: 
    console.log('innerHTML:', textareaTest.innerHTML)   //innerHTML: innerText
    console.log('value:', textareaTest.value)         //value: value
```
```javascript
    textareaTest.value = '我是新value'
    console.log('innerText:', textareaTest.innerText)  //innerText: 
    console.log('innerHTML:', textareaTest.innerHTML)   //innerHTML: innerText
    console.log('value:', textareaTest.value)         //value: 我是新value  
    //value又再次被赋值
```
发现虽然```innerHtml```一直在变化但是```innerText```从没有改变过，且```value```在做完```value```赋值后就无法通过```value```赋值外的方法改变

### 一句话总结：

由上可见Chrome中对```textarea```进行```innerText```取赋操作均无效(IE有效)


且当我们在没有对```textarea```的```value```进行操作前，对```innerHtml```和```innerText```进行字符串赋值，则```textarea```的```value```就有了一个默认的值，并且可以通过```innerHtml```和```value```来获取，可当对```value```进行操作后(文本框写入也是操作```value```)，```innerHtml```和```innerText```则不会再对```value```进行赋值，且文本框优先显示```value```中的内容

#### 注：以上测试均在chrome浏览器中进行，伟大的IE则是赋值一个改变所有