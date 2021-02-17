const express= require ('express');
const App= express();
const mongoose=require ('mongoose');
const usermodel =require( './models/memeschema');
const cors=require('cors');
const CONNECTION_URL=require('./.env');
const dotenv=require('dotenv');

const PORT= process.env.PORT || 8081;




App.use(cors());
App.use(express.json());
dotenv.config();

mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("mongodb local connected");
})



App.get("/",(req,res)=>{
    res.send("Welcome to the backend server of Apurba-X-Meme");
})

App.post("/memes",async(req,res)=>{
    own=req.body.name;
    cap=req.body.caption;
    murl=req.body.url;
    id1=Math.random()*10;
   
    const user= new usermodel({
       id : id1,
       name: own,
        caption: cap,
       url: murl});
    await user.save();
   
    res.send(user);
})


App.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id;
    await usermodel.findOneAndRemove(id).exec();
    
    res.send(id);
});


App.get("/memes/:id",(req,res)=>{
    const id=req.params.id;
    usermodel.findById(id,(err,result)=>{
    if(err)
    {
        res.send(err);
        console.log("meme with"+id+"found");
    }
    else{
        res.send(result);
    }
    })
})


App.put("/memes/:id",async(req,res)=>{
    const new_url=req.body.new_url;
    const new_caption=req.body.new_caption;
    const id=req.body.id;
    const new_name=req.body.new_name;
 
    
    try{
        await usermodel.findById(id,(error,friendToupdate)=>{
           if(error)
           {
               console.log(error);
        }
        else
    { friendToupdate.caption=new_caption;
        friendToupdate.url=new_url;
        friendToupdate.name=new_name;
        friendToupdate.save();
        res.send(friendToupdate);
}
        });
    }
    catch(error){
console.log(error);
    }
   
           
   
});


App.get('/memes',async(req,res)=>{
    usermodel.find({},(err,result)=>{
        if(err)
        {
            console.log("cannot get data from db");
        }
        else{
           
            res.send(result);
        }
    })

});





App.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
})