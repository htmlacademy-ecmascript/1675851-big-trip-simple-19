import {FilterType, SortType} from './enums';

/**
 * @type {Record<string,FilterCallback<PointAdapter>>}
 */
export const filterCallbackMap = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (point) => Date.now() < point.endDateAsNumber
};

/**
 * @type {Record<string,SortCallback<PointAdapter>>}
 */
export const sortCallbackMap = {
  [SortType.DAY]: (day, nextDay) => day.startDateAsNumber - nextDay.startDateAsNumber,
  [SortType.EVENT]: () => 0,
  [SortType.TIME]: () => 0,
  [SortType.PRICE]: (price, nextPrice) => nextPrice.basePrice - price.basePrice,
  [SortType.OFFERS]: () => 0
};
