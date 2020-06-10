import NavBar from "../NavBar";
import useSWR from "swr";

export default function Splash() {
  // const { data, revalidate } = useSWR("../api/me", async function (args) {
  //   const res = await fetch(args);
  //   return res.json();
  // });
  // console.log(data);
  // if (!data) return <h1>Loading...</h1>;
  // let loggedIn = false;
  // if (data.email) {
  //   loggedIn = true;
  // }

  return (
    <div>
      <NavBar />
      <h3>Splash page</h3>
      <h4>
        This page will contain boilerplate about what Dragon Tester is and how
        it helps applicants
      </h4>
      <a href="/appl/info" className="card">
        <h3>Go to basic info page</h3>
      </a>
    </div>
  );
}
