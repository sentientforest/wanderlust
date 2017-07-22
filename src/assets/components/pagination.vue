<template>
<div>
  <div v-for="(photo, index) in currentPhotos">
    <div v-bind:class="{content: index % 2 === 0, divider: index % 2 !== 0}"
         class="row"
         v-if="!photo.nolist"
         itemscope itemtype="http://schema.org/Photograph">
      <div class="twelve columns">
        <a itemprop="sameAs"
           :href="photobasepath + photo.id + '.html'"
           :title="photo.title">
          <span itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
            <img
               :src="photobasepath + photo.id + '.jpg'"
               :alt="'Photograph of - ' + photo.title"
               itemprop="contentUrl" />
          </span>
        </a>
        <h5 itemprop="name">{{photo.title}}</h5>
      </div>
    </div>
  </div>
  <div class="content row">
    <div class="button-group">
      <button v-on:click="gotoPage(currentPage - 1)"
              class="button-primary"
              v-bind:disabled="currentPage === 0">
        🠄
      </button>

      <button
        v-for="page in pageIndex"
        v-on:click="gotoPage(page)"
        class="button-primary"
        v-bind:class="{active: currentPage === page}">
        {{page + 1}}
      </button>
      <button v-on:click="gotoPage(currentPage + 1)"
              class="button-primary"
              v-bind:disabled="currentPage === pageIndex.length - 1"
              >
        🠆
      </button>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
let data = {
  msg: 'Welcome',
  photos: [],
  currentPhotos: [],
  photobasepath: '/photographs/',
  photoPages: [],
  pageIndex: [],
  currentPage: 0,
  numPerPage: 10,
  numPages: 1
}
export default {
  name: 'hello',
  data () {
    return data
  },
  methods: {
    loadPhotos: () => {
      Vue.http.get('/content/photographs.json')
        .then(response => {
          let start, end
          data.photos = response.body.result.filter((elem) => {
            return !elem.nolist
          })
          data.numPages = Math.ceil(data.photos.length / data.numPerPage)
          for (let i = 0; i < data.numPages; i++) {
            start = (i * data.numPerPage)
            end = (start + data.numPerPage)
            data.photoPages[i] = data.photos.slice(start, end)
            data.pageIndex.push(i)
          }
          data.currentPhotos = data.photoPages[0]
        }, response => {
          console.log('response failed')
        })
    },
    gotoPage: (page) => {
    console.log('page')
    console.log(page)
    console.log(!page)
    console.log(!data.photoPages[page])
    console.log(data.photoPages[page])
    console.log(data.pageIndex)
      if (!data.photoPages[page]) {
        return
      }
      console.log('setting page');
      data.currentPage = page;
      console.log(data.currentPage);
      data.currentPhotos = data.photoPages[page]
    }
  },
  created: function () {
    this.loadPhotos();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

.columns {
  text-align: center;
}

.button-group {
  text-align: center;
}

/* stylelint-disable */
.button-primary,
button.button-primary:disabled {
  color: #260000;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background: radial-gradient(ellipse at center, #fff 0%,
      #e3b581 40%, #a1632f 80%, #81430f 100%);
  margin: 0.5em;
  border-color: #260000;
}
/* stylelint-enable */

button.button-primary:disabled {
  cursor: default;
}

/* stylelint-disable */
.button-primary:hover,
.button-primary:focus,
.button-primary.active {
  border-color: #e3b581;
  color: #fff;
  background: radial-gradient(ellipse at center, #81430f 0%,
      #a1632f 40%, #e3b581 80%, #fff 100%);
}
/* stylelint-enable */

</style>
