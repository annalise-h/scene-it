const $searchForm = $('#search-form')
let result

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    const movieId = e.target.dataset.imdbid
    saveToWatchlist(movieId)
  }
})

function saveToWatchlist(movieId) {
  const movie = result.Search.find((currentMovie) => {
    return currentMovie.imdbID == movieId
  })

  let watchlistJSON = localStorage.getItem('watchlist');
  let watchlist = JSON.parse(watchlistJSON);
  if (watchlist == null) watchlist = []

  watchlist.push(movie)
  watchlistJSON = JSON.stringify(watchlist)
  localStorage.setItem('watchlist', watchlistJSON);
}

$searchForm.on('submit', async function(e) {
  e.preventDefault()
  const $searchString = $('.search-bar').val()
  const urlEncodedSearchString = encodeURIComponent($searchString)

  const response = await fetch(`http://www.omdbapi.com/?apikey=59354c85&s=${urlEncodedSearchString}`)
  result = await response.json() 
  
  if (result.Search) {
    renderMovies(result.Search) 
  } else {
    alert('no results found!')
  }
  
})

function renderMovies(movieArray) {
  const movieHtmlArray = movieArray.map(currentMovie => {
    return `
    <div class="movie"> 
      <img src="${currentMovie.Poster}">
      <h1 class="movie-title>${currentMovie.Title}</h1>
      <p class="release-date">${currentMovie.Year}</p>
      <button class="add-btn" data-imdbid="${currentMovie.imdbID}"> Add </button> 
    </div>`
  })

  const movieList = movieHtmlArray.join('')
  const $movies = $('.movies-container')
  $movies.append(movieList)
}
