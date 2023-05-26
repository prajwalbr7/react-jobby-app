import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const JobDetailsItem = props => {
  const {Details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = Details
  return (
    <Link to={`/jobs/${id}`} className="link-style-job-details-item">
      <li className="list-container-job-item">
        <div className="container-company-content">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="img-sizing-job-details-item"
          />
          <div className="container-heading-rating">
            <h1 className="heading-style-company-content">{title}</h1>
            <div className="container-rating">
              <AiFillStar className="rating-icon-style" />
              <p className="rating-para-style-job-details-item">{rating}</p>
            </div>
          </div>
        </div>
        <div className="container-location-working-salary">
          <div className="container-location-working-sub">
            <div className="container-location-working">
              <MdLocationOn className="md-icon-style-job-details-item" />
              <p className="para-location-working-style">{location}</p>
            </div>
            <div className="container-location-working">
              <MdWork className="md-icon-style-job-details-item" />
              <p className="para-location-working-style">{employmentType}</p>
            </div>
          </div>
          <p className="salary-style-job-items">{packagePerAnnum}</p>
        </div>
        <hr className="hr-style" />
        <h1 className="salary-style-job-items">Description</h1>
        <p className="discription-style-job-items">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobDetailsItem
