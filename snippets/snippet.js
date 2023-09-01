// eslintignore: snippet.js

/**
 * *Description -SNIPPET: AUTHENTICATION PARADIGM Session Store - MongoDBStore - https://www.npmjs.com/package/connect-mongodb-session
 * @author Micheal Ogden - WidesVs2
 * @date 2023-08-31
 * @param {any} {uri:dbURL} - url for remote connection to atlas db
 * @param {any} collection:"mySessions" - collection name
 * @param {any} expires:1000*60*60*24*7 - 1 week
 * @param {any} connectionOptions: object {} - connection options
 * @param {any} (err) - error
 * @param {any} (error) - error
 * @returns {any} logs to console if connected, else logs error
 */

// var store = new MongoDBStore(
//   {
//     uri: dbURL,
//     collection: "mySessions",
//     expires: 1000 * 60 * 60 * 24 * 7, // 1 week
//     connectionOptions: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       dbName: process.env.DB_NAME,
//       serverSelectionTimeoutMS: 15000, // Timeout after 5s instead of 30s
//     },
//   },
//   (err) => {
//     !err ? console.log("MongoDB Session Store Connected...") : console.log(err);
//   }
// );

// // Catch errors
// store.on("error", function (error) {
//   console.log(error);
// });

// var sess = {
//   secret: process.env.SESSION_SECRET,
//   cookie: {
//     sameSite: "strict",
//     maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
//   },
//   store: store,
//   // Boilerplate options, see:
//   // * https://www.npmjs.com/package/express-session#resave
//   // * https://www.npmjs.com/package/express-session#saveuninitialized
//   resave: true,
//   saveUninitialized: true,
// };

// if (app.get("env") === "production") {
//   app.set("trust proxy", 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }

// app.use(session(sess));

/*
 * Description - SNIPPET: AUTHENTICATION PARADIGM - Auth0 - https://www.npmjs.com/package/express-openid-connect
 */
// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.AUTH0_SECRET,
//   baseURL: process.env.AUTH0_BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

/*
 * Description - View Engine Setup - EJS - https://ejs.co/
 */
app.set("views", path.join(__dirname, "client", "views"));
app.set("view engine", "ejs");

/*
 * Description - SPA Setup - https://expressjs.com/en/starter/static-files.html
 */
// if (process.env.NODE_ENV === "production") {
// handle SPA
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
// }
