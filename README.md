# HR App for OnSiteIQ

This is a simple front end app that displays a mock HR interface that allows the user to view pretend candidates, accept/reject them, and leave notes. It also uses a couple custom hooks to manage local storage and the display state of a pop-up modal. 

This app was bootstrapped with `npx create-react-app` \
Candidate data uses https://randomuser.me/api \
Automated tests written with react-testing-library 
Tab view is managed using react-tabs

## When running this app will:

✅ Show a list of new candidates to the user \
✅ Allow the user to reject or accept a candidate \
✅ Allow the user to "undo" rejecting or accepting a candidate \
✅ Allow the user to leave a note when rejecting/accepting \
✅ Display the lists of the candidates accepted and rejected 


## Instructions

### `npm install`
Uses node v18.12.1

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**