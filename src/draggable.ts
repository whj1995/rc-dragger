import * as React from 'react';
import { Dragger, IDapter } from './dragger';

interface IProps extends React.Props<any> {
  initPs?: [number, number];
  handle?: string;
  adapter?: IDapter;
  onMove?: (ps: [number, number]) => void;
}

export function Draggable(props: IProps) {
  const ref: React.MutableRefObject<null | HTMLElement> = React.useRef(null);
  const dragger = React.useRef(new Dragger());

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    dragger.current.setDom(ref.current);
  }, [ref.current]);

  React.useEffect(() => {
    props.initPs && (dragger.current.Ps = props.initPs);
  }, [props.initPs && (props.initPs[0], props.initPs[1])]);

  React.useEffect(() => {
    if (typeof props.handle === 'undefined') {
      return;
    }
    const handle = window.document.querySelector(props.handle);
    handle && dragger.current.setHandle(handle as HTMLElement);
  }, [props.handle]);

  React.useEffect(() => {
    props.adapter && dragger.current.setAdpter(props.adapter);
  }), [props.adapter];

  React.useEffect(() => {
    if (!props.onMove) {
      return;
    }
    dragger.current.subscribeMove(props.onMove);
    return () => dragger.current.unSubscribeMove(props.onMove);
  }), [props.onMove];

  React.useEffect(() => {
    return () => dragger.current.unDrag();
  }, []);

  return React.cloneElement(React.Children.only(props.children) as any, {
    ref
  });
}
