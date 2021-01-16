import React from 'react';
import FranceImage from './france.jpg';
import AvatarImage from './doge.png';
import './AutoComment.css';

const mystyle = {
  width: 300,
  height: 300,
};

function AvatarOverBackground() {
  return (
    <div className="imagebase">
      <div className="imagestack">
        <img src={FranceImage} style={mystyle} alt="" />
      </div>
      <div className="offsetimagestack">
        <img src={AvatarImage} style={mystyle} alt="" />
      </div>
    </div>
  );
}

function CommentBlock() {
  return (
    <div className="containingblock">
      <AvatarOverBackground />
    </div>
  );
}

function BlockOfComments() {
  return (
    <div className="supercontainingblock">
      <CommentBlock />
      <CommentBlock />
      <CommentBlock />
    </div>
  );
}

export default BlockOfComments;
