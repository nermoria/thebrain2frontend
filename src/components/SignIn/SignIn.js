import React from 'react';

class SignIn extends React.Component  {

	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	whenEmailEnter =(event) => {

		this.setState({signInEmail: event.target.value})

	}

	whenPasswordEnter = (event) => {

		this.setState ({signInPassword: event.target.value})
	}

	whenSignInSubmit = () => {

		fetch('http://localhost:3001/signin', {

			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password:this.state.signInPassword
			})
		})

		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user)
				this.props.onRouteChange('home');
			} else if (!user.id) {
				alert('Who you kidding? Wrong credentials!');
			}
		})


		

	}

		render() {

				const {onRouteChange} = this.props;
				return (
					<article className="br3 ba black b--black-10 mv4 w-100 w-50-m w-25-1 shadow-5 mw6 center">
					<main className="pa4 black-80">
					
					  <div className="measure ">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>

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


					      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
					    </fieldset>
					    <div className="">

					      <input 
					      onClick={this.whenSignInSubmit}
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Sign in" />

					    </div>
					    <div className="lh-copy mt3">
					      <p onClick={() => onRouteChange('Register')} className="f6 link dim black db pointer">Register</p>
					      <a href="#0" className="f6 link dim black db">Forgot your password?</a>
					    </div>

					  </div>
					</main>
								


				
					</article>

	);
   }
}


export default SignIn;