
const exphbs = require('express-handlebars')
const express = require('express');
const morgan = require('morgan');
const config = require('./config/config');
const app = express();
const port = config.app.port;
const routes = require('./server/routes/routes')

//settings
app.set('views', config.views);
app.engine(config.engine.engName, exphbs(config.engine.engConf));
app.set('view engine', config.viewEngine);

//Error middleware

const unexpectedError = (err,req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
    next(); // esto es necesario para que la petición continúe
}

//middlewares
app.use(morgan('dev'));
//static files
app.use(express.static('./src/public'));
app.use(express.json());
//routes
app.use(routes);

app.use(unexpectedError);
// app.listen(port, () => {
//     console.log(`Server runing in the port ${port}`);
// })
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });