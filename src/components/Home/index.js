import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="Home-container">
    <Header />
    <div className="home-body-container">
      <h1 className="home-heading-style">Find The Job That Fits Your Life</h1>
      <p className="home-para-style">
        Millions of people are searching for jobs, salary information company
        reviews. Find the job that fits your ability and potential.
      </p>
      <Link to="/jobs">
        <button className="home-button-style" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
