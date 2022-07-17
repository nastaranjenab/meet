## Meet-App

This application is built so users can find events in their locations. It will be using React, and will be built using TDD.

## Feature 2: Show/Hide Event's Details

As a user, I should be able to click on the event to show/hide it So that I can show/hide the details.

- Scenario : An event element is collapsed by default

  - Given: The user is viewing the list of events
  - When: The user hasn’t clicked on event element
  - Then: The event details are collapsed

- Scenario : User can expand an event to see its details

  - Given: The user is viewing the list of events
  - When: The user has clicked on event element
  - Then: The event details are expanded

- Scenario : User can collapse an event to hide its details
  - Given: The user no longer wants to see the events details
  - When: The user clicks on the details
  - Then: The event details can be collapsed

## FEATURE 3: SPECIFY NUMBER OF EVENTS

As a user I should be able to choose how many events are listed So that I can see many events or just a few events.

- Scenario : When user hasn’t specified a number, 32 is the default number

  - Given: The user hasn’t specified the number of events
  - When: The user begins their search
  - Then: 32 events are listed

- Scenario: User can change the number of events they want to see
  - Given: The user has specified the number of events
  - When: The user has chosen how many events to see
  - Then: The number of displayed events matches the number chosen by user

## FEATURE 4: USE THE APP WHEN OFFLINE

As a user I should be able to use the app when internet isn’t available So that I can still see events.

- Scenario : Show cached data when there’s no internet connection

  - Given: The user does not have internet connection
  - When: The user tries to use the app without internet connection
  - Then: Cached data is still available to see

- Scenario : Show error when user changes the settings (city, time range)
  - Given: The user tries to change the cached info offline
  - When: The user changes the search settings
  - Then: An error message is displayed.

## FEATURE 5: DATA VISUALIZATION

As a user I should be able to see a chart view of upcoming events by dates and times So that I can have an organized way of seeing the upcoming events.

- Scenario : Show a chart with the number of upcoming events in each city
  - Given: The user wants to see upcoming events
  - When: The user opens the app or does a search for events
  - Then: A chart of upcoming events is displayed