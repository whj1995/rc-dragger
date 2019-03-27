export type IDapter = (curPs: [number, number], lastPs: [number, number]) => [number, number];

export class Dragger {

  public get Ps() {
    return this._ps;
  }

  public set Ps(ps: [number, number]) {
    this._ps = ps;
    this.dom && (this.dom.style.transform = `translate(${ps[0]}px,${ps[1]}px)`);
  }

  private moveListener: Array<(ps: [number, number]) => void> = [];
  private mousePs = [-1, -1]; // [x,y]
  private dom: HTMLElement | undefined;
  private handle: HTMLElement | undefined;
  private _ps: [number, number] = [0, 0]; // [x,y]

  constructor() {
    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
  }

  public unDrag() {
    this.handle && this.handle.removeEventListener('mousedown', this.handleMousedown);
    const doc = this.dom && this.dom.ownerDocument;
    if (doc) {
      doc.removeEventListener('mousemove', this.handleMousemove);
      doc.removeEventListener('mouseup', this.handleMouseup);
    }
  }

  public setAdpter(adapter: IDapter) {
    this.adapter = adapter;
  }

  public setDom(dom: HTMLElement) {
    dom && (dom.removeEventListener('mousedown', this.handleMousedown));
    this.dom = dom;
    !this.handle && (this.dom.addEventListener('mousedown', this.handleMousedown));
  }

  public setHandle(handle: HTMLElement) {
    this.handle && (this.handle.removeEventListener('mousedown', this.handleMousedown));
    this.dom && (this.dom.removeEventListener('mousedown', this.handleMousedown));
    this.handle = handle;
    this.handle.addEventListener('mousedown', this.handleMousedown);
  }

  public subscribeMove(listener: (ps: [number, number]) => void) {
    this.moveListener.push(listener);
  }

  public unSubscribeMove(listener?: (ps: [number, number]) => void) {
    if (!listener) {
      this.moveListener = [];
    } else {
      const idx = this.moveListener.findIndex((item) => item === listener);
      if (idx > -1) {
        this.moveListener.splice(idx, 1);
      }
    }
  }

  private adapter: IDapter = (ps: [number, number]) => ps;

  private handleMousedown(e: MouseEvent) {
    this.mousePs = [e.clientX, e.clientY];
    const doc = this.dom && this.dom.ownerDocument;
    if (doc) {
      doc.addEventListener('mousemove', this.handleMousemove);
      doc.addEventListener('mouseup', this.handleMouseup);
    }
  }

  private handleMouseup() {
    const doc = this.dom && this.dom.ownerDocument;
    if (doc) {
      doc.removeEventListener('mousemove', this.handleMousemove);
      doc.removeEventListener('mouseup', this.handleMouseup);
    }
  }

  private handleMousemove(e: MouseEvent) {
    const offset = [e.clientX - this.mousePs[0], e.clientY - this.mousePs[1]];
    this.mousePs = [e.clientX, e.clientY];
    this.Ps = this.adapter([this.Ps[0] + offset[0], this.Ps[1] + offset[1]], [this.Ps[0], this.Ps[1]]);
    this.moveListener.forEach((listener) => {
      listener(this.Ps);
    });
  }
}
