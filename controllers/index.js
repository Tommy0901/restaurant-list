const { Restaurant } = require('../models')

module.exports = {
  getRestaurants (req, res, next) {
    // qurey.keyword 對應 index.hbs <input ... name="keyword" ；?.為可選串連(Optional chaining)
    const keyword = req.query.keyword?.trim();
    (async () => {
      try {
        const restaurants = await Restaurant.findAll({ raw: true })
        const matchedRestaurants = keyword
          ? restaurants.filter(restaurant =>
            Object.values(restaurant).some(property => {
              if (typeof property === 'string') {
                return property.toLowerCase().includes(keyword.toLowerCase())
              }
              return false
            })
          )
          : restaurants
        res.render('restaurants', { restaurants: matchedRestaurants, keyword })
      } catch (err) {
        next(err)
      }
    })()
  },
  newRestaurant (req, res, next) {
    res.render('new')
  },
  postRestaurant (req, res, next) {
    const { name, nameEn, category, image, location, phone, googleMap, rating, description } = req.body
    if (!name || !category || !location || !phone || !rating) {
      req.flash('error', "please enter your restaurant's name, location, phone and rating")
      return res.redirect('back')
    }
    (async () => {
      try {
        await Restaurant.create({ name, nameEn, category, image, location, phone, googleMap, rating, description })
        req.flash('success', 'create successful !')
        res.redirect('restaurants')
      } catch (error) {
        error.error_msg = 'failed to create :('
        next(error)
      }
    })()
  },
  getRestaurant (req, res, next) {
    const { id } = req.params;
    (async () => {
      try {
        const restaurant = await Restaurant.findByPk(id, { raw: true })
        res.render('restaurant', { restaurant })
      } catch (error) {
        error.error_msg = 'data not found :('
        next(error)
      }
    })()
  },
  editRestaurant (req, res, next) {
    const { id } = req.params;
    (async () => {
      try {
        const restaurant = await Restaurant.findByPk(id, { raw: true })
        const category = restaurant.category
        res.render('edit', { restaurant, category })
      } catch (error) {
        error.error_msg = 'data not found :('
        next(error)
      }
    })()
  },
  putRestaurant (req, res, next) {
    const { id } = req.params
    const { name, nameEn, category, image, location, phone, googleMap, rating, description } = req.body
    if (!name || !location || !phone || !rating) {
      req.flash('error', "please enter your restaurant's name, location, phone and rating")
      return res.redirect('back')
    }
    (async () => {
      try {
        await Restaurant.update(
          { name, nameEn, category, image, location, phone, googleMap, rating, description },
          { where: { id } }
        )
        req.flash('success', 'update successful !')
        res.redirect(`/restaurant/${id}`)
      } catch (error) {
        error.error_msg = 'update failed :('
        next(error)
      }
    })()
  },
  deleteRestaurant (req, res, next) {
    const { id } = req.params;
    (async () => {
      try {
        await Restaurant.destroy({ where: { id } })
        req.flash('success', 'delete successful !')
        res.redirect('/restaurants')
      } catch (error) {
        error.error_msg = 'delete failed :('
        next(error)
      }
    })()
  }
}
