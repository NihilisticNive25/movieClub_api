var exports = module.exports = {};

 exports.handleSignIn = (req, res, db, bcrypt) => {
 	return db.select('*').from('login')
	.where('email' , '=' , req.body.email)
	.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			
			if(isValid){
				return res.json(data[0]);
			}
			else
				res.status(400).json('incorrect credentials')
			})
		.catch(err => res.status(400).json('error signin'))
	}