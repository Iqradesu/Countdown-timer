#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import {DifferenceInSecondsOptions, differenceInSeconds } from "date-fns";

//start code step 1
console.log(chalk.bold.italic.underline("\t\n************WELCOME TO THE COUNTDOWN-TIMER************\n"))
// function for countdown seconds 
function* countdownTimer(second:number){
    //while loop
    while(second > 0){
        yield second;
        second--;
    }
}

let ans = await inquirer.prompt([
    {
        name:"seconds",
        type:"number",
        message:"Enter the number of seconds to run the countdown timer",
    }
])
//step:2 counter initialization

let timeriterator = countdownTimer(ans.seconds);


// fuction to create a cowntdownt timer
function displayCountdown(){

    //value below 10
    let result : any= timeriterator.next();

    // if else condition apply

    if(!result.done){
        //  current date and time calls
        const now = new Date();
        const countdownTime = new Date(now.getTime() + (result.value * 1000));
        //calculate remaining seconds in time
        const remainingseconds = differenceInSeconds(countdownTime , now)

        console.log(chalk.yellowBright(`\n\t------{(${chalk.greenBright(remainingseconds)})}------\n`))
        setTimeout(displayCountdown, 1000) // 1 second is equal to 1000 ms
    }
    else{
        //display result count down complete
        console.log(chalk.red.inverse("*********{(Countdown Complete!)}*********"))
    }
}

// invoke
displayCountdown();

