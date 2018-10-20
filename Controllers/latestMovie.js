var exports = module.exports = {};

exports.fetchLatestMovie = (req, res, fetch) => {  

	var movieList = [];
	 
    let url = 'https://api.themoviedb.org/3/movie/latest?api_key=32530325cbc463a86c1b0ab2b78e94d1&language=en-US'    
      fetch(url)
      .then(res => res.json())
      .then((data) => {
            return res.json(data);
       })
      .catch(err => console.log(err))
    
  }