import React from "react";
import styled from "styled-components";

const Post=(props)=>{

    const {image_url, product_name,wish_trade_item,location,limit_time} = props;
    return(
        <React.Fragment>
            <Box>
                <ImgBox src= {image_url}/>
                <div>{product_name}</div>
                <div>{wish_trade_item}</div>
                <div>{location}</div>
                <div>{limit_time}</div>     
            </Box>
          
        </React.Fragment>
    );
}

Post.defaultProps={
    image_url: "https://mblogthumb-phinf.pstatic.net/MjAxNzA5MTFfOTUg/MDAxNTA1MDkwOTQ4Nzkx.d6WmUQbJNVn_AgreyvKeQVnSTLnlzHFJsi4lWdgsTr0g.2BA8M9s7-eZEwkJZ5SJ6uVYD4g3kCAXUuQYOZtw1Uusg.PNG.nong-up/image.png?type=w800",
    product_name: "고구마 3개",
    wish_trade_item:"감자 3개",
    location:"신림동",
    limit_time: "2021-04-29 10:00:00",

};

const Box=styled.div`
height:250px;
width:200px;
background:#eee;
`;

const ImgBox=styled.image`
height:100px;
width:100px;
background:pinkl
`;


export default Post;