from ruamel.yaml import YAML

yml = YAML(typ="safe")

import os
with open("/home/lil/Documents/VRTourDev/resources/sceneinfo.yml","r") as phile:
    config = yml.load(phile.read())

os.chdir("/home/lil/Documents/VRTourDev/resources/")


for key in config:
    sky_src = config[key]["image"]
    with open("../src/sharedTemplateScript.js","r") as phile:
        script = phile.read()
    with open(f'{key}.html',"w")  as ophile:
        with open("./base.html","r") as phile:
            ophile.write(phile.read().format(image=sky_src,script=script))


