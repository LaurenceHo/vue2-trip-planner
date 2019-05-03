# (WIP) Fullstack web application using Vue2, element-ui, Nodejs, Express, Mysql, Gulp4 and Webpack4.

## Introduction
This project demonstrates the basic fullstack development including frontend and backend.
The frontend stack is including [Vue2](https://vuejs.org/v2/guide/) (TypeScript), Vuex, vue-router, [element-ui](https://element.eleme.io), as well as using Webpack4 for bundling frontend code.
The backend stack is including Nodejs (TypeScript), Express, JWT, [Knex](https://knexjs.org/), Mysql, as well as using Gulp4 for running task and ESLint.
This project's purpose is for trip planning and management, which is also my personal interest.

## Prerequisites
1. The latest version of Nodejs and git need to be installed.
2. Docker

### Docker MySQL container preparation
* Preparing docker container
```
docker pull mysql:5
docker volume create mysqldata
docker run --name mysql5 -p 3306:3306 -v mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5
docker run -it --link mysql5:mysql --rm mysql:5 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'
```
* Setup database and user
```
mysql> CREATE DATABASE tripplanner;
mysql> CREATE USER 'sa'@'172.17.0.1' IDENTIFIED BY '(IJN8uhb';
mysql> GRANT ALL ON tripplanner.* TO 'sa'@'172.17.0.1';
mysql> FLUSH PRIVILEGES;
```
* Check privileges `mysql> SHOW GRANTS FOR 'sa'@'172.17.0.1';`
* If you want to rerun docker container, run `docker run mysql5`
* If you cannot run above command, you may need to remove the container and recreate it again.
Example:
```
docker ps -a
docker rm  ${CONTAINER_ID_IN_YOUR_MACHINE}
docker run --name mysql5 -p 3306:3306 -v mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5
```

## Getting started
* Clone the repo: `git clone https://github.com/LaurenceHo/vue-trip-planner.git`
* Install npm package: `npm install`
* Launch the express server: `npm run start-server`
* Bundle frontend code: `npm run build-client`
* Run seed db: `node dist/server/database/seed.js`
* Visit in your browser: `http://localhost:3000`, use `laurence@test.co.nz` as email and `abc123` as password to login.
* If you want to start client using webpack dev server: `npm run start-client`, 
and visit in your browser: `http://localhost:8080`, use the above credential to login.
* If you want to lint the project: `npm run lint`

## API Document (from Express server's view)
```
1.  retrieveTrips         (POST)   http://localhost:8080/api/trip
2.  retrieveTripDetail    (GET)    http://localhost:8080/api/trip/:trip_id
3.  createTrip            (POST)   http://localhost:8080/api/trip/create
4.  updateTrip            (PUT)    http://localhost:8080/api/trip/update
5.  deleteTrip            (DELETE) http://localhost:8080/api/trip/:trip_id

6.  retrieveTripDays      (GET)    http://localhost:8080/api/trip/:trip_id/day
7.  retrieveTripDayDetail (GET)    http://localhost:8080/api/trip/:trip_id/day/:trip_day_id
8.  createTripDay         (POST)   http://localhost:8080/api/trip/:trip_id/day/create
9.  updateTripDay         (PUT)    http://localhost:8080/api/trip/:trip_id/day/update
10. deleteTripDay         (DELETE) http://localhost:8080/api/trip/:trip_id/day/:trip_day_id

11.  retrieveEvent        (POST)   http://localhost:8080/api/trip/:trip_id/day/:trip_day_id/event
12.  createEvent          (POST)   http://localhost:8080/api/trip/:trip_id/day/:trip_day_id/event/create
13.  updateEvent          (PUT)    http://localhost:8080/api/trip/:trip_id/day/:trip_day_id/event/update
14.  deleteEvent          (DELETE) http://localhost:8080/api/trip/:trip_id/day/:trip_day_id/event/:event_id

15. userRegister          (POST)   http://localhost:8080/api/user/register
16. userLogin             (POST)   http://localhost:8080/api/user/login
16. userUpdate            (POST)   http://localhost:8080/api/user/update
17. userLogout            (GET)    http://localhost:8080/api/user/logout
```

## Directory Structure
```
vue-trip-planner
    ├── client
    │    ├── config => webpack config
    │    ├── src
    │    │    ├── assets
    │    │    ├── Components
    │    │    ├── models
    │    │    ├── pages
    │    │    ├── services
    │    │    ├── store
    │    │    ├── style
    │    │    ├── App.vue
    │    │    ├── main.ts
    │    │    ├── router.ts
    │    │    ├── vue-shims.d.ts
    │    ├── index.html
    ├── dist
    │    ├── client (generated by webpack)
    │    ├── server (generated by Gulp)
    ├── node_modules (generated by npm)
    ├── server
    │    ├── src
    │    │    ├── bin
    │    │    ├── controllers
    │    │    ├── database
    │    │    ├── models
    │    │    ├── repositories
    │    │    ├── routes
    │    │    ├── services
    │    │    ├── server.ts
    ├── .eslintrc.json
    ├── .gitignore
    ├── .prettierrc
    ├── gulpfile.ts
    ├── LICENSE.md
    ├── package.json
    ├── package-lock.json (generted by npm)
    ├── README.md
    ├── tsconfig.json
```
## TypeScript / JavaScript Naming rule
https://google.github.io/styleguide/jsguide.html

## CORS setting for JWT authentication
[server.ts](server/src/server.ts):
```
const corsHeader = (req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(corsHeader);
```

## JWT (JSON web token)
### Generate JWT when user do login)
[user-controller.ts](server/src/controllers/user-controller.ts):
```
login(req: express.Request, res: express.Response): void {
    try {
      const email = req.body.email;
      userService.retrieve({email}, (user: User, error: any) => {
        if (error) {
          res.status(400).send({error});
        }
        
        if (user) {
          if (!userService.checkPassword(req.body.password, user.password)) {
            res.status(401).json({message: 'Authentication failed. Email or password is wrong.'});
          } else {
            res.json({
              success: true,
              user: {
                email: user.email,
                username: user.username,
                token: jwt.sign({
                    id: user.id,
                    email: user.email,
                    username: user.username
                  },
                  req.app.get('superSecret'),
                  {expiresIn: '1d'})
              }
            });
          }
        } else {
          res.status(404).json({message: 'Cannot find user.'});
        }
      });
    } catch (error) {
      res.status(400).send({error});
    }
  }
```
### Verify JWT when user do any API call
[server.ts](server/src/server.ts):
```
const jwtAuthentication = (req: any, res: express.Response, next: any) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[ 0 ] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[ 1 ], app.get('superSecret'), (error: any, decode: any) => {
      if (error) {
        return res.status(403).send({
          success: false,
          message: 'Authentication failed.'
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
app.use('/api/trip', jwtAuthentication);
app.use('/api/user/update', jwtAuthentication);
``` 

## Write Vue using TypeScript
### Class-Style Vue Components
You can use the officially maintained `vue-class-component` decorator:
```
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Hamburger from './Hamburger.vue';
import CreateTripDialog from '../components/CreateTripDialog.vue';

// The @Component decorator indicates the class is a Vue component
@Component({
  components: { CreateTripDialog, CreateTripDayDialog, Hamburger },
  // Define props type here
  props: {
    username: {
      type: String,
      default: '',
    },
  },
})
export default class TopBar extends Vue {
  // Initial data can be declared as instance properties
  message: string = 'Hello!'
  
  // Instance lifecycle hooks method
  beforeCreate() {
    ......
  }

  beforeMount() {
    ......
  }

  // Component methods can be declared as instance methods
  toggleSideBar() {
    ......
  }
  
  // Computed property
  get tripList() {
    return this.$store.state.trip.tripList;
  }
}
</script>
```

## element-ui usage
### Only import components on demand
In [main.ts](client/src/main.ts):
```
import {
  Alert,
  Button,
  Card,
  Col,
  Container
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Alert);
Vue.use(Button);
Vue.use(Card);
Vue.use(Col);
Vue.use(Container);
```
### Internationalization
In [webpack.common.js](client/config/webpack.common.js):
```
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');

module.exports = {
  plugins: [
    new NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
  ]
};
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
