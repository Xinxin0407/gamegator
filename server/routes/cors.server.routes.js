/* Dependencies */
var express = require('express'),
  router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */

/*
  The ':' specifies a URL parameter.
 */

const http = require('http');

router.route('/search')
  .get((req, res) => {
    const kw = req.query.kw;
    console.log("searching: " + kw);
    //open the http request

    const options = {
      protocol: 'http:',
      host: 'api-endpoint.igdb.com',
      path: `/games/?search=zelda`,
      headers: {
        'user-key': 'eb48183bf7289d82e1d2e575c52eeb01',
        'Accept': 'application/json'
      },
      method: 'GET'
    };

    const callback = response => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        res.status(200).end(chunk);
      });
      response.on('end', () => {
        console.log('No more data in response.');
      });
    };

    http.request(options, callback).end();

  });

router.route('/game')
/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.
  Say we make an example request to '/listings/566372f4d11de3498e2941c9'
  The request handler will first find the specific listing using this 'listingsById'
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database,
  and bind this listing to the request object.
  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */

module.exports = router;
