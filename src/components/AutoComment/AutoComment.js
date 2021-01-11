import React from 'react';
import FranceImage from './france.jpg';
import AvatarImage from './doge.png';
import './AutoComment.css';

const mystyle = {
    width: 300,
    height: 300,
  };

function AvatarOverBackground(){
    return(
        <div class="imagebase">
            <div class="imagestack">
                <img src={FranceImage} style={mystyle}/>
            </div>
            <div class="offsetimagestack">
                <img src={AvatarImage} style={mystyle}/>  
            </div>
        </div>
    );
}

function CommentBlock(){
    return(
        <div class="containingblock">
            <AvatarOverBackground/>
        </div>
    );   
}

function BlockOfComments(){
    return(
        <div class="supercontainingblock">
            <CommentBlock/>
            <CommentBlock/>
            <CommentBlock/>
        </div>
    );
}

export default BlockOfComments;