# elite-dangerous-ledger
Ledger web application designed for Elite: Dangerous players to help them track their profits and expenses.

# How to set up your development environment

## Code Style Tools

This project uses [ESLint](http://eslint.org/) for maintaining code style. Pull requests that do not conform to the requirements of the rules will not be accepted.

## Client Side Code

The client side code is found in `./client` and is using the [Ember CLI](http://www.ember-cli.com/) stack. 

### Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

### Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

### Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

#### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

#### Running Tests

* `ember test`
* `ember test --server`

#### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
  
## Server Side Code

The server side code is found in `./server` and is a [Sails](http://sailsjs.org) application.

## Local MongoDB Setup

From the root directory of the project, execute `mkdir -p .mongo/data`.  Then, run mongo using `mongod -f mongo-local-dev.conf`.

# Deployment Instructions

TODO: Write deployment instructions.
