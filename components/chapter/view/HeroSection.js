import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Select from 'react-select';
import styles from './chapter.module.scss';
import { errorToast, successToast } from '../../../contexts/utils/toasts';

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
const categories = [
  {
    label: 'Pre-College',
    value: 'Pre-College',
  },
  {

    label: 'Continental',
    value: 'Continental',
  },
  {

    label: 'National',
    value: 'National',
  },
  {

    label: 'University',
    value: 'University',
  },
  {

    label: 'Professional',
    value: 'Professional',
  },
  {
    label: 'Regional',
    value: 'Regional',
  },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'white',
    border: state.isSelected ? '2px solid #6938EF' : state.isFocused ? '2px solid #6938EF' : '2px solid transparent',
    background: '#1C1D37',
    borderRadius: '8px',
    padding: 20,
    marginTop: 8,
    width: '100%',
    cursor: 'pointer',
    fontWeight: 'bold',
    ':active': {
      // ...styles[':active'],
      background: '#1C1D37',
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
    background: '#1C1D37',
    padding: 5,
    border: '1px solid #6938EF',
    width: 'fit-contnet',
    textAlign: 'center',
    // marginLeft: '-30px',
  }),
  container: (provided) => ({
    ...provided,
    height: '45px',
    cursor: 'pointer',
    paddingLeft: '8px',
    border: '1px solid #6938EF',
    borderRadius: '120px',
    marginBottom: '20px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValue: (provided) => ({
    ...provided,
    border: '1px solid #6938EF',
    borderRadius: '100px',
    background: 'transparent',
    padding: '5px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
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
      ...provided, opacity, transition, color,
    };
  },
};

const HeroSection = ({
  location, token, DropdownIndicator, setUpdate, update, data,
}) => {
  const { Dragger } = Upload;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [values, setValues] = useState({
    about: '',
    title: '',
    mission: '',
    type: '',
    img: '',
    advisor: '',
    location: '',
  });

  // Image input props
  const newPic = async (pic) => {
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(pic);
    });
    const newValue = values;
    newValue.img = src;
    setValues(newValue);
  };

  const props = {
    name: 'file',
    multiple: true,
    className: styles.imgInput,
    // listType: 'picture-card',
    maxCount: 1,
    accept: 'image/*',
    action: 'http://localhost:3000/',

    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        newPic(info.file.originFileObj);
      } else if (status === 'error') {
        // console.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop() {
      // console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const handleJoin = () => {
    if (token) {
      axios
        .post(
          'http://localhost:5000/api/v1/joinChapter',
          {
            chapterLocation_id: location._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          successToast('You have successfully joined a chapter');
          setTimeout(location.reload(true), 2000);
        })
        .catch((err) => {
          try {
            errorToast(err.response.data.data.message.msg);
          } catch (error) {
            errorToast('Network Error');
          }
        });
    } else {
      errorToast('Please login to continue');
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handelChange = (name, value) => {
    const newValues = values;
    newValues[name] = value;
    setValues(newValues);
  };
  useEffect(() => {
    if (token) {
      if (location._id) {
        axios
          .get(`http://localhost:5000/api/v1/joinChapter/location/${location._id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const arr = [];
            res.data.data.forEach((member) => {
              if (member.user_id) {
                const newMember = {
                  label: `${member.user_id.firstName} ${member.user_id.lastName}`,
                  value: member.user_id._id,
                  approved: member.approved,
                };
                arr.push(newMember);
              }
            });
            // const results = users.filter((element) => element !== null);
            const unique = getUniqueListBy(arr, 'value');
            const approved = unique.filter((e) => (
              e.approved
            ));
            setApprovedMembers(approved);
          })
          .catch(() => {
            errorToast('Network Error');
          });
      }
    }
  }, [token, location]);
  const handleSubmit = () => {
    const formData = new FormData();
    if (values.img) formData.append('LocationLogo', values.img);
    if (values.about) formData.append('description', values.about);
    if (values.mission) formData.append('mission', values.mission);
    if (values.advisor) formData.append('advisor', values.advisor.value);
    if (values.type) formData.append('chapter_type', values.type.value);
    if (values.title) formData.append('location', values.title);
    if (values.location) formData.append('LocationName', values.location);
    axios
      .patch(`http://localhost:5000/api/v1/location/${location._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUpdate(!update);
        successToast('Chapter Updated');
      })
      .catch((e) => {
        console.log(e);
        errorToast('Something went wrong');
      });
  };
  return (
    <section>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        // width="fit-contnet"
        style={{ width: 'fit-contnet' }}
        className={styles.editModel}
      >
        <div className={styles.modalBody}>
          <label>
            Title
          </label>
          <input defaultValue={location?.location} onChange={(e) => handelChange('title', e.target.value)} type="text" />
          <label>
            Location
          </label>
          <input defaultValue={location?.LocationName} onChange={(e) => handelChange('location', e.target.value)} type="text" />
          <label>
            Type
          </label>
          <Select
            styles={customStyles}
            components={{ DropdownIndicator }}
            isSearchable={false}
            closeMenuOnSelect
            defaultValue={{ label: location?.chapter_type, value: location?.chapter_type }}
            // value={values.type}
            onChange={(e) => handelChange('type', e)}
            options={categories}
          />
          <label>
            Advisor
          </label>
          <Select
            styles={customStyles}
            components={{ DropdownIndicator }}
            isSearchable={false}
            closeMenuOnSelect
            defaultValue={{
              label: location.advisor?.firstName,
              value: location.advisor?.lastName,
            }}
            onChange={(e) => handelChange('advisor', e)}
            options={approvedMembers}
          />
          <label>
            About
          </label>
          <textarea defaultValue={location?.description} onChange={(e) => handelChange('about', e.target.value)} cols="30" rows="6" />
          <label>
            Mission
          </label>
          <textarea defaultValue={location?.mission} onChange={(e) => handelChange('mission', e.target.value)} cols="30" rows="6" />
          <label>
            Cover
          </label>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
          <a className={styles.submitBtn} onClick={handleSubmit}>Update</a>
        </div>
      </Modal>
      <div style={{ paddingTop: '10rem' }} className="container">
        <div style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.67), rgba(0, 0, 0, 0.67)),url(${location?.LocationLogo})` }} className={`${styles.HeroContanier}`}>
          <div className={styles.left}>
            <div className={styles.title}>
              <img src="/assets/images/chapter/mpa-logo.png" alt="logo" />
              <div>
                <h2>{location?.location}</h2>
                <div className={styles.location}>
                  <i className="fas fa-map-marked-alt" />
                  <h2>{location?.LocationName}</h2>
                </div>
              </div>

            </div>

          </div>
          <div className={styles.right}>
            {location.added_by?._id === data?._id && <i onClick={(() => setIsModalVisible(true))} className="fas fa-edit" />}
            {location.advisor && (
            <p>
              Advisor:
              {`${location.advisor.firstName} ${location.advisor.lastName}`}
            </p>
            )}
            <p>
              Type:
              {' '}
              {location?.chapter_type}
            </p>
            <a onClick={handleJoin}>Join Chapter</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
