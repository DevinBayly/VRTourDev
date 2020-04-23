let activeInd = 0
let d3_data = [{ name: "Brittany_Uhlorn", state: true },{ name: "Anthony_Aguilar", state: false }, { name: "Logan_Beers", state: false },  { name: "Ryan_Hunt", state: false }]
let visualBinding = () => {
    let ob = {}
    ob.round = 0
    ob.duration = 2000
    ob.restart = ()=> {
        let startCol,endCol
        console.log("ob.round ",ob.round,)
        if (Math.floor(ob.round/4)%2 == 0) {
            startCol = "white"
            endCol="green"
        } else {
            startCol = "green"
            endCol="white"
        }
        console.log("ob.round ",ob.round,startCol,endCol)
        console.log("starting over")
        d3.selectAll("circle").attr("class", d => {
            if (d.state) {
                return ""
            } else {

                return "cls-3"
            }
        }).attr("fill", d => {
            if (d.state) {
                return d3.color(startCol)
            }
        }).transition()
            .duration(ob.duration)
            .attr("fill", d => {
                if (d.state) {
                    return d3.color(endCol)
                }
            }).on("end",ob.restart)
            ob.round +=1

    }
    ob.start = () => {
        console.log("starting again")
        let svg = d3.select("svg")
        svg.selectAll("circle").data(d3_data, function (d) {
            return (d && d.name) || d3.select(this).attr("data-name")
        }).attr("class", d => {
            if (d.state) {
                return ""
            } else {

                return "cls-3"
            }
        }).attr("fill", d => {
            if (d.state) {
                return d3.color("green")
            }
        }).transition()
            .duration(ob.duration)
            .ease(d3.easeLinear)
            .attr("fill", d => {
                if (d.state) {
                    return d3.color("white")
                }
            }).on("end",ob.restart)

    }
    return ob
}
let selectScene =(student)=> {
   d3.selectAll("circle").each(function(d,i) {
       let cir = d3.select(this)
       if (cir.attr("data-name") == student ) {
           cir.dispatch("click")
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
let videoShow = () => {
    document.querySelector("#video_elements").style.visibility = "visible"
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
            let a = document.createElement("a")
            a.setAttribute("target", "_blank")
            a.href = `resources/${name}_final/scene.html`
            for (let i=0;i< d3_data.length;i++) {
                let d = d3_data[i]
                if (i == activeInd) {
                    d.state = false
                }
                if (i== activeInd+1) {
                    d.state = true
                }
            }
            // update the active selected student researcher
            // color for already having visited
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
        let expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 1)
        document.cookie = `watched_video=true;expires=${new Date(expiryDate.getTime())}`
    }
    sceneInfo = await fetch("./resources/sceneinfo.yml").then(res => res.text()).then(t => {
        //convert into a json object with the jsyaml library
        return jsyaml.safeLoad(t)
    })
    await floorSelection("first")
    let vb = visualBinding()
    vb.start()
}