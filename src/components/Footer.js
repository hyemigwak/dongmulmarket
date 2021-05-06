import React from 'react';
import styled from "styled-components";

const Footer = () => {
    return (
        <React.Fragment>
            <FootC>
                나는 Footer!
            </FootC>
        </React.Fragment>
    )
}

const FootC=styled.div`
width: 600px;
height: 180px;
margin: 50px 0 0;
padding: 30px 72px 55px;
background:#f5f5f5;

`;
export default Footer;
