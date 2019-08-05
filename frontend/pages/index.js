import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Figure = styled.figure `
    margin: 0;
    overflow: hidden;
    background-color: #484646;
    width: 100%;
`

const PhotoCaption = styled.div `
    background-color: #9a9595;
    letter-spacing: 1px;
    line-height: 4.4rem;
    height: 4.4rem;
    text-align: center;
    margin-bottom: 12%;
`

const PhotoCaptionPara = styled.p `
    line-height: 1.2;
    display: inline-block;
    vertical-align: middle;
    padding: 0.4rem;
    color: #fff;
`




const Home = props => (
<div>
    <div className="row">
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564660603/v_hanging_hooks_large_katm6q.jpg" /></a>
            </Figure>
            <PhotoCaption>
                <a href="/v_hooks"><PhotoCaptionPara>"V" Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/c_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564660770/c_hanging_hooks_large_nsdvub.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/c_hooks"><PhotoCaptionPara>"C" Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564661351/s_hanging_hooks_large_mug82o.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>"S" Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564661489/cv_hanging_hooks_large_t4yocz.jpg" /></a>
            </Figure>
            <PhotoCaption>
                <a href="/v_hooks"><PhotoCaptionPara>"CV Hooks"</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564661687/twist_hooks_large_cnrrgv.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>90&deg; Twist Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564665485/snap_hooks_large_mg0az6.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>Snap Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564665677/lock_hooks_rtdsbd.jpg" /></a>
            </Figure>
            <PhotoCaption>
                <a href="/v_hooks"><PhotoCaptionPara>HL Lock Bars</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564665824/lock_bars_kw6cze.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>BL Lock Bars</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564666006/spring_hooks_grgu57.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>HSP Spring Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564666140/swivel_gears_e1sct6.jpg" /></a>
            </Figure>
            <PhotoCaption>
                <a href="/v_hooks"><PhotoCaptionPara>Swivel Gears</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564666219/swivel_wheels_s4afam.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>Swivel Wheels</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564666291/square_hanging_hooks_l2wqck.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>Square Hanging Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564666373/claw_hooks_owpn1r.jpg" /></a>
            </Figure>
            <PhotoCaption>
                <a href="/v_hooks"><PhotoCaptionPara>Claw Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564666453/zc_hanging_hooks_fj24kp.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>"ZC" Hanging Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div>
        <div className="col-md-4">
            <Figure>
                <a href="/v_hooks"><img src="https://res.cloudinary.com/duqtxsa5w/image/upload/v1564666533/stainless_steel_hooks_ywhil2.jpg" /></a>
            </Figure>
            <PhotoCaption>
            <a href="/v_hooks"><PhotoCaptionPara>Stainless Steel Hooks</PhotoCaptionPara></a>
            </PhotoCaption>
        </div> 
    </div>
</div>
)

export default Home;