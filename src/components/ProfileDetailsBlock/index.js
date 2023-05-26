import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import EmployementItem from '../EmployementItem'
import SalaryItem from '../SalaryItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetailsBlock extends Component {
  state = {
    FetchedProfileData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProDetails()
  }

  getProDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const ProfileDataFetched = await response.json()
      console.log(ProfileDataFetched)
      const UpdateProfileData = {
        profileDetails: {
          name: ProfileDataFetched.profile_details.name,
          profileImageUrl: ProfileDataFetched.profile_details.profile_image_url,
          shortBio: ProfileDataFetched.profile_details.short_bio,
        },
      }
      console.log(UpdateProfileData)

      this.setState({
        FetchedProfileData: UpdateProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileLoader = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {FetchedProfileData} = this.state
    const {profileDetails} = FetchedProfileData
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="Profile-container margin-to-containers">
        <img
          src={profileImageUrl}
          alt="profile"
          className="Profile-img-sizing"
        />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  RetryProfile = () => {
    this.getProDetails()
  }

  renderFailureProfileDataFetched = () => (
    <div className="Profile-container2 margin-to-containers">
      <button
        className="button-style-job-DetailsBlock"
        type="button"
        onClick={this.RetryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderCheckBoxList = () => {
    const {onChangeCheckedValue} = this.props
    return (
      <>
        <h1 className="heading-employement-salary-style">Type of Employment</h1>
        <ul className="employ-ulContainer">
          {employmentTypesList.map(eachItem => (
            <EmployementItem
              EmpItems={eachItem}
              key={eachItem.employmentTypeId}
              onChangeCheckedValue={onChangeCheckedValue}
            />
          ))}
        </ul>
      </>
    )
  }

  renderSalaryList = () => {
    const {onChangeSalary, salaryLabelText} = this.props
    return (
      <>
        <h1 className="heading-employement-salary-style">Salary Range</h1>
        <ul className="employ-ulContainer">
          {salaryRangesList.map(eachItem => (
            <SalaryItem
              onChangeSalary={onChangeSalary}
              SalItems={eachItem}
              key={eachItem.salaryRangeId}
              salaryLabelText={salaryLabelText}
            />
          ))}
        </ul>
      </>
    )
  }

  renderStateOfProfileFetchedData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()

      case apiStatusConstants.failure:
        return this.renderFailureProfileDataFetched()

      case apiStatusConstants.inProgress:
        return this.renderProfileLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="Profile-Main-container">
          {this.renderStateOfProfileFetchedData()}
          <hr className="hr-style" />
          {this.renderCheckBoxList()}
          <hr className="hr-style" />
          {this.renderSalaryList()}
        </div>
      </>
    )
  }
}
export default ProfileDetailsBlock
