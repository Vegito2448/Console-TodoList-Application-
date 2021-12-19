const { resolve } = require('path');

require('colors')
console.clear();

const showMenu=()=>{
    return new Promise(resolve=>{
        console.clear();
        
        console.log('================='.blue);
        
        console.log(` Select an Option`.cyan);
    
        console.log('================='.blue);
    
        console.log(`${'1.'.cyan} Create task`);
        console.log(`${'2.'.cyan} list tasks`);
        console.log(`${'3.'.cyan} List completed tasks`);
        console.log(`${'4.'.cyan} List pending tasks`);
        console.log(`${'5.'.cyan} to Complete task/s`);
        console.log(`${'6.'.cyan} Delete Task`);
        console.log(`${'0.'.cyan} Exit`);
        
        const readline=require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        })
    
        readline.question('Select an Option:', (opt)=>{
            
            readline.close();

            resolve(opt)
        })

    })

}
const pause=()=>{
    return new Promise(resolve=>{
        
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        })
    
        readline.question((`\nPress ${'Enter'.cyan} to continue\n`), (opt)=>{
            readline.close();
            resolve();
        })

    });
}


module.exports={
    showMenu,
    pause
}