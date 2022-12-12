import SortView from '../view/sort-view';
import EventsView from '../view/events-view';
// import EditEventView from '../view/edit-event-view';
// import EventView from '../view/event-view';
// import { render } from '../render';

export default class EventsPresenter {
  sortComponent = new SortView();
  eventsComponent = new EventsView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    // render(this.sortComponent, this.eventsContainer);
    // render(this.eventsComponent, this.eventsContainer);
    // render(new EditEventView(), this.eventsComponent.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new EventView(), this.eventsComponent.getElement());
    // }
  }
}
