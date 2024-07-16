import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <section className="container notFound">
      <h1>404</h1>
      <p>Page Not Found</p>

      <Link to="/" className="btn btn-pink">
        Go to the HomePage
      </Link>
    </section>
  );
}

export default NotFound;
