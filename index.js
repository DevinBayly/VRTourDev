window.onload = ()=> {
    // try to play the audio and create an alert otherwise
    let audio = document.querySelector("audio")
    audio.play().catch(error => {
        alert("please enable autoplay of audio, click the play icon to left of internet address bar, https://support.mozilla.org/en-US/kb/block-autoplay,")
    })

}