import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";

const Table = () => {
   
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState([])
    const [data, setData] = useState([])

    const fetchData = async()=>{
      let url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      try{
          let res = await axios.get(url);
          setData(res.data);
          let paginatedVar = [];
          for(let i=0;i<10;i++){
  paginatedVar.push(res.data[i]);
          }
          // console.log(paginatedVar);
  setFilteredData(paginatedVar);
          
      }
      catch(e){
          alert("failed to fetch data");
      }
  }
  
  useEffect(()=>{
    fetchData();
        },[])
  

    const handlePrevious = () =>{
        if(page===1){
            return
        }
        setPage(prevPage=>prevPage-1)
    }
    const handleNext = () =>{
        if(page>data.length/10){
            return
        }
        setPage(prevPage=>prevPage+1)
    }

    const filterData = () =>{
        let paginatedVar = [];
        for(let i=page*10-10;i<page*10&&i<data.length;i++){
paginatedVar.push(data[i]);
        }
        // console.log(paginatedVar);
setFilteredData(paginatedVar);
    }

    useEffect(()=>{
        filterData();
    },[page])

    // useEffect(()=>{
    //     filterData();
    // },[data])

   

  return (
    <>
    <div style={{display:'flex', justifyContent:'center'}}>
        <h2>Employee Data Table</h2>
        </div>
        
        
        <table style={{width:'100%', borderCollapse: 'collapse', textAlign:'left'}}>
           <thead>
            <tr style={{backgroundColor:'green',color:'white'}}>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
            </thead>
            <tbody>
           {filteredData.map((emp)=> ( <tr style={{borderBottom:'1px solid black'}}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
            </tr>
            ))}
            </tbody>
        </table>
        <div style={{display:'flex', justifyContent:'center'}}>
<button onClick={handlePrevious}>Previous</button>
<button>{page}</button>
<button onClick={handleNext}>Next</button>
        </div>
    
    </>
  )
}

export default Table