import NavBar from "../src/NavBar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default function Splash() {
  return (
    <div>
      <NavBar />
      {/* <Container> */}
      <Box mt={30}>
        <Typography variant="h4" component="h1" align="center">
          <a>Login page</a>
        </Typography>
      </Box>
      <Box align="center" m={10}>
        <Link href="/info">
          <Button variant="contained" color="primary">
            Go to the user profile
          </Button>
        </Link>
      </Box>
      {/* </Container> */}
    </div>
  );
}

//* I don't know what's happening here so I just leave it for now.

// import SocialButton from '../social-login/SocialButton';

// const handleSocialLogin = (user) => {
//   console.log(user, "HERE IS THE USER!!!!!!!!!!!!!");
// }

// const handleSocialLoginFailure = (err) => {
//   console.error(err)
// }

// export default function Splash() {

//   return (
//     <div>
//       <h3>Login page</h3>
//       <SocialButton
//       provider='github'
//       gatekeeper='http://localhost:9999'
//       appId='92ee8233527f289507b9'
//       redirect='http://localhost:3000/'
//       scope='user'
//       onLoginSuccess={handleSocialLogin}
//       onLoginFailure={handleSocialLoginFailure}
//       >
//         Login with Github Auth
//       </SocialButton>
//       <a href="/appl/splash" className="card">
//         <h3>Go to the splash page</h3>
//       </a>
//     </div>
//   );
// }
