# [Angular](http://www.angular.io/) Core Technical Round Project (Full Stack)

---

## Purpose

The idea is to **demonstrate how to write a typical, non-trivial CRUD application using Angular**. To showcase Angular in its most advantageous environment we've set out to write a simplified User management tool supporting teams. The sample application tries to show best practices when it comes to: folders structure, using modules, communicating with a REST back-end, organizing navigation.

<a href="http://goo.gl/gKEsIo"><img src="http://www.packtpub.com/sites/default/files/1820OS.jpg"></a>

## Stack

- Persistence store: [PostGresSql](https://www.postgresql.org/)
- Backend: [Node.js](http://nodejs.org/)
- Awesome [Angular](http://www.angularjs.org/) on the client
- CSS based on [Twitter's bootstrap](https://valor-software.com/ngx-bootstrap/) and [Angular material](https://material.angular.io/)

### Build

It is a complete project with a build system focused on AngularJS apps and tightly integrated with other tools commonly used in the AngularJS community:

- powered by [Grunt.js](http://gruntjs.com/)
- build supporting JS, CSS and AngularJS templates minification
- [Twitter's bootstrap](http://getbootstrap.com/) with LESS templates processing integrated into the build

## Installation

### Platform & tools

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.

- [Install node.js](http://nodejs.org/download/) (requires node.js version >= 0.8.4)

### Get the Code

Either clone this repository or fork it on GitHub and clone your fork:

```
git clone https://github.com/angular-app/angular-app.git
cd angular-app
```

### App Server

Our backend application server is a NodeJS application that relies upon some 3rd Party npm packages. You need to install these:

- Install local dependencies (from the project root folder):

  ```
  cd server
  npm install
  cd ..
  ```

  (This will install the dependencies declared in the server/package.json file)

### Client App

Our client application is a straight HTML/Javascript application but our development process uses a Node.js build tool
[Grunt.js](gruntjs.com). Grunt relies upon some 3rd party libraries that we need to install as local dependencies using npm.

- Install local dependencies (from the project root folder):

  ```
  cd client
  npm install
  cd ..
  ```

  (This will install the dependencies declared in the client/package.json file)

## Building

### Configure Server

The server stores its data in a MongoLab database.

- Install postgresql - it's free: [https://www.postgresql.org/].
- Create a database to use for this application named "core",
- Edit `API/connection.js` to set your MongoLab API Key and the name of the database you created.

  ```
  postgresql: {
      dbUrl: 'postgres://postgres:admin@localhost:5432/core',    // The base url of the MongoLab DB server
      add the url in connectionString variable,
  },

  ```

- Optionally change the name of admin user in `server/lib/initDB.js`. The default is 'Admin' (admin@abc.com : changeme).

  ```
  run npm install
  // To install all the dependecy node module
  ```

- Run our initialization script

  ```
  npm start
  ```

### Build the client app

The app made up of a number of javascript, css and html files that need to be merged into a final distribution for running. We use the Grunt build tool to do this.

- Build client application:

  ```
  cd client
  grunt build
  cd ..
  ```

_It is important to build again if you have changed the client configuration as above._

## Running

### Start the Server

- Run the server

  ```
  cd server
  node server.js
  cd ..
  ```

- Browse to the application at [http://localhost:3000]
- Login with the admin user as defined in `server/lib/initDB.js`.

## Browser Support

We only regularly test against Chrome 29 and occasionally against Firefox and Internet Explorer.
The application should run on most modern browsers that are supported by the Angular framework.
Obviously, if you chose to base your application on this one, then you should ensure you do your own
testing against browsers that you need to support.

## Development

### Folders structure

At the top level, the repository is split into a client folder and a server folder. The client folder contains all the client-side AngularJS application. The server folder contains a very basic Express based webserver that delivers and supports the application.
Within the client folder you have the following structure:

- `node_modules` contains build tasks for Grunt along with other, user-installed, Node packages
- `dist` contains build results
- `src` contains application's sources
- `test` contains test sources, configuration and dependencies
- `vendor` contains external dependencies for the application

### Project to be built

User management System

- Two type of user role (user, admin)
- Customer can register and update profile
- Admin have all access (Create, Edit, Delete)
- User Panel
- Login module
- email
- password
- Register module all fields are required with validation message
- name
- email
- password
- re-password
- mobile number
- date of birth (datepicker)
- country (with dropdown get country from service)
- Update profile view there is tab view
- first tab user can update profile only name, mobile, dob
- second tab Education detail view here user can add their qualification detail with form array
- Name of School/College & Board/University (dropdown -> Xth Level, XII Level, Graduation, PostGraduation etc)
- Year of Completion
- % Marks Obtained
- Subjects
- After add detail that detail shown in table format below education detail form
- Admin Panel
- User list with all detail and Education detail open in modal view

### Create these table on Pgsql using querytool

create table if not exists users (
user_id serial primary key not null,
name varchar(255) not null,
email varchar(255) not null,
mobile varchar(255) not null,
date_of_birth varchar(255) not null,
country varchar(255) not null,
token varchar(255) not null,
hash varchar(255) not null,
salt varchar(255) not null,
)

create table if not exists educations(
edu_id serial primary key not null,
user_id integer REFERENCES users(user_id) not null,
school varchar(255) not null,
board varchar(255) not null,
class varchar(255) not null,
year varchar(255) not null,
marks varchar(255) not null,
subjects varchar(255) not null,
)

### Bugs / Feature request

- lease report bugs and feel free to ask for new features directly on GitHub.
