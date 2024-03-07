import React from 'react';
import { useNavigate } from 'react-router-dom';
// import appIcon from "./front-end/images1/icon.png";

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()


  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        {/* <div className={'appIcon'}>
          <img src={appIcon} alt="icon"> </img>
        </div> */}
        <div>Welcome!</div>
      </div>
      <div>This is the landing page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={() => navigate("/login")}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={() => navigate("/signup")}
          value="Sign up"
        />
      </div>
    </div>
  )
}

export default Home