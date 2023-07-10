const start = document.querySelector('.start');
const stopp = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const timer = document.querySelector('.timer');
const timeLeft = document.querySelector('.time_left');

const work = start.dataset.work;
const rest = start.dataset.rest;
const time = start.dataset.time;

let progress = 0;
let secondsPassed = 0;

// get the time in MM:SS format
let formattedTime = `${String(time).padStart(2, '0')}:00`;
// get the increment for progress bar using 100/seconds
let increment = 100/(parseInt(formattedTime.split(":")[0]) * 60 + parseInt(formattedTime.split(":")[1]));

// calculate passed time
function calcTime(){
    // get the amount of seconds based on the formated time 
    let seconds = parseInt(formattedTime.split(":")[0]) * 60 + parseInt(formattedTime.split(":")[1]);
    console.log(seconds);
    // decrease seconds
    seconds--;
    // get minutes based on seconds
    const minutes = Math.floor(seconds / 60);
    // get the remaining seconds
    const remainingSeconds = seconds % 60;
    // get the time in MM:SS format
    formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    // update the html to display changes
    timeLeft.innerHTML = formattedTime;
    // add 1 to passed seconds
    secondsPassed ++;
    
    // update the progress bar by adding the increment
    progress += increment;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
    document.querySelector('.progress-bar').innerHTML = `${Math.round(progress)}%`;
      
}

// define functions for playing various sounds
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

// initial count from 3 to 0
function inCount(){
    let num = 3;
    // set the count down interval
    inter = setInterval(() => {
        // if the timer is not paused
        if (!is_paused){
            // update the timer html to reflect changes
            timer.innerHTML = num;
            // when number gets to 0 - play one sound then after 0.3s play another
            if (num === 0){
              playSound();
              setTimeout(function() {
                playSound5();
              }, 300);
            }
            else{
              playSound2();
            }
            // decrease the number
            num--;
        }
        if (num < 0){
            // clear the count down interval
            clearInterval(inter);
            console.log('innitial complete')
            let iterations;
            // if the ratio is 20/10 that means in one minute there shoud be two iterations
            if (work == 20){
              iterations = time*2;
            }
            else{
              itarations = time;
            }
            // set the count douwn timer
            countdownTimer(work, rest, iterations);
          }
        }, 1000)
      }

function saveResult(){
  // post the data about finished workout to the history url
  fetch('/history', {
    method: 'POST',
    body: JSON.stringify({
        workout: `${work}/${rest} workout for ${time} minutes`
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
  });

}

function countdownTimer(workCount, restCount, repeatCount) {
    console.log('repetition' + currentRepetition);

    // store the initial values to reset them for each repetition
    const workCountReset = workCount;
    const restCountReset = restCount;

    // set the count down for exercise time 
    inter = setInterval(() => {
      timer.style.color = 'white';
      document.querySelector('.heading').innerText = 'crush IT !!!';
      // if timer is not paused
      if (!is_paused){
        // when timer gets to 1 - play one sound then after 0.2s play another
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
        // update the html to reflect changes
        timer.innerHTML = workCount;
        // decrease the count
        workCount--;
        // calculate time
        calcTime();
      }
      
      if (workCount < 1) {
        // clear first interval
        clearInterval(inter);
        // start second interval for rest time
        inter = setInterval(() => {
          // change style to indicate rest time
          timer.style.color = '#FF0099';
          document.querySelector('.heading').innerText = 'Have a rest!';
          // if timer is not paused
          if (!is_paused){
            // if timer gets to 1 - play one sound then after 0.3s play another
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
            // update html to reflect changes
            timer.innerHTML = restCount;
            // decrease the count
            restCount--;
            // calculate time
            calcTime();
          }  
  
          if (restCount < 1) {
            // clear the second interval
            clearInterval(inter);
            // increase the number of repetitions
            currentRepetition++;
  
            // check if all repetitions are completed
            if (currentRepetition > repeatCount) {
              console.log('Countdown complete!');
              // save workout to user's history
              saveResult();
              // change html to indicate the end of workout
              timer.innerHTML = 'done';
              document.querySelector('.heading').innerText = 'you did it !!!';
              // play the ending sound
              playSound3();
              // enable start button
              start.disabled = false;
            } else {
              // reset values
              workCount = workCountReset;
              restCount = restCountReset;
              // start the next repetition
              countdownTimer(workCount, restCount, repeatCount);
            }
          }
        }, 1000);
      }
    }, 1000);
  
  }
  

document.addEventListener('DOMContentLoaded', ()=>{
    pause.addEventListener('click', () => {
        // on click change the paused to the opposite of itself
        is_paused = !is_paused;
        console.log('paused');
    });

    stopp.addEventListener('click', () => {
        // clear the interval that is currently active
        clearInterval(inter);
        // save workout to user's history
        saveResult();
        // change html back to default state
        timer.style.color = 'white';
        document.querySelector('.heading').innerText = 'crush IT !!!';
        
        // reset all the values to 0
        document.querySelector('.progress-bar').style.width = `0%`;
        document.querySelector('.progress-bar').innerHTML = `0%`;
        progress = 0;
        timer.innerHTML = 0;
        timeLeft.innerHTML = '00:00';
        formattedTime = `${String(time).padStart(2, '0')}:00`;

        // enable start button
        start.disabled = false;
        console.log('stopped');
        });
    start.addEventListener('click', ()=>{
        // disable start button
        start.disabled = true;
        // start the initial count
        inCount();
    })  
})