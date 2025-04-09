const mongoose = require('mongoose');
mongoose
    .connect('mongodb+srv://crowd_funding:S75bkKsWCDYcQzlJ@crowd-funding.qsldpt3.mongodb.net', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connection success');
    })
    .catch((error) => console.error(`Database connection failed, ${error.message}`));
