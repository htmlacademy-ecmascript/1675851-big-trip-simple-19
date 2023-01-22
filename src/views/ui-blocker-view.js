import View from './view';
import './ui-blocker-view.css';

export default class UIBlockerView extends View {
  constructor() {
    super();

    this.classList.add('ui-blocker');
  }

  /**
   * @param {Boolean} flag
   */
  toggle(flag) {
    if (flag) {
      document.body.append(this);
      document.addEventListener('keydown', this.handleDocumentKeydown);
    }

    else {
      this.remove();
      document.removeEventListener('keydown', this.handleDocumentKeydown);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleDocumentKeydown(event) {
    event.preventDefault();
  }
}

customElements.define(String(UIBlockerView), UIBlockerView);
