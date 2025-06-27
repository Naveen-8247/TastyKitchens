import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  const onSubmitFailure = error => {
    setErrorMsg(error)
    setShowSubmitError(true)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={submitForm}>
        <img
          src="//res.cloudinary.com/dcy78sibl/image/upload/v1750014966/Frame_274_mve4xt.png"
          alt="website login"
          className="login-logo"
        />
        <h1 className="login-heading">Tasty Kitchens</h1>
        <h1 className="login-Text">Login</h1>
        <div className="input-group">
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
