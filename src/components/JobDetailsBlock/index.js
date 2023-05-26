import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import ProfileDetailsBlock from '../ProfileDetailsBlock'
import JobDetailsItem from '../JobDetailsItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsBlock extends Component {
  state = {
    FetchedData: [],
    apiStatus: apiStatusConstants.initial,
    SearchInput: '',
    employLabelText: [],

    salaryLabelText: 0,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {SearchInput, employLabelText, salaryLabelText} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?search=${SearchInput}&employment_type=${employLabelText}&minimum_package=${salaryLabelText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const DataFetched = await response.json()
      console.log(DataFetched)
      const updateFetched = DataFetched.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updateFetched)
      this.setState({
        FetchedData: updateFetched,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
    </div>
  )

  renderFetchedData = () => {
    const {FetchedData} = this.state
    const NoDataFound = FetchedData.length > 0
    return NoDataFound ? (
      <ul className="ul-style-job-details-block">
        {FetchedData.map(eachItem => (
          <JobDetailsItem Details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div className="No-jobs-Container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="img-jobs-found"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

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

  onChangeText = event => {
    this.setState({SearchInput: event.target.value})
  }

  DataFetchedShow = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  onChangeCheckedValue = text => {
    this.setState(
      prevState => ({
        employLabelText: [...prevState.employLabelText, text],
      }),
      this.getJobDetails,
    )
  }

  KeyEnteredFetched = () => this.getJobDetails()

  onChangeSalary = text => {
    this.setState(
      {
        salaryLabelText: text,
      },
      this.getJobDetails,
    )
  }

  renderStateOfFetchedData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFetchedData()

      case apiStatusConstants.failure:
        return this.renderFailureDataFetched()

      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {SearchInput, employLabelText, salaryLabelText} = this.state
    console.log(employLabelText)

    return (
      <>
        <ProfileDetailsBlock
          onChangeCheckedValue={this.onChangeCheckedValue}
          employLabelText={employLabelText}
          onChangeSalary={this.onChangeSalary}
          salaryLabelText={salaryLabelText}
        />
        <div className="container-jobDetails-block">
          <div className="search-button-container">
            <input
              value={SearchInput}
              type="search"
              placeholder="Search"
              className="job-details-block-input-style"
              onChange={this.onChangeText}
              onKeyDown={this.DataFetchedShow}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button-style"
              onClick={this.KeyEnteredFetched}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderStateOfFetchedData()}
        </div>
      </>
    )
  }
}
export default JobDetailsBlock
