const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/Register');
const signin = require('./Controllers/SignIn');
const profile =  require('./Controllers/Profile');
const likeMovie = require('./Controllers/likeMovie');
const likedMovies = require('./Controllers/moviesLiked');
const movieList = require('./Controllers/movieList');
const latestMovie = require('./Controllers/latestMovie');

const db = knex({
  client: 'pg',
  connection: {
    connectionstring : process.env.DATABASE_URL,
    ssl:true,
  }
})

app.use(cors());
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


app.get('/', (req,res)=>  res.json('it is working'))

app.post('/signin', (req,res)=> signin.handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res ) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req,res) => profile.handleProfile(req, res, db))

app.put('/likeMovie', (req, res) => likeMovie.handleLikes(req, res, db))

app.get('/latestMovie', (req, res) => latestMovie.fetchLatestMovie(req, res, fetch))

app.get('/moviesLiked/:id', (req, res) => likedMovies.handleLikedMovies(req, res, db))

app.get('/fetchMovieList/:movieCategory/:userId', (req, res) => movieList.fetchMovieList(req, res, db, fetch))

app.listen(process.env.PORT || 3001, () => {
	console.log(`app running at port ${process.env.PORT}`);
});