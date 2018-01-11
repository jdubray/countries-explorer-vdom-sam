export default (actions) => ({

  observers: [],

  addObserver (observer) {
    this.observers.push(observer)
  },

  removeObserver (observer) {
    this.observers = this.observers.filter(anObserver => {
      return observer !== anObserver
    })
  },

  notifyObservers (model) {
    this.observers.forEach(observe => observe(model))
  },

  initial (model) {
    return model.status.initial
  },

  busy (model) {
    return model.status.busy && !model.status.initial
  },

  ready (model) {
    return !model.status.busy && model.status.loaded
  },

  countrySelected (model) {
    return model.status.loaded && model.selectedCountry !== void 0
  },

  hasPictures (model) {
    return model.selectedCountry
      && Array.isArray(model.selectedCountry.picturesForCountry)
      && model.selectedCountry.picturesForCountry.length > 0
  },

  wasFiltered (model) {
    return model.status.filtered && model.status.loaded
  },

  wasSorted (model) {
    return model.status.sorted && model.status.loaded
  },

  nexAction (model) {
    if (this.countrySelected(model) && !this.hasPictures(model)) {
      actions.fetchPhotos(model)
    }
  },

  notifyChange (model) {
    this.notifyObservers(model)
    this.nexAction(model)
  }

})
