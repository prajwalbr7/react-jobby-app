import {Component} from 'react'
import Header from '../Header'

import JobDetailsBlock from '../JobDetailsBlock'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <div className="job-container">
        <Header />
        <div className="sub-container-jobs">
          <JobDetailsBlock />
        </div>
      </div>
    )
  }
}
export default Jobs
