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


