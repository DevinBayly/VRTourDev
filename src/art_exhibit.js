//close video functions
let videoHide = () => {
    // make video go back to 0 and stop then hide
    let vid = document.querySelector("audio")
    vid.pause()
    vid.currentTime = 0
    document.querySelector("#video_elements").style.visibility = "hidden"
}
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
let mapSvg
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
            let open = window.open(`resources/art_exhibit/${name}.html`,"_blank")
            open.focus()




        })
    })
}


window.onload = async () => {
    // check for cookie
    videoShow()
    floorSelection("first")
}