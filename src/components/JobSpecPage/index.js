import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobSpecPage extends Component {
  state = {
    jobDetails: {},
    skillSets: [],
    CompanyLife: {},
    SimilarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getDataFormat = Data => ({
    jobDetails: Data.job_details,
    similarJobs: Data.similar_jobs,
  })

  getDataObjectFormat = Data => ({
    companyLogoUrl: Data.company_logo_url,
    companyWebsiteUrl: Data.company_website_url,
    employmentType: Data.employment_type,
    id: Data.id,
    jobDescription: Data.job_description,
    lifeAtCompany: Data.life_at_company,
    location: Data.location,
    packagePerAnnum: Data.package_per_annum,
    rating: Data.rating,
    skills: Data.skills,
    title: Data.title,
  })

  getDataObjectLifeAtCompany = Data => ({
    description: Data.description,
    imageUrl: Data.image_url,
  })

  getDataArraySkillsFormat = Data =>
    Data.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))

  getArraySimilarJobs = Data =>
    Data.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const DataFetched = await response.json()
      console.log(DataFetched)
      const UpdateDataString1 = this.getDataFormat(DataFetched)
      console.log(UpdateDataString1)
      const UpdateDataObject = this.getDataObjectFormat(
        UpdateDataString1.jobDetails,
      )
      console.log(UpdateDataObject)
      const UpdateStringLifeAtCompany = this.getDataObjectLifeAtCompany(
        UpdateDataObject.lifeAtCompany,
      )
      console.log(UpdateStringLifeAtCompany)
      const UpdateSkillsArray = this.getDataArraySkillsFormat(
        UpdateDataObject.skills,
      )
      console.log(UpdateSkillsArray)
      const UpdateStringArraySimilarJobs = this.getArraySimilarJobs(
        UpdateDataString1.similarJobs,
      )
      console.log(UpdateStringArraySimilarJobs)
      this.setState({
        jobDetails: UpdateDataObject,
        skillSets: UpdateSkillsArray,
        CompanyLife: UpdateStringLifeAtCompany,
        SimilarJobs: UpdateStringArraySimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSkillsItems = () => {
    const {skillSets} = this.state
    return (
      <>
        <h1 className="similar-Top-heading-style">Skills</h1>
        <ul className="skills-ul-style">
          {skillSets.map(eachItem => (
            <li className="skills-list-style" key={eachItem.name}>
              <div className="skills-container-style">
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="skills-img-sizing"
                />
                <p className="skills-para-style">{eachItem.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderLifeAtCompany = () => {
    const {CompanyLife} = this.state
    const {description, imageUrl} = CompanyLife

    return (
      <div className="life-at-company-container">
        <h1 className="similar-Top-heading-style">Life at Company</h1>
        <div className="container-flex-lifeAtCompany">
          <p className="spec-description-style-job-items">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="life-alr-company-sizing"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {SimilarJobs} = this.state
    return (
      <>
        <h1 className="similar-Top-heading-style">Similar Jobs</h1>
        <ul className="similar-job-ul-style">
          {SimilarJobs.map(eachItem => (
            <li className="similar-job-li-style" key={eachItem.id}>
              <div className="container-company-content">
                <img
                  src={eachItem.companyLogoUrl}
                  alt="similar job company logo"
                  className="img-sizing-job-details-item"
                />
                <div className="container-heading-rating">
                  <h1 className="heading-style-company-content">
                    {eachItem.title}
                  </h1>
                  <div className="container-rating">
                    <AiFillStar className="rating-icon-style" />
                    <p className="rating-para-style-job-details-item">
                      {eachItem.rating}
                    </p>
                  </div>
                </div>
              </div>
              <h1 className="similar-Job-style-job-items-description-heading">
                Description
              </h1>
              <p className="similar-description-style-job-items">
                {eachItem.jobDescription}
              </p>
              <div className="container-location-working-sub">
                <div className="container-location-working">
                  <MdLocationOn className="md-icon-style-job-details-item" />
                  <p className="para-location-working-style">
                    {eachItem.location}
                  </p>
                </div>
                <div className="container-location-working">
                  <MdWork className="md-icon-style-job-details-item" />
                  <p className="para-location-working-style">
                    {eachItem.employmentType}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderJobSpecPage = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
    } = jobDetails
    return (
      <>
        <div className="list-container-job-item">
          <div className="container-company-content">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="container-description-link">
            <h1 className="spec-Job-style-job-items-description-heading">
              Description
            </h1>
            <div className="container-href-icon">
              <a href={companyWebsiteUrl} className="href-style">
                Visit
              </a>
              <BiLinkExternal />
            </div>
          </div>
          <p className="spec-description-style-job-items">{jobDescription}</p>
          {this.renderSkillsItems()}
          {this.renderLifeAtCompany()}
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
    </div>
  )

  Retry = () => this.getJobDetails()

  renderFailureDataFetched = () => (
    <div className="container-failure-jobDetails-block">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image-styling"
      />
      <h1 className="failure-heading-style-jobDetailsBlock">
        Oops! Something Went Wrong
      </h1>
      <p className="failure-para-style-jobDetailsBlock">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="button-style-job-DetailsBlock"
        type="button"
        onClick={this.Retry}
      >
        Retry
      </button>
    </div>
  )

  renderStateOfFetchedData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobSpecPage()

      case apiStatusConstants.failure:
        return this.renderFailureDataFetched()

      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="JobSpec-container">
          {this.renderStateOfFetchedData()}
        </div>
      </>
    )
  }
}
export default JobSpecPage
