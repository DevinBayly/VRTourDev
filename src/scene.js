AFRAME.registerComponent('mlisten', {
  schema: {
    popoutInnerHTML: { type: 'string' }
  },
  init: function () {
    let el = this.el
    let popout_html_file = this.data.popoutInnerHTML
    this.el.addEventListener('mouseenter', function (e) {
      // play with emissivity
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
      // load whatever popout is needed for this part
      if (popout_html_file !== "movement") {
        let popoutItem = textPopout()
        popoutItem.create(popout_html_file)
      } else {
        //move icon trannsfer to adjacent scene
        //remove current scene and call new basic scene create
        document.querySelector("a-scene").remove()
        let basicscene = basicScene("art-one")
        basicscene.create()
      }

    })
  }
})

let generateIcon = (config) => {
  let ob = {}
  let circle = document.createElement("a-circle")
  circle.setAttribute("position", config.position)
  circle.setAttribute("rotation", config.rotation)
  circle.setAttribute("material", "emissive", "#9A9A9A")
  circle.setAttribute("material", "emissiveIntensity", ".3")
  if (config.type == "info") {
    circle.setAttribute("src", "./resources/info.png")
    circle.setAttribute("mlisten", {
      popoutInnerHTML: config.popout_html_file
    })
  } else {
    circle.setAttribute("src", "./resources/moveicon.png")
    circle.setAttribute("mlisten", {
      popoutInnerHTML: "movement"
    })
  }
  ob.element = circle
  return ob
}
// populated in the window load step of map.js
let sceneInfo 

let basicScene = (room) => {
  let ob = {}
  ob.pointers = [] // this is the points of interest array will hold the objects
  ob.image = {} // structure will be name and path
  // the generic scene creation calls for aframe
  ob.create = () => {
    // this is the connection between the svg icons and the scenes that get loaded
    // room jsons
    // these are the files which contain the scene configuration details 
    let specScene = sceneInfo[room]

    // if the sceen isn't defined, just skip all this
    if (specScene == undefined) {
      return
    }
    let scene = document.createElement("a-scene")
    scene.setAttribute("cursor", "rayOrigin: mouse")
    let text = document.createElement("a-entity")
    text.id = "loadingtext"
    text.setAttribute("loading", "")
    text.setAttribute("position", "0 .9 -4.1")
    text.setAttribute("scale", "8 8 8")
    // add rayOrigin mouse
    console.log("made scene")
    document.body.append(scene)
    let sky = document.createElement("a-sky")
    // for some reason the sky appears tilted

    // do this to remove the loading element
    let assets = document.createElement("a-assets")
    let skyImageAsset = document.createElement("img")
    assets.append(skyImageAsset)
    scene.append(assets)
    scene.append(text)
    skyImageAsset.id = "skyimg"
    skyImageAsset.src = specScene.image

    // on the load remove the text element from the scene
    text.addEventListener("loaded", () => {
      //loaded is the event that is emitted when the asset finishes loading
      text.remove()
    })
    sky.setAttribute("src", "#skyimg")
    if (specScene.json) {
      if (specScene.json.sky) {
        sky.setAttribute("rotation", specScene.json.sky.rotation)
      }

      // add the elements to the scene that are specified in the info
      for (let entityInfo of specScene.json.icons) {
        let icon = generateIcon(entityInfo)
        scene.append(icon.element)
      }
    }
    scene.append(sky)
    // add a exit scene icon in the top left to allow for click exit
    let sceneExit = new Image()
    sceneExit.src = "./resources/brand_icons/ua-brand-icons/ua-brand-icons-image-files/SVG/x.svg"
    sceneExit.id = "sceneex"
    sceneExit.onload = () => {
      document.body.append(sceneExit)
    }
    sceneExit.addEventListener("click", () => {
      // also remove the html a-fullscreen class from the html
      document.querySelector("html").classList.remove("a-fullscreen")
      scene.remove()
      sceneExit.remove()
    })
    // create a video popout for the scene
    // remove the other intro video frame
    if (specScene.vidlink) {
      let vid = videoPopout()
      let vidlink = specScene.vidlink
      // backup video for testing today
      if (vidlink == undefined) {
        vid.create("./resources/videos/dolbycanyon.m4v", 200, 200, true)
        // attach bottom class
      }
    }
    let vidHolder = document.querySelector(".popoutHolder")
    if (vidHolder) {
      // move vid to bottom left
    vidHolder.classList.add("bottomleftvideo")
    }


  }
  return ob
}

// 
