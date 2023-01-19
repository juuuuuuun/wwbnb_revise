/*
<!-- 
  Name: Jun Song
Seneca ID Number : 141973198
Date: 2020-10-25
Purpose: approve for submitting WEB322 Assignment2
 -->
All images from Unsplash.
Url: https://unsplash.com
*/
var menuBar = document.querySelector(".menuBar");
var menuItems = document.querySelector("nav .closable");
var menuItems2 = document.querySelector("nav .closable2");
var openForm = document.querySelector("nav .main-item .logIn-Form");
var overlay = document.querySelector(".overlay");
var logIn = document.querySelector(".overlay > .log-in");
var logIn_btn = document.querySelector(".overlay .logIn_btn");
var signUp_Form = document.querySelector(".overlay > .sign-up");
var signUp_btn = document.querySelector(".overlay .signUp_btn");
var close_s = document.querySelector(".overlay .sign-up .title i");
var close_l = document.querySelector(".overlay .log-in .title i");
var footer = document.querySelector("footer");

menuBar.onclick = () => {
  if(menuItems.classList.contains('closable')){
    menuItems.classList.remove('closable');
    menuItems2.classList.remove('closable2');
  }else{
    menuItems.classList.add('closable');
    menuItems2.classList.add('closable2');
  }
}

openForm.onclick = () => {
    overlay.style.display = "flex";
};

signUp_btn.onclick = () => {
    logIn.style.display = "none";
    signUp_Form.style.display = "block";
};

logIn_btn.onclick = () => {
    logIn.style.display = "block";
    signUp_Form.style.display = "none";
};

close_s.onclick = () => {
    overlay.style.display = "none";
    logIn.style.display = "block";
    signUp_Form.style.display = "none";
};

close_l.onclick = () => {
    overlay.style.display = "none";
};

let data_footer = '';
data_footer += `<div class="item">
    © 2020 WWBnB, Inc. All rights reserved
    <span>·</span>
    <a class="rights" href="#" class="privacy">Privacy</a>
    <span>·</span>
    <a class="rights" href="#" class="privacy">Terms</a>
    <span>·</span>
    <a class="rights" href="#" class="privacy">Sitemap</a>
  </div>
  <div class="item icons">
    <a target="blank" href="#"><i class="fab fa-twitter"></i></a>
    <a target="blank" href="#"><i class="fab fa-facebook"></i></a>
    <a target="blank" href="#"><i class="fab fa-instagram-square"></i></a>
  </div>
  <form class="item" id="subscribe" action="https://formspree.io/mqkyjkjz" method="POST">
    <input type="email" name="email" id="email" placeholder="Email" required />
    <button>Subscribe</button>
  </form>`;

footer.innerHTML = data_footer;