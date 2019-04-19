import React, { Component } from 'react';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';



const particlesOptions= {
 




        "particles": {
          "number": {
              "value": 60,
              "density": {
                  "enable": true,
                  "value_area": 1500
              }
          },
          "line_linked": {
              "enable": true,
              "opacity": 0.02
          },
          "move": {
              "direction": "right",
              "speed": 0.90
          },
          "size": {
              "value": 5
          },
          "opacity": {
              "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0.05
              }
          }
      },
      "interactivity": {
          "events": {
              "onclick": {
                  "enable": true,
                  "mode": "push"
              }
          },
          "modes": {
              "push": {
                  "particles_nb": 1
              }
          }
      },
      "retina_detect": true
  } 










 const initialState = {

      input: '',

      imageUrl: '',

      box: {},

      route: 'signin',

      isSignedIn: false,

      user: {

              id: '',
              username: '',
              email: '',
              entries: 0,
              joined: ''
      }

    }

class App extends Component {

  constructor(){

    super();

    this.state= initialState;
  }




loadUser = (data) => {
  
  this.setState({user: {

              id: data.id,
              username: data.username,
              email: data.email,
              entries: data.entries,
              joined: data.joined

  }})
}



calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {

    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }

}


displayFaceBox =(box) => {

  this.setState({box:box});
  console.log(box);
}
  onInputChange= (event) => {
    this.setState({input: event.target.value});
  }



onSubmit = () => {
          this.setState({imageUrl: this.state.input});

            fetch('http://localhost:3001/imageurl',{
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  input: this.state.user.input

              })
            })
         

      .then(response => response.json())


      .then(response => {
        if(response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id

            })

          })
          
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
         })
        }

        this.displayFaceBox(this.calculateFaceLocation(response))

      })
     
      .catch(err => console.log(err)); 
    
}


onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState(initialState)
  } else if (route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})

}


  render() { 

    const  {isSignedIn,imageUrl,route,box} = this.state;

    return (

      <div className="App">
      <Particles className='particles'
      params={particlesOptions}
      />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' 

            ? <div>

              <Logo />

              <Rank 
              username={this.state.user.username}
              entries={this.state.user.entries}

              />

              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>

        : (
            route === 'signin' 

            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>



          )

       
        
      }
      </div>
    );
  }
}

export default App;
