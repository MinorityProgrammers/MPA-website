import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import { AiFillCloseCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Avatar from 'avataaars';
import { CirclePicker } from 'react-color';
import CreateProfileForm from './CreateProfileForm';
import CreateProfileInput from './CreateProfileInput';
import {
  topTypeField,
  accessoriesTypeField,
  facialHairTypeField,
  clotheTypeField,
  clotheColorField,
  eyeTypeField,
  eyebrowTypeField,
  mouthTypeField,
  skinColorField,
  hairColorField,
  backgroundColorField,
} from '../../contexts/utils/avatarFields';

const CreateProfileQuestions5 = function ({
  state, setState, step, setStep, handleSubmit, closeProfileSetup,
}) {
  const handleAvatarChange = (name, value) => {
    setState((prevState) => ({ ...prevState, 5: { ...prevState['5'], avatarOptions: { ...prevState['5'].avatarOptions, [name]: value } } }));
  };
  const handleColorChange = (name, value) => {
    const colors = {
      '#a55728': 'Auburn',
      '#2c1b18': 'Black',
      '#b58143': 'Blonde',
      '#d6b370': 'BlondeGolden',
      '#724133': 'Brown',
      '#4a312c': 'BrownDark',
      '#f59797': 'PastelPink',
      '#ecdcbf': 'Platinum',
      '#c93305': 'Red',
      '#e8e1e1': 'SilverGray',
    };
    handleAvatarChange(name, colors[value] || value);
  };
  let avatarRef = null;
  const getSVG = () => {
    const svgNode = ReactDOM.findDOMNode(avatarRef);
    const data = svgNode.outerHTML;
    return data;
  };
  const onDownloadSVG = () => {
    const data = getSVG();
    const svg = new Blob([data], { type: 'image/svg+xml' });
    FileSaver.saveAs(svg, 'avataaars.svg');
  };
  // ref https://stackoverflow.com/a/57154306
  const svgUrlToPng = (svgUrl, callback) => {
    const svgImage = document.createElement('img');
    svgImage.style.opacity = 0;
    svgImage.style.position = 'fixed';
    svgImage.style.top = 0;
    document.body.appendChild(svgImage);
    svgImage.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = svgImage.clientWidth;
      canvas.height = svgImage.clientHeight;
      const canvasCtx = canvas.getContext('2d');
      canvasCtx.drawImage(svgImage, 0, 0);
      const imgData = canvas.toDataURL('image/png');
      callback(imgData);
      // document.body.removeChild(imgPreview);
    };
    svgImage.src = svgUrl;
  };
  const onDownloadPNG = () => {
    const data = getSVG();
    const svg = new Blob([data], { type: 'image/svg+xml' });
    const svgURL = URL.createObjectURL(svg);
    svgUrlToPng(svgURL, (imgData) => {
      FileSaver.saveAs(imgData, 'avataaars.png');
    });
  };

  // handle change for avatar fields
  useEffect(() => {
    const data = getSVG();
    const svg = new Blob([data], { type: 'image/svg+xml' });
    const svgURL = URL.createObjectURL(svg);
    svgUrlToPng(svgURL, (imgData) => {
      setState((prevState) => ({ ...prevState, 5: { ...prevState['5'], profilePicture: imgData } }));
    });
  }, [state['5'].avatarOptions]);

  const [displayWarning, setDisplayWarning] = useState(false);
  const toggleWarning = (on) => {
    if (on) {
      if (!displayWarning) {
        const warning = "<p class='cp-warning'>Fill in Required Slots</p>";
        document.getElementsByClassName('cp-form')[0].insertAdjacentHTML('afterbegin', warning);
        setDisplayWarning(true);
      }
    } else if (displayWarning) {
      document.getElementsByClassName('cp-warning')[0].remove();
      setDisplayWarning(false);
    }
  };
  // go back one step
  const handlePrev = () => {
    setStep(step - 1);
    toggleWarning(false);
  };
  // go forward one step
  const handleNext = () => {
    setStep(step + 1);
    toggleWarning(false);
  };
  const submitData = () => {
    // update userData
    const data = getSVG();
    const svg = new Blob([data], { type: 'image/svg+xml' });
    const svgURL = URL.createObjectURL(svg);
    setState((prevState) => ({ ...prevState, 5: { ...prevState['5'], profilePicture: state['5'].profilePicture } }));
    handleSubmit();
    handleNext();
  };
  return (
    <div className="cp-body">
      <AiFillCloseCircle className="cp-close" onClick={closeProfileSetup} style={{ cursor: 'pointer' }} />
      <div className="cp-top">
        <h1>Ready to make your avatar?</h1>
        <h2>Let's begin, it's easy</h2>
      </div>
      <CreateProfileForm>
        <div className="cp-formGrid">
          <CreateProfileInput
            name={backgroundColorField.name}
            type={backgroundColorField.type}
            label={backgroundColorField.label}
            options={backgroundColorField.options}
            required={backgroundColorField.required}
            value={state['5'].avatarOptions[backgroundColorField.name]}
            setValue={(value) => handleColorChange(backgroundColorField.name, value)}
          />
          <div className="avatarReplace">
            <Avatar
              style={{
                width: '250px', height: '250px', background: state['5'].avatarOptions.backgroundColor || '#fff', borderRadius: '100%',
              }}
              ref={(ref) => avatarRef = ref}
              {...state['5'].avatarOptions}
            />
          </div>
          <CreateProfileInput
            name={hairColorField.name}
            type={hairColorField.type}
            label={hairColorField.label}
            options={hairColorField.options}
            required={hairColorField.required}
            value={state['5'].avatarOptions[hairColorField.name]}
            setValue={(value) => handleColorChange(hairColorField.name, value)}
          />
          {
                        [topTypeField,
                          accessoriesTypeField,
                          facialHairTypeField,
                          clotheTypeField,
                          clotheColorField,
                          eyeTypeField,
                          eyebrowTypeField,
                          mouthTypeField,
                          skinColorField,
                        ].map((field, key) => (
                          <CreateProfileInput
                            name={field.name}
                            type={field.type}
                            label={field.label}
                            options={field.options}
                            required={field.required}
                            value={state['5'].avatarOptions[field.name]}
                            setValue={(value) => handleAvatarChange(field.name, value)}
                            key={key}
                          />
                        ))
                    }
          <div className="cp-downloadButtonsContainer">
            <button onClick={onDownloadSVG}>Download SVG</button>
            <button onClick={onDownloadPNG}>Download PNG</button>
          </div>
        </div>
      </CreateProfileForm>
      <div className="cp-navButtonsContainer">
        <button className="cp-navButton" onClick={handlePrev}><AiOutlineArrowLeft /></button>
        <button className="cp-navButton" onClick={submitData}>Finish</button>
      </div>
    </div>
  );
};

export default CreateProfileQuestions5;
