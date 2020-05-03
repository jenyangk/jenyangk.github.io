import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faGem from "@fortawesome/fontawesome-free-regular/faGem";

const Header = (props) => (
  <header id="header" style={props.timeout ? { display: "none" } : {}}>
    <div className="logo">
      {/*<span className="icon fa-diamond"></span>*/}
      <span className="icon">
        <img src="static/images/profile-icon.jpg" width="100" />
      </span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>Jen Yang Koh</h1>
        <p>Welcome to my site!</p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <a
            href="javascript:;"
            onClick={() => {
              props.onOpenArticle("about");
            }}
          >
            About Me
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            onClick={() => {
              props.onOpenArticle("experience");
            }}
          >
            Experience
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            onClick={() => {
              props.onOpenArticle("projects");
            }}
          >
            Projects
          </a>
        </li>

        <li>
          <a
            href="javascript:;"
            onClick={() => {
              props.onOpenArticle("construction");
            }}
          >
            Contact Me
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
};

export default Header;
