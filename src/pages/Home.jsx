import React from "react";


const redirect_url = "https://channeli.in/oauth/authorise/?client_id=N3MPpGh1CNcZ4nUY02LXl5RwzjbrJaVLmJxSCiYU&redirect_uri=http://127.0.0.1:8000/user/login/&state=RANDOM_STATE_STRING"

const Authenticating = () => {
  window.location.replace(
    redirect_url
  );
}



function Login() {



  return (
    <>
      <button onClick={() => {
        Authenticating();
      }}>
        LOGIN WITH CHANNELi
      </button>

    </>
  );

}

export default Login;
