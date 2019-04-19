import React from 'react';

class Register extends React.Component {

		constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			username: ''
		}
	}

	whenUsernameEnter =(event) => {

		this.setState({username: event.target.value})

	}

	whenEmailEnter =(event) => {

		this.setState({email: event.target.value})

	}

	whenPasswordEnter = (event) => {

		this.setState ({password: event.target.value})
	}

whenRegisterSubmit = () => {
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }





					
				render() {
					return (
						<article className="br3 ba black b--black-10 mv4 w-100 w-50-m w-25-1 shadow-5 mw6 center">
						<main className="pa4 black-80">
						  <div className="measure ">
						    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						      <legend className="f1 fw6 ph0 mh0">Register</legend>

						       <div className="mt3">
						        <label className="db fw6 lh-copy f6" htmlFor="userName">Username</label>
						        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="text" 
						        name="userName"  
						        id="userName" 
						        onChange={this.whenUsernameEnter}
						        />
						      </div>

						       <div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						        <input 
						        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="password" 
						        name="password"  
						        id="password" 
						        onChange={this.whenPasswordEnter}
						        />
						      </div>


						      <div className="mt3">
						        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="email-address"  
						        id="email-address" 
						        onChange={this.whenEmailEnter}
						        />
						      </div>


						     

						      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
						    </fieldset>
						    <div className="">

						      <input 
						      onClick={this.whenRegisterSubmit}
						      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						      type="submit" 
						      value="Submit" />

						    </div>
						    
						     
						     
						    
						  </div>
						</main> 
									


					
						</article>

				);
			}
	}


export default Register;