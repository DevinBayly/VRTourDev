# Inline Documentation

Since many of these files are the same minus the placement of cameras and info icons I will place the documentation here in the readme.

## Example Artscene inline Documentation

*Scene example*
```
<html>
<head>
  <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
  <style>
    /* This iframe makes the popout window appear on the left taking up half the screen with a black border */
    iframe { position: absolute; top: 0px; left:0px; width: 50%; height: 100%; border:black solid 2px; }
  </style>
</head>
<body>
  <script>
    // create function that loads an iframe of the popout page in this page
    let createTextPopout = (filehtml) => {
      // create an iframe, and set the content to the popout file that is provided in the aframe entity definition at bottom of file line 130 
      //mlisten="popoutInnerHTML:Barbara_Rogers_A_Clear_Day_In_The_Valley_popout.html"
      let iframeElement = document.createElement("iframe")
      iframeElement.src = filehtml
      document.body.append(iframeElement)
      // bind the close button
      // recursive timeout till selection passes
      let closeInt = setInterval(() => {
        let btn = iframeElement.contentDocument.querySelector("button")
                if (btn) {

                    // add image to close it
                    let xPopoutIcon = document.createElement("img")
                    xPopoutIcon.src= "../ua-brand-icons/ua-brand-icons-image-files/PNG/x.png"
                    iframeElement.contentDocument.body.append(xPopoutIcon)
                    xPopoutIcon.style.position="absolute"
                    xPopoutIcon.style.top = "0px"
                    xPopoutIcon.style.right = "0px"
                    // setup event listener
                    xPopoutIcon.addEventListener("click",()=> {
                        // make the click close the iframe
                        document.querySelector("iframe").remove()
                    })
            //same thing for the click on the "close" button at the bottom of popout
          btn.addEventListener("click", () => {
            document.querySelector("iframe").remove()
          })
          clearInterval(closeInt)
        }
      },1000)
      iframeElement.contentDocument.querySelector("button").addEventListener("click", () => {
        document.querySelector("iframe").remove()
      })
    }
  </script>
  <script>
    // define a component for aframe that will handle mouse interactions, this is part of the entity that is a circle and has the info.png material
    AFRAME.registerComponent('mlisten', {
        // at definition time an attribute popoutInnerHTML will be specified with a string argument that is the filename of the popouthtml
      schema: {
        popoutInnerHTML: { type: 'string' }
      },
      init: function () {
          // redefine the el so it's accessible regardless of context here
        let el = this.el
        let popout_html_file = this.data.popoutInnerHTML

        this.el.addEventListener('mouseenter', function (e) {
          // play with emissivity, and color
          // emissivity is how bright the icon is
          el.setAttribute("material", "color", "#5ef7ff")
          //el.setAttribute("material","emissiveIntensity","1")
        })
        this.el.addEventListener("mouseleave", function () {
          //el.setAttribute("material", "emissiveIntensity",'.2')
          el.setAttribute("material", "color", "white")
        })
        // this is if the html file was what was put in
        //
        this.el.addEventListener("click", function () {
          console.log("clicked on info");

          // load whatever popout is needed for this part
          if (popout_html_file !== "movement") {
            createTextPopout(popout_html_file)
          } else {
              // presently don't have move icons for inter scene travel, but this would be how we could support it
            //move icon trannsfer to adjacent scene
            //remove current scene and call new basic scene create
            document.querySelector("a-scene").remove()
            let basicscene = basicScene("art-one")
            basicscene.create()
          }

        })
      }
    })
  </script>
  
  <div id="loaderHolder">
  <div class="loader">

  </div>
  </div>
  <style>

#loaderHolder {
  height:100%;
  width:100%;
  display: flex;
  justify-content: center;
  align-items:center;
}
  .loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
// setup a loading spinner animation when the scene's not quite ready.
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  </style>
<!-- Actual Aframe code, we define a scene, and specify what the built in loading screen should look like-->
<!-- the cursor ray origin makes the mouse able to trigger things in the scene, read up on this at https://aframe.io/docs/1.0.0/components/cursor.html -->
  <a-scene loading-screen="dotsColor: black; backgroundColor: white" cursor="rayOrigin: mouse">
<!-- define an asset block so that loading the full scene 360 image takes less time -->
  <a-assets>
    <img src="DB5-V art tour/insta-360/barbara-rogers-clearday.jpg" id="360-image" alt="">
  </a-assets>
  <!-- connect the camera to an entity so that the camera default direction can be modified without losing the look control option, the id needs to be unique if you are using aframe-watcher, for scene modification https://www.npmjs.com/package/aframe-watcher  -->
  <a-entity id="azmlr" position="0 0 0" rotation="0 77.01526794809988 0">
    <a-camera look-controls></a-camera>
  </a-entity>

  
<!-- Here's the info icon. its a circle shape with various components added to it -->
<!-- animation makes the material emissivity change over time from black to a light gray -->
<!-- the mlisten is the custom component that we defined that will actually create a popout in the left side to show info and images from the vr tour -->
    <a-circle animation="property:material.emissive;to:#D2A5A5;dir:alternate;easing:linear;dur:1000;loop:true" material="emissive: #000000;emissiveIntensity: .3;side: double;src: info.png" mlisten="popoutInnerHTML:Barbara_Rogers_A_Clear_Day_In_The_Valley_popout.html"
      id="clearday" rotation="0 54.02762824965612 0" position="-20 3.53636 -18.57084"></a-circle>
      <!-- create a spherical element with the image asset on it -->
       <a-sky id="eqfdd" src="#360-image"></a-sky> 
  </a-scene>

<!-- create  -->
    <div id="exit" >

        <img  style="position:absolute;top:0px;right:0px;border:black solid;border-radius:10px;background:white"  onclick="window.close()" src="../ua-brand-icons/ua-brand-icons-image-files/PNG/x.png" alt="">
        </div>
        
</body>

</html>
```

