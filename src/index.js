import "./style.css";

let helloWorld = document.createElement("div");
helloWorld.innerText = "Hello World!";
helloWorld.classList.add("hello");

document.body.appendChild(helloWorld);
