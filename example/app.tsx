import * as React from 'react';
import { Draggable } from '../lib';

function adapter(ps: [number, number], lastPs: [number, number]): [number, number] {
  return [ps[0], lastPs[1]];
}

export function App() {
  const [handle, setHandle] = React.useState('.handle1');
  return (
    <div>
      <select onChange={(e) => setHandle(e.target.value)}>
        <option value='.handle1'>handle1</option>
        <option value='.handle2'>handle2</option>
      </select>
      <Draggable adapter={adapter}>
        <div style={{ background: 'orange', width: 100, height: 100 }}>x</div>
      </Draggable>
      <Draggable initPs={[100, 100]}>
        <div style={{ background: 'red', width: 100, height: 100 }}></div>
      </Draggable>
      <Draggable handle={handle}>
        <div style={{ background: 'green', width: 100, height: 100 }}>
          <div className='handle1' style={{ background: '#dedede', width: 100, height: 30 }}>
            handle1
          </div>
          <div className='handle2' style={{ background: 'orange', width: 100, height: 30 }}>
            handle2
          </div>
        </div>
      </Draggable>
    </div>
  );
}
