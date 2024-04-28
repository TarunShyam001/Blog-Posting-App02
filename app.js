const express = require('express');
const app = express();
const sequelize = require ('./util/database');

const cors = require("cors");
const Blogs = require ('./models/blogs');
const Comments = require ('./models/comments');

const adminRoutes = require('./routes/admin');
const commentRoutes = require('./routes/comment');

app.use(express.json());
app.use(cors());

app.use( adminRoutes);
app.use( commentRoutes);

Blogs.hasMany(Comments);


Blogs.sync();
Comments.sync();
sequelize
.sync()
.then((result) => {
   app.listen(3000)
}).catch((err) => {
    console.log(err)
});



