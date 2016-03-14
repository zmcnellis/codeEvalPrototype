# Coderx Prototype

This is the repo for the Coderx website.

## Installation

1. First, we need to build the web application.
```sh
$ git clone https://github.com/zmcnellis/codeEvalPrototype.git
$ cd codeEvalPrototype
$ npm install
$ bower install
$ npm start
```

View at http://localhost:8080

2. Next, attach heroku to the git repository.
```sh
$ sudo apt-get install heroku-toolbelt
$ heroku git:remote -a coderx
```

3. Make your usual changes using git add/commit/push. Then deploy the application to heroku.
```sh
$ git push heroku master
```

4. Add heroku environment variables to point to the clang-3.3 installation.
```sh
$ heroku config:set LD_LIBRARY_PATH=/app/vendor/lib
$ heroku config:set PYTHONPATH=/app/clang-3.3
```

(Optional) Check to make sure environment variables are set correctly.
```sh
$ heroku config
=== coderx Config Vars
LD_LIBRARY_PATH: /app/vendor/lib
PYTHONPATH:      /app/clang-3.3
```

5. Visit page at http://coderx.herokuapp.com/


## Team
- Dr. Brian Malloy 
- Zachary McNellis

## Notes
...
