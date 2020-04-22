//close video functions
let videoHide =()=> {
    // make video go back to 0 and stop then hide
    let vid = document.querySelector("video")
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
    let floorFile = "tricomplex.svg"
    d3.xml(`resources/${floorFile}`).then(data => {
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
    sceneInfo = await fetch("./resources/sceneinfo.yml").then(res => res.text()).then(t => {
        //convert into a json object with the jsyaml library
        return jsyaml.safeLoad(t)
    })
    floorSelection("first")
}