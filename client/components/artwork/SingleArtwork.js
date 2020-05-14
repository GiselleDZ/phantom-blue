import React from 'react'
import {connect} from 'react-redux'
// import RedirectArtwork from './RedirectArtwork'
import {Link} from 'react-router-dom'
import ArtworkOptions from './ArtworkOptions'
import {fetchOneArtwork} from '../../store/artworks'
import './artwork.css'
import AllArtworks from '../allArtworks/AllArtworks'

class SingleArtwork extends React.Component {
  componentDidMount() {
    this.props.getOneArtwork(this.props.match.params.id)
  }

  render() {
    // console.log('SINGLE ARTPROPS', this.props)
    const {artwork} = this.props
    return (
      <div>
        {this.props.artwork ? (
          //   && this.props.artwork[0] ?
          <div>
            <img src={artwork.imageUrl} alt={artwork.artist} width="200" />
            <div className="carousel-text">
              <h1 className="artistname">{artwork.artist}</h1>
              <ArtworkOptions artwork={artwork} />
            </div>
          </div>
        ) : (
          <div>
            <p>No artworks here</p>
            <Link to={`/artwork/${this.props.match.params.id}`}>
              <button type="button">Retry</button>
            </Link>
            <Link to="/map">
              <button type="submit">View Map</button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  artwork: state.artwork.selected
})

const mapDispatch = dispatch => ({
  getOneArtwork: artworkId => dispatch(fetchOneArtwork(artworkId))
})

export default connect(mapState, mapDispatch)(SingleArtwork)