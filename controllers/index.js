const { Restaurant } = require('../models')

module.exports = {
  getRestaurants (req, res, next) {
    const keyword = req.query.keyword?.trim();
    (async () => {
      try {
        const restaurants = await Restaurant.findAll({ order: [['id', 'DESC']], raw: true })
        const matchedRestaurants = keyword
          ? restaurants.filter(r => Object.values(r).some(property => {
            return typeof property === 'string'
              ? property.toLowerCase().includes(keyword.toLowerCase())
              : false
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
    const { name, category, location, phone, rating, ...otherData } = req.body
    if (!name || !category || !location || !phone || !rating) {
      req.flash('error', "please enter your restaurant's name, location, phone and rating")
      return res.redirect('back')
    }
    (async () => {
      try {
        await Restaurant.create({ name, category, location, phone, rating, ...otherData })
        req.flash('success', 'create successful !')
        res.redirect('restaurants')
      } catch (err) {
        err.message = 'failed to create :('
        next(err)
      }
    })()
  },
  getRestaurant (req, res, next) {
    const { id } = req.params;
    (async () => {
      try {
        const restaurant = await Restaurant.findByPk(id, { raw: true })
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        res.render('restaurant', { restaurant })
      } catch (err) {
        err.message = 'data not found :('
        next(err)
      }
    })()
  },
  editRestaurant (req, res, next) {
    const { id } = req.params;
    (async () => {
      try {
        const restaurant = await Restaurant.findByPk(id, { raw: true })
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        const category = restaurant.category
        res.render('edit', { restaurant, category })
      } catch (err) {
        err.message = 'data not found :('
        next(err)
      }
    })()
  },
  putRestaurant (req, res, next) {
    const { id } = req.params
    const { name, location, phone, rating, ...otherData } = req.body
    if (!name || !location || !phone || !rating) {
      req.flash('error', "please enter your restaurant's name, location, phone and rating")
      return res.redirect('back')
    }
    (async () => {
      try {
        const restaurant = await Restaurant.findByPk(id)
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        await restaurant.update(
          { name, location, phone, rating, ...otherData }
        )
        req.flash('success', 'update successful !')
        res.redirect(`/restaurant/${id}`)
      } catch (err) {
        err.message = 'update failed :('
        next(err)
      }
    })()
  },
  deleteRestaurant (req, res, next) {
    const { id } = req.params;
    (async () => {
      try {
        const restaurant = await Restaurant.findByPk(id)
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        await restaurant.destroy()
        req.flash('success', 'delete successful !')
        res.redirect('/restaurants')
      } catch (err) {
        err.message = 'delete failed :('
        next(err)
      }
    })()
  }
}
