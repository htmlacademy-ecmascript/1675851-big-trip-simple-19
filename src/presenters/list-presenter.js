import Presenter from './presenter';
import {formatDate, formatTime, formatNumber} from '../utils';
import {pointTitleMap, pointIconMap} from '../maps';

/**
 * @extends {Presenter<ListView>}
 */
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.updateView();
  }

  updateView() {
    this.view.setItems(
      this.pointsModel.list().map(this.createPointViewState, this)
    );
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    const offerGroup = this.offerGroupsModel.findById(point.type);
    const offerViewStates = offerGroup.offers.filter((item) => point.offerIds.includes(item.id)).map((item) => ({...item, price: String(item.price)}));

    return {
      date: formatDate(point.startDate),
      icon: pointIconMap[point.type],
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      startTime: formatTime(point.startDate),
      startDate: point.startDate,
      endTime: formatTime(point.endDate),
      endDate: point.endDate,
      basePrice: formatNumber(point.basePrice),
      offers: offerViewStates
    };
  }
}
