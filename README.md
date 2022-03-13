# Messenger clone

[![Chat design](http://i.imgur.com/1p1STGP.png 'Chat design')](http://i.imgur.com/1p1STGP.png 'Chat design')


The purpose of this project is to be more or less a clone of Messenger App using **ReactJS / NodeJS** with **TypeScript** and **MongoDB**, giving the ability to add friends, accept/deny requests, create/edit/delete a profile, chat in realtime with WebSockets.

Security is implemented in BackEnd side with **JWT**, using **accessToken** / **refreshToken** and storing them in **HTTP only Cookies** blocking malicious intent steal Cookies or using the API without permission.


#### Starting the project

_Before starting the project make sure you have MongoDB v4+ installed !_

Then you type the following command in both the server and client folders

```bash
npm i
npm start
```


**_Sign up / Log in_**  


[![Sign up](http://i.imgur.com/1e1K6en.gif 'Sign up')](http://i.imgur.com/1e1K6en.gif 'Sign up')


**_RealTime Chat_**  


[![RealTime Chat](http://i.imgur.com/BDjvO9w.gif 'RealTime Chat')](http://i.imgur.com/BDjvO9w.gif 'RealTime Chat')

