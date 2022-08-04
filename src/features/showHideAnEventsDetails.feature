Feature: Show/hide event details
  Scenario: An event element is collapsed by default.
    Given the user opens the app
    When the user see a list of all upcoming events (with show details button)
    Then the user should see a each list is collapsed by default

  Scenario: User can expand an event to see its details.
    Given the user see an event element with show deatils button
    When the user clicks on show details button
    Then the user should see the expanded event element with hide details button

  Scenario: User can collapse an event to hide its details.
    Given the users see a expanded event element with hide details button
    When the user click on hide deatils button
    Then the user should see the collaped event element with show details button