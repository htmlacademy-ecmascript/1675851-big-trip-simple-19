import View from './../view';
import {html} from '../../utils';

export default class DestinationView extends View {
  constructor() {
    super();

    // this.classList.add('');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Flight
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>
    `;
  }
}

customElements.define(String(DestinationView), DestinationView);
