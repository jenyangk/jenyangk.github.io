import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faGithub from "@fortawesome/fontawesome-free-brands/faGithub";
import faLinkedin from "@fortawesome/fontawesome-free-brands/faLinkedin";
import faLink from "@fortawesome/fontawesome-free-regular/faCompass";
import faDoc from "@fortawesome/fontawesome-free-regular/faNewspaper";
import faSuprise from "@fortawesome/fontawesome-free-regular/faWindowClose";

class Main extends React.Component {
  render() {
    let close = (
      <div
        className="close"
        onClick={() => {
          this.props.onCloseArticle();
        }}
      ></div>
    );

    return (
      <div
        id="main"
        style={this.props.timeout ? { display: "flex" } : { display: "none" }}
      >
        <article
          id="experience"
          className={`${this.props.article === "experience" ? "active" : ""} ${
            this.props.articleTimeout ? "timeout" : ""
          }`}
          style={{ display: "none" }}
        >
          <h2 className="major">Work Experiences</h2>
          <h3>System Administrator</h3>
          <h4>PCL Constructors Inc., Edmonton, Canada</h4>
          <h4>June 2020 - August 2020</h4>
          <p></p>
          <hr></hr>
          <h3>Head of Events</h3>
          <h4>
            Malaysian Student's Association, University of Alberta, Edmonton,
            Canada
          </h4>
          <h4>Sep 2019 - Present</h4>
          <p>
            Coordinated and planned several events catered to Malaysian students
            studying in the University of Alberta.
          </p>
          <hr></hr>
          <h3>Research Assistant</h3>
          <h4>H.O.M.E Lab, Sunway University, Malaysia</h4>
          <h4>June 2017 - December 2017</h4>
          <p>
            Worked as a lead programmer developing a model, theory and algorithm
            by effectively combining haptic and audio feedback for user
            navigation and understanding of 3-D objects for visually impaired
            individuals.
          </p>
          <hr></hr>
          <h3>Head of Logistics</h3>
          <h4>
            Centre of American Education Student Committee, Sunway University,
            Malaysia
          </h4>
          <h4>May 2017 - August 2017</h4>
          <p>
            Lead a team to scout for suitable venues for meeting and events,
            floor planning events. Managed the logistics and floor-planning for
            various activities such as a gala night at Grand Millennium and a
            bazaar.
          </p>
          <hr></hr>
          {close}
        </article>

        <article
          id="projects"
          className={`${this.props.article === "projects" ? "active" : ""} ${
            this.props.articleTimeout ? "timeout" : ""
          }`}
          style={{ display: "none" }}
        >
          <h2 className="major">Projects</h2>
          <h3>SE-OER</h3>
          <p>
            Software Engineering Open Education Resources (SEOER) is a web
            application that allows collaborative practice of topics in software
            engineering. Built with Django, React and PostgreSQL.
          </p>
          <span className="image main">
            <img src="/static/images/quiz.png" alt="quiz application" />
          </span>
          <p>
            The application is not open for public use but you can refer its
            documentation for more information.
          </p>
          <ul className="icons">
            <li>
              <a href="https://ualberta-cmput401.github.io/SE-OER/">
                <FontAwesomeIcon icon={faDoc} />
              </a>
            </li>
          </ul>
          <hr></hr>
          <h3>Reddit Comments</h3>
          <p>
            A web application that visualizes common words used on Reddit. The
            website was built in 24-hours as part of a hackathon with Django,
            React and Docker.
          </p>
          <ul className="icons">
            <li>
              <a href="http://199.116.235.143:3000/">
                <FontAwesomeIcon icon={faLink} />
              </a>
            </li>
            <li>
              <a href="https://github.com/CMPUT401W20T404Error/docker-django-react">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
          <hr></hr>
          <h3>Floating Islands</h3>
          <p>
            Fly around procedually-generated islands and AI-Controlled birds.
          </p>
          <ul className="icons">
            <li>
              <a href="https://github.com/jenyangk/FloatingIsland">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
          <hr></hr>
          <h3>FeelsLog</h3>
          <p>
            A social media android application that allows the user to post,
            edit, and see their own mood events and also lets them follow other
            users to see their most recent mood events.
          </p>
          <ul className="icons">
            <li>
              <a href="https://github.com/CMPUT301F19T19/legendary-fiesta">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
          {close}
        </article>

        <article
          id="about"
          className={`${this.props.article === "about" ? "active" : ""} ${
            this.props.articleTimeout ? "timeout" : ""
          }`}
          style={{ display: "none" }}
        >
          <h2 className="major">About</h2>
          <span className="image main">
            <img src="/static/images/profile.jpeg" alt="Jen Yang" />
          </span>
          <p>
            Hi! I'm Jen Yang. Currently studying at the University of Alberta as
            a Fourth-Year Computing Science Student.
          </p>
          {close}
        </article>

        <article
          id="contact"
          className={`${this.props.article === "contact" ? "active" : ""} ${
            this.props.articleTimeout ? "timeout" : ""
          }`}
          style={{ display: "none" }}
        >
          <h2 className="major">Contact</h2>
          <form method="post" action="https://formspree.io/mvowowng">
            <div className="field half first">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4"></textarea>
            </div>
            <ul className="actions">
              <li>
                <input type="submit" value="Send Message" className="special" />
              </li>
              <li>
                <input type="reset" value="Reset" />
              </li>
            </ul>
          </form>
          <ul className="icons">
            <li>
              <a href="https://www.linkedin.com/in/jenyangkoh/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li>
              <a href="https://github.com/jenyangk">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
          {close}
        </article>

        <article
          id="construction"
          className={`${
            this.props.article === "construction" ? "active" : ""
          } ${this.props.articleTimeout ? "timeout" : ""}`}
          style={{ display: "none" }}
        >
          <p>This feature is still under-construction!</p>
          <FontAwesomeIcon icon={faSuprise} />
          {close}
        </article>
      </div>
    );
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
};

export default Main;
