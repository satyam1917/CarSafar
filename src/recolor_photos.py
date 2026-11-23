import json, sys, numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0,'.')
cars=json.load(open('colors.json'))   # id -> {"hero": idx, "colors": [[name, hex], ...]}

def rgb2hsv(a):
    a=a/255.0; mx=a.max(2); mn=a.min(2); d=mx-mn+1e-9
    r,g,b=a[...,0],a[...,1],a[...,2]
    h=np.where(mx==r,((g-b)/d)%6,np.where(mx==g,(b-r)/d+2,(r-g)/d+4))*60
    s=np.where(mx>0,(mx-mn)/(mx+1e-9),0); return h,s,mx

from scipy import ndimage
def paint_mask(img, base_hex):
    a=np.asarray(img).astype(float); h,s,v=rgb2hsv(a)
    H,W=v.shape
    # true background = near-white region connected to the image border (white paint inside the outline is kept)
    light=(a.min(2)>=246)
    lab,_=ndimage.label(light)
    edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    bg=np.isin(lab,list(edge))
    yy=np.arange(H)[:,None]*np.ones((1,W))
    br=np.array([int(base_hex[i:i+2],16) for i in (1,3,5)])
    bh,bs,bv=rgb2hsv(br.reshape(1,1,3).astype(float)); bh,bs,bv=bh[0,0],bs[0,0],bv[0,0]
    if bs<0.15:   # white / silver body: bright, low-saturation pixels inside the car's filled outline
        dark=~light
        sil=ndimage.binary_fill_holes(ndimage.binary_closing(np.pad(dark,14), iterations=14))[14:-14,14:-14]
        sil=ndimage.binary_erosion(sil, iterations=2)
        m=(s<0.16)&(v>0.55)&sil
        m=ndimage.binary_closing(m, iterations=3)&sil
        m=ndimage.binary_opening(m, iterations=1)
        m=ndimage.binary_fill_holes(m)&(v>0.45)&sil
        # drop the ground shadow: light-grey pixels in the bottom band of the image
        m&=~((yy>H*0.80)&(v<0.93))
    else:
        dh=np.minimum(abs(h-bh),360-abs(h-bh))
        smin=0.07 if bs<0.35 else 0.18
        m=(dh<(34 if bs<0.35 else 26))&(s>smin)&(v>0.10)&~bg
        m&=~((yy>H*0.86)&(s<0.25))
    # keep the biggest regions only: remove specks with a small open/close via blur threshold
    lab2,n=ndimage.label(m)
    if n:
        sizes=ndimage.sum(m,lab2,range(1,n+1)); keep=np.isin(lab2,1+np.where(sizes>=max(40,sizes.max()*0.01))[0]); m=m&keep
    mi=Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.MedianFilter(7 if bs<0.15 else 5)).filter(ImageFilter.GaussianBlur(1.4))
    return np.asarray(mi).astype(float)/255.0, v

def recolor(img, mask, v, target_hex, light_base=False):
    a=np.asarray(img).astype(float)
    T=np.array([int(target_hex[i:i+2],16) for i in (1,3,5)],float)
    L=v*255; sel=mask>0.5
    if light_base:
        # white/silver photos carry little shading: use soft, compressed shading so the body reads as solid paint
        Lref=np.percentile(L[sel],90) if sel.any() else 250
        f=np.clip(L/Lref,0,1)
        new=T[None,None,:]*(0.38+0.62*f)[...,None]
        out=a*(1-mask[...,None])+new*mask[...,None]
        return Image.fromarray(np.clip(out,0,255).astype(np.uint8))
    Lref=np.percentile(L[sel],60) if sel.any() else 200
    f=L/Lref
    dark=T[None,None,:]*np.clip(f,0,1)[...,None]
    hi=np.clip((f-1)/max(255/Lref-1,1e-3),0,1)[...,None]
    new=np.where((f>1)[...,None], T+(255-T)*hi*0.85, dark)
    out=a*(1-mask[...,None])+new*mask[...,None]
    return Image.fromarray(np.clip(out,0,255).astype(np.uint8))

if __name__=="__main__":
    src, dst = sys.argv[1], sys.argv[2]
    for cid,info in cars.items():
        img=Image.open(f'{src}/{cid}.jpg').convert('RGB')
        base=info['colors'][info['hero']][1]
        mask,v=paint_mask(img, base)
        bh=np.array([int(base[i:i+2],16) for i in (1,3,5)]); light=bh.min()>=235   # only pure-white paint needs solid-paint shading
        for i,(name,hx) in enumerate(info['colors']):
            out=img if i==info['hero'] else recolor(img,mask,v,hx,light)
            out.save(f'{dst}/{cid}-{i}.jpg',quality=86,optimize=True)
        print(cid, 'paint px:', int((mask>0.5).sum()), 'of', mask.size)
