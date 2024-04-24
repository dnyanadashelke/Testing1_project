import React,{useEffect, useState} from 'react'
import { Link, useParams } from "react-router-dom";
import Image from '../../asset/mail_3649786.png';

const Home = () => {
   const { id } =useParams()
  const [Hospital,setHospital] = useState([])

  {/*
  useEffect(() => {
     loadUser()
  },[])

  const loadUser = async () =>{
    const res = await axios.get(`http://localhost:8080/hospital/${id}`);
    setAdmin(res.data)
  }
*/}
  return (
    
<div class="container rounded bg-white mt-5 mb-5 ">

              <h1 className="label-control text-center m-3 text-success fw-bold">LMS Admin</h1>
              <div class="row">
                  <div class="center  border-right">
                      <div class="d-flex flex-column align-items-center text-center p-3 py-2">
                          <img class="mt-1" width="5px" src="https://images.app.goo.gl/XxvwEYdaxL6HEotM9" alt="" style={{
        width: 300,
        height: 350,
        borderRadius: 140 / 2,
        backgroundColor: '#FF6F00',
        transform: [
          { scaleX: 2 }
        ]
    }} />
                     <span class="font-weight-bold">{Hospital.Hospital_name}</span><span class="text-black-50">{Hospital.Hospital_name}</span><span> </span></div>
                  </div>
                  <div class="center  border-right">
                  <div className='d-grid gap-4' >
                      <tr >
    <Link to={`/hospital/${Hospital.id}`}><button className="btn btn-primary col-4  rounded-pill mt-2 " id="k1" style={{ 
        textDecoration:null,
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: '#194D33',
        transform: [
          { scaleX: 2 }
        ]
      }}>Profile</button></Link> 

       <Link to={`/BloodBankList`}><button className="btn btn-danager col-4 ms-3  rounded-pill  mt-2 " style={{
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: '#FCDC00',
        transform: [
          { scaleX: 2 } 
        ]
    }} >Show BloodBank</button></Link>
                         <Link to={`/RequestBloodForm`}><button className="btn btn-danager col-4  ms-3 rounded-pill mt-2 mb-2" style={{
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: '#FF6F00',
        transform: [
          { scaleX: 2 }
        ]
    }} >request to Blood</button></Link>    
                      </tr>
                      <tr>

    <Link to={`/PatientList/${Hospital.id}`}><button className="btn btn-danager col-4 rounded-pill mt-2" style={{
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: '#0288D1',
        textDecoration:'none',
        transform: [
          { scaleX: 2 }
        ]
    }} >Patient List</button></Link> 
   <Link to={`/Request/${Request.id}`}><button className="btn btn-danager col-4 ms-3 rounded-pill mt-2" style={{
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: '#FF6F00',
        transform: [
          { scaleX: 2 }
        ]
    }} >request Status</button></Link> 
    <Link to={`/BloodStock`}><button className="btn btn-danager col-4  ms-3 rounded-pill mt-2 mb-2" style={{
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: '#0288D1',
        textDecoration:'none',
        transform: [
          { scaleX: 2 }
        ]
    }} >Show Blood Stock</button></Link> 
                         
                      </tr>
                      <tr> 
     <Link to={``}><button className="btn btn-danager col-4  rounded-pill " style={{
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: 'red',
        transform: [
          { scaleX: 2 }
        ]
    }} >Change Password</button></Link>
    <Link to={``}><button className="btn btn-danager col-4  ms-3 rounded-pill mt-2 mb-2" style={{
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: 'green',
        transform: [
          { scaleX: 2 }
        ]
    }} >Contact Us</button></Link> 
    <Link to={``}><button className="btn btn-danager col-4  ms-3 rounded-pill mt-2 mb-2" style={{
        width: 350,
        height: 50,
        borderRadius: 140 / 2,
        backgroundColor: '#0288D1',
        textDecoration:'none',
        transform: [
          { scaleX: 2 }
        ]
    }} >Logout</button></Link> 
                      </tr>
                      </div>
                      </div>
                  </div>
              </div>

  )
}

export default Home;