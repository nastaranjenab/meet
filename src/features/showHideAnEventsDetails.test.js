import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppWrapper;
    given('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    when(
      'the user see a list of all upcoming events (with show details button)',
      () => {
        AppWrapper.update();
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      }
    );

    then('the user should see a each list is collapsed by default', () => {
      AppWrapper.update();
      let EventWrapper = AppWrapper.find(Event);
      EventWrapper.forEach((event) => expect(event.state('show')).toBe(false));
      expect(EventWrapper.find('.event .event-showDetails-btn')).toHaveLength(
        mockData.length
      );
    });
  });

  test('User can expand an event to see its details.', ({
    given,
    when,
    then
  }) => {
    let EventWrapper;
    given('the user see an event element with show deatils button', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      expect(EventWrapper.state('show')).toBe(false);
      expect(EventWrapper.find('.event .event-showDetails-btn')).toHaveLength(
        1
      );
      expect(EventWrapper.find('.event .event-description')).toHaveLength(0);
    });

    when('the user clicks on show details button', () => {
      EventWrapper.find('.event-showDetails-btn').simulate('click');
    });

    then(
      'the user should see the expanded event element with hide details button',
      () => {
        expect(EventWrapper.state('show')).toBe(true);
        expect(EventWrapper.find('.event .event-hideDetails-btn')).toHaveLength(
          1
        );
        expect(EventWrapper.find('.event .event-description')).toHaveLength(1);
      }
    );
  });

  test('User can collapse an event to hide its details.', ({
    given,
    when,
    then
  }) => {
    let EventWrapper;
    given(
      'the users see a expanded event element with hide details button',
      () => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
        EventWrapper.setState({ show: true });
        expect(EventWrapper.state('show')).toBe(true);
        expect(EventWrapper.find('.event .event-hideDetails-btn')).toHaveLength(
          1
        );
        expect(EventWrapper.find('.event .event-description')).toHaveLength(1);
      }
    );

    when('the user click on hide deatils button', () => {
      EventWrapper.find('.event-hideDetails-btn').simulate('click');
    });

    then(
      'the user should see the collaped event element with show details button',
      () => {
        expect(EventWrapper.state('show')).toBe(false);
        expect(EventWrapper.find('.event .event-showDetails-btn')).toHaveLength(
          1
        );
        expect(EventWrapper.find('.event .event-description')).toHaveLength(0);
      }
    );
  });
});