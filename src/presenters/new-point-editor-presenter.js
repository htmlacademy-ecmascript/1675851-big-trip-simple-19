import Presenter from './presenter';
import {pointTitleMap} from '../maps';
import {PointType} from '../enums';
import {formatNumber} from '../utils';

/**
 * @extends {Presenter<NewPointEditorView>}
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const pointTypeOptions =
      Object.entries(pointTitleMap).map(([value, title]) => ({title, value}));

    const destinationOptions =
      this.destinationsModel.listAll().map((item) => ({title: '', value: item.name}));

    this.view.pointTypeView.setOptions(pointTypeOptions);
    this.view.pointTypeView.addEventListener('change', this.handlePointTypeViewChange.bind(this));

    this.view.destinationView.setOptions(destinationOptions);
    this.view.destinationView.addEventListener('input', this.handleDestinationViewInput.bind(this));

    this.view.datesView.setConfig({
      dateFormat: 'd/m/y H:i',
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    });

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
  }

  /**
   * @param {PointAdapter} point
   */
  updateView(point) {
    const destination = this.destinationsModel.findById(point.destinationId);

    this.view.pointTypeView.setValue(point.type);
    this.view.destinationView.setLabel(pointTitleMap[point.type]);
    this.view.destinationView.setValue(destination.name);
    this.view.datesView.setValues([point.startDate, point.endDate]);
    this.view.basePriceView.setValue(point.basePrice);

    this.updateOffersView(point.offerIds);
    this.updateDestinationDetailsView(destination);
  }

  /**
   * @param {string[]} offerIds
   */
  updateOffersView(offerIds = []) {
    const pointType = this.view.pointTypeView.getValue();
    const offerGroup = this.offerGroupsModel.findById(pointType);

    const options = offerGroup.offers.map((item) => (
      {
        ...item,
        price: formatNumber(item.price),
        checked: offerIds.includes(item.id)
      }
    ));

    this.view.offersView.hidden = !options.length;
    this.view.offersView.setOptions(options);
  }

  /**
   * @param {DestinationAdapter} [destination]
   */
  updateDestinationDetailsView(destination) {
    this.view.destinationDetailsView.hidden = !destination;

    if (destination) {
      this.view.destinationDetailsView.setContent(destination);
    }
  }

  /**
   * @override
   */
  handleNavigation() {
    if (this.location.pathname === '/new') {
      const point = this.pointsModel.item();

      point.type = PointType.TAXI;
      point.destinationId = this.destinationsModel.item(0).id;
      point.startDate = new Date().toJSON();
      point.endDate = point.startDate;
      point.basePrice = 100;
      point.offerIds = ['1', '2'];

      this.view.open();
      this.updateView(point);
    }

    else {
      this.view.close(false);
    }
  }

  /**
   * @param {SubmitEvent} event
   */
  handleViewSubmit(event) {
    event.preventDefault();
  }

  handleViewReset() {
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }

  handlePointTypeViewChange() {
    const pointType = this.view.pointTypeView.getValue();

    this.view.destinationView.setLabel(pointTitleMap[pointType]);
    this.updateOffersView();
  }

  handleDestinationViewInput() {
    const destinationName = this.view.destinationView.getValue();
    const destination = this.destinationsModel.findBy('name', destinationName);

    this.updateDestinationDetailsView(destination);
  }
}
