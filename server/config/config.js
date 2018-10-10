// This file holds any configuration variables we may need
// 'config.js' is ignored by git to protect sensitive information, such as your database's username and password
// copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    // mongodb://<dbuser>:<dbpassword>@ds113703.mlab.com:13703/game_gator
    // dbuser: gg_admin , dbpassword: GamerGator3031
    uri: 'mongodb://gg_admin:GamerGator3031@ds113703.mlab.com:13703/game_gator',
  },
  port: 8080
};
