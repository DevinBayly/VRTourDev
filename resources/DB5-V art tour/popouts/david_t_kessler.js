
// write a way to change the image if necessary
let imageSrcs = {
  1:"resources/VR Art Tour Assets/David T Kessler/David T Kessler - Cat_s Claw Elegance - Acrylic on Aluminum - 2006 - PC -.png",
  2:"resources/VR Art Tour Assets/David T Kessler/David T Kessler - Undercut Elegance - Acrylic on Aluminum - 2006 - (PC) - 13MB.png"
}
let prev = document.querySelector("#prevpopimg")
let next = document.querySelector("#nextpopimg")
let count = document.querySelector("#imgcount")
let img = document.querySelector("#popoutimg")

next.addEventListener("click",()=> {
  // ensure that we are able to move to the next
  let oldInd = parseInt(count.innerHTML)
  if (Object.keys(imageSrcs).length > oldInd) {
    // change the image src to the next image
    img.src = imageSrcs[oldInd+1]
    img.onload = ()=> {
      console.log("image finished loading")
      count.innerHTML = oldInd+1
    }
  }
})
prev.addEventListener("click",()=> {
  // ensure that we are able to move to the next
  let oldInd = parseInt(count.innerHTML)
  if (1 < oldInd) {
    // change the image src to the next image
    img.src = imageSrcs[oldInd-1]
    img.onload = ()=> {
      console.log("image finished loading")
      count.innerHTML = oldInd-1
    }
  }
})
