# This is a Star Wars UI Template

## Installing and Running

After cloning the repository, run the below command
```sh
$ npm i
```
This will install all the needed node modules for the project

To run the project locally you'll want to run the below command
```sh
$ npm start
```
You can view the application by navigating to http://localhost:3000 in your browser.

---

## Build and Deploy to PCF

To build the project run the below command
```sh
$ npm run build
```

After the above command is done, you will see a build folder. This is what you'll push up to PCF.

## Testing
To test the code you'll run the bellow command
```sh
$ npm run test
```

To start the test in a watch mode run the bellow command
```sh
$ npm run test -- --watch
```

To check code coverage run the bellow command
```sh
$ npm run test -- --coverage
```