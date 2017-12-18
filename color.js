function SetColors(r,g,b,a) {
	ra=PutInRange(Math.round(r+(255-r)*grade1),0,255);
	ga=PutInRange(Math.round(g+(255-g)*grade1),0,255);
	ba=PutInRange(Math.round(b+(255-b)*grade1),0,255);

	rb=PutInRange(Math.round(r+(255-r)*grade2),0,255);
	gb=PutInRange(Math.round(g+(255-g)*grade2),0,255);
	bb=PutInRange(Math.round(b+(255-b)*grade2),0,255);

	rc=PutInRange(Math.round(r*grade3),0,255);
	gc=PutInRange(Math.round(g*grade3),0,255);
	bc=PutInRange(Math.round(b*grade3),0,255);

	rd=PutInRange(Math.round(r*grade4),0,255);
	gd=PutInRange(Math.round(g*grade4),0,255);
	bd=PutInRange(Math.round(b*grade4),0,255);

	colora="("+ra+","+ga+","+ba+")";
	colorb="("+rb+","+gb+","+bb+")";
	colorc="("+r+","+g+","+b+")";
	colord="("+rc+","+gc+","+bc+")";
	colore="("+rd+","+gd+","+bd+")";

	for (i=0;i<a.length;i+=2) {
		document.getElementById(a[i]+'c'+a[i+1]+'a').style.backgroundColor='rgb'+colora;
		document.getElementById(a[i]+'c'+a[i+1]+'b').style.backgroundColor='rgb'+colorb;
		document.getElementById(a[i]+'c'+a[i+1]+'c').style.backgroundColor='rgb'+colorc;
		document.getElementById(a[i]+'c'+a[i+1]+'d').style.backgroundColor='rgb'+colord;
		document.getElementById(a[i]+'c'+a[i+1]+'e').style.backgroundColor='rgb'+colore;

		document.getElementById(a[i]+'c'+a[i+1]+'a').innerHTML='#'+RGB2Hex(ra,ga,ba)+'<br>'+colora;
		document.getElementById(a[i]+'c'+a[i+1]+'b').innerHTML='#'+RGB2Hex(rb,gb,bb)+'<br>'+colorb;
		document.getElementById(a[i]+'c'+a[i+1]+'c').innerHTML='#'+RGB2Hex(r,g,b)+'<br>'+colorc;
		document.getElementById(a[i]+'c'+a[i+1]+'d').innerHTML='#'+RGB2Hex(rc,gc,bc)+'<br>'+colord;
		document.getElementById(a[i]+'c'+a[i+1]+'e').innerHTML='#'+RGB2Hex(rd,gd,bd)+'<br>'+colore;
	}
}

function HueShift(h,s) {
	h+=s;
	while (h>=360.0) h-=360.0;
	while (h<0.0) h+=360.0;
	return h;
}

function PutInRange(n,l,h) { return (n<l)?l:((n>h)?h:n); }

function SetHex(objid,val,i) {
	var ob;
	var thisval=Dec2Hex(val);
	window['save'+objid]=thisval;
	document.getElementById(objid).value=thisval;
	if (i) {
		ob=document.getElementById('hex');
		ob.value=
			((i==1)?thisval:ob.value.substr(0,2))
			+((i==2)?thisval:ob.value.substr(2,2))
			+((i==3)?thisval:ob.value.substr(4,2));
	}
}

function SetDec(objid,val,i) {
	var ob,j;
	var thisval=Hex2Dec(val);
	window['save'+objid]=thisval+' ';
	document.getElementById(objid).value=thisval;
	if (val.length>2) val=substr(val,0,2);
	else for (j=val.length;j<2;j++) val+='0';
	if (i) {
		ob=document.getElementById('hex');
		ob.value=
			((i==1)?val:ob.value.substr(0,2))
			+((i==2)?val:ob.value.substr(2,2))
			+((i==3)?val:ob.value.substr(4,2));
	}
}

