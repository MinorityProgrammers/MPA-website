import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Alert, Upload, message } from 'antd';
import 'antd/lib/alert/style/index.css';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import FormData from 'form-data';
import stylesE from '../../styles/MentorCSS/Mentor.module.css';
import styles from '../../styles/MentorCSS/Calendar.module.css';
import 'antd/lib/upload/style/index.css';
import { successToast, errorToast } from '../../contexts/utils/toasts';

const ResourcesModel = ({
  setModalShow,
  edit,
  setEdit,
  currentRes,
  mentorship_id,
  update,
  setUpdate,
  ...propsR
}) => {
  const [err, setErr] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [picObject, setPicObject] = useState({});
  const newPic = async (pic) => {
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(pic);
    });
    setPicObject(src);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('path', link);
    formData.append('description', description);
    formData.append('icon', picObject);
    const token = window.localStorage.getItem('jwtToken');
    if (title == '' || description == '' || link == '' || picObject == {}) {
      setErr(true);
    } else {
      if (token != null && edit == false) {
        axios
          .post(
            `http://localhost:5000/api/v1/mentorship/resource/${mentorship_id}`,
            formData,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            successToast('Resource created!');
            setUpdate(!update);
          })
          .catch((err) => {
            errorToast('Something went wrong, please contact us.');
          });
      } else if (token != null && edit == true) {
        axios
          .patch(
            `http://localhost:5000/api/v1/mentorship/resource/${currentRes._id}`,
            formData,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            successToast('Resource updated!');
            setUpdate(!update);
          })
          .catch((err) => {
            errorToast('Something went wrong, please contact us.');
          });
      }
      setErr(false);
      setTitle('');
      setDescription('');
      setLink('');
      setModalShow(false);
      setEdit(false);
    }
  };

  // Image uplaod element
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    maxCount: 1,
    accept: 'image/*',
    action: 'http://localhost:3000/',

    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`);
        newPic(info.file.originFileObj);
      } else if (status === 'error') {
        mconsole.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useEffect(() => {
    if (edit) {
      setTitle(currentRes.title);
      setDescription(currentRes.description);
      setLink(currentRes.path);
      setPicObject(currentRes.icon);
    } else {
      setTitle('');
      setDescription('');
      setLink('');
      setPicObject({});
    }
  }, [edit]);
  return (
    <Modal
      {...propsR}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={stylesE.modelDialog}
      contentClassName={stylesE.popContent}
    >
      <Modal.Header bsPrefix={stylesE.modelHead}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          bsPrefix={stylesE.modelTitle}
        >
          <div>
            {err && (
              <Alert description="fill in the missing fields" type="error" />
            )}
            <div className={stylesE.modelHeader}>
              <div className={styles.createEvenTitle}>
                {edit ? 'Edit Resource' : 'Add Resource'}
              </div>
              <img
                className={styles.eventOutIcon}
                width={30}
                height={30}
                onClick={() => setModalShow(false)}
                src="/assets/images/mentor/event-exit-icon.svg"
                alt="exit-icon"
              />
            </div>
            <div className={stylesE.line}></div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={stylesE.model}>
        <div>
          <form onSubmit={onSubmit}>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>Title</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  name="title"
                  placeholder="What is the event name?"
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>Link</label>
                <input
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  type="text"
                  name="title"
                  placeholder=" https://www.resource.com"
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>Icon</label>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  {/* <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p> */}
                </Dragger>
              </div>
            </div>

            <div style={{ marginTop: '1.4rem' }} className={styles.row}>
              <div className={styles.col + ' ' + styles.colSubmit}>
                <input className={styles.createEventSubmit} type="submit" />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResourcesModel;
