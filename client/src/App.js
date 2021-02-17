

import './App.css';
import {React,useState,useEffect} from 'react';
import axios from 'axios';



function App() {

const  [name,setname]=useState("");
const  [caption,setcaption]=useState("");
const  [url,seturl]=useState("");
const  [postlist,setpostlist]=useState([]);






const addpost=()=>{
  axios.post("http://localhost:8081/memes",{name: name,caption:caption,url:url}).then(()=>{
      
    alert("Meme posteed succesfully");
    
  }).catch(()=>{
alert("Meme waas not posted");
  });
}

const editpost=(id,nam)=>{
  const new_url = prompt("enter new meme-url!");
  const new_caption=prompt("enter new caption!");
  const new_name=nam;
axios.put("http://localhost:8081/memes/${id}",{new_name: new_name,new_url: new_url,new_caption:new_caption, id: id}).then(()=>{
  setpostlist(postlist.map((val)=>{
    return val._id==id ? {_id:id,name:new_name,caption:new_caption,url:new_url}:val;
  }))
});

};




const deletepost=(id)=>{
  axios.delete("http://localhost:8081/delete/${id}").then((req,res)=>{
    setpostlist(postlist.filter((val)=>{
      return val._id != id;
    }));
    
  });
}

useEffect(()=>{
axios.get("http://localhost:8081/memes").then((response)=>{
  setpostlist(response.data);
}).catch(()=>{
  console.log("cannot read data");
});

},[]);



  return (
    <div className="main">
      <form className="form" onSubmit={addpost}>
        <h1>Create your Meme Here</h1>
      <input type="text" value={name}  className="input-field" placeholder="Type Your Name Here"  onChange={(e)=>setname(e.target.value)} ></input>
      <input type="text"  value={caption}   className="input-field" placeholder="Enter Caption" onChange={(e)=>setcaption(e.target.value)}></input>

      <input type="text" value={url}  className="input-field" placeholder="Please give the meme-url" onChange={(e)=>seturl(e.target.value)}></input>

      <button type="submit" className="button">Submit Meme</button>


      </form>
      <br></br>
      <br></br>
      <div className="divider"></div>
      <br></br>
      <br></br>
      <h1 style={{fontFamily: 'Times',color:'black'}}>Enjoy Your Memes Here :-)</h1>
      
      <div>
        {postlist.reverse().map((val,index)=>{
          return <div className="post-item" key={index}>
            <div className="button-1">
            <button  onClick={()=>editpost(val._id,val.name)}  className="edit-button">Edit Meme</button>
            <button  onClick={()=>deletepost(val._id,val.name)}  className="delete-button">Delete Meme</button>
          
          </div>
          
          <h1 style={{marginLeft:'20px'}}>{val.name}</h1>
          <h3 style={{marginLeft:'20px'}}>{val.caption}</h3>
          <img src={`${val.url}`} style={{width: '300px',height:'200px' ,marginLeft:'20px'}}></img>

          </div>
        })}
        

      </div>
     
    </div>
  );
}

export default App;
