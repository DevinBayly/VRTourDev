window.onload = ()=> {
    // try to play the audio and create an alert otherwise
    let audio = document.querySelector("audio")
    audio.play().catch(error => {
        

alert(`Please enable browser autoplay to hear audio on this site. Directions: Click the icon in your address bar to the left of the URL. On mobile go to settings > advanced > media > allow autoplay. 
Or manually start the audio within each screen by clicking on the audio element.)
    })

}