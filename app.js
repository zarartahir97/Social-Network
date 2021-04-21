const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io');
const socket = io(http);

const users_routes = require('./routes/users');
const posts_routes = require('./routes/posts');
const followers_routes = require('./routes/followers');

app.set('socketio', socket);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users',users_routes);
app.use('/posts', posts_routes);
app.use('/followers', followers_routes);

const db = require('./config/db');
const user = require('./models/users');
const post = require('./models/posts');
const user_follower = require('./models/users_followers');

user.hasMany(post, {
    as : 'posts'
});

post.belongsTo(user, {
    as : 'user'
});

user.belongsToMany(user , { 
    through: user_follower, 
    foreignKey: 'followerId',
    otherKey: 'followingId',
    as: 'following' });
    
user.belongsToMany(user, { 
    through: user_follower,
    foreignKey: 'followingId',
    otherKey: 'followerId', 
    as: 'followers'});

socket.on('connection', (socket) => {
    console.log("client connected!!");
})

db.authenticate()
.then(() => console.log("Database connected"))
.catch(err => console.log("Error: " + err));

http.listen(3000, () => console.log("Server Running!"));



