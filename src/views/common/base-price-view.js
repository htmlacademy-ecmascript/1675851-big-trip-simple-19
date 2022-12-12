import View from './../view';
import {html} from '../../utils';

export default class BasePriceView extends View {
  constructor() {
    super();

    // this.classList.add('');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>
    `;
  }
}

customElements.define(String(BasePriceView), BasePriceView);
