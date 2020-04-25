let activeInd = 0
let d3_data = [{ name: "Brittany_Uhlorn", state: true }, { name: "Anthony_Aguilar", state: false }, { name: "Logan_Beers", state: false }, { name: "Ryan_Hunt", state: false }]
let animation_data = [[0, 0]]
let tourContinue
let visualBinding = () => {
    let ob = {}
    ob.round = 0
    ob.duration = 2000
    tourContinue = true
    ob.restart = () => {
        if (!tourContinue) {
            ob.marker.remove()
            return
        }
        setTimeout(ob.restart,ob.duration)
        console.log("starting over")
        let startRad,endRad
        if (ob.round % 2 == 0) {
            startRad = 11
            endRad = 30
        } else {
            endRad = 11
            startRad = 30
        }
        ob.svg.selectAll("circle").each(function (d) {
            if (d.state) {
                animation_data = [[d3.select(this).attr("cx"), d3.select(this).attr("cy")]]

            }
            return d3.select(this).attr("cx")
        })
        if (ob.round == 0) {
            ob.marker = ob.svg.selectAll("#marker").data(animation_data).enter().append("circle")
        } else {
            ob.svg.select("#marker").data(animation_data)
        }
        ob.svg.selectAll(".cls-3").raise()
            ob.marker.attr("id", "marker")
            .attr("stroke","#ef4056")
            .attr("stroke-width",3)
            .attr("r",startRad)
            .attr("fill-opacity",0)
            .attr("cx",d=> {
                return d[0]
            })
            .attr("cy",d=> {
                return d[1]
            })
            .transition()
            .duration(ob.duration)
            .ease(d3.easeLinear)
            .attr("r",endRad)
        ob.round+=1

    }
    ob.start = () => {
        console.log("starting again")
        ob.svg = d3.select("svg")
        ob.svg.selectAll("circle").data(d3_data, function (d) {
            return (d && d.name) || d3.select(this).attr("data-name")
        })
        ob.restart()
    }
    return ob
}
let selectScene = (student) => {
    //change which has the active thing on it 
    document.querySelector(`li#${student}`).className = "active"
    d3_data.map(d=> {
        // undo prev state
        if (d.state) {
            d.state = false
        }
    })
    d3.selectAll("circle").each(function (d, i) {

        // update state
        if (student == d.name) {
            d.state = true
        }
        if (d.state) {
            // update animation data
            animation_data = [[d3.select(this).attr("cx"),d3.select(this).attr("cy")]]
        }

    })
}
//close video functions
let videoHide = () => {
    // make video go back to 0 and stop then hide
    let vid = document.querySelector("audio")
    vid.pause()
    vid.currentTime = 0
    document.querySelector("#video_elements").style.visibility = "hidden"
}
let mediaShow = () => {
    document.querySelector("#video_elements").style.visibility = "visible"
    let audio = document.querySelector("#video_elements audio")
    audio.play()
}

// floor change functions
let mapSvg
let sceneInfo
let floorSelection = async (floor) => {
    // options here
    let floorFile = "tri_map.svg"
    await d3.xml(`resources/${floorFile}`).then(data => {
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
            let name = cir.attr("data-name")
            cir.attr("fill","black")
            cir.attr("class","visited")
            // load correct scene and make new tab of the scene
            let a = document.createElement("a")
            a.setAttribute("target", "_blank")
            a.href = `resources/${name}_final/scene.html`
            a.click()
            // see if it was the highlighted
            // if so move up by one or else don't change
            if (d.state) {
                d.state = false
                let next = d3_data.map(e=> e.name).indexOf(d.name)+1
                if (d3_data[next] == undefined) {
                    // completed tour
                    //remove animation
                    tourContinue = false
                }
                d3_data[next].state = true
                // mark sidebar as complete
                document.querySelector(`li#${d.name}`).className = "active"

            }




        })
    })
}


window.onload = async () => {
    // check for cookie
    if (document.cookie.match(/watched_video=true/)) {
        console.log(document.cookie)
        // prevent video from showing
    } else {
        console.log("didn't have cookie")
        let expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 1)
        document.cookie = `watched_video=true;expires=${new Date(expiryDate.getTime())}`
        mediaShow()
    }
    sceneInfo = await fetch("./resources/sceneinfo.yml").then(res => res.text()).then(t => {
        //convert into a json object with the jsyaml library
        return jsyaml.safeLoad(t)
    })
    await floorSelection("first")
    let vb = visualBinding()
    vb.start()
}