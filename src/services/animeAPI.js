import API from './API.js';

export default {
  getHome() {
    return API().get(`/api/v2/hianime/home`)
  },
  getAnimeInfo(animeId) {
    return API().get(`/api/v2/hianime/anime/{animeId}`)
  },
  getAnimeCategory(animeCategory, page) {
    return API().get(`/api/v2/hianime/category/{name}?page={page}`, {
      withCredentials: true
    })
  },
  getAnimeExploreCategory(animeCategory) {
    return API().get(`/api/v1/explore/${animeCategory}`)
  },
  getGenreAnime(genreName) {
    return API().get(`/api/v2/hianime/genre/{name}?page={page}`)
  },
  getSearchResults(query, page) {
    return API().get(`/api/v2/hianime/search?q={query}&page={page}`)
  },
  getQuickSearchResults(query) {
    return API().get(`/api/v1/quick-search?q=${query}`)
  },

  
  getRoomAnimeInfo(animeId) {
    return API().get(`/api/v1/info-room?id=${animeId}`)
  },
  getAnime1stEpisodeId(animeId) {
    return API().get(`/api/v1/episode1?id=${animeId}`)
  },
  getAnimeEpisodes(animeId) {
    return API().get(`/api/v1/episodes?id=${animeId}`)
  },
  getEpisodeServers(episodeId) {
    return API().get(`/api/v1/servers?episodeId=${episodeId}`)
  },
  getEpisodeSource(epId, server, subOrDub) {
    return API().get(`/api/v1/watch-episode?episodeId=${epId}&server=${server}&subOrDub=${subOrDub}`)
  },
}
