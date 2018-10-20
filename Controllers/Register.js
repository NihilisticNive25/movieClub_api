var exports = module.exports = {};

exports.handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  
   const hash = bcrypt.hashSync(password);
   console.log(hash)
  
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email,
        name: name
      })
      .into('login')
      .returning('*')
      .then(data => {
        console.log(data)
        res.json(data[0]);
       })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}
