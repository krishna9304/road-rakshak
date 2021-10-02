# Road Rakshak User Application

This is the user application of the project that I made for safe rohtech challenge. The deployed version of the application is live on vercel --- [https://road-rakshak.vercel.app/](https://road-rakshak.vercel.app/).

# Setting up the development environment
  1. Clone the repository `$ git clone https://github.com/krishna9304/road-rakshak.git`
  2. Install all the dependencies using command `$ yarn` 
  3. Create a mapbox api key by visiting [https://www.mapbox.com/](https://www.mapbox.com/) and replacing the public key with the value of MAPBOX_API_KEY in `/src/constants.js`.
  4. Run `$ yarn start`.
  5. The application should start on port 3000. You can visit the application on `http://localhost:3000`
 
 # Some screenshots of the application
 <img width="1680" alt="Screenshot 2021-10-03 at 2 44 19 AM" src="https://user-images.githubusercontent.com/71918441/135732108-f80608b5-fd39-4be0-9ac2-fda6f6bb8f9c.png">
<img width="1680" alt="Screenshot 2021-10-03 at 2 45 21 AM" src="https://user-images.githubusercontent.com/71918441/135732121-d510d5a3-7b31-4751-a651-23bfa090f205.png">
<img width="1680" alt="Screenshot 2021-10-03 at 2 46 10 AM" src="https://user-images.githubusercontent.com/71918441/135732128-186b2ee9-4c99-4dbf-870f-ee3a4eadc871.png">
<img width="1680" alt="Screenshot 2021-10-03 at 2 46 32 AM" src="https://user-images.githubusercontent.com/71918441/135732135-e48718cf-fb73-4415-a4f9-2cc38d76370a.png">

# Features
### 1. Secure Authentication
All the details of the users are stored securely in our database and the password of every user is hashed by a hashing algorithm, so, not even us will be able to access other people's account.
### 2. Email verification
Every user in the portal should verify his/her email to use our services.
### 3. News feed
Users can read blogs directly from our portal about road safety and stuffs, as we have made a section exclusively to serve that purpose.
### 4. Filing a complaint
Filing a complaint about the condition of roads has never been so easy. You just have to select the type of hurdle, mention the address and the click a picture of the site through your phone.
### 5. Interactive map
We have developed interactive map to discover exactly where the hurdle lies.
### 6. Shortest distance
You can look for the shortest distance, just by choosing the origin and destination, along with  the realtime information about the hurdles on the way.
### 7. Spam free
All the hurdles reported by the users will only get uploaded to the map, once they are verified by the admin. So there are no chances of spam. Also, all the accounts on the portal are verified through email.

# Technologies Used
  - [React.JS](https://reactjs.org/)
  - [Redux.JS](https://redux.js.org/)
  - [Ant Design](https://ant.design/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Mapbox GL Api](https://www.mapbox.com/)
