---
title: 移动端问题汇总
---

## 关于 `<input />`

### 1. reset input styles

```css
.input-reset {
    -webkit-appearance: none;  // 去除系统默认的 input 样式
    outline: none;             // 去除 input 轮廓
}
```

以解决 input 在 iOS 中自带阴影的问题。

![](/images/WX20190906-130809.png)

### 2. input 内容及 placeholder 垂直居中

```css
.input-vertical-center {
  padding: 12px;
  font-size: 12px;
  line-height: 12px;

  &::-webkit-input-placeholder {
    line-height: normal;
  }
}
```

若改变了 input 的 `line-height`，须同时修改 placeholder 的 `line-height`，使得 input内容、placeholder、光标 三者垂直居中。

- Bad Example(问题复现))

```html
<input class="input-vertical-center" />

<style>
  .input-vertical-center {
    padding: 12px;
    font-size: 12px;
    line-height: 12px;
  }
</style>
```

![](/images/WX20190906-130809.png)

### 3. 在移动端只调起数字键盘

常用于纯数字，如手机号输入

```html
<input type="number" pattern="[0-9]*" />
```

### 4. iOS中点击 input，键盘将页面顶起后不回弹

通过监听 input blur 事件，手动的设置 `window.scrollTo(0, 0)`

```jsx
class EnhancedInput extends React.PureComponent {
  handleBlur = () => {
    // TODO: 通过控制 scrollTo 速度，实现更好的回弹效果
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <input onBlur={this.handleBlur} />
    );
  }
}
```

针对多个 input 的情况，配合`setTimeout`使用，效果更佳。

```jsx
class EnhancedInputGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  handleBlur = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }

  handleFocus = () => {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        <input onBlur={this.handleBlur} onFocus={this.handleFocus} />
        <input onBlur={this.handleBlur} onFocus={this.handleFocus} />
        <input onBlur={this.handleBlur} onFocus={this.handleFocus} />
        <input onBlur={this.handleBlur} onFocus={this.handleFocus} />
        <input onBlur={this.handleBlur} onFocus={this.handleFocus} />
      </div>
    );
  }
}
```

To Be Continue...