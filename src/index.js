window.onload = ()=> {
    // try to play the audio and create an alert otherwise
    let audio = document.querySelector("audio")
    audio.play().catch(error => {
        
alert(`please enable autoplay of audio,
 click the play icon to left of internet address bar,
 on mobile go to settings, advanced, media allow autoplay. 
 Or you may manually click the on the audio element in the page`)
    })

}