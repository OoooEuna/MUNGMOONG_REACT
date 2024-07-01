import React from 'react';

// 이미지와 동영상
const FeaturetteComponent = ({ heading, text, mediaSrc, imgSrc, reverse, bgColor }) => {
  const isVideo = mediaSrc && mediaSrc.endsWith('.mp4');

  return (
    <div className={`row featurette ${reverse ? 'flex-row-reverse' : ''}`} style={{ backgroundColor: bgColor || 'white' }}>
      <div className={`col-md-7 ${reverse ? 'text-md-left' : 'text-md-end'}`}>
        <h2 className="featurette-heading">{heading}</h2>
        <p className="lead">{text}</p>
      </div>
      <div className={`col-md-5 ${reverse ? 'text-md-end' : 'text-md-left'}`}>
        {imgSrc && (
          <img src={imgSrc} className="featurette-image img-fluid mx-auto" alt="feature" />
        )}
        {isVideo && (
          <video controls className="featurette-video img-fluid mx-auto" style={{ maxWidth: '50%', height: 'auto' }}>
            <source src={mediaSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default FeaturetteComponent;
