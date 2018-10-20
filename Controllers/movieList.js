var exports = module.exports = {};

 exports.fetchMovieList = (req, res, db, fetch) => {  

var movieList = [];
const {movieCategory,userId} = req.params; 
let url = "";  

const get_moviesLiked = (ids,userId) => {
    return  db.select('*').from('moviesliked')
            .whereIn('movieid', ids)
            .where('isdeleted', '=', 0)
            .where('userid', '=', userId)
            .then(data => {
              console.log(data);
              console.log(data.map(a => a.movieId));
                 return likedMovies = data.map(a => a.movieid); 
                })
            .catch(err => {
              console.log(err);
              return res.status(400).json('error fetching')
            })
}

const createMovieList = (movies, likedMovies) => {
  
      return movieList;  
}
    if(movieCategory === 'mostPopular'){
      url = 'https://api.themoviedb.org/3/movie/popular?api_key=32530325cbc463a86c1b0ab2b78e94d1&language=en-US'
    }
    else if(movieCategory === 'topRated'){
      url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=32530325cbc463a86c1b0ab2b78e94d1&language=en-US'
    }
    else if(movieCategory === 'upcomingMovie'){
      url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=32530325cbc463a86c1b0ab2b78e94d1&language=en-US&page=1'
    }
    else if(movieCategory === 'nowPlaying'){
      url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=32530325cbc463a86c1b0ab2b78e94d1&language=en-US&page=1'
    }    
    
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        var likedMovies =[];
        var movies = [];
          
          movies = data.results;
           
          let ids = movies.map(a => a.id);
             
          get_moviesLiked(ids,userId).then(function (likedMovies) {
            console.log(likedMovies);
              movies.forEach(function(movie) { 
                  id = movie.id ;
                  title = movie.title ;  
                  vote_average= movie.vote_average ;  
                  overview = movie.overview.substring(0,150) +( movie.overview.length > 150 ? '...'  : '');  
                  poster_path = movie.poster_path;  
                  release_date = movie.release_date ;
                  like = likedMovies.length > 0 ?  likedMovies.includes(movie.id) : false;
                  movieCard = { 
                        id ,
                        title  ,
                        vote_average ,
                        overview ,
                        poster_path ,
                        release_date,
                        like                   
                      }
                      
                  movieList.push(movieCard)
              });

              return res.json(movieList);
          }); 
    })
      .catch(err => console.log(err))
    
  }