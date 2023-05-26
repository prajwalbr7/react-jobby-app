import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    required1: '',
    required2: '',
    errorMessage: '',
  }

  loginSuccessful = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  SubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const DataFetched = await response.json()
    console.log(response)
    console.log(DataFetched)
    if (username === '' || password === '') {
      this.onBlurUserName()
      this.onBlurPassword()
    } else if (response.ok) {
      this.loginSuccessful(DataFetched.jwt_token)
    } else {
      this.setState({errorMessage: DataFetched.error_msg})
    }
  }

  MessageRequired1 = () => {
    const {required1} = this.state
    return <p className="required-message-style">{required1}</p>
  }

  MessageRequired2 = () => {
    const {required2} = this.state
    return <p className="required-message-style">{required2}</p>
  }

  PageResponseError = () => {
    const {errorMessage} = this.state
    return <p className="required-message-style">{errorMessage}</p>
  }

  UserName = event => {
    this.setState({username: event.target.value})
  }

  PassWord = event => {
    this.setState({password: event.target.value})
  }

  onBlurUserName = () => {
    const {username} = this.state
    const RequiredMessage = '*Required'
    if (username === '') {
      this.setState({required1: RequiredMessage})
    } else {
      this.setState({required1: ''})
    }
  }

  onBlurPassword = () => {
    const {password} = this.state
    const RequiredMessage = '*Required'
    if (password === '') {
      this.setState({required2: RequiredMessage})
    } else {
      this.setState({required2: ''})
    }
  }

  render() {
    const {username, password} = this.state
    console.log(username)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Login-container">
        <form className="form-container" onSubmit={this.SubmitForm}>
          <div className="login-imgae-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-image-logo-sizing"
            />
          </div>
          <label className="login-label-style" htmlFor="text">
            USERNAME
          </label>
          <input
            value={username}
            id="text"
            type="text"
            placeholder="Username"
            className="input-style-login-page"
            onChange={this.UserName}
            onBlur={this.onBlurUserName}
          />
          {this.MessageRequired1()}

          <label className="login-label-style " htmlFor="password">
            PASSWORD
          </label>
          <input
            value={password}
            id="password"
            type="password"
            placeholder="Password"
            className="input-style-login-page"
            onChange={this.PassWord}
            onBlur={this.onBlurPassword}
          />
          {this.MessageRequired2()}
          <button className="login-button-style " type="submit">
            Login
          </button>
          {this.PageResponseError()}
        </form>
      </div>
    )
  }
}
export default LoginPage
