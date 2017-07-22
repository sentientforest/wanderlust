require('../css/page.css')
require('../css/normalize.css')
require('../css/skeleton.css')
require('../css/wanderlust.css')
require('../fonts/Raleway-Regular.ttf')
import Vue from 'vue'
import VueResource from 'vue-resource'
import Pagination from '../components/pagination.vue'

document.addEventListener('DOMContentLoaded', function (event) {
  console.log('The page is loaded and ready to perform JS actions.')
})

export default function () {
  console.log('foooo')
}

Vue.use(VueResource)

new Vue({
  el: '#msg-pagination',
  render: h => h(Pagination),
  methods: {
    loadPhotos: () => {

    }
  }
})
