# SPYBOOK

## Project Description
Spybook is a social game in which the main goal of the users, the players, is to hack other users. The players can get contracts from the website and they specify who the target user is. There is a world map using which players can move between locations and find their targets. Each user works by assuming a secret identity, an alias, and each player can have multiple aliases. Players level up or down based on the successful or unsuccessful completion of a contract.


## Technologies Used

Backend:
* Spring
    * Spring Data
    * Spring MVC
    * Spring Boot
* Java
* Hibernate
* Postgres
* Swagger

Frontend:
* React and Redux
* Javascript
* CSS
* Material-ui
* Axios


## Features

* Players can view all their aliases.
* Players can set a current alias.
* Players can create a new alias.
* Player can move between locations.
* Players can view the users located in their current location.
* Players can take contracts.
* Players can hack locations to complete their targets.

To-Do list:

* Use a Google Maps API for moving between locations
* Give players the ability to leave a calling card.
* Make it difficult for players to know other's location (by adding clues and hints to crack)
* Color code alias cards to reflect the status

## Getting Started

* Go to http://java-react-team5-project2.s3-website.us-east-2.amazonaws.com/ to get started.  
OR
* Install any IDE(s) compatible with Java and JavaScript
* Download the backend and frontend code using the command:
* Backend:
    * git clone https://github.com/2011Canada/project-2-team5-backend.git
    * update the maven project to install all dependencies
    * set the "ddl-auto" to "create" in the application.yml file in /src/main/resources
    * run the file Project2Application.java in src/main/java/com/revature/project2
    * set the "ddl-auto" back to "validate"
* Frontend:
    * git clone https://github.com/2011Canada/project-2-team5-frontend.git  
    * navigate to directory containing the cloned repo
    * run `npm install` to install all dependencies
    * run `npm start` to launch the website

## Usage

* On the login page, enter credentials to login as a player and you will be taken to the main page of the app where you can see options to travel between different locations and to hack a location.  
![homepage](https://user-images.githubusercontent.com/65080518/105397521-07fbbf00-5bd6-11eb-89d6-1c9eb4907d16.PNG)
* From the main page, go to the profile page to view all your aliases and your current alias. You will also find an option to create an alias there.
* Next, navigate to the contracts page to get a contract and come back to main page to begin hacking!
* You can go back to the profile page to check that the level of your alias has changed after a hack operation.


## Contributors

<!--[![](https://avatars0.githubusercontent.com/u/65080518?s=460&v=4)](https://github.com/Hammad15)-->
* [Mohammed Hammad](https://github.com/Hammad15)
* [Heng Wang](https://github.com/VinceWangTO)
* [Stephen Razis](https://github.com/Sizarazis)
* [Tristan Brennan](https://github.com/tristanbrennan)

## License
The project uses this following license: [GNU General Public License v3.0](https://github.com/2011Canada/project-2-team5-backend/blob/main/LICENSE)
