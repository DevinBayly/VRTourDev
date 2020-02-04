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
let sceneInfo = {
  'David_T_Kessler_Cats_Claw_Elegance': {
    'image': './resources/DB5-V art tour/insta-360/IMG_20191104_151639_00_008.jpg'
  },
  'Michael_Comb_New_Map_of_Hope': {
    'image': './resources/DB5-V art tour/insta-360/IMG_20191104_152305_00_020.jpg'
  },
  'Maurice_J._Sevigny_The_Biomarble_Series': {
    'image': './resources/DB5-V art tour/insta-360/IMG_20191104_151231_00_004.jpg'
  },
  'Barbara_Rogers_Ordinary_Miracles': {
    'image': './resources/DB5-V art tour/insta-360/IMG_20191104_151102_00_001.jpg'
  },
  'Heather_Green_Living_Cosmos': {
    'image': './resources/DB5-V art tour/insta-360/IMG_20191104_152433_00_024.jpg'
  },
  'Emmi_Whitehorse_Condon_Sequence': {
    'image': "./resources/DB5-V art tour/insta-360/emmi-whitehorse-condonsequence.jpg"
  },
  'Emmi_Whitehorse_Water_Cure': {
    'image': './resources/DB5-V art tour/insta-360/emmi-whitehorse-watercure.jpg'
  },
  "Emmi_Whitehorse_Salmon_Berry_II": {
    "image": "./resources/DB5-V art tour/insta-360/emmi-whitehorse-salmonberry.jpg"
  },
  'Barbara_Rogers_Hothouse_hyrbids': {
    'image': "./resources/DB5-V art tour/insta-360/barbara-rogers-hothousehybrids.jpg"
  },
  'Barbara_Rogers_A_Clear_Day_In_The_Valley': {
    'image': "./resources/DB5-V art tour/insta-360/barbara-rogers-clearday.jpg",
    'json': {
      icons: [{
        type: 'info',
        position: "-5 0 -8",
        rotation:"0 40 0",
        popout_html_file:"resources/DB5-V art tour/david_t_kessler.html"

      }
      ]
    }
  }

}


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
      }
    }


  }
  return ob
}

// 
