let app = new Vue({
  el: '#app',
  data: {
    searchResults: null,
    searchWord: '',
    message: ''
  },

  watch: {
    searchWord: function (newSearchWord, oldSearchWord) {
      this.debouncedGetAnswer()
    }
  },

  mounted: function () {
    this.debouncedGetAnswer = _.debounce(this.getSearchResults, 1000);
  },

  methods: {
    getSearchResults: function () {
      if (this.searchWord === '') {
        console.log("空です");
        this.searchResults = null
        return
      }
      this.message = 'Loading...'
      const myData = this;
      const params = { page: 1, per_page: 20, query: this.searchWord }
      axios.get('https://qiita.com/api/v2/items', { params })
        .then(function (response) {
          myData.searchResults = response.data
        })
        .catch(function (error) {
          myData.message = 'Error:' + error
        })
        .finally(function () {
          myData.message = ''
        })
    }
  }
})