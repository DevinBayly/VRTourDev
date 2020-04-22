//close video functions
let videoHide =()=> {
    // make video go back to 0 and stop then hide
    let vid = document.querySelector("audio")
    vid.pause()
    vid.currentTime = 0
   document.querySelector("#video_elements").style.visibility = "hidden"
}
let videoShow =()=> {
    document.querySelector("#video_elements").style.visibility = "visible"
}

// floor change functions
let mapSvg
let sceneInfo
let floorSelection = (floor) => {
    // options here
    let floorFile
    if (floor == "first") {
        floorFile = "NEW_keating_floor_maps_01_2020_floor_1_art_track.svg"
    } else if (floor == "second") {
        floorFile = "NEW_keating_floor_maps_01_2020_floor_2_art_track.svg"
    } else if (floor == "third") {
        floorFile = "NEW_keating_floor_maps_01_2020_floor_3_art_track.svg"
    } else if (floor == "fourth") {
        floorFile = "NEW_keating_floor_maps_01_2020_floor_4_art_track.svg"

    }
    d3.xml(`resources/newest_floormaps/${floorFile}`).then(data => {
        // append using node
        if (mapSvg != undefined) {
            mapSvg.remove()
        }
        mapSvg = data.documentElement
        d3.select("#svgMap").node().append(mapSvg)
        let cirs = d3.selectAll("circle")
        cirs.on("mouseover", function () {
            let cir = d3.select(this)
            cir.attr("id", "hovered")
        })
        cirs.on("mouseout", function () {
            let cir = d3.select(this)
            cir.attr("id", "")
        })
        cirs.on("click", function (d) {
            let cir = d3.select(this)
            let name = cir.attr("data-name").replace(/ /g, "_")
            // load correct scene and make new tab of the scene
            let a = document.createElement("a")
            a.setAttribute("target", "_blank")
            a.href = `resources/${name}.html`
            a.click()




        })
    })
}


window.onload = async () => {
    // check for cookie
    if (document.cookie.match(/watched_video/)) {
        console.log(document.cookie)
        // prevent video from showing
        videoHide()
    } else {
        console.log("didn't have cookie")
        let expiryDate =new Date()
        expiryDate.setDate(expiryDate.getDate()+1)
        document.cookie = `watched_video=true;expires=${new Date(expiryDate.getTime())}`
    }
    sceneInfo = await fetch("./resources/sceneinfo.yml").then(res => res.text()).then(t => {
        //convert into a json object with the jsyaml library
        return jsyaml.safeLoad(t)
    })
    floorSelection("first")
}