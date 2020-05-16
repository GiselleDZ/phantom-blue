import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import {Link} from 'react-router-dom'
import './auth-form.css'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} name={name}>
        {error && error.response && <div> {error.response.data} </div>}
        <div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
        </div>
        <div className="sign-up-form-container">
          {name === 'signup' ? (
            <div>
              <div>
                <label id="labels" htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input name="firstName" type="text" defaultValue={null} />
              </div>
              <div>
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input name="lastName" type="text" defaultValue={null} />
              </div>
            </div>
          ) : (
            ''
          )}
          <div>
            <button id="login-btn" type="submit">
              {displayName}
            </button>
          </div>
          <div>
            {name === 'login' ? (
              <Link id="sign-up-form-btn" to="signup">
                Create an account{' '}
              </Link>
            ) : (
              ''
            )}
          </div>
          <a id="google-log-in" href="/auth/google">
            {displayName} with Google
          </a>
        </div>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName || {value: null}
      const lastName = evt.target.lastName || {value: null}
      dispatch(auth(email, password, formName, firstName.value, lastName.value))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
