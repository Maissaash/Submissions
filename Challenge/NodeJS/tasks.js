
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
var path;
    if(process.argv[2]){
         path = process.argv[2];
    }
    else{
         path = 'database.json';
    }
var fs=require('fs');
  


function startApp(name){
    if(!fs.existsSync(path)){
        storeData(task,path);
        }
   task= JSON.parse(loading(path));
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
    {     taskm:'Mango.',
          done:'no'},
    {     taskm:'Banana.',
          done:'no' },
    {     taskm:'Pineapple.',
          done:'yes'}, 
    {     taskm:'Strawberry.',
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
        edit(text,textsplit);
       }
/* check */
    else if(text === 'check\n'  || textsplit[0] === 'check'){
      check(text,textsplit);
}
 /* uncheck */
 else if(text === 'uncheck\n'  || textsplit[0] === 'uncheck'){
    uncheck(text,textsplit);
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
    storeData(task, path) ;
    console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * print all the list
 *
 * @returns {void}
 */
function list(){
    for (var i=0 ;i<task.length;i++){
        if(task[i].done=='yes'){
           console.log((i+1)+'-'+" [✓] " +task[i].taskm+"   "+task[i].done);
        }
        else{
            console.log((i+1)+'-'+" "+ "[ ]" +task[i].taskm+"   "+task[i].done);
        }
    }
}

/* add new task */
function add(text){
    if(text==='add\n'){
        console.log("Error")
    }
    else {
      task.push({taskm:textsplit[1] , done:textsplit[2]})
      list(text);
    
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
    list(text);
    
}

/* edit */
function edit(text,textsplit){
    if(text==='edit\n'){
        console.log("\n"+"Error")
    }
    else if(textsplit[0]==='edit' && isNaN(textsplit[1])){
        //console.log(task)
        console.log(textsplit)
        task[task.length-1].taskm = textsplit[1]
        task[task.length-1].done=textsplit[2]
       
        //list(text)
    }
    else if(textsplit[0]==='edit' && textsplit[1]==='1'){
      //console.log(textsplit[2]+textsplit[3] + textsplit.length);
      task[0].taskm=textsplit[2];
      task[0].done=textsplit[3];
      list(text)
    }
  
}
/* check [done] */
function check(text,textsplit){
  if(text === 'check\n'){
     console.log("error");
  }
  else if(textsplit[0]==='check' && !isNaN(textsplit[1])){
     if(task[textsplit[1]-1].done=='no'){
         task[textsplit[1]-1].done='yes'
         list(text);
   }}
 
 }
/* uncheck [done] */
function uncheck(text,textsplit){
    if(text === 'uncheck\n'){
       console.log("error");
    }
    else if(textsplit[0]==='uncheck' && !isNaN(textsplit[1])){
       if(task[textsplit[1]-1].done=='yes'){
           task[textsplit[1]-1].done='no'
           list(text);
     }}
   
   }

// The following line starts the application
startApp("Maissaa")
