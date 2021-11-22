---
title: 移动端问题汇总
date: 2019-09-06
---

## 关于 `<input />`

### 1. reset input styles

```css
.input-reset {
  -webkit-appearance: none;  // 去除系统默认的 input 样式
  outline: none;             // 去除 input 轮廓
}
```

<!-- more -->

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

### 3. 调起数字键盘

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

### 5. 过滤输入中的表情/限制输入长度

```tsx
interface OwnerProps {
  maxLength?: number;
  onChange?: (value) => any;
}

class EnhancedInput extends React.PureComponent<OwnerProps> {
  private typing: boolean = false;
  private inputRef = null;

  constructor(props) {
    super(props);
  }

  getInputRef = node => {
    this.inputRef = node;
  }

  handleChange = e => {
    if (this.typing) {
      return;
    }
    // 过滤`粘贴`中的表情
    this.filterValue(e.target.value);
  }

  handleCompositionStart = () => {
    this.typing = true;
  }

  handleCompositionEnd = e => {
    // 处理键盘输入
    this.typing = false;
    this.filterValue(e.target.value);
  }

  filterValue = (value: string) => {
    const { maxLength } = this.props;
    valur = this.filterEmoji(value);

    if (maxLength) {
      value = value.slice(0, maxLength);
    }

    // TODO: 可过滤其他内容

    this.inputRef.value = value;
    this.onChange && this.onChange(value);
  }

  // 过滤表情等非法字符
  filterEmoji = (value: string): string => {
    const reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\n]/g;
    if (value.match(reg)) {
      value = value.replace(reg, '');
    }
    return value;
  }

  render() {
    return (
      <input
        ref={this.getInputRef}
        onChange={this.handleChange}
        onCompositionStart={this.handleCompositionStart}
        onCompositionEnd={this.handleCompositionEnd} />
    );
  }
}
```

## iOS 兼容性问题

### 1. 兼容刘海屏

```css
body {
  padding-top: constant(safe-area-inset-top);
  padding-left: constant(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

使用 Safari 提供的 `safe-area-inset-xxx` css属性，给页面添加刘海屏边距；建议只给需要适配刘海屏的页面添加此属性。

### 2. 页面弹性滚动

```css
body {
  -webkit-overflow-scrolling: touch;
}
```

## 性能优化

### 1. 图片加载渲染优化

由于网络原因，图片的加载往往晚于整体框架的渲染，在此过程中，容易出现页面闪烁的情况，究其原因在于图片加载完成后引起了页面的重流。为了提高用户体验，建议在使用`<img/>`时确定`width`、`height`，以避免重流导致的页面闪烁。

## 常见问题

### 1. 禁用内容选择

```css
body {
  user-select: none;
}
```

### 2. 文本限制一行显示

```css
.single-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 微信中的一些坑

### 1. iframe 导致的一些问题

微信浏览器中使用`iframe`，修改`iframe`的src会导致`history` + 1

To Be Continue...