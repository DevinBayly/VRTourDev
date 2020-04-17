AFRAME.registerComponent('mlisten', {
  schema: {
    popoutInnerHTML: { type: 'string' }
  },
  init: function () {
    let el = this.el
    let popout_html_file = this.data.popoutInnerHTML
    this.el.addEventListener('mouseenter', function (e) {
      // play with emissivity
      el.setAttribute("material", "color", "#5ef7ff")
      //el.setAttribute("material","emissiveIntensity","1")
    })
    this.el.addEventListener("mouseleave", function () {
      //el.setAttribute("material", "emissiveIntensity",'.2')
      el.setAttribute("material", "color", "white")
    })
    // this is if the html file was what was put in
    //
    this.el.addEventListener("click", function () {
      // load whatever popout is needed for this part
      if (popout_html_file !== "movement") {
        let popoutItem = textPopout()
        popoutItem.create(popout_html_file)
      } else {
        //move icon trannsfer to adjacent scene
        //remove current scene and call new basic scene create
        document.querySelector("a-scene").remove()
        let basicscene = basicScene("art-one")
        basicscene.create()
      }

    })
  }
})