const express=require('express');
const app=express();
const PORT= process.env.PORT ||3000;
const path =require('path');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
//setup static directory to serve:
//we use path module of express library to join the directory name which makes it easier to locate our public directory in root folder.
const publicDirectoryPath=path.join(__dirname,'../public');
//now if internet user never mentions any path then we will have him redirected to the static page which is index.html as mentioned above
app.use(express.static(publicDirectoryPath));

//setting up handlebars views and location:
//now we are going to ask express to use a viewing engine by setting it for hbs 
//by default node will look for views folder in root directory, in case we want to save folder in some other name then we have to change the directory path
//this needs to be done by setting the app to look into an alternative folder to views
const viewfilePath=path.join(__dirname,"../templates/views");
const partialsFilePath=path.join(__dirname,"../templates/partials")
app.set('view engine','hbs');
app.set('views',viewfilePath)
//partials like header and footer would be declarerd like this:
hbs.registerPartials(partialsFilePath);

//
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        createdBy:"Abhishek Singh Bhilware"
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Us",
        createdBy:"Golu"
    });
});

//formation of our weather application
app.get('/weather',(req,res)=>{
    //here we want to make sure the query string is not sent empty and hence we check if user has sent an empty string.
    //we also have to pass return statement to ensure the function stops otherwise we will get an error stating the you can't send header twice...
    if(!req.query.address){
        return res.send({
            error:'Please provide an address.'
        })
    }
        //we had to use an empty object for cases where user might add random words. 
        //if there is an empty object to relly apon then our app will set value of lat and long and location to null and still run the prog instead of crashing.
        geocode(req.query.addres, (error, { latitude, longitude, location } = {}) => {
            if(error){
                return res.send({error});
            }
            forecast(latitude, longitude, (error,forecastdata)=>{
                    if(error) {
                        return res.send({error});
                    }
                        res.send({
                            forecast: forecastdata,
                            location:location,
                            address:req.query.address
                        });
                    })
                });
 });

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        createdBy:"Sneha Singh Bhilware"
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404 page. try again",
        createdBy:"Champion Singh",
        errorMessage:"Page not found under help section"
    });
});

//setting up a 404 page.This always needs to come at last else router will throw first page it lands 
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404 page. try again",
        createdBy:"Champion Singh",
        errorMessage:"Page not found."
    });
});

app.listen(port,()=>console.log(`Connected @${PORT}`))