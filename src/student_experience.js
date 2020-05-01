// setup data used for animation and circle tracking for events
let d3_data = [{ name: "Brittany_Uhlorn", state: true }, { name: "Anthony_Aguilar", state: true }, { name: "Logan_Beers", state: true }, { name: "Ryan_Hunt", state: true }]
let animation_data = [
    {name:"Brittany_Uhlorn"},{name:"Anthony_Aguilar"},{name:"Logan_Beers"},{name:"Ryan_Hunt"}
]
// tells us that all the scenes have been vistied in this session so we can stop animating
let tourContinue
// binds the animation data to the visual elements,
let visualBinding = () => {
    let ob = {}
    // helps track the expansion or retraction animation
    ob.round = 0
    // determines the # ms the animation should run between start and end positions
    ob.duration = 2000
    tourContinue = true
    // this function is repeatedly called in a recursive timeout so that the animation continues until tourContinue becomes false
    ob.restart = () => {
        if (!tourContinue) {
            ob.marker.remove()
            return
        }
        // make function happen again in 2 seconds
        setTimeout(ob.restart, ob.duration)
        // these are the blip radii in px, alternate between start being larger for decreasing animation, and vice verse
        let startRad, endRad
        if (ob.round % 2 == 0) {
            startRad = 11
            endRad = 30
        } else {
            endRad = 11
            startRad = 30
        }
        // must assign all animation data first
        // if we haven't animated yet, bind the data 
        if (ob.round == 0) {
            ob.marker = ob.svg.selectAll("#marker").data(animation_data,function(d){
                return d.name
            }).enter().append("circle")
        } else {
            ob.svg.select("#marker").data(animation_data)
        }
        // put circles on top of animations so mouse events can reach them
        ob.svg.selectAll(".cls-3").raise()
        //set the initial state for the transition to move from
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
            // declare the end state for the transition
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
    // initialize the visual binding
    ob.start = () => {

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
// this happens when page first loads, or when user clicks the "replay instructions tab"
let mediaShow = () => {
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
    await floorSelection("first")
    let vb = visualBinding()
    vb.start()
}