/* eslint-disable semi */
/* eslint-disable no-console */

import axios from 'axios'

// A C T I O N   C R E A T O R S //
const GET_ART_BY_LOCATION = 'GET_ART_BY_LOCATION'
const GET_ONE_ARTWORK = 'GET_ONE_ARTWORK'
const GET_ALL_ARTWORKS = 'GET_ALL_ARTWORKS'
const VERIFY_ARTWORK = 'VERIFY_ARTWORK'
const ADD_TAGS = 'ADD_TAGS'
const DELETE_ARTWORK = 'DELETE_ARTWORK'

// A C T I O N S //
const gotArtByLoc = artwork => ({
  type: GET_ART_BY_LOCATION,
  artwork
})

const gotArtbyId = artwork => ({
  type: GET_ONE_ARTWORK,
  artwork
})

const gotAllArtworks = artwork => ({
  type: GET_ALL_ARTWORKS,
  artwork
})

const verifiedArtwork = artwork => ({
  type: VERIFY_ARTWORK,
  artwork
})

const deletedArtwork = id => ({
  type: DELETE_ARTWORK,
  id
})

const taggedArt = artwork => ({
  type: ADD_TAGS,
  artwork
})

// T H U N K S //
export const fetchLocationArtwork = (lat, long) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/locations/${lat}?long=${long}`)
    console.log('GOT ARTWORK', data)
    dispatch(gotArtByLoc(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const fetchOneArtwork = artworkId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/artworks/${artworkId}`)
    dispatch(gotArtbyId(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const fetchAllArtworks = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/artworks')
    dispatch(gotAllArtworks(data))
  } catch (error) {
    console.error(error, 'UNABLE TO FETCH ALL ARTWORKS')
  }
}

export const verifyArtworkInDB = artworkId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/artworks/${artworkId}`)
    dispatch(verifiedArtwork(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const removeArtwork = artworkId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/artworks/${artworkId}`)
    dispatch(deletedArtwork(artworkId))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const addTagsToDB = (artworkId, tag) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/tags/${artworkId}`, {tag: tag})
    dispatch(taggedArt(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

// I N I T I A L   S T A T E //
const initialState = {
  all: [],
  selected: {}
}

// R E D U C E R //
export default function artworkReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ART_BY_LOCATION:
      return {...state, all: action.artwork}
    case GET_ONE_ARTWORK:
      return {...state, selected: action.artwork}
    case GET_ALL_ARTWORKS:
      return {...state, all: action.artwork}
    case VERIFY_ARTWORK:
      return {...state, selected: action.artwork}
    case ADD_TAGS:
      return {...state, selected: action.artwork}
    case DELETE_ARTWORK:
      return {
        ...state,
        selected: state.all.filter(artwork => artwork.id !== action.id)
      }
    default:
      return state
  }
}
