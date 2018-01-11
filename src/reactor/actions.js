import fetchCountryPhotos from '../resource/country-photos'

export default (propose, Proposals) => ({

  select (country) {
    propose(Proposals.SelectCountry(country))
  },

  fetchPhotos ({selectedCountry}) {
    fetchCountryPhotos(selectedCountry.name).then(response => {
      propose(Proposals.Pictures(response.data))
    }).catch(error => {
      propose(Proposals.PicturesError(error))
    })
  }
  ,
  unSelect () {
    propose(Proposals.UnSelectCountry)
  },

  load () {
    propose(Proposals.Load)
  },

  applyFilter (value) {
    const filter = value.trim()
    propose(Proposals.Filter(filter))
  },

  applySort (ascending) {
    propose(Proposals.Sort(ascending))
  }
})


