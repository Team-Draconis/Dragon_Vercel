import SocialButton from '../social-login/SocialButton';
import NavBar from "../NavBar";

const handleSocialLogin = (user) => {
  console.log(user, "HERE IS THE USER!!!!!!!!!!!!!");
}
 
const handleSocialLoginFailure = (err) => {
  console.error(err)
}

export default function Splash() {
  return (
    <div>
      <NavBar />
      <h3>Login page</h3>
      <SocialButton
      provider='github'
      gatekeeper='http://localhost:9999'
      appId='92ee8233527f289507b9'
      redirect='http://localhost:3000/'
      scope='user'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      >
        Login with Github Auth
      </SocialButton>
      <a href="/appl/splash" className="card">
        <h3>Go to the splash page</h3>
      </a>
    </div>
  );
}
