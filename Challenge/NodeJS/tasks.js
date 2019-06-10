
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */


/* define the path if it exist or not */
/*var path;
    if(process.argv[2]!=""){
         path = process.argv[2];
    }
    else{
         path = 'database.json';
    }
*/
var fs=require('fs');
// task = JSON.parse(loading('database.json'));
  


function startApp(name){
    if(!fs.existsSync('database.json')){
        storeData(task,'database.json');
        }
   task= JSON.parse(loading('database.json'));
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")

  
   
   
}
 //  load data from  database.json
 const loading = (path) => {
    try {
      return fs.readFileSync(path, 'utf8')
    }
     catch (err) {
      console.error(err)
      return false
    }
  }

//  save data in database.json when i type exit or quit.
const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }



/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * 'This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */

var task=[
    {     task:'Mango.',
          done:'no'},
    {     task:'Banana.',
          done:'no' },
    {     task:'Pineapple.',
          done:'yes'}, 
    {     task:'Strawberry.',
          done:'no'}
        ];

function onDataReceived(text) {
  textsplit=text.trim().split(" ");
  /* quit or exit */
  if (text === 'quit\n' || text ==='exit\n') {
    quit();
    }

    /* hello  or hello with word */
  else if(text==='hello\n' || textsplit[0] === 'hello'){
     hello(text);
    }

    /* help */
  else if(text==='help\n'){
    help();
    }

/* list*/
    else if(text ==='list\n') {
        list();
    }

/* add */
    else if(textsplit[0]=== 'add'){
        add(text);
    }

/* Remove */
    else if(textsplit[0]=== 'remove'){
        remove(text);
    }

/* Edit */
    else if(text==='edit\n' || textsplit[0] === 'edit'){
        edit(text);
       }
/* check */
   else if(text === 'check\n'  || textsplit[0] === 'check'){
        check(text);
   }

   /* uncheck */
   else if(text === 'uncheck\n'  || textsplit[0] === 'uncheck'){
    uncheck(text);
}

else {
    unknownCommand(text);
    }

}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
 function hello(text){
    var tex=text.trim();
    console.log(tex+'!');
  }

/**
 * HELP
 *
 * @returns {void}
 */
function help(){
  console.log('quit or exit \n' + 'hello'+ " " +'or  hello+word \n'+ 'unknowncommand \n'  + 'list \n' + 'add \n' + 'remove \n' +'edit \n'+'check \n' +'unckeck \n'+ 'Help \n');

}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  storeData(task, 'database.json') ;
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * print all the list
 * @returns {void}
 */
function list(){
    for (var i=0 ;i<task.length;i++){
        if(task[i].done=='yes'){
           console.log((i+1)+'-'+" [✓] " +task[i].task);
        }
        else{
            console.log((i+1)+'-'+" "+ "[ ]" +task[i].task);
        }
    }
}

/* add new task */
function add(text){
    if(text==='add\n'){
        console.log("Error")
    }
    else {
       task.push(textsplit[1])
       for(var i = 0; i < task.length; i++){
             console.log((i+1)+'-'+task[i]);
       }
    }
}

/* Remove a task */
/* number doesn't exist */
function remove(text){
    if(text==='remove\n'){
        task.pop()
    }
    else if(textsplit[1]<1 || textsplit[1]>task.length){
        console.log('\n'+"number doesn't exist");  
    }
    
    else if(textsplit[1]=='1'){
        task.splice(0,1)
    }
    else if(textsplit[1]=='2'){
        task.splice(1,1)
    }
    
    for(var i = 0; i < task.length; i++){
             console.log((i+1)+'-'+task[i]);
    }
    
}

/* edit */
function edit(text){
    if(text==='edit\n'){
        console.log("\n"+"Error")
    }
    else if(text==='edit new text\n'){
        task[task.length-1]="new text";
    }
    else if(text==='edit 1 new text\n')
    {
      task[0]="new text";
    }
    for(var i = 0; i < task.length; i++){
             console.log((i+1)+'-'+task[i]);
    }
}
/* check [done] */
function check(text){
    if(text === 'check\n'){
       console.log("error");
    }
    else if(task[textsplit[1]-1].done=='no'){
           task[textsplit[1]-1].done='yes'
     }
   list();
   }
 
/* uncheck [done] */
function uncheck(text){
    if(text === 'uncheck\n'){
       console.log("error");
    }
    else if(task[textsplit[1]-1].done=='yes'){
           task[textsplit[1]-1].done='no'
     }
   list();
   }

// The following line starts the application
startApp("Maissaa")
