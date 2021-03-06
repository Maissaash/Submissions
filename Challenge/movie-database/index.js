 var express = require('express')
 var app = express()
 var mongoose = require('mongoose');
 
 var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

var url="mongodb+srv://maissaa:<password>@cluster0-hv8hy.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
const db =mongoose.connection
const url = process.env.MONGOLAB_URI;
mongoose.connect(url,{useMongoClient:true});
store:new MongoStore({mongooseConnection :db})

app.set('view engine', 'ejs')
const movieseSchema = new mongoose.Schema({
    Title: String,
    Year: Number,
    Rating: Number
    });
const movie=new mongoose.Schema(movies,moviesSchema)

const Article = mongoose.model("Article", moviesSchema);



     app.get('/', (req, res) => { 
         res.send('ok')    
     });
     /* test */
    app.get('/test', (req, res) => { 
        res.send('{status:200, message:"ok"}')
    });  
    /* get the time */  
    app.get('/time', (req, res) => { 
        var today = new Date(); 
        var time = today.getHours() +":" + today.getSeconds();
        res.send({status:200,message:time})
    }); 
    /* hello with id */ 
    app.get('/hello/:ID', (req, res) => { 
        res.send({status:200, message:`hello ${req.params.ID}`})
    }); 
    /* search */
    app.get('/search', (req, res) => { 
        if(req.query.s !==""){
            res.send({status:200, message:"ok", data:req.query.s}) 
        }
        else{
            res.send({status:500, error:true, message:"you have to provide a search"})  
        }
    });
    const movies = [
        { title: 'Jaws', year: 1975, rating: 8 },
        { title: 'Avatar', year: 2009, rating: 7.8 },
        { title: 'Brazil', year: 1985, rating: 8 },
        { title: 'الارهاب و الكباب‎', year: 1992, rating: 6.2 }
    ]

    /* list  */
    app.get('/movies/read', (req, res) => { 
            res.send({status:200, data:movies})
        })

    /* search by date */
    app.get('/movies/read/by-date', (req, res) => { 
        res.send({status:200, data:movies.sort(function(a, b)
            {return a.year - b.year})  })
    })
 /* search by rating */
 app.get('/movies/read/by-rating', (req, res) => { 
    res.send({status:200, data:movies.sort(function(a, b)
        {return a.rating - b.rating})  })
})
/* search by title */
app.get('/movies/read/by-title', (req, res) => { 
    res.send({status:200, data:movies.sort(Comparator)})
})

function Comparator(a, b) {
    if (a.title < b.title){ return -1};
    if (a.title > b.title) {return 1};
    return 0;
  }
/* read by ID */ 
app.get('/movies/read/id/:ID',(req,res)=>{
    var ss=req.params.ID
    if(ss<=movies.length && ss>=0){
           res.send({status:200,data:movies[ss-1]})
    }
    else{
    res.send({status:404, error:true, message:'the movie <ID> does not exist'})
    }
})

/* add new movie */    
 app.post('/movies/add',(req,res) => {
      var newtitle = req.query.title 
      var newyear = req.query.year 
      var newrating = req.query.rating
      
       if(newtitle == undefined || newyear == undefined || newyear.length > 4 || isNaN(newyear)) {
            res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
} 
if (newrating == "") { newrating = 4 }
 movies.push({title: newtitle, year: newyear, rating: newrating}) 
 res.send({status:200, data:movies})
})

/* delete movie */
app.delete('/movies/delete/:ID',(req,res) => {
    var moviesdel = req.params.ID
    if (moviesdel > 0 && moviesdel< movies.length ) {
        movies.splice(moviesdel-1 , 1)
        res.send({status:200, message: movies})
    }
    else {
        res.send({status:404, error:true, message:'the movie <ID> does not exist'})
    }

})    
/* update movie */
app.put('/movies/update/:ID',(req,res) => {
    var idexist=req.params.ID
    var newtitle=req.query.title
    var newyear=req.query.year
    var newrating=req.query.rating

    if(idexist>0 && idexist<movies.length){
        if(newtitle!=movies[idexist].title){
            movies[idexist].title=newtitle;
        }
        else if(newyear!=movies[idexist].year){ 
             movies[idexist].year=newyear;
        }
        else if(newrating!=movies[idexist].rating){
             movies[idexist].rating=newrating;
        }
    res.send({status:200, message: movies})
    }        
        
    else{    
         res.send({error:true, message:'ID not exist'})
        }
    
    })

    app.listen(3000, () => console.log('listinig on port 3000'))