Client side of this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure

After creation, your project should look like this:

```
Project Folder 
|--DataAPI (Original project package)
|--Client
|    |-- node_modules 	
|    |-- Public
|    |	|--index.html
|    |
|    |-- src
|    |	|-components
|    |      |-App.js
|    |	|-index.js
|    | 
|    |-- package.json
|    |-- yarn.lock
|    |--README.md
|--node_modules ( installed concurrently so I can run npm start on both package.json from the main project folder. )
|-- package.json
|-- package-lock.json


```

* `Client/public/index.html` is the page template;
* `Client/src/index.js` is the JavaScript entry point.

## Install project dependency

Go into the client directly from the project folder 
```sh
cd Client
```

and run npm intal commaned 
```sh
npm install 
```

Repeat this process in DataApi folder


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
npm start will pen [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

It also runs fatherJS app at the same time<br>
Open [http://localhost:3030/dashboard](http://localhost:3030/dashboard) to view it in the browser.


