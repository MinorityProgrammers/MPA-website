import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import styles from '../../styles/settings/settingSetup.module.scss';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const DropdownIndicator = () => (
  <img
    style={{ maxWidth: '20px', marginRight: '10px' }}
    src="/assets/images/settings/link-drop-down.svg"
    alt="link"
  />
);

const ProfileFourthStep = ({ data, step, setData }) => {
  const [googleLink, setGoogleLink] = useState(data?.GoogleLink);
  const [figmaLink, setFigmaLink] = useState(data?.FigmaLink);
  const [clickupLink, setClickupLink] = useState(data?.ClickupLink);
  const [facebookLink, setFacebookLink] = useState(data?.FacebookLink);
  const [linkedinLink, setLinkedinLink] = useState(data?.LinkedinLink);
  const [githubLink, setGithubLink] = useState(data?.GithubLink);
  const [dribbleLink, setDribbleLink] = useState(data?.DribbleLink);
  // website
  const [link, setLink] = useState('');
  // new Link
  const [newLink, setNewLink] = useState('');

  const [addActive, setAddActive] = useState(false);
  const [edit, setEdit] = useState({
    googleLink: true,
    figmaLink: true,
    clickupLink: true,
    facebookLink: true,
    linkedinLink: true,
    githubLink: true,
    dribbleLink: true,
  });
  const [show, setShow] = useState(true);
  const [missingLinks, setMissingLinks] = useState([
    { label: facebookLink ? '' : 'Facebook', value: 'facebook' },
    { label: figmaLink ? '' : 'Figma', value: 'figma' },
    { label: clickupLink ? '' : 'Click up', value: 'clickup' },
    { label: linkedinLink ? '' : 'LinkedIn', value: 'linkedin' },
    { label: githubLink ? '' : 'Github', value: 'github' },
    { label: dribbleLink ? '' : 'Dribble', value: 'dribble' },
    { label: googleLink ? '' : 'Google', value: 'google' },
  ]);

  // const [update, setUpdate] = useState(false);

  // update userData
  const { profileDispatch } = useContext(GlobalContext);
  const router = useRouter();
  // Discard Changes
  const discard = () => {
    setGoogleLink(data?.GoogleLink);
    setFigmaLink(data?.FigmaLink);
    setClickupLink(data?.ClickupLink);
    setFacebookLink(data?.FacebookLink);
    setLinkedinLink(data?.LinkedinLink);
    setGithubLink(data?.GithubLink);
    setDribbleLink(data?.DribbleLink);
  };
  //   Handlers
  // Update Profile
  const submitHandler = async (e) => {
    e.preventDefault();
    const inputStates = {
      ...(googleLink && { GoogleLink: googleLink }),
      ...(facebookLink && { FacebookLink: facebookLink }),
      ...(githubLink && { GithubLink: githubLink }),
      ...(dribbleLink && { DribbleLink: dribbleLink }),
      ...(figmaLink && { FigmaLink: figmaLink }),
      ...(clickupLink && { ClickupLink: clickupLink }),
      ...(linkedinLink && { LinkedinLink: linkedinLink }),
    };
    // submit data
    const updatedUser = updateProfileJSON(
      data._id,
      JSON.stringify(inputStates),
    )(profileDispatch);
    updatedUser.then((res) => setData(res));
    const slug = data?.userName;
    if (slug) {
      router.push(`/user/${slug}`);
    }
  };
  //   Add new Link
  const addHandler = () => {
    switch (link.value) {
      case 'google':
        setGoogleLink(newLink);
        break;
      case 'facebook':
        setFacebookLink(newLink);
        break;
      case 'linkedin':
        setLinkedinLink(newLink);
        break;
      case 'github':
        setGithubLink(newLink);
        break;
      case 'figma':
        setFigmaLink(newLink);
        break;
      case 'dribble':
        setDribbleLink(newLink);
        break;
      case 'clickup':
        setClickupLink(newLink);
        break;
      default:
        break;
    }
    const updatedLinks = missingLinks.filter(
      (item) => item.value !== link.value,
    );
    setMissingLinks(updatedLinks);
    if (
      facebookLink
      && linkedinLink
      && dribbleLink
      && figmaLink
      && clickupLink
      && githubLink
      && googleLink
    ) {
      setShow(false);
    }
    setLink('');
    setNewLink('');
  };
  // //  Add link Dropdown options
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      color: 'white',
      border: state.isSelected
        ? '2px solid #6938EF'
        : state.isFocused
          ? '2px solid #6938EF'
          : '2px solid transparent',
      background: ' var(--div-background-color);',
      borderRadius: '8px',
      padding: 20,
      width: '100%',
      cursor: 'pointer',
      ':active': {
        ...styles[':active'],
        background: ' var(--div-background-color);',
      },
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      // width: ,
      display: 'flex',
      height: '100%',
    }),
    menu: (provided) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      background: ' var(--div-background-color);',
      padding: 5,
      border: '1px solid #6938EF',
    }),
    container: (provided) => ({
      ...provided,
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    singleValue: (provided) => {
      const opacity = 1;
      const color = '#fff';
      const transition = 'opacity 300ms';

      return {
        ...provided,
        opacity,
        transition,
        color,
      };
    },
  };
  //   update the data upon submitting
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')).user;
    setData(userInfo);
  }, [step]);

  return (
    <>
      <div className={styles.title}>
        <h2>Social Links</h2>
      </div>
      {googleLink && (
        <div className={`row ${styles.socialRow}`}>
          <div className={`col ${styles.socialCol}`}>
            <div>
              {' '}
              <i className="fab fa-google" />
            </div>
            <input
              type="text"
              value={googleLink}
              onChange={(e) => setGoogleLink(e.target.value)}
              disabled={edit.googleLink}
            />
            {edit.googleLink && (
              <img
                src="/assets/images/settings/edit.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: false,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
            {!edit.googleLink && (
              <img
                src="/assets/images/settings/white-check.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
          </div>
        </div>
      )}
      {(facebookLink || facebookLink === '') && (
        <div className={`row ${styles.socialRow}`}>
          <div className={`col ${styles.socialCol}`}>
            <div>
              {' '}
              <i className="fab fa-facebook-f" />
            </div>
            <input
              type="text"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              disabled={edit.facebookLink}
            />
            {edit.facebookLink && (
              <img
                src="/assets/images/settings/edit.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: false,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
            {!edit.facebookLink && (
              <img
                src="/assets/images/settings/white-check.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
          </div>
        </div>
      )}
      {(linkedinLink || linkedinLink === '') && (
        <div className={`row ${styles.socialRow}`}>
          <div className={`col ${styles.socialCol}`}>
            <div>
              <i className="fab fa-linkedin-in" />
            </div>
            <input
              type="text"
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
              disabled={edit.linkedinLink}
            />
            {edit.linkedinLink && (
              <img
                src="/assets/images/settings/edit.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: false,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
            {!edit.linkedinLink && (
              <img
                src="/assets/images/settings/white-check.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
          </div>
        </div>
      )}
      {(githubLink || githubLink === '') && (
        <div className={`row ${styles.socialRow}`}>
          <div className={`col ${styles.socialCol}`}>
            <div>
              <i className="fab fa-github-alt" />
            </div>
            <input
              type="text"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              disabled={edit.githubLink}
            />
            {edit.githubLink && (
              <img
                src="/assets/images/settings/edit.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: false,
                  dribbleLink: true,
                })}
              />
            )}
            {!edit.githubLink && (
              <img
                src="/assets/images/settings/white-check.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
          </div>
        </div>
      )}
      {(figmaLink || figmaLink === '') && (
        <div className={`row ${styles.socialRow}`}>
          <div className={`col ${styles.socialCol}`}>
            <div>
              <i className="fab fa-figma" />
            </div>
            <input
              type="text"
              value={figmaLink}
              onChange={(e) => setFigmaLink(e.target.value)}
              disabled={edit.figmaLink}
            />
            {edit.figmaLink && (
              <img
                src="/assets/images/settings/edit.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: false,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
            {!edit.figmaLink && (
              <img
                src="/assets/images/settings/white-check.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
          </div>
        </div>
      )}
      {(dribbleLink || dribbleLink === '') && (
        <div className={`row ${styles.socialRow}`}>
          <div className={`col ${styles.socialCol}`}>
            <div>
              <i className="fas fa-basketball-ball" />
            </div>
            <input
              type="text"
              value={dribbleLink}
              onChange={(e) => setDribbleLink(e.target.value)}
              disabled={edit.dribbleLink}
            />
            {edit.dribbleLink && (
              <img
                src="/assets/images/settings/edit.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: false,
                })}
              />
            )}
            {!edit.dribbleLink && (
              <img
                src="/assets/images/settings/white-check.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
          </div>
        </div>
      )}
      {(clickupLink || clickupLink === '') && (
        <div className={`row ${styles.socialRow}`}>
          <div className={`col ${styles.socialCol}`}>
            <div>
              <img
                src="/assets/images/settings/clickup-icon.svg"
                style={{ maxHeight: '22px' }}
                alt="clickup-icon"
              />
            </div>
            <input
              type="text"
              value={clickupLink}
              onChange={(e) => setClickupLink(e.target.value)}
              disabled={edit.clickupLink}
            />
            {edit.clickupLink && (
              <img
                src="/assets/images/settings/edit.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: false,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
            {!edit.clickupLink && (
              <img
                src="/assets/images/settings/white-check.svg"
                alt="edit"
                onClick={() => setEdit({
                  googleLink: true,
                  figmaLink: true,
                  clickupLink: true,
                  facebookLink: true,
                  linkedinLink: true,
                  githubLink: true,
                  dribbleLink: true,
                })}
              />
            )}
          </div>
        </div>
      )}
      {show && (
        <div className={`row ${styles.socialRow}`}>
          <div
            className={`col ${styles.socialCol} ${
              addActive && styles.socailAdd
            } add-socail-links`}
          >
            <div className="tw-flex">
              <div
                className={`${styles.addLinkBtn} ${
                  addActive && styles.socailAddBtn
                }`}
              >
                <img
                  src="/assets/images/settings/plus.svg"
                  alt="clickup-icon"
                  onClick={() => setAddActive(!addActive)}
                />
              </div>
            </div>
            <input
              type="button"
              style={{ cursor: 'default' }}
              value="Add a Social Links"
            />
          </div>
        </div>
      )}
      {addActive && (
        <>
          <div className={`row ${styles.socialAddLink}`}>
            <div className={`col-7 ${styles.socialCol}`}>
              <input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Username/Link"
              />
            </div>
            <div className="col-1" />
            <div
              style={{ padding: '0' }}
              className={`col-4 ${styles.socialCol}`}
            >
              <Select
                styles={customStyles}
                components={{ DropdownIndicator }}
                menuColor=" var(--div-background-color);"
                isClearable={false}
                isSearchable={false}
                onChange={(newValue) => setLink(newValue)}
                options={missingLinks.filter((item) => item.label !== '')}
                placeholder="Website"
                value={link}
              />
            </div>
          </div>
          <div className={`row ${styles.socialAddLink}`}>
            <div className="col-8" />
            <div
              className={`col-4 ${styles.socialCol} ${styles.submitLinkBtn}`}
            >
              <div
                onClick={addHandler}
                className="tw-w-full tw-flex tw-cursor-pointer tw-justify-evenly"
              >
                <img src="/assets/images/settings/plus.svg" alt="plus" />
                <p>Add a social link</p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={`row ${styles.submitRow}`}>
        <div className="col">
          <a onClick={discard}>Discard Changes</a>
          <input onClick={submitHandler} type="submit" value="Done" />
        </div>
      </div>
    </>
  );
};

export default ProfileFourthStep;
