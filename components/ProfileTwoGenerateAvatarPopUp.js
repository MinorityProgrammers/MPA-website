import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import FileSaver from "file-saver";
import CreateProfileForm from "./CreateProfile/CreateProfileForm";
import CreateProfileInput from "./CreateProfile/CreateProfileInput";
import {
  AiFillCloseCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
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
} from "../contexts/utils/avatarFields";
import Avatar from "avataaars";
import { CirclePicker } from "react-color";
import { GlobalContext } from "../contexts/provider";
import { updateProfile } from "../contexts/actions/profile/updateProfile";
import { all } from "../contexts/utils/profileInputFields1";
import { useRouter } from "next/router";

const ProfileTwoGenerateAvatarPopUp = ({
  loggedInUserData,
  userID,
  setGenerateAvatarPopUp,
}) => {
  const router = useRouter();

  const settingsSubPage = router.pathname.substring(
    router.pathname.lastIndexOf("/") + 1
  );
  
  const [state, setState] = useState({
    avatarOptions: {
      topType: JSON.parse(loggedInUserData.avatarOptions[0]).topType,
      accessoriesType: JSON.parse(loggedInUserData.avatarOptions[0]).accessoriesType,
      facialHairType: JSON.parse(loggedInUserData.avatarOptions[0]).facialHairType,
      clotheType: JSON.parse(loggedInUserData.avatarOptions[0]).clotheType,
      clotheColor: JSON.parse(loggedInUserData.avatarOptions[0]).clotheColor,
      eyeType: JSON.parse(loggedInUserData.avatarOptions[0]).eyeType,
      eyebrowType: JSON.parse(loggedInUserData.avatarOptions[0]).eyebrowType,
      mouthType: JSON.parse(loggedInUserData.avatarOptions[0]).mouthType,
      skinColor: JSON.parse(loggedInUserData.avatarOptions[0]).skinColor,
      hairColor: JSON.parse(loggedInUserData.avatarOptions[0]).hairColor,
      backgroundColor: JSON.parse(loggedInUserData.avatarOptions[0]).backgroundColor,
    },
    profilePicture: loggedInUserData.profilePicture,
  });

  const handleAvatarChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      avatarOptions: { ...prevState.avatarOptions, [name]: value },
    }));
  };
  const handleColorChange = (name, value) => {
    const colors = {
      "#a55728": "Auburn",
      "#2c1b18": "Black",
      "#b58143": "Blonde",
      "#d6b370": "BlondeGolden",
      "#724133": "Brown",
      "#4a312c": "BrownDark",
      "#f59797": "PastelPink",
      "#ecdcbf": "Platinum",
      "#c93305": "Red",
      "#e8e1e1": "SilverGray",
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
    const svg = new Blob([data], { type: "image/svg+xml" });
    FileSaver.saveAs(svg, "avataaars.svg");
  };
  //ref https://stackoverflow.com/a/57154306
  const svgUrlToPng = (svgUrl, callback) => {
    const svgImage = document.createElement("img");
    svgImage.style.opacity = 0;
    svgImage.style.position = "fixed";
    svgImage.style.top = 0;
    document.body.appendChild(svgImage);
    svgImage.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = svgImage.clientWidth;
      canvas.height = svgImage.clientHeight;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.drawImage(svgImage, 0, 0);
      const imgData = canvas.toDataURL("image/png");
      callback(imgData);
      // document.body.removeChild(imgPreview);
    };
    svgImage.src = svgUrl;
  };
  const onDownloadPNG = () => {
    const data = getSVG();
    const svg = new Blob([data], { type: "image/svg+xml" });
    const svgURL = URL.createObjectURL(svg);
    svgUrlToPng(svgURL, (imgData) => {
      FileSaver.saveAs(imgData, "avataaars.png");
    });
  };

  // handle change for avatar fields
  useEffect(() => {
    const data = getSVG();
    const svg = new Blob([data], { type: "image/svg+xml" });
    const svgURL = URL.createObjectURL(svg);
    svgUrlToPng(svgURL, (imgData) => {
      setState((prevState) => ({
        ...prevState,
        profilePicture: imgData,
      }));
    });
  }, [state.avatarOptions]);

  // update userData
  const {
    profileDispatch,
    profileState: {
      profile: { profileLoading, profileError, profileData, profileIsUpdated },
    },
  } = useContext(GlobalContext);

  // console.log(state)
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("avatarOptions", JSON.stringify(state.avatarOptions));
    formData.append("profilePicture", state.profilePicture);
    // submit all data
    updateProfile(userID, formData)(profileDispatch);
  };

  const submitData = () => {
    //update userData
    const data = getSVG();
    const svg = new Blob([data], { type: "image/svg+xml" });
    const svgURL = URL.createObjectURL(svg);
    setState((prevState) => ({
      ...prevState,
      profilePicture: state.profilePicture,
    }));
    handleSubmit();
    setGenerateAvatarPopUp(false);
    // console.log(settingsSubPage, "submit and redirect");
    router.push(`/user/${loggedInUserData.userName}`);
    settingsSubPage === "[username]" && router.reload();
  };

  // console.log(JSON.parse(loggedInUserData.avatarOptions[0]))
  // console.log({loggedInUserData})
  // console.log({state})
  return (
    <div className="cp-body">
      <AiFillCloseCircle
        className="cp-close"
        onClick={() => setGenerateAvatarPopUp(false)}
        style={{ cursor: "pointer" }}
      />
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
              value={state.avatarOptions[backgroundColorField.name]}
              setValue={(value) => handleColorChange(backgroundColorField.name, value)}
              />
          <div className="avatarReplace">
            <Avatar
              style={{
                width: "250px",
                height: "250px",
                background: state.avatarOptions.backgroundColor || "#fff",
                borderRadius: "100%",
              }}
              ref={(ref) => (avatarRef = ref)}
              {...state.avatarOptions}
            />
          </div>
            <CreateProfileInput
              name={hairColorField.name}
              type={hairColorField.type}
              label={hairColorField.label}
              options={hairColorField.options}
              required={hairColorField.required}
              value={state.avatarOptions[hairColorField.name]}
              setValue={(value) => handleColorChange(hairColorField.name, value)}
            />
          {[
            topTypeField,
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
              value={state.avatarOptions[field.name]}
              setValue={(value) => handleAvatarChange(field.name, value)}
              key={key}
            />
          ))}
        </div>
        <div className="cp-downloadButtonsContainer">
          <button onClick={onDownloadSVG}>Download SVG</button>
          <button onClick={onDownloadPNG}>Download PNG</button>
        </div>
      </CreateProfileForm>
      <div className="cp-navButtonsContainer">
        <button className="cp-navButton" onClick={submitData}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default ProfileTwoGenerateAvatarPopUp;
