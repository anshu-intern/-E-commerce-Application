import { useRouteError } from "react-router-dom";
import "./Error.css";
import erroricon from "../assets/error.jpg";
import { Link } from "react-router-dom";

function Error(){
  // Get the error object provided by react-router-dom when a route fails
    const err = useRouteError();

    return (
      <main>
      <section className="errorSection">
          <h1>Oops... Page not found!</h1>
          <br/>
          <h2>
            Status: {err.status} - {err.statusText}
          </h2>
          <p>{err.data}</p>
          <br/>
          <Link to={"./"}><p className="errorNav" >Click here to go back to homepage </p></Link>
        <img className="errorimage" src={erroricon} alt="Error Icon"/>
      </section>
    </main>
  );
}

export default Error;