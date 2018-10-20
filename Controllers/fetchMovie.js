var exports = module.exports = {};

 exports.fetchMovieList = (req, res, db) => {
  const {movieCategory} = req.params; 
  console.log(movieCategory)
  let url = "";  
    if(movieCategory === 'mostPopular'){
      url = 'https://api.themoviedb.org/3/movie/popular?api_key=32530325cbc463a86c1b0ab2b78e94d1&language=en-US'
    }
    else if(movieCategory === 'topRated' || movieCategory === 'bestOf5years'){
      url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=32530325cbc463a86c1b0ab2b78e94d1&language=en-US'
    }    
  }