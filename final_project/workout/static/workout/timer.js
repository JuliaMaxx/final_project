const start = document.querySelector('.start');
const stopp = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const timer = document.querySelector('.timer');
const work = start.dataset.work;
const rest = start.dataset.rest;
const time = start.dataset.time;
const timeLeft = document.querySelector('.time_left');
let progress = 0;
let secondsPassed = 0;
let formattedTime = `${String(time).padStart(2, '0')}:00`;
let increment = 100/(parseInt(formattedTime.split(":")[0]) * 60 + parseInt(formattedTime.split(":")[1]));

function calcTime(){
    let seconds = parseInt(formattedTime.split(":")[0]) * 60 + parseInt(formattedTime.split(":")[1]);
    console.log('seconds'+ seconds);
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    console.log('minutes' + minutes);
    formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    console.log('time' + formattedTime)
    timeLeft.innerHTML = formattedTime;
    secondsPassed ++;
    console.log('passed' + secondsPassed);
    
    progress += increment;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
    document.querySelector('.progress-bar').innerHTML = `${Math.round(progress)}%`;
      
}

function playSound() {
    const audio = document.querySelector('.b1');
    audio.play();
  }

function playSound2() {
    const audio = document.querySelector('.b2');
    audio.play();
  }
function playSound3() {
    const audio = document.querySelector('.b3');
    audio.play();
  }
function playSound4() {
    const audio = document.querySelector('.b4');
    audio.play();
  }
function playSound5() {
    const audio = document.querySelector('.b5');
    audio.play();
  }

let currentRepetition = 1;
let is_paused = false;

function inCount(){
    console.log('initial count')
    let num = 3;
    inter = setInterval(() => {
        if (!is_paused){
            timer.innerHTML = num;
            if (num === 0){
              playSound();
              setTimeout(function() {
                playSound5();
              }, 300);
            }
            else{
              playSound2();
            }
            num--;
        }
        if (num < 0){
            clearInterval(inter);
            console.log('innitial complete')
            let iterations;
            if (work == 20){
              iterations = time*2;
            }
            else{
              itarations = time;
            }
            countdownTimer(work, rest, iterations);
          }
        }, 1000)
      }
      
function countdownTimer(workCount, restCount, repeatCount) {
    console.log('repetition' + currentRepetition);
    // Store the initial countdown values to reset them for each repetition
    const workCountReset = workCount;
    const restCountReset = restCount;
  
    inter = setInterval(() => {
      timer.style.color = 'white';
      document.querySelector('.heading').innerText = 'crush IT !!!';
      if (!is_paused){
        if (workCount === 1){
            playSound();
            if (!(currentRepetition > repeatCount)){
              setTimeout(function() {
                playSound4();
              }, 200);
            }
        }
        else if(workCount < 4){
            playSound2();
        }
        timer.innerHTML = workCount;
        workCount--;
        calcTime();
      }
  
      if (workCount < 1) {
        clearInterval(inter);

        inter = setInterval(() => {
          timer.style.color = '#FF0099';
          document.querySelector('.heading').innerText = 'Have a rest!';
          if (!is_paused){
            if (restCount === 1){
                playSound();
                if (!(currentRepetition >= repeatCount)){ 
                    setTimeout(function() {
                      playSound5();
                    }, 300);
                }
            }
            else if(restCount < 4){
                playSound2();
            }
            timer.innerHTML = restCount;
            restCount--;
            calcTime();
          }  
  
          if (restCount < 1) {
            clearInterval(inter);
            currentRepetition++;
  
            // Check if all repetitions are completed
            if (currentRepetition > repeatCount) {
              console.log('Countdown complete!');
              timer.innerHTML = 'done';
              document.querySelector('.heading').innerText = 'you did it !!!';
              playSound3();
              start.disabled = false;
            } else {
              // Start the next repetition
              workCount = workCountReset;
              restCount = restCountReset;
              countdownTimer(workCount, restCount, repeatCount);
            }
          }
        }, 1000);
      }
    }, 1000);
  
  }
  

document.addEventListener('DOMContentLoaded', ()=>{
    pause.addEventListener('click', () => {
        is_paused = !is_paused;
        console.log('paused')
    });
    stopp.addEventListener('click', () => {
        clearInterval(inter);
        timer.style.color = 'white';
        document.querySelector('.heading').innerText = 'crush IT !!!';
        document.querySelector('.progress-bar').style.width = `0%`;
        document.querySelector('.progress-bar').innerHTML = `0%`;
        progress = 0;
        timer.innerHTML = 0;
        timeLeft.innerHTML = '00:00';
        formattedTime = `${String(time).padStart(2, '0')}:00`;
        console.log('stopped');
        start.disabled = false;
        });
    start.addEventListener('click', ()=>{
        start.disabled = true;
        inCount();
    })  
})