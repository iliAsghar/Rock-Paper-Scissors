"use strict";

const startBtn = document.querySelector('.board__start-btn');

startBtn.addEventListener('click',() => {
  window.scroll(0, window.innerHeight)
})