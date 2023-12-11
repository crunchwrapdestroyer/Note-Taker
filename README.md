# Note Taking Tool

This is a simple note taking application that uses an Express.js back end and retrieves note data from a JSON file.

## Table of Contents

- [Note Taking Tool](#project-title)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Description
On the back end, the application includes a db.json file that will be used to store and retrieve notes using the fs module. 

## Features

This project includes:

-a server file

-a routes file including: GET routes for HTML files, a GET route for the notes written on the db.json file, a POST route to create new notes, and a DELETE route to delete notes with a specified Uuid. 

-a db.json file to record and serve up new and existing notes

## Installation

If you don't already have a package.json file, create one by running the following command in your project directory:
npm init -y

Install the necessary dependencies, including Express and uuid, by running:
npm install express uuid

## Usage
On loading page, click "Get Started" button to navigate to notes.html page. You can then create new notes, view the current list of notes, select a note from the list to view, and delete notes. 
## Configuration
No configuration required
## Contributing
Any contribution to this project is appreciated.
## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]
## Contact
Matt Hill

hillmatt58@gmail.com

https://github.com/crunchwrapdestroyer

https://www.linkedin.com/in/matt-hill-18026a175/