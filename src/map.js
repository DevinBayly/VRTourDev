

let svgDraw = (imagepath, roiIds) => {
  let ob = {}
  // create the "go back to landing page icon in the top left"
  if (document.querySelector("#retnote") == undefined) {
    let returnDiv = document.createElement("div")
    returnDiv.id = "returnDiv"
    let returnInstruction = document.createElement("p")
    returnInstruction.innerHTML = "Landing page"
    returnInstruction.id = "retnote"

    let landingReturn = new Image()
    landingReturn.src = "./resources/brand_icons/ua-brand-icons/ua-brand-icons-image-files/SVG/up-left-arrow.svg"
    landingReturn.onload = () => {
      returnDiv.append(landingReturn)
      returnDiv.append(returnInstruction)
    }
    returnDiv.addEventListener("click", () => {
      window.location = "http://localhost:8000"
      returnDiv.remove()
      // then go back to the previous page

    })
    document.body.append(returnDiv)
  }

  let svg = document.createElement("object")
  svg.setAttribute("type", "image/svg+xml")
  svg.setAttribute("data", imagepath)
  // redirects, the order here is numerically 1-11 also
  svg.onload = () => {
    // attach the onhover
    for (let roiId of roiIds) {
      // for the most part the ele is actually the group holder, perhaps we should just iterate over whatever is in the group and try to apply the fills
      let ele = svg.contentDocument.getElementById(roiId)
      // mostly the child is a circle
      if (ele) {
        let child = ele.children[0]
        let col = child.style.fill
        // get the class name ror the child, then get the fill value from the style sheet
        if (col == "") {
          let childClass = "." + child.className.baseVal
          let rules = svg.contentDocument.styleSheets[0].cssRules // hopefully there isn't more than this one...
          // iterate over the styles until we hit the one which matches this class
          for (let i = 0; i < rules.length; i++) {
            let rule = rules[i]
            if (rule.selectorText == childClass) {
              col = rule.style.fill
            }
          }
        }

        ele.onmouseenter = () => {
          // come edit this if it doesn't work for other shapes added
          child.style.setProperty("fill", "#333")
          console.log("hi")
        }
        ele.onmouseleave = () => {
          child.style.setProperty("fill", col)
        }
        ele.onclick = () => {
          // nav to specific page
          let basicscene = basicScene(roiId)
          // create loading window
          basicscene.create()

        }
      }
    }
  }
  document.querySelector("#container").append(svg)
  ob.svg = svg
  return ob
}

let StudentTourMap = ()=> {
  // add to this the id's of the circles in the CSV
  let ob ={}
  let circleIds = ['student_1', 'student_2', 'student_3', 'student_4', 'student_5', 'student_6','student_7']

  ob.start = ()=> {
    ob.floorSVG = svgDraw("./resources/tricomplex.svg",circleIds)
  }
  // draw the svg to the screen
  return ob
}

// change the background on clicks 
//
let ArtTourMap = () => {
  // rooms of interest
  // make this generic, so a list can be provided
  let rooms = ['Jackson_Boelts_Sequence:_Red_Maize', 'Barbara_Rogers_Hothouse_hyrbids', 'Michael_Comb_New_Map_of_Hope', 'Emmi_Whitehorse_Salmon_Berry_II', 'Heather_Green_Living_Cosmos', 'Barbara_Rogers_A_Clear_Day_In_The_Valley', 'David_T_Kessler_Cats_Claw_Elegance', 'Barbara_Rogers_Ordinary_Miracles', 'Gregory_D._West_Table_Wax', 'Maurice_J._Sevigny_The_Biomarble_Series', 'Barry_Entner_Flora_Loose_Group', 'Emmi_Whitehorse_Condon_Sequence', 'Emmi_Whitehorse_Water_Cure']
  let ob = {}

  ob.changeCol = (ele) => {
    // find prev, and remove the id from it 
    let prev = document.querySelector("#active")
    if (prev) {
      prev.id = ""
    }
    // assign ele the active id
    ele.id = "active"
  }
  // add listener to the floor tags
  Array(...document.querySelectorAll(".floor")).map(e => {
    e.addEventListener("click", () => {
      ob.changeCol(e)
      // delete svg ob of previous plan
      if (ob.floorSVG) {
        ob.floorSVG.svg.remove()
      } else {
      }
      // load the correct floor plan
      //

      switch (e.innerHTML) {
        case "Fourth Floor":
          ob.floorSVG = svgDraw("./resources/newest_floormaps/NEW_keating_floor_maps_01_2020_floor_4_art_track.svg", rooms)
          break
        case "Third Floor":
          ob.floorSVG = svgDraw("./resources/newest_floormaps/NEW_keating_floor_maps_01_2020_floor_3_art_track.svg", rooms)
          break
        case "Second Floor":
          ob.floorSVG = svgDraw("./resources/newest_floormaps/NEW_keating_floor_maps_01_2020_floor_2_art_track.svg", rooms)
          break
        case "First Floor":
          ob.floorSVG = svgDraw("./resources/newest_floormaps/NEW_keating_floor_maps_01_2020_floor_1_art_track.svg", rooms)
          break
        default:
          console.log("broken room load")
      }
    })
  })
  ob.start = ()=> {
    document.querySelectorAll(".floor")[3].click()
    // trigger creation of video element popout
    let introvid = videoPopout()
    // create a video with the initial source, that is 300x300
    introvid.create("./resources/videos/dolbycanyon.m4v", 200, 300)
  }
  return ob
}
// video element added to the bottom
window.onload = () => {
  if (document.querySelector("#title")==" Art and Science on Display ") {
    // load the art tour experience instead
    let arttour = ArtTourMap()
    arttour.start()
  } else {
    let studentTour = StudentTourMap()
    studentTour.start()
  }

}
