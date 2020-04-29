let activeInd = 0
let d3_data = [{ name: "Brittany_Uhlorn", state: true }, { name: "Anthony_Aguilar", state: true }, { name: "Logan_Beers", state: true }, { name: "Ryan_Hunt", state: true }]
let animation_data = [
    {name:"Brittany_Uhlorn"},{name:"Anthony_Aguilar"},{name:"Logan_Beers"},{name:"Ryan_Hunt"}
]
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
        setTimeout(ob.restart, ob.duration)
        console.log("starting over")
        let startRad, endRad
        if (ob.round % 2 == 0) {
            startRad = 11
            endRad = 30
        } else {
            endRad = 11
            startRad = 30
        }
        // must assign all animation data first
        if (ob.round == 0) {
            ob.marker = ob.svg.selectAll("#marker").data(animation_data,function(d){
                return d.name
            }).enter().append("circle")
        } else {
            ob.svg.select("#marker").data(animation_data)
        }
        ob.svg.selectAll(".cls-3").raise()
        ob.marker.attr("id", "marker")
            .attr("stroke", "#ef4056")
            .attr("stroke-width", 3)
            .attr("r", d=> {
                if(!d.state) {
                    return 0
                } else {
                    return startRad
                }
            })
            .attr("fill-opacity", 0)
            .attr("cx", d => {
                return d.data[0]
            })
            .attr("cy", d => {
                return d.data[1]
            })
            .transition()
            .duration(ob.duration)
            .ease(d3.easeLinear)
            .attr("r",d=> {
                if (!d.state) {
                    return 0
                } else {
                    return endRad
                }
            })
        ob.round += 1


    }
    ob.start = () => {
        console.log("starting again")
        ob.svg = d3.select("svg")
        ob.svg.selectAll("circle").data(d3_data, function (d) {
            return (d && d.name) || d3.select(this).attr("data-name")
        })
        // create animation data ob
        ob.svg.selectAll("circle").each(function(d){
            let cir = d3.select(this)
            for(let i = 0; i < animation_data.length;i++) {
                let anim_d = animation_data[i]
                if (cir.attr("data-name") == anim_d.name) {
                    // update the anim with the cx of the 
                    anim_d.data= [cir.attr("cx"),cir.attr("cy")]
                    anim_d.state = true
                }
            }
        })

        ob.restart()
    }
    return ob
}
let selectScene = (student) => {
    //change which has the active thing on it 
    document.querySelector(`li#${student}`).className = "active"
    // if student is the active one move the active over one
    d3.selectAll("circle").each(function (d, i) {
        // update state
        if (student == d.name) {
            d.state = false
            // trigger the click
            d3.select(this).dispatch("click")
            // update which is targeted
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
    audio.play().catch(error => {
        alert("please enable autoplay of audio, click the play icon to left of internet address bar, https://support.mozilla.org/en-US/kb/block-autoplay, on mobile go to settings, advanced, media allow autoplay.")
    })

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
            // load correct scene and make new tab of the scene
            let win = window.open(`resources/${name}_final/scene.html`,"_blank")
            win.focus()

            //let a = document.createElement("a")
            //a.setAttribute("target", "_blank")
            //a.href = `resources/${name}_final/scene.html`
            //a.click()
            // see if it was the highlighted
            // if so move up by one or else don't change
            // if none of the dots have been missed end the animation block
                tourContinue =false
                animation_data = animation_data.map(anim_d=> {
                    if (d.name == anim_d.name ) {
                        anim_d.state = false
                    }
                    if (anim_d.state) {
                        tourContinue =true
                    }
                    return anim_d
                })
                // mark sidebar as complete
                document.querySelector(`li#${d.name}`).className = "active"




        })
    })
}


window.onload = async () => {
    mediaShow()
    sceneInfo = await fetch("./resources/sceneinfo.yml").then(res => res.text()).then(t => {
        //convert into a json object with the jsyaml library
        return jsyaml.safeLoad(t)
    })
    await floorSelection("first")
    let vb = visualBinding()
    vb.start()
}