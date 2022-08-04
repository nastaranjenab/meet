import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 is the default number.', ({
    given,
    when,
    then
  }) => {
    given(
      'the user did not specified a number of events being shown',
      () => {}
    );

    let AppWrapper;
    when('app loaded', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see a default number which is 32', () => {
      AppWrapper.update();
      expect(AppWrapper.state('numberOfEvents')).toBe(32);
    });
  });

  test('User can change the number of events they want to see.', ({
    given,
    and,
    when,
    then
  }) => {
    let AppWrapper;
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
    });

    and(
      'the list of elements has been loaded and the user did not specify a number of events he wants to see',
      () => {}
    );

    when(
      'the user enters a number (for example six) in the number of events input field',
      () => {
        AppWrapper.update();
        let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
        const eventObject = { target: { value: 6 } };
        NumberOfEventsWrapper.find('.number-input').simulate(
          'change',
          eventObject
        );
      }
    );

    then(
      'the user should see a six in the input field and user should only see a six events in the page',
      () => {
        expect(AppWrapper.state('numberOfEvents')).toBe(32);
      }
    );
  });
});