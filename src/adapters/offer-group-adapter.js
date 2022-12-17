import Adapter from './adapter';

export default class OfferGroupAdapter extends Adapter {
  /**
   * @param {Partial<OfferGroup>} data
   */
  constructor(data = {}) {
    super();

    this.id = data.type;
    this.offers = data.offers;
  }
}
