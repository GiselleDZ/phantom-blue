const router = require('express').Router()
const {Artwork, Location} = require('../db/models/Index')

// router.get('/', async (req, res, next) => {
//   const {latitude, longitude} = req.params
//   try {
//     const locationArtwork = await Location.findOne({
//       where: {
//         latitude,
//         longitude
//       },
//       include: Artwork
//     })
//     res.json(locationArtwork.artwork)
//   } catch (err) {
//     next(err)
//   }
// })

// GET ALL ARTWORKS
router.get('/', async (req, res, next) => {
  try {
    const artworks = await Artwork.findAll()
    res.json(artworks)
  } catch (err) {
    next(err)
  }
})
// TODO: GET SINGLE ARTWORK BY ID

router.put('/artworkId', async (req, res) => {
  const {id} = req.body
  try {
    const artworkToVerify = await Artwork.findOne({
      where: {
        id
      }
    })
    const verfiedArtwork = await artworkToVerify.update({
      isVerified: true
    })
    res.json(verfiedArtwork)
  } catch (error) {
    console.error('could not verify artwork')
  }
})

module.exports = router
