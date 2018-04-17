export class ContextMenuItem {

  defaultFill = 'rgb(250, 250, 250)';

  onMouseoverFill = 'rgb(200, 200, 200)';

  id;

  label;

  callback;

  list;

  constructor(id, label, callback, list) {
    this.id = id;
    this.label = label;
    this.callback = callback;
    this.list = list;
  }

  getLabel() {
    try {
      return this.label() + (this.list === null ? '' : '    ▶');
    } catch (e) {
      return String(this.label) + (this.list === null ? '' : '    ▶');
    }
  }

  onClick() {
    if (this.callback !== null) {
      this.callback();
    }
  }
}
