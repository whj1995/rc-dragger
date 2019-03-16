# 轻量的React组件拖动库 *rc-dragger*

灵感来自于*React-Draggable*,但比其更加轻量.

## 快速开始

```
npm install rc-dragger
```

``` jsx
import { Draggable } from 'rc-dragger';

<Draggable>
  <div style={{ background: 'orange', width: 100, height: 100 }}>dragger</div>
</Draggable>

// with handler
<Draggable handle='.handle1'>
  <div style={{ background: 'green', width: 100, height: 100 }}>
    <div className='handle1' style={{ background: '#dedede', width: 100, height: 30 }}>
      handler
    </div>
    <div>
      content
    </div>
  </div>
</Draggable>

```

## API

| 参数 | 说明 | 类型 | 示例
| --  | -- | -- | -- |
| initPs | 初始位置　|　[number, number] | [ 300, 200 ]
| handle | 把手的选择器　| string | .handle
| adapter | 修改最终位置函数 | (curPs: [number, number], lastPs: [number, number]) => [number, number] | 