function DoKeyUp(el) {
	var i,initing;
	if (!(initing=(typeof(el)==='undefined'))) {
		thisid=el.id;
		thisval=el.value;
	}
	if (initing||(thisval!=window['save'+thisid])) {
		if (!initing) {
			if (thisid=='ri') SetHex('rih',thisval,1);
			else if (thisid=='gi') SetHex('gih',thisval,2);
			else if (thisid=='bi') SetHex('bih',thisval,3);
			else if (thisid=='rih') SetDec('ri',thisval,1);
			else if (thisid=='gih') SetDec('gi',thisval,2);
			else if (thisid=='bih') SetDec('bi',thisval,3);
			else if (thisid=='hex') {
				for (i=thisval.length;i<6;i++) thisval+='0';
				SetDec('ri',thisval.substr(0,2),0);
				SetDec('gi',thisval.substr(2,2),0);
				SetDec('bi',thisval.substr(4,2),0);
				SetHex('rih',Hex2Dec(thisval.substr(0,2)),0);
				SetHex('gih',Hex2Dec(thisval.substr(2,2)),0);
				SetHex('bih',Hex2Dec(thisval.substr(4,2)),0);
			}
			window['save'+thisid]=thisval;
		}
		if (initing||(saveri.length && savegi.length && savebi.length && saveangle.length &&
			savegrade1.length && savegrade2.length && savegrade3.length && savegrade4.length)
		) {
			running=running?2:1;
			while (running) {
				r=parseInt(saveri);
				g=parseInt(savegi);
				b=parseInt(savebi);
				angle=parseFloat(saveangle);
				grade1=PutInRange(parseFloat(savegrade1),-2.0,1.0);
				grade2=PutInRange(parseFloat(savegrade2),-2.0,1.0);
				grade3=PutInRange(parseFloat(savegrade3),0,2.0);
				grade4=PutInRange(parseFloat(savegrade4),0,2.0);
				if (running==2) { running=1; continue; }

				// core color
				SetColors(r,g,b,Array('m','1','c','1','a','2','s','2','t','1'));
				if (running==2) { running=1; continue; }

				// triadic
				SetColors(g,b,r,Array('t','2'));
				if (running==2) { running=1; continue; }

				SetColors(b,r,g,Array('t','3'));
				if (running==2) { running=1; continue; }

				thisrgb=new Object();
				thisrgb.r=r;
				thisrgb.g=g;
				thisrgb.b=b;

				// complement
				temprgb=thisrgb;
				temphsv=RGB2HSV(temprgb);
				temphsv.hue=HueShift(temphsv.hue,180.0);
				temprgb=HSV2RGB(temphsv);
				SetColors(temprgb.r,temprgb.g,temprgb.b,Array('c','2'));
				if (running==2) { running=1; continue; }

				// analogous
				temprgb=thisrgb;
				temphsv=RGB2HSV(temprgb);
				temphsv.hue=HueShift(temphsv.hue,angle);
				temprgb=HSV2RGB(temphsv);
				SetColors(temprgb.r,temprgb.g,temprgb.b,Array('a','1'));
				if (running==2) { running=1; continue; }

				temprgb=thisrgb;
				temphsv=RGB2HSV(temprgb);
				temphsv.hue=HueShift(temphsv.hue,0.0-angle);
				temprgb=HSV2RGB(temphsv);
				SetColors(temprgb.r,temprgb.g,temprgb.b,Array('a','3'));
				if (running==2) { running=1; continue; }

				// split complementary
				temprgb=thisrgb;
				temphsv=RGB2HSV(temprgb);
				temphsv.hue=HueShift(temphsv.hue,180.0-angle);
				temprgb=HSV2RGB(temphsv);
				SetColors(temprgb.r,temprgb.g,temprgb.b,Array('s','1'));
				if (running==2) { running=1; continue; }

				temprgb=thisrgb;
				temphsv=RGB2HSV(temprgb);
				temphsv.hue=HueShift(temphsv.hue,180.0+angle);
				temprgb=HSV2RGB(temphsv);
				SetColors(temprgb.r,temprgb.g,temprgb.b,Array('s','3'));
				if (running==2) { running=1; continue; }

				running=0;
			}
		}
	}
}

