from ruamel.yaml import YAML

yml = YAML(typ="safe")

import os
with open("/home/lil/Documents/VRTourDev/resources/sceneinfo.yml","r") as phile:
    config = yml.load(phile.read())

os.chdir("/home/lil/Documents/VRTourDev/resources/")


for key in config:
    sky_src = config[key]["image"]
    print(sky_src)
    with open(f'{key}.html',"w")  as ophile:
        print("opening base")
        with open("./base.html","r") as phile:
            ophile.write(phile.read().format(image=sky_src,popout_name=key))
    artist_details = config[key]
    with open(f'{key}_popout.html',"w") as ophile:
        with open("./art_popout_bootstrap.html","r") as phile:
            images = "\n".join(['<img src="{}" alt="">'.format(im) for im in artist_details.get("pop_im",["/resources/logo.png"])]) 
            name = artist_details.get("name","TBA")
            text = artist_details.get("text","lorem")
            ophile.write(phile.read().format(name=name,text=text,images=images))
           


## convert the tifs to pngs
import os
os.chdir("artist_pictures")


for pth,sub,fls in os.walk("./"):
    print(pth,sub,fls)
    for f in fls:
        if "tif" in f:
            name = f.split(".")[0]
            os.system("convert '{0}.tif' '{0}.png'".format(os.path.join(pth,name)))



os.chdir("resources")
os.listdir()

files = [f for f in os.listdir() if "html" in f and not "popout" in f]

insertion_section = """
  <div id="loaderHolder">
  <div class="loader">

  </div>
  </div>
  <style>

#loaderHolder {
  height:100%;
  width:100%;
  display: flex;
  justify-content: center;
  align-items:center;
}
  .loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  </style>
  <a-scene cursor="rayOrigin: mouse">
    <a-camera id="clawcam" position="0 0 0"></a-camera>
"""

for f in files:
    with open(f,"r") as phile:
        contents = phile.read()
    contents = contents.replace("<a-scene cursor=\"rayOrigin: mouse\">",insertion_section)
    with open(f,"w") as phile:
        phile.write(contents)

    