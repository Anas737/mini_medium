# Mini Medium
A clone application based on the Medium platform. 
The project was requested by a company as part of their recruitment process.
## Table of Contents
## About The Project
The application allows users to share and engage with other users through writing/reading articles and reacting to them through comments/likes.
Users need to authenticate first to gain access to the platform’s content. 
there are two types of users: 
-	Admin User.
-	Simple User.

The simple user after authenticating can:
+ 	Create a new article.
+	React to existing articles.
+	Look for keywords in an article’s content.
+	Leave a comment.
+	Edit their own articles.
+	Delete or unpublish their own articles.

The admin user, like the simple user, can do all of the above actions. The difference is they can do them to other users’ articles, except for deleting articles – they can only delete their own articles.
### Built With
The company who proposed the project requested that I use Angular (version 10) for the front end, Symfony API Platform (4 or 5)  and NodeJS for the backend, and SQL for the relational Database.
  +	Front end:  
     [Angular](https://angular.io/)(version 10)
  +	Back end:  
         [Node.js](https://nodejs.org/)  
         [Nest](https://nestjs.com/)  
         [API Platform](https://api-platform.com/)(version 4 or 5)
  +	Database:  
         [PostgreSQL](https://www.postgresql.org/)

## Getting Started
The application is containerized, so Docker is needed to start the application.
Alternatively, the application could be run directly on your machine if you install all the tools used for developement.  
### Prerequisites
-	Docker and docker-compose:
If you do not have docker on your machine [follow the instructions on this link](https://docs.docker.com/get-docker/), then install docker-compose [following the instructions here](https://docs.docker.com/compose/install/).

-	Git:
If you do not have Git already installed, you can [follow the instructions here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### Installation

Start by open a bash command line.

1.	Clone the repo :   
   `git clone https://github.com/Buchiharu/mini_medium.git`

2.	Once the repo has been cloned, we cd inside the main folder. We then build the docker images for the mini_medium application and start it:  
  ```
  cd mini_medium
  docker-compose up
  ```

## Usage

Sign-up page: 
![alt text](https://github.com/Buchiharu/mini_medium/blob/master/Capture2.PNG "Sign in Page")  
   Sign-in page: 
![alt text](https://github.com/Buchiharu/mini_medium/blob/master/Capture1.PNG "Sign in Page")  
   PLatform content after sign in:   
   ![alt text](https://github.com/Buchiharu/mini_medium/blob/master/Capture.PNG "Platform Content Preview")
You can watch the Demo of how the application works and the different functionalities implemented [here](https://www.loom.com/share/b80c777cf88140eda165647e803012c6)
## Roadmap
Encountered issues with docker. My machine could not support it. 
## License
Distributed under the MIT License.
## Contact
Anas El Boukhari – elboukhari.anas.95@gmail.com
Project Link: https://github.com/Buchiharu/mini_medium
