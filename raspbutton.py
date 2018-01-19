import RPi.GPIO as GPIO
from PIL import Image
import time
import picamera
import requests

camera=picamera.PiCamera()

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(27,GPIO.IN,GPIO.PUD_UP)
while True:
    if(GPIO.input(27)==1):
        print(1)
    else:
        print(0)
        newImageName=time.time()
        camera.capture(str(newImageName)+'.jpg')
        im=Image.open(str(newImageName)+'.jpg')
        half_width=im.width/2
        half_height=im.height/2
        im4=im.crop((half_width-10,half_height-10,half_width+10,half_height+10))
        im4.save(str(newImageName)+'tuhm.jpg')
        rgb_img=im4.convert('RGB')
        avr=[0,0,0]
        for i in range(20):
            for j in range(20):
                r,g,b=rgb_img.getpixel((i,j))
                avr[0]=avr[0]+r
                avr[1]=avr[1]+g
                avr[2]=avr[2]+b
                
        r=round(avr[0]/400)
        g=round(avr[1]/400)
        b=round(avr[2]/400)
        #print(r,g,b)
	params_={'r':str(r),'g':str(g),'b':str(b)}

        r=requests.get(url='http://202.31.147.197:7680/ColorPicker/color_pick.php',params=params_)
        time.sleep(10)
