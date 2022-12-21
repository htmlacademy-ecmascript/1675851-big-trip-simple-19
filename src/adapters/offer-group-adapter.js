import Adapter from './adapter';

export default class OfferGroupAdapter extends Adapter {
  /**
   * @param {OfferGroup} data
   */
  constructor(data) {
    super();

    this.id = data.type;
    this.offers = data.offers.map((offer) => ({
      ...offer,
      id: String(offer.id)
    }));
  }
}
