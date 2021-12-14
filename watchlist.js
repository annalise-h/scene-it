document.addEventListener('DOMContentLoaded', () => {
  const watchlistJSON = localStorage.getItem('watchlist')
  let watchList = JSON.parse(watchlistJSON)
  console.log(watchList)

  const movieHtmlArray = watchList.map(currentMovie => {
    return `
    <div class="movie"> 
      <img src="${currentMovie.Poster}">
      <h1 class="movie-title>${currentMovie.Title}</h1>
      <p class="release-date">${currentMovie.Year}</p>
      <button class="add-btn" data-imdbid="${currentMovie.imdbID}"> Add </button> 
    </div>`
  })

  const moviesHtml = movieHtmlArray.join('')
  const $moviesContainer = $('.movies-container')
  console.log(moviesHtml)
  $moviesContainer.append(moviesHtml)
})