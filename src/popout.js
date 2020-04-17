// this is the file containing the types that will be placed on the screen when the user clicks on an info icon
//

let popFac = () => {
  let id = 0
  let basePopOut = () => {
    let ob = {}
    ob.create = () => {
      // make a div
      // name it specifically
      // include a little x icon
      // image
      let holder = document.createElement("div")
      console.log("loading")
      holder.className = "popoutHolder"
      ob.holder = holder
      let img = new Image()
      img.onload = () => {
        // include the on clicks
        img.addEventListener("click", () => {
          console.log("bam!]")
          holder.remove()
          ob.derivableFunction()
        })
      }
      let divxholder = document.createElement("div")
      divxholder.id = "xholder"
      img.src = "./resources/brand_icons/ua-brand-icons/ua-brand-icons-image-files/SVG/x.svg"
      img.id = "exit"
      divxholder.append(img)
      holder.id = "holder" + id
      holder.append(divxholder)
      id += 1
      //document.body.append(holder)
    }
    return ob
  }
  return basePopOut
}

let base = popFac()

let textPopout = () => {
  let ob = {}
  // compose base 
  ob.base = base()
  console.log(ob.base)
  // assume that the text is already formatted html taken from a file describing one of the icons
  ob.create = (htmlFile) => {
    // create the basic 
    ob.base.create()
    let holder = ob.base.holder
    document.body.append(holder)
    let textHolder = document.createElement("div")
    textHolder.id = "textholder"
    // run fetch for the resource and then populate the innerHTML at this point
    fetch(htmlFile).then(res => { return res.text() }).then
      (t => {
        textHolder.innerHTML = t
        // find the script and add it as an executed child
        holder.append(textHolder)
        holder.style.overflow = "scroll"
        holder.style.height = "75%"
        holder.style.left = `${window.innerWidth / 2 - holder.getBoundingClientRect().width / 2}px`
        holder.style.top = `${window.innerHeight / 2 - holder.getBoundingClientRect().height / 2}px`
        // style holder to be fully on page
        holder.style.position = "absolute"
      })
    // fetch the javascript code
    let prefix = htmlFile.split(".")[0]
    // promise based resolution of script
    let popScript = new Promise((res, rej) => {
      const script = document.createElement("script")
      document.body.append(script)
      script.onload = res
      script.onerror = rej
      script.async = true
      script.src = `${prefix}.js`
    })
    popScript.then(() => { console.log("hurray!") }).catch(() => { console.log("problem") })
  }
  return ob
}

let videoPopout = () => {
  let ob = {}
  // create base element
  ob.base = base()
  ob.create = (videofile, width, height, absPosRight = false) => {
    // assign location to the holder div and create a video element, and connect to src
    ob.base.create()

    let holder = ob.base.holder
    let innerHolder = document.createElement("div")
    innerHolder.id = "vidinner"
    holder.append(innerHolder)
    ob.width = width
    ob.height = height
    // load video
    ob.vid = document.createElement("video")
    ob.vid.src = videofile
    ob.vid.autoplay = true
    ob.vid.setAttribute("controls", "")
    ob.vid.addEventListener("canplay", () => {
      ob.vid.style.width = "100%"
      //holder.style.width=ob.width +"px"
      innerHolder.append(ob.vid)
      holder.id = "videoHolder"
      // if absolute positioning enabled, put in the corner of the screen
      //holder.style.position = "absolute"
      ob.backgrounddiv = document.createElement("div")
      ob.backgrounddiv.id="grayout"
      // set the height to the full page, dirty trick...
      ob.backgrounddiv.style.height = `${window.scrollMaxY+ window.innerHeight + 50}px`
      document.body.append(ob.backgrounddiv)
    })
    //document.querySelector("#outer").prepend(holder)
    document.body.append(holder)
    ob.base.derivableFunction = ()=> {
      // remove the style of gray on the html 
      ob.backgrounddiv.remove()
    }

  }
  return ob
}
