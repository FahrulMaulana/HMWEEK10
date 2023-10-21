const express = require('express');
const router_movie = require('./routes/movies');
const router_authentic = require('./routes/authentic');
const router_user = require('./routes/user');
const morgan = require('morgan');
const path = require('path');
const app = express()

app.use(morgan('tiny'))
app.use(express.json());
app.use('/',router_movie);
app.use('/',router_authentic)
app.use('/',router_user)

app.use('/upload',express.static(path.join(__dirname,'upload')))
app.use('/view',express.static(path.join(__dirname, 'view')));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
