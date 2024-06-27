import React from 'react';

const FeaturetteComponent = ({ heading, text, imgSrc, reverse, bgColor }) => {
  return (
    <div className={`row featurette ${reverse ? 'order-md-2' : ''}`} style={{ backgroundColor: bgColor || 'white' }}>
      <div className={`col-md-7 ${reverse ? '' : 'text-right'}`}>
        <h2 className="featurette-heading">{heading}</h2>
        <p className="lead">{text}</p>
      </div>
      <div className="col-md-5">
        <img src={imgSrc} className="featurette-image img-fluid mx-auto" alt="feature" />
      </div>
    </div>
  );
};

export default FeaturetteComponent;
