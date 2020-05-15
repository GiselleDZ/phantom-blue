/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllVerified, fetchArtFromMyLocation} from '../../store/artworks'
import {generateUrl} from '../artwork/utils'
import './mainHome.css'
import {Link} from 'react-router-dom'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '../../../secrets'
import Popup from 'reactjs-popup'
import ArtByLocationMap from '../mapView/ArtByLocationMap'

class MainHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: false
    }
    this.handleLocation = this.handleLocation.bind(this)
  }
  componentDidMount() {
    this.props.getVerifiedArtwork()
  }

  handleLocation() {
    const {getMyLocationArt} = this.props
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        var geocoder = new MapboxGeocoder({
          accessToken: process.env.REACT_APP_MAPBOX_KEY,
          types: 'address',
          reverseGeocode: true
        })
        geocoder.addTo('#geocoder')
        console.log(geocoder)

        const address = await geocoder._geocode(
          [latitude.toString(), longitude.toString()].join()
        )
        const myLocation = {
          latitude,
          longitude,
          address: address.body.features[0].place_name
        }
        getMyLocationArt(myLocation)
        // `api.mapbox.com/geocoding/v5/mapbox.places-permanent/{${longitude}, ${latitude}}`
      })
      this.setState({
        location: true
      })
    } else {
      console.log('Geolocation not available')
    }
  }

  render() {
    console.log(this.props, 'INSIDE MAIN HOME RENDERRRRRRRRR')
    return this.state.location === false ? (
      <div>
        <div>
          <div id="geocoder">{}</div>
          <button type="submit" onClick={() => this.handleLocation()}>
            SHARE LOCATION
          </button>
        </div>
        {this.props.artworks[0] ? (
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={this.props.artworks.length}
          >
            <Slider className="carousel">
              {this.props.artworks.map((artwork, i) => (
                <Slide index={i} key={artwork.id} className="carousel-image">
                  <img src={artwork.imageUrl[0]} />
                  <Link to={`/artwork/${artwork.id}`}>
                    <button type="button">
                      <div>
                        <h2>{artwork.artist}</h2>
                      </div>
                    </button>
                  </Link>
                  <div>
                    <p>{artwork.description}</p>
                  </div>
                  <a
                    href={generateUrl(artwork.Location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4>TAKE ME THERE</h4>
                  </a>
                </Slide>
              ))}
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </CarouselProvider>
        ) : (
          <center>
            <h2>L O A D I N G . . .</h2>
            <img
              src="http://gisellezatonyl.com/images/blobbers-03-newalgos-12-23-13-02-lessframes-600pxw.gif"
              width="300"
            />
          </center>
        )}
      </div>
    ) : (
      <ArtByLocationMap artworks={this.props.locationArtworks} />
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.verified,
  locationArtworks: state.artwork.selected
})

const mapDispatch = dispatch => ({
  getVerifiedArtwork: () => dispatch(fetchAllVerified()),
  getMyLocationArt: location => dispatch(fetchArtFromMyLocation(location))
})

export default connect(mapState, mapDispatch)(MainHome)
