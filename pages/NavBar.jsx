import "./styles/navbar.scss";

export default function NavBar() {
  return (
    <div className="navbar" >
      <h2 id="title">Dragon Tester: Show your fire!</h2>
      <a href="/" className="navcard">
        <h3>LogOut</h3> <br/>
      </a>
      <a href="/comp/login" className="navcard">
        <h3>Company logIn</h3>
      </a>
    </div>
  );
}
