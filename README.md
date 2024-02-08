# TaskSphere Connect - A dynamic to-do/ticketing application

## Hosted Link

https://tasksphere-connect.netlify.app/

## Description

I would like to explain this project as a Dynamic To-do Application. The main purpose of developing this application was to learn few concepts in ReactJS. In the application the tasks are present in the form of cards that can be toggled when the user is done with the application. On the basis of the status, the card becomes green depicting the completion of the task. Otherwise it stays the way it is.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Installation

### Clone the repository git clone

https://github.com/SinghHridyansh/Dynamic_ticketing_app.git

### Change into the project directory

cd your-react-app

### Install dependencies

npm install

## Usage

The application works by fetching the data from an API which gives response in JSON format. Afterwards the data is stored in a local variable to maintain it's state. This data is then mapped onto a task component which is comprised of a checkbox and the body of the task.
The API response gives two parameters **title** and **status**. After checking the status of the task the corresponding pending or completed styling is done automatically.
Upon toggling/changing the state of the task the completion status is changed from pending to complete or vice-versa.

## Features

- Clean and organised UI.
- Mapping of all the tasks fetched from the API onto a card component.
- Each task can be toggled thus changing the status.
- Implementation of Pagination done solely in ReactJS.
  -- Dedicated button to visit previous or next page.
  -- Each page on the bottom to provide easy accessibility. The number of the pages can be changed on the basis of how many card can be displayed per page.
- Responsiveness

## Technologies Used

- HTML
- CSS
- ReactJS
