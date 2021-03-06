import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import YouTube from 'react-youtube'

import '../css/home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedVideo: '',
      customVideos: ['J8sGGGVbrFs', 'quLYD3eu7zo']
    }

    this.randomVideo = this.randomVideo.bind(this)
  }

  componentDidMount() {
    this.randomVideo()
  }

  randomVideo = () => {
    let newVideo = this.state.customVideos[
      Math.floor(Math.random() * this.state.customVideos.length)
    ]
    if (newVideo === this.state.selectedVideo) {
      newVideo = 'LDGoz723OJs'
    }
    this.setState({
      selectedVideo: newVideo
    })
  }

  _onReady = event => {
    // access to player in all event handlers via event.target
    // event.target.mute();
  }

  _onError = event => {
    this.setState({
      selectedVideo: this.state.customVideos[
        Math.floor(Math.random() * this.state.customVideos.length)
      ]
    })
  }
  render() {
    const videoOptions = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        loop: 1,
        mute: 1
      }
    }

    return (
      <div>
        <div id="home">
          {/* {isLoggedIn ? <div>Let's set Sail {firstName}</div> : null} */}
          <Button
            className="buttons"
            variant="outline-info"
            size="lg"
            onClick={() => this.props.history.push('/login')}
          >
            Login
          </Button>
          <Button
            className="buttons"
            variant="outline-info"
            size="lg"
            onClick={() => this.props.history.push('/signup')}
          >
            Sign Up
          </Button>
        </div>
        <div className="video-background">
          <div className="video-foreground">
            <YouTube
              videoId={this.state.selectedVideo}
              opts={videoOptions}
              className="video-iframe"
              onReady={this._onReady}
              onEnd={() => this.randomVideo()}
              onError={this._onError}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(Home)
