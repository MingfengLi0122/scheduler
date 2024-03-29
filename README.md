# Interview Scheduler
Interview scheduler app is built on React which allows users to book, edit and cancle interview from Monday to Friday 12:00PM to 5 PM. Different clients are able to recieve dynamic rendering based on the availability of appointment time for the day.

# Final Product
## Home Page
Indicate the appointment spots avaliability for the different days.
!["home page"](https://github.com/MingfengLi0122/scheduler/blob/master/docs/home_page.png)

## Edit Appointment 
Allow users to edit the information of the appointment.
!["edit appointment"](https://github.com/MingfengLi0122/scheduler/blob/master/docs/edit_appointment.png)

## Input Validation
Notice users when required information is missing.
!["input validation"](https://github.com/MingfengLi0122/scheduler/blob/master/docs/invalidate_input.png)

## Delete Confirmation
Double confirm with users for deleting action.
!["delete confirmation"](https://github.com/MingfengLi0122/scheduler/blob/master/docs/delete_notice.png)

## Error Handling
Display error massage when unexpected error occurs by reaching the API.
!["error handling"](https://github.com/MingfengLi0122/scheduler/blob/master/docs/error_handling.png)

# Testing
## Storybook Testing
Customized compentes testing with storybook.
!["storybook testing"](https://github.com/MingfengLi0122/scheduler/blob/master/docs/storybook_test.png)

## Jest Testing
Unit testing with jest and generate coverage report.
!["jest testing"](https://github.com/MingfengLi0122/scheduler/blob/master/docs/jest_test_result.png)

## Cypress Testing
End to end tesing with cypress.
!["cypress testing"](https://github.com/MingfengLi0122/scheduler/blob/master/docs/cypress_test_results.png)

## Scheduler-api 
- In order to have the full funtionality, please go to the [scheduler-api](https://github.com/jatanassian/scheduler-api) and fork and clone it
- Follow the steps in the README to setup environment and database

## How to run it locally ?
- Install dependencies with `npm install` command
- Open two terminals, first is for scheduler and second is for scheduler-api. 
- Run both servers with `npm start` command
- [http://localhost:8000](http://localhost:8000) is for scheyler app, and [http://localhost:8001](http://localhost:8001) is for scheduler-api
- Then you are able to create or delete appointment!

## Tools
Front-End: React, JSX,  JavaScript,  Axios, HTML and SASS.\
Back-End: Node.js, PostgreSQL and Express.\
Testing:  Jest, Cypress, Storybook, Webpack Dev Server and Testing Library.

## Dependencies
- react
- react-dom
- react-scripts
- @testing-library/react-hooks
- react-test-renderer
- storybook
- axios
- jest
- cypress

## Running Webpack Development Server

```sh
npm start
```
## Running Storybook

```sh
npm run storybook
```

## Running Jest Test Framework

```sh
npm test
```

## Running Cypress Test Framework

```sh
npm run cypress
```

## Please enjoy! 🤩 