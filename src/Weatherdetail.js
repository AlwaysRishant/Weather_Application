import { useState} from "react";
import"../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weathercondition";
export default function Weatherdetail() {
  const[newcity,setnewCity]=useState("Bhopal");
  const handleSubmit=(e)=>{
      e.preventDefault();
      let data=document.querySelector(".me-2").value;
      if(data.length===0)
      {
        alert("Field should not be empty");
        return;
      }
      setnewCity(data);
      document.querySelector(".me-2").value="";
  }
  return(
    <div>
      <nav className="navbar bg-body-tertiary">
    <div className="container-fluid">
        <h1 className="navbar-brand">Weather App</h1>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search"aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit" >Search</button>
        </form>
       
    </div>
    </nav>
    {<h1 className="text-center">Weather of {newcity}</h1>}
    {newcity && <Weather cityname={newcity}/>}
    </div>
  )
}