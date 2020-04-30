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
  <a-scene loading-screen="dotsColor: black; backgroundColor: white" cursor="rayOrigin: mouse">
    <a-camera id="clawcam" position="0 0 0"></a-camera>
"""

for f in files:
    with open(f,"r") as phile:
        contents = phile.read()
    contents = contents.replace("<a-scene loading-screen="dotsColor: black; backgroundColor: white" cursor=\"rayOrigin: mouse\">",insertion_section)
    with open(f,"w") as phile:
        phile.write(contents)

    
from io import StringIO
## creating the student yml
students = "Brittany Uhlorn,Anthony Aguilar,Logan Beers,Ryan Hunt".replace(" ","_").split(",")
student_dict = {s:dict(name=s,image="",scene_name="{}.html".format(s),popout_name="{}_popout.html".format(s)) for s in students}
student_dict

for s in students:
  jpgs = [j for j in os.listdir(f"./{s}_final/") if ".JPG" in j and not "360" in j]
  student_dict[s]["images"] = jpgs

yml = YAML()
withyml.dump(student_dict,s)
import os  
[os.makedirs(f"{name}_final") for name in students]

## making base scenes
os.getcwd()
for s in students:
  with open("student_base.html","r") as iphile:
    with open(f"{s}_final/scene.html","w") as ophile:
      ophile.write(iphile.read().format(name=s))
## making popout scenes

for s in students:
  with open("student_popout_base.html","r") as iphile:
    base = iphile.read()
    for i,im in enumerate(student_dict[s]["images"]):
      with open(f"{s}_final/popout_{i}.html","w") as ophile:
        ophile.write(base.format(name=s.replace("_"," "),image=im))




with open("student_base.html","r") as phile:
  contents = phile.read()

import re
noLines = contents.replace("\n","---")
p1 = re.sub("{---\s+?{","xxx",noLines)
p2  =re.sub("}---\s+?}","yyy",p1)
with open("/tmp/test","w") as phile:
  phile.write(p2)
""" {
,.
  content
} {name}""".format(name="it")


## replace all {} with {{}} 

with open("student_base.html","r") as phile:
  contents = phile.read()


p1 = re.sub(r"\{(?!name)","{{",contents)
p2 = re.sub(r"(?<!name)\}","}}",p1)
with open("/tmp/test.html","w") as phile:
  phile.write(p2)


os.getcwd()
import shutil
for s in students:
  shutil.copy("info.png",f"{s}_final/info.png")



##
import re
import random
import string
htmls = [f for f in os.listdir() if "html" in f and "_" in f and not "popout" in f and not "py" in f and not "base" in f and not "codon" in f and not "condon" in f]

for html in htmls:
  print(html)
  with open(html,"r") as phile:
    contents = phile.read()
  cameraLinePre =[l for l in contents.split("\n") if "a-camera" in l][0] 
  skyLinePre =[l for l in contents.split("\n") if "a-sky" in l][0] 
  ## substitute line where the camera is for asset + rig
  ## substitute sky line for asset id
  imagesrc = re.search(r"src=\".*?\"",skyLinePre).group(0)
  assetsBlock = f"""
  <a-assets>
    <img {imagesrc} id="360-image" alt="">
  </a-assets>
  """
  cameraLinePre
  camid = "".join(random.choice(string.ascii_lowercase) for _ in range(5))
  skyid = "".join(random.choice(string.ascii_lowercase) for _ in range(5))
  position = re.search(r"position=\".*?\"",cameraLinePre).group(0)
  rotation = re.search(r"rotation=\".*?\"",cameraLinePre).group(0)
  cameraBlock = f"""
  <a-entity id=\"{camid}\" {position} {rotation}>
    <a-camera look-controls></a-camera>
  </a-entity>

  """
  newSky = re.sub(r"src=\".*?\"","src=\"#360-image\" "+ f"id=\"{skyid}\"",skyLinePre)
  new = []
  for line in contents.split("\n"):
    if line == cameraLinePre:
      new.append(assetsBlock+cameraBlock) 
    elif line == skyLinePre:
      new.append(newSky)
    else:
      new.append(line)
  with open("/tmp/"+html,"w") as ophile:
    ophile.write("\n".join(new))




## add loading line to all scenes
for pth,sub,fls in os.walk("./"):
  if "node_modules" in pth:
    continue
  for f in fls:
    if not "html" in f or "._" in f:
      continue
    print(f)
    with open(pth+"/"+f,"r") as phile:
      contents = phile.read()
      with open(pth+"/"+f,"w") as ophile:
        ophile.write(contents.replace("a-circle animation="property:material.emissive;to:#D2A5A5;dir:alternate;easing:linear;dur:1000;loop:true"","a-circle animation="property:material.emissive;to:#D2A5A5;dir:alternate;easing:linear;dur:1000;loop:true" animation=\"property:material.emissive;to:#D2A5A5;dir:alternate;easing:linear;dur:1000;loop:true\""))




import re
import os
os.chdir("/home/lil/Documents/VRTourDev/")
## add loading line to all scenes
for pth,sub,fls in os.walk("./"):
  if not "final" in pth:
    continue
  for f in fls:
    if "popout" in f:
      print(f)
      with open(pth+"/"+f,"r") as iphile:
        print(re.search("class=.*?popout",iphile.read()))
     ##   contents = iphile.read()
     ##   with open(pth+"/"+f,"w") as ophile:
     ##     ophile.write(re.sub("(<h2>.*?</h2>)","\g<0>\n<img src=\"headshot.jpg\">",contents))



exit_text = """
    <div id="exit" >
        
        <img  style="position:absolute;top:0px;right:0px;" onclick="window.close()" src="../ua-brand-icons/ua-brand-icons-image-files/PNG/x.png" alt="">
        </div>
        """
popout_close_code = """
                    // add image to close it
                    let xPopoutIcon = document.createElement("img")
                    xPopoutIcon.src= "../ua-brand-icons/ua-brand-icons-image-files/PNG/x.png"
                    iframeElement.contentDocument.body.append(xPopoutIcon)
                    xPopoutIcon.style.position="absolute"
                    xPopoutIcon.style.top = "0px"
                    xPopoutIcon.style.right = "0px"
                    xPopoutIcon.addEventListener("click",()=> {
                        document.querySelector("iframe").remove()
                    })
"""
query_string = "\s*if \(btn\) \{"
actual_string = "                if (btn) {

                    // add image to close it
                    let xPopoutIcon = document.createElement("img")
                    xPopoutIcon.src= "../ua-brand-icons/ua-brand-icons-image-files/PNG/x.png"
                    iframeElement.contentDocument.body.append(xPopoutIcon)
                    xPopoutIcon.style.position="absolute"
                    xPopoutIcon.style.top = "0px"
                    xPopoutIcon.style.right = "0px"
                    xPopoutIcon.addEventListener("click",()=> {
                        document.querySelector("iframe").remove()
                    })
"
os.getcwd()
os.chdir("../../")
query_string = "alert\(.*?please enable.*?\)"
actual_string = "
alert(`Please enable browser autoplay to hear audio on this site. Directions: Click the icon in your address bar to the left of the URL. On mobile go to settings > advanced > media > allow autoplay. 
Or manually start the audio within each screen by clicking on the audio element.)"

## add loading line to all scenes
for pth,sub,fls in os.walk("./"):
  if "node_modules" in pth:
    continue
  for f in fls:
    try:
      with open(pth+"/"+f,"r") as iphile:
        contents = iphile.read()
        res = re.search(query_string,contents)
        if res:
          print(f)
          new_contents = re.sub(query_string,"\n"+actual_string,contents)
          print(new_contents)
          with open(pth+"/"+f,"w") as ophile:
            ophile.write(new_contents)
    except Exception as e:
      pass
      #print(f,"x")
      #print(e)
      


import shutil as sh
## renaming area
os.getcwd()
present_name= "art_exhibit.js" 
new_name="src/art_exhibit.js"
## walk the directory and copy the file into new name, and then whenever its found in the contents of another file replace it
for pth,sub,fls in os.walk("./"):
  if "node_modules" in pth:
    continue
  for f in fls:
    if f == present_name:
      ## make a copy
      sh.copy(pth+"/"+f,pth+"/"+new_name)
    else:
      try:
        with open(pth+"/"+f,"r") as iphile:
          contents = iphile.read()
          res = re.search(present_name,contents)
          if res:
            print(f)
            new_contents = re.sub(present_name,new_name,contents)
            with open(pth+"/"+f,"w") as ophile:
              ophile.write(new_contents)
      except Exception as e:
        print(f,"x")
        print(e)
        

