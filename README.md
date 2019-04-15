# Now On View

[Now On View](https://now-on-view.firebaseapp.com/) is a website that explores the Metropolitan Museum of Art’s encyclopedic collection. Users can discover artworks in the collection by exploring different tags, saving images to their gallery and sorting them into exhibitions.

## Tech Used

This app uses the following technologies:

* [React](https://reactjs.org/): bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
* [Redux](https://redux.js.org/)
* APIs:
    * [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/)
* Javascript Libraries:
    * [Muuri](https://haltu.github.io/muuri/)
    * [interact.js](http://interactjs.io/)
* CSS Framework: [Bulma](https://www.npmjs.com/package/react-bulma-components)
* Hosting: [Firebase](https://firebase.google.com/)

## Challenges

### Initial layout issues with Muuri & React componentDidMount

When users visit the Gallery page, their saved images should display in a four column grid layout. However, I was having an issue upon loading the page from local storage where the images appeared to stack upon one another. The library I was using, Muuri, had two built in methods to rectify this: *refreshItems* to refresh the cached image dimensions for the grid and *layout* to calculate item positions and move items to their calculated positions. However, the methods were not being called upon load.

As I was using React, my initial thought was to call these methods in componentDidMount. However, this did not solve the problem, potentially because the grid was being created in componentDidMount. During this process, I noticed that upon closing my console, the layout correctly resized and reoriented, meaning the issue wasn't with the methods but rather with how I was calling them. Thus, I added an onload event to my react component for the Gallery page, which would call the refreshItems and layout Muuri methods and solved the issue.

### Using interact.js library for workspace

My plan with the Exhibitions page was to create an interactive workspace where users could drag around images and organize them as if they were moving around paper images on a table. I utilized the interact.js library to add draggability to the workspace. I was drawn to interact.js due to its ability to restrict the objects movement to a parent container and the potential addition of resizing, to enhance the functionality of the workspace.  

One of the key aspects to achieving this goal was to save the previous orientation a user had created for an exhibition. Interact.js creates dragging by getting the target's data-x and data-y attributes and applying them to the CSS transform property to translate the target. To achieve my goal of storing the coordinates, I added an onend function to the interact.js function which would dispatch the final coordinates upon releasing the mouse and store them in Redux. Then, each time the Exhibitions page is mounted, those coordinates would be pulled from Redux and applied to the CSS transform property for each image.

The issue with this method was that interact.js was never made aware of these translations. Thus, when revisiting the page after moving the images, the image coordinates are saved but moving them further throws the mouse out of alignment with the image and creates issues with interact.js' ability to restrict the boundary of the parent container. I attempted to figure out a way to update interact.js' *origin* method but found it difficult seeing as the interact.js function used a single origin for all of the draggables. Moving forward, I will probably need to incorporate a different library or create the draggable functionality manually.
