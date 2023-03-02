//Node server -> It will handle socket io connections.
//First run index.html file then run it by going inside node-server file by cd node-server and then  do nodemon server.js.we can also directly run this site directly(by same procedure i.e. cd node-server then run this code) and  create a local server but to have automatic updates on some editing then use nodemon.
const io=require('socket.io')(8000)//Here we are making a server on port 8000 and it's different from which we created using live server i.e. frontend part.Actually live server which we are using to create localhost using vs code is for client-side and earlier coding of backend in dance website our server and client side were on same port but here we are making a total different server for our server side coding.Here socket.io is a server or connection and it uses websocket protocol just like http(protocol) but it supports bi-directional commn.
const users={};//It's used to add new users.
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{console.log("New user ",name);
   users[socket.id]=name;
   socket.broadcast.emit('user-joined',name);
    });
//socket.io will listen to all incoming events and as io.on is a socket.io instance so it will listen to all socket connections whenever a new user connects to the server(the main server not client side live-server).socket.on tells the server what to do whenever a new user joins.So, socket.on responds for an event whenver a new user does some activity on server or even simply joins then it gives a name to the user on the basis of his socket.id and also broadcast,emit the message that a new user joined to all the users and io.on responds to events whenever a new user connects to the server and gets a socket.id and io.on is an instance of socket.io.

socket.on('send',message=>{
    socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    //Here socket.on checks for send(user-given name) event and it broadcasts  the message in group  or to all users that an user has sent a message.
});
socket.on('disconnect',message=>{
    socket.broadcast.emit('leave', users[socket.id])//Here leave is a user defined event under disconnect event .
    delete users[socket.id];
});
})