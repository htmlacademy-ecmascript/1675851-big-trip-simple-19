import Presenter from './presenter';
import {sortTitleMap, sortCallbackMap, sortDisabilityMap} from '../maps';
import {findKey} from '../utils';

/**
 * @extends {Presenter<SortView>}
 */
export default class SortPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const options = Object.entries(sortTitleMap).map(([value, title]) => ({title, value}));

    this.view.setOptions(options);
    this.view.setDisability(Object.values(sortDisabilityMap));
    this.updateViewValue();
    this.view.addEventListener('change', this.handleViewChange.bind(this));
  }

  updateViewValue() {
    const sort = this.pointsModel.getSort();
    const sortType = findKey(sortCallbackMap, sort);

    this.view.setValue(sortType);
  }

  handleViewChange() {
    const sortType = this.view.getValue();

    this.pointsModel.setSort(sortCallbackMap[sortType]);
  }
}