*Popout Example*
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- Latest icon font stylesheet -->
    <link rel="stylesheet" href="https://cdn.uadigital.arizona.edu/lib/ua-brand-icons/v1.1.0/ua-brand-icons.min.css">
<!--x-->
    <!-- Compiled and minified UA Bootstrap CSS, icon font not included -->
    <link rel="stylesheet"
        href="https://cdn.uadigital.arizona.edu/lib/ua-bootstrap/v1.0.0-beta.26/ua-bootstrap.min.css">
    
</head>

<body>
    <div class="overlay">

    </div>
    <!-- the popout class contains various pieces of styling to make sure the title text and images all show up in the right places -->
    <div class="container popout ">
        <div class="row">
            <div class="col-md-12">
                <h2>Barbara Rogers</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                                <p> About the Artist </p>
                <p> Barbara Rogers has exhibited nationally and internationally, including one- person exhibitions at
                    major galleries and museums in San Francisco, Seattle, New York, Chicago, Pittsburgh, Scottsdale,
                    Germany, and the United Arab Emirates. Her work is in major public and private collections including
                    The San Francisco Museum of Art, The San Jose Museum of Art, and the ASU Museum. </p>
                <p>Ms. Rogers sees the importance of the garden as a fundamental pivot where nature and culture can
                    convene and where personal desires can assume political significance. </p>
                <p>Ms. Rogers holds a degree from Ohio State University and the University of California at Berkeley.
                    She joined the faculty of the School of Art at the University of Arizona in 1990. </p>
                <p>In the Artist’s Words </p>
                <p> This former ocean bottom that we call the Sonoran Desert has life forms more beautiful, relevant,
                    and astonishing than any artist could ever create. The sun, winds, water, along with all the natural
                    elements, shape the mysterious tales of survival of life in this tough little paradise. Ordinary
                    Miracles: Life in the Desert is about the ever- evolving cast of characters and their dramatic
                    environment that I can see from my window and in my travels through the Sonoran Desert. This cast of
                    characters work so hard to stay alive. Each life is a miracle. Each life contributes something vital
                    to our ecosystem even if we do not understand its role. Through the use of forms, colors, and visual
                    symbols for the sun- all suggesting the ancient oceanic beginnings, the struggle to create and
                    maintain life, and the preciousness of water- the painting reflects my love for this inspiring
                    environment. I feel part of a group of people highly privileged to live here. </p>
                <p><a href="barbararogersart.com">barbararogersart.com</a> </p>
                <p>A Clear Day in the Valley, Oil on Canvas , 2005, Room 209
                </p>
            </div>

        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-md-12 ">
                <img src="artist_pictures/Barbara Rogers/barbara rogers_clear day in the valleyjpg.jpg" alt="">
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-default">Close</button>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://cdn.uadigital.arizona.edu/lib/ua-bootstrap/v1.0.0-beta.26/ua-bootstrap.min.js"></script>
</body>

</html>
```