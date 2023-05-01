# Pokéfight

A small SPA for Pokébouts.

## Acknowledgements

Built with:
* JavaScript, React.js, HTML, CSS
* Node.js, Express.js, mongoose
* MongoDB

## How to Run

If you host locally, first, add your MongoDB URL to `./server/db_URL(example).js` and rename the file to `db_URL.js`.

To start the frontend, run `$ npm run start`.

To start the backend, run `$ npm run server`.

In case you deploy on Netlify, add a `_redirects` file with no file extension to your build folder and add `/* /index.html 200` to it. This will prevent refreshing the deployed page from throwing a 404.