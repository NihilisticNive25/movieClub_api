var exports = module.exports = {};

exports.handleLikes = (req, res, db) => {
  const { movieId, userId, isDeleted } = req.body;
  
  if (!movieId || !userId) {
    return res.status(400).json('incorrect form submission');
  }

    db.transaction(trx => {
          if(isDeleted == 0){
            console.log('insert')
            trx.insert({
              movieid: movieId,
              userid: userId,
              isdeleted: isDeleted
            })
            .into('moviesliked')
            .returning('movieslikedid')
            .then(data => {
              res.json(data[0]);
             })
            .then(trx.commit)
            .catch(trx.rollback)
          }
          else{
            console.log('update');
              trx
              .update({
                isdeleted: isDeleted
              })
              .where('userid', '=', userId)
              .where('movieid', '=', movieId)
              .into('moviesliked')
              .returning('movieslikedid')
              .then(data => {
              res.json(data);
              })
              .then(console.log)
              .then(trx.commit)
              .catch(trx.rollback);
          }
      })

    .catch(err =>{console.log(err); res.status(400).json('unable to update like status');})
}
