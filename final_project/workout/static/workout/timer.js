const start = document.querySelector('.start');
const stopp = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const timer = document.querySelector('.timer');
const work = start.dataset.work;
const rest = start.dataset.rest;
const time = start.dataset.time;

function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
  }

let currentRepetition = 1;
let is_paused = false;

function inCount(){
    console.log('initial count')
    let num = 3;
    inter = setInterval(() => {
        if (!is_paused){

            console.log(num);
            timer.innerHTML = num;
            if (num === 0){
              playSound('mixkit-digital-quick-tone-2866.wav');
            }
            else{
              playSound('1573487120_fad402838ffc2a5.mp3');
            }
            num--;
        }
        if (num<0){
            clearInterval(inter);
            console.log('innitial complete')
            countdownTimer(work, rest, time);
        }
    }, 1000)
}

function countdownTimer(initialCount, secondaryCount, repeatCount) {
    console.log('repetition' + currentRepetition);
  
    // Start the initial countdown
    inter = setInterval(() => {
      if (!is_paused){
        if (initialCount === 0){
            playSound(sound2);
        }
        else if(initialCount < 4){
            playSound(sound1);
        }
        timer.innerHTML = initialCount;
        console.log(initialCount);
        initialCount--;

      }
  
      if (initialCount < 0) {
        clearInterval(inter);
  
        // Start the secondary countdown after the initial countdown ends
        inter = setInterval(() => {
          if (!is_paused){
            if (secondaryCount === 0){
                playSound('mixkit-digital-quick-tone-2866.wav');
            }
            else if(secondaryCount < 4){
                playSound('1573487120_fad402838ffc2a5.mp3');
            }
            timer.innerHTML = secondaryCount;
            console.log(secondaryCount);
            secondaryCount--;
          }  
  
          if (secondaryCount < 0) {
            clearInterval(inter);
            currentRepetition++;
  
            // Check if all repetitions are completed
            if (currentRepetition > repeatCount) {
              console.log('Countdown complete!');
              timer.innerHTML = 'done'
              start.disabled = false;
            } else {
              // Start the next repetition
              initialCount = initialCountReset;
              secondaryCount = secondaryCountReset;
              countdownTimer(initialCount, secondaryCount, repeatCount);
            }
          }
        }, 1000);
      }
    }, 1000);
  
    // Store the initial countdown values to reset them for each repetition
    const initialCountReset = initialCount;
    const secondaryCountReset = secondaryCount;
  }
  

document.addEventListener('DOMContentLoaded', ()=>{

    pause.addEventListener('click', () => {
        is_paused = !is_paused;
        console.log('paused')
    });
    stopp.addEventListener('click', () => {
        clearInterval(inter);
        timer.innerHTML = 0;
        console.log('stopped');
        start.disabled = false;
        });
    start.addEventListener('click', ()=>{
        start.disabled = true;
        inCount();
        console.log(work, rest, time);
    })
    
})