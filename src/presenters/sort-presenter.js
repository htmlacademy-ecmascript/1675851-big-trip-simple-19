import Presenter from './presenter';
import {sortTitleMap, sortCallbackMap, sortDisabilityMap} from '../maps';
import {findKey} from '../utils';
import {SortType} from '../enums';

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
    this.updateViewVisibility();
    this.view.addEventListener('change', this.handleViewChange.bind(this));

    this.pointsModel.addEventListener('add', this.handlePointsModelAdd.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointsModelUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointsModelDelete.bind(this));
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));
  }

  updateViewValue() {
    const sort = this.pointsModel.getSort();
    const sortType = findKey(sortCallbackMap, sort);

    this.view.setValue(sortType);
  }

  updateViewVisibility() {
    this.view.hidden = !this.pointsModel.list().length;
  }

  handlePointsModelAdd() {
    this.updateViewVisibility();
  }

  handlePointsModelUpdate() {
    this.updateViewVisibility();
  }

  handlePointsModelDelete() {
    this.updateViewVisibility();
  }

  handleViewChange() {
    const sortType = this.view.getValue();

    this.navigate('/');
    this.pointsModel.setSort(sortCallbackMap[sortType]);
  }

  handlePointsModelFilter() {
    this.pointsModel.setSort(sortCallbackMap[SortType.DAY], false);

    this.updateViewValue();
    this.updateViewVisibility();
  }
}