hexdig='0123456789ABCDEF';
function Dec2Hex(d) {
	return hexdig.charAt((d-(d%16))/16)+hexdig.charAt(d%16);
}
function Hex2Dec(h) {
	h=h.toUpperCase();
	d=0;
	for (i=0;i<h.length;i++) {
		d=d*16;
		d+=hexdig.indexOf(h.charAt(i));
	}
	return d;
}

function RGB2Hex(r,g,b) {
	return Dec2Hex(r)+Dec2Hex(g)+Dec2Hex(b);
}

// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function HSV2RGB(hsv) {
	var rgb=new Object();
	if (hsv.saturation==0) {
		rgb.r=rgb.g=rgb.b=Math.round(hsv.value*2.55);
	} else {
		hsv.hue/=60;
		hsv.saturation/=100;
		hsv.value/=100;
		i=Math.floor(hsv.hue);
		f=hsv.hue-i;
		p=hsv.value*(1-hsv.saturation);
		q=hsv.value*(1-hsv.saturation*f);
		t=hsv.value*(1-hsv.saturation*(1-f));
		switch(i) {
		case 0: rgb.r=hsv.value; rgb.g=t; rgb.b=p; break;
		case 1: rgb.r=q; rgb.g=hsv.value; rgb.b=p; break;
		case 2: rgb.r=p; rgb.g=hsv.value; rgb.b=t; break;
		case 3: rgb.r=p; rgb.g=q; rgb.b=hsv.value; break;
		case 4: rgb.r=t; rgb.g=p; rgb.b=hsv.value; break;
		default: rgb.r=hsv.value; rgb.g=p; rgb.b=q;
		}
		rgb.r=Math.round(rgb.r*255);
		rgb.g=Math.round(rgb.g*255);
		rgb.b=Math.round(rgb.b*255);
	}
	return rgb;
}

function min3(a,b,c) { return (a<b)?((a<c)?a:c):((b<c)?b:c); }
function max3(a,b,c) { return (a>b)?((a>c)?a:c):((b>c)?b:c); }

function RGB2HSV(rgb) {
	hsv = new Object();
	max=max3(rgb.r,rgb.g,rgb.b);
	dif=max-min3(rgb.r,rgb.g,rgb.b);
	hsv.saturation=(max==0.0)?0:(100*dif/max);
	if (hsv.saturation==0) hsv.hue=0;
 	else if (rgb.r==max) hsv.hue=60.0*(rgb.g-rgb.b)/dif;
	else if (rgb.g==max) hsv.hue=120.0+60.0*(rgb.b-rgb.r)/dif;
	else if (rgb.b==max) hsv.hue=240.0+60.0*(rgb.r-rgb.g)/dif;
	if (hsv.hue<0.0) hsv.hue+=360.0;
	hsv.value=Math.round(max*100/255);
	hsv.hue=Math.round(hsv.hue);
	hsv.saturation=Math.round(hsv.saturation);
	return hsv;
}

/*
saveri="0";
savegi="0";
savebi="0";
saverih="00";
savegih="00";
savebih="00";
savehex="000000";
saveangle="30.0";
savegrade1="0.8";
savegrade2="0.4";
savegrade3="0.6";
savegrade4="0.3";
*/
running=0;

// function ColorWheelInit() {
// 	saveri=document.getElementById('ri').value;
// 	savegi=document.getElementById('gi').value;
// 	savebi=document.getElementById('bi').value;
// 	saverih=document.getElementById('rih').value;
// 	savegih=document.getElementById('gih').value;
// 	savebih=document.getElementById('bih').value;
// 	savehex=document.getElementById('hex').value;
// 	saveangle=document.getElementById('angle').value;
// 	savegrade1=document.getElementById('grade1').value;
// 	savegrade2=document.getElementById('grade2').value;
// 	savegrade3=document.getElementById('grade3').value;
// 	savegrade4=document.getElementById('grade4').value;
// 	document.getElementById('ri').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('gi').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('bi').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('rih').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('gih').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('bih').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('hex').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('angle').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('grade1').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('grade2').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('grade3').onkeyup=function() { DoKeyUp(this); }
// 	document.getElementById('grade4').onkeyup=function() { DoKeyUp(this); }
// 	DoKeyUp();
// }

window.onload=function() {
  //ColorWheelInit();
}
