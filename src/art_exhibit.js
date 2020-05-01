//close video functions
let videoHide = () => {
    // make video go back to 0 and stop then hide
    let vid = document.querySelector("audio")
    vid.pause()
    vid.currentTime = 0
    document.querySelector("#video_elements").style.visibility = "hidden"
}
// show video function, this is used right now for playing the audio, but can be changed when video material is available
let videoShow = () => {
    console.log("running videoShow")
    document.querySelector("#video_elements").style.visibility = "visible"
    let audio = document.querySelector("#video_elements audio")
    audio.play().catch(error => {

        



alert(`Please enable browser autoplay to hear audio on this site.

Directions: Click the icon in your address bar to the left of the URL.

On mobile go to settings > advanced > media > allow autoplay.

Or manually start the audio within each screen by clicking on the audio element.`)
    })
}

// floor change functions
// give  global scope to mapsvg variable 
let mapSvg
// function activated when different floors are selected, loads correct svg and hooks up events
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
    // svg is an xml markup file which d3 can read and append to the document under the svgMap id div
    d3.xml(`resources/newest_floormaps/${floorFile}`).then(data => {
        // append using node
        if (mapSvg != undefined) {
            mapSvg.remove()
        }
        mapSvg = data.documentElement
        d3.select("#svgMap").node().append(mapSvg)
        let cirs = d3.selectAll("circle")
        // when a mouse goes over a circle apply the hovered css style, filling it 
        cirs.on("mouseover", function () {
            let cir = d3.select(this)
            cir.attr("id", "hovered")
        })
        // remove the style on the circle when the mouse leaves
        cirs.on("mouseout", function () {
            let cir = d3.select(this)
            cir.attr("id", "")
        })
        // take us to a new scene when the user clicks on a circle
        cirs.on("click", function (d) {
            let cir = d3.select(this)
            let name = cir.attr("data-name").replace(/ /g, "_")
            // load correct scene and make new tab of the scene
            let open = window.open(`resources/art_exhibit/${name}.html`,"_blank")
            open.focus()
        })
    })
}


window.onload = async () => {
    videoShow()
    floorSelection("first")
}