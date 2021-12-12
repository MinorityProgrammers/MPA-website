import React from 'react';

export default function AboutSectionItem({
  headingTitle, description, imgBoxCustomClassNames, imgSrcList = [], onPlayBtnClick,
}) {
  return (
    <div className="heading__container">
      <div className="homepage__about-left">
        <h2 className="heading__title mt-5 mb-5 tw-text-blue-900">
          &lsaquo;
          {headingTitle}
          /&rsaquo;
        </h2>
        <p className="lead tw-text-blue-900">{description}</p>
      </div>
      <div className={`homepage__about-right ${imgBoxCustomClassNames}`}>
        {imgSrcList.map((src) => <img key={src} src={src} className="heading__img" alt="" />)}
        <button name="play" onClick={onPlayBtnClick} />
      </div>
    </div>
  );
}
