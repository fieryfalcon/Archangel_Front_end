import React from "react";
import "../css/Login.css";
import logo from "../images/img.png";


const redirect_url = "https://channeli.in/oauth/authorise/?client_id=N3MPpGh1CNcZ4nUY02LXl5RwzjbrJaVLmJxSCiYU&redirect_uri=http://127.0.0.1:8000/user/login/&state=RANDOM_STATE_STRING"
const easter_egg_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"


const Authenticating = () => {
  window.location.replace(
    redirect_url
  );
}
const Never_gonna = () => {
  window.location.replace(
    easter_egg_url
  );
}



function Login() {



  return (
    <>
      <div className="Login">
        <div className="Topic">
          <h4>Archangel </h4>
          <h3>A Recruitment Website made for Information Mangement Group. Login to Continue...!</h3>
          <img src={logo} />
        </div>



        <div className="Button-container">
          <button className="Button" onClick={() => {
            Authenticating();
          }}>
            Login with Channeli
          </button>

          <button className="Button" onClick={() => { Never_gonna() }}>
            Not in IMG ..?
          </button>
        </div>
      </div>





    </>
  );

}

export default Login;
