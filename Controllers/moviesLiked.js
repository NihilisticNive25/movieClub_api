var exports = module.exports = {};

 exports.handleLikedMovies = (req, res, db) => {
 const {id} = req.params;
	
	db.select('*').from('moviesLiked').where("userId", "=",  id).where("isDeleted", "=", "0" ).then(data => {
		if(data.length){
			console.log(data);
			res.json(data);
		}
		else{
			res.status(400).json('no movies liked');
		}
	}).catch(err => res.status(400).json('error getting movie details'))
}