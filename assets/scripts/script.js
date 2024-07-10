"use strict";
import { runRPS } from "./rock-paper-scissors.js";

const startBtn = document.querySelector('.board__start-btn');

startBtn.addEventListener('click',() => {
  window.scroll(0, window.innerHeight)
})

const playerBtns = document.querySelectorAll('.game__choice-btn--player');

playerBtns.forEach(element => {
  element.addEventListener('click',() => {
    element.classList.add('active');
    runRPS(element.dataset.move);
  })
})

document.querySelectorAll('.emoji').forEach(emoji => {
  emoji.addEventListener('click',() => {
    playerBtns.forEach((playerBtn) => {
      if(playerBtn.dataset.move === emoji.dataset.move){
        playerBtn.classList.add('active');
        runRPS(playerBtn.dataset.move);
      }
    })
  })
})