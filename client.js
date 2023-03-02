const socket = io('http://localhost:8000',{transports:['websocket']})
//Below form,messageInput... are used to get the classes and ids which give input inside  the container and we will use it to add content to show when someone joins chat as:"Rohan joined the chat". in the terminal using nodemon to run server.js file.
//Here we are getting DOM elements in respective JS vars. like form,messageInput etc.
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
let audio=new Audio('ting.mp3')
const append=(message,position)=>{const messageElement=document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left')
{
    audio.play();
}//It means to play audio for those messages which are at left side i.e when he/she receives the message.First establish a proper communication b/w 2 joiners after that automatically audio will be start playing.
}

const name=prompt("Enter your name to join");
socket.emit('new-user-joined',name)//Here we will use the same event which we gave in server side so that the event will be emitted on server side and callback function inside it will run giving name of the user.
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})//Here we call user-joined event of server.js to print the name of the user when he/she joins chat and by using append we put content inside the container which we made in html file.To check it open index.html  in multiple windows and enter your name in any of the window and in another tab we will se: "Rohan joined the chat".
form.addEventListener('submit',(e)=>{e.preventDefault();//e is the arrow function and e.preventDefault will avoid reloading of page, whenever we click on sibmit button.
const message=messageInput.value;
append(`You:${message}`,'right');
socket.emit('send',message);
messageInput.value=''})//Here we have added a EventListener which will listen to submit event i.e. clicking on submit button and a function e will run which will show what message we sent and also prevent the page from reloading and also send event which is in  server.js will be emitted/occurs and our messageInput section will be blank.
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')//when a user sends a message then he will click on submit button and as we have event listener as above stated so it will automatically run the function e and it will register the text what the user sent and prevent page from reloading and after that as socket.emit('sent',message) will be executed and  send event occurs in server.js file  but here receive event is occcuring so for user send event will occur but inside send event we also have receive event and it will also occur automatically,so if a user sends a message  in a group of 10 people then 9 people will receive the message and receive event will occur and the above message(data) will be printed on their screen.
   
})
socket.on('leave',name=>{
    append(`${name}:left the chat`,'right')})