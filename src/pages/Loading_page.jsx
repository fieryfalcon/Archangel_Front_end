import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../css/Loading.css"

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);





export default function Loading() {


  let { id } = useParams();



  let isAuthenticated = (localStorage.getItem("token") !== null)
  const navigate = useNavigate();

  const yourFunction = async event => {
    console.log('before');
    await delay(3000);
    console.log('after');
    navigate("/recruitment_seasons")
  };


  useEffect(() => {
    if (isAuthenticated) {
      console.log("perfect");
      window.onload = yourFunction;


    }
  }, [isAuthenticated])

  const token = new URLSearchParams(window.location.search).get("token")
  const year = new URLSearchParams(window.location.search).get("year")
  console.log(token)
  console.log(year)
  localStorage.setItem("token", token)
  localStorage.setItem("Year", year)
  isAuthenticated = true



  return (
    <>
      <div className="Loading">
        <p>Loading..!</p>
      </div>




    </>
  )
}