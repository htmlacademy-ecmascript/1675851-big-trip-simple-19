// import FiltersView from './view/filters-view';
// import { render } from './render';
import EventsPresenter from './presenter/events-presenter';
import './views/filters-view';
import './views/sort-view';
import './views/list-view';
import './views/point-view';
import './views/new-point-editor-view';

// const headerElement = document.querySelector('.trip-main');
// const filtersElement = headerElement.querySelector('.trip-controls__filters');

// render(new FiltersView(), filtersElement);

const bodyElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: bodyElement});

eventsPresenter.init();
