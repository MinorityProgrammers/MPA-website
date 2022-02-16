import React, { useState, useContext, useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import { useRouter } from 'next/router';
import styles from '../../styles/settings/settingSetup.module.scss';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const ProfileFourthStep = ({
  data, step, setData, setStep,
}) => {
  const [googleLink, setGoogleLink] = useState(data.GoogleLink);
  const [figmaLink, setFigmaLink] = useState(data.FigmaLink);
  const [clickupLink, setClickupLink] = useState(data.ClickupLink);
  const [facebookLink, setFacebookLink] = useState(data.FacebookLink);
  const [linkedinLink, setLinkedinLink] = useState(data.LinkedinLink);
  const [githubLink, setGithubLink] = useState(data.GithubLink);
  const [dribbleLink, setDribbleLink] = useState(data.DribbleLink);
  const [link, setLink] = useState('');
  const [AddIcon, setAddIcon] = useState('');
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
  // const [update, setUpdate] = useState(false);

  // update userData
  const { profileDispatch } = useContext(GlobalContext);
  const router = useRouter();
  // Discard Changes
  const discard = () => {
    setGoogleLink(data.GoogleLink);
    setFigmaLink(data.FigmaLink);
    setClickupLink(data.ClickupLink);
    setFacebookLink(data.FacebookLink);
    setLinkedinLink(data.LinkedinLink);
    setGithubLink(data.GithubLink);
    setDribbleLink(data.DribbleLink);
  };
  //   Handlers
  // Update Profile
  const submitHandler = async (e) => {
    e.preventDefault();
    const inputStates = {
      GoogleLink: googleLink,
      FacebookLink: facebookLink,
      GithubLink: githubLink,
      DribbleLink: dribbleLink,
      FigmaLink: figmaLink,
      ClickupLink: clickupLink,
      LinkedinLink: linkedinLink,
    };
      // submit data
    updateProfileJSON(
      data._id,
      JSON.stringify(inputStates),
    )(profileDispatch);
    const slug = data?.userName;
    if (slug) {
      router.push(`/user/${slug}`);
    }
  };
  //   Add new Link
  const addHandler = () => {
    if (AddIcon !== 'clickup') {
      const field = AddIcon.split('-')[1];
      switch (field) {
        case 'google':
          setGoogleLink(link);
          if (facebookLink
            && linkedinLink
            && dribbleLink
            && figmaLink
            && clickupLink
            && githubLink) setShow(false);

          break;
        case 'facebook':
          setFacebookLink(link);
          if (linkedinLink
            && dribbleLink
            && figmaLink
            && clickupLink
            && githubLink
            && googleLink) setShow(false);
          break;
        case 'linkedin':
          setLinkedinLink(link);
          if (facebookLink
            && dribbleLink
            && figmaLink
            && clickupLink
            && githubLink
            && googleLink) setShow(false);
          break;
        case 'github':
          if (facebookLink
            && linkedinLink
            && dribbleLink
            && figmaLink
            && clickupLink
            && googleLink) setShow(false);
          setGithubLink(link);
          break;
        case 'figma':
          setFigmaLink(link);
          if (facebookLink
            && linkedinLink
            && dribbleLink
            && clickupLink
            && githubLink
            && googleLink) setShow(false);
          break;
        case 'basketball':
          setDribbleLink(link);
          if (facebookLink
            && linkedinLink
            && figmaLink
            && clickupLink
            && githubLink
            && googleLink) setShow(false);
          break;
        default:
          break;
      }
    } else {
      setClickupLink(link);
      if (facebookLink
        && linkedinLink
        && dribbleLink
        && figmaLink
        && githubLink
        && googleLink) setShow(false);
    }
    setAddIcon('');
    setLink('');
    if (facebookLink
        && linkedinLink
        && dribbleLink
        && figmaLink
        && clickupLink
        && githubLink
        && googleLink) {
      setShow(false);
    }
  };
  //  Add link Dropdown options
  const menu = (
    <Menu>
      {!googleLink && (
        <Menu.Item key="0" onClick={() => setAddIcon('fab fa-google')}>
          <i className="fab fa-google" />
        </Menu.Item>
      )}
      {!facebookLink && (
      <Menu.Item key="1" onClick={() => setAddIcon('fab fa-facebook-f')}>
        <i className="fab fa-facebook-f" />
      </Menu.Item>
      )}
      {!linkedinLink && (
      <Menu.Item key="3" onClick={() => setAddIcon('fab fa-linkedin-in')}>
        <i className="fab fa-linkedin-in" />
      </Menu.Item>
      )}
      {!githubLink && (
      <Menu.Item key="4" onClick={() => setAddIcon('fab fa-github-alt')}>
        <i className="fab fa-github-alt" />
      </Menu.Item>
      )}
      {!figmaLink && (
      <Menu.Item key="5" onClick={() => setAddIcon('fab fa-figma')}>
        <i className="fab fa-figma" />
      </Menu.Item>
      )}
      {!dribbleLink && (
      <Menu.Item key="6">
        <i className="fas fa-basketball-ball" onClick={() => setAddIcon('fas fa-basketball-ball')} />
      </Menu.Item>
      )}
      {!clickupLink && (
      <Menu.Item key="7" onClick={() => setAddIcon('clickup')}>
        <img
          src="/assets/images/settings/clickup-icon.svg"
          style={{ maxHeight: '22px' }}
          alt="clickup-icon"
        />
      </Menu.Item>
      )}

    </Menu>
  );
  //   update the data upon submitting
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')).user;
    setData(userInfo);
    // discard(userInfo);
  }, [step]);
  // console.log(data.FacebookLink, facebookLink);
  return (
    <>
      <div className={styles.title}>
        <h2>Social Links</h2>
      </div>
      {googleLink
      && (
      <div className={`row ${styles.socialRow}`}>
        <div className={`col ${styles.socialCol}`}>
          <div>
            {' '}
            <i className="fab fa-google" />
          </div>
          <input type="text" value={googleLink} onChange={(e) => setGoogleLink(e.target.value)} disabled={edit.googleLink} />
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
      {facebookLink
      && (
      <div className={`row ${styles.socialRow}`}>
        <div className={`col ${styles.socialCol}`}>
          <div>
            {' '}
            <i className="fab fa-facebook-f" />
          </div>
          <input type="text" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} disabled={edit.facebookLink} />
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
      {linkedinLink
      && (
      <div className={`row ${styles.socialRow}`}>
        <div className={`col ${styles.socialCol}`}>
          <div>
            <i className="fab fa-linkedin-in" />
          </div>
          <input type="text" value={linkedinLink} onChange={(e) => setLinkedinLink(e.target.value)} disabled={edit.linkedinLink} />
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
      {githubLink
      && (
      <div className={`row ${styles.socialRow}`}>
        <div className={`col ${styles.socialCol}`}>
          <div>
            <i className="fab fa-github-alt" />
          </div>
          <input type="text" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} disabled={edit.githubLink} />
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
      {figmaLink
      && (
      <div className={`row ${styles.socialRow}`}>
        <div className={`col ${styles.socialCol}`}>
          <div>
            <i className="fab fa-figma" />
          </div>
          <input type="text" value={figmaLink} onChange={(e) => setFigmaLink(e.target.value)} disabled={edit.figmaLink} />
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
      {dribbleLink
       && (
       <div className={`row ${styles.socialRow}`}>
         <div className={`col ${styles.socialCol}`}>
           <div>
             <i className="fas fa-basketball-ball" />
           </div>
           <input type="text" value={dribbleLink} onChange={(e) => setDribbleLink(e.target.value)} disabled={edit.dribbleLink} />
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
      {clickupLink
      && (
      <div className={`row ${styles.socialRow}`}>
        <div className={`col ${styles.socialCol}`}>
          <div>
            <img
              src="/assets/images/settings/clickup-icon.svg"
              style={{ maxHeight: '22px' }}
              alt="clickup-icon"
            />
          </div>
          <input type="text" value={clickupLink} onChange={(e) => setClickupLink(e.target.value)} disabled={edit.clickupLink} />
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
        <div className={`col ${styles.socialCol} add-socail-links`}>
          <div>
            <Dropdown overlay={menu} trigger={['click']} overlayClassName="settings_socail-links-contaner">
              <div className={styles.addLinkBtn}>
                {!AddIcon && (
                <img
                  src="/assets/images/settings/plus.svg"
                  alt="clickup-icon"
                />
                )}
                {AddIcon && AddIcon !== 'clickup' && (
                <i className={AddIcon} />
                )}
                {AddIcon === 'clickup' && (
                <img
                  src="/assets/images/settings/clickup-icon.svg"
                // style={{ maxHeight: '22px' }}
                  alt="clickup-icon"
                />
                )}

              </div>
            </Dropdown>
          </div>
          {!AddIcon && <input type="button" value="Add a Social Links" />}
          {AddIcon && (
          <>
            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
            <img
              src="/assets/images/settings/white-check.svg"
              className={styles.newSocialLink}
              onClick={addHandler}
              alt="add-icon"
            />
          </>
          )}

        </div>
      </div>
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
