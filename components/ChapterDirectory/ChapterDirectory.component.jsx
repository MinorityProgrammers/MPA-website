import Link from 'next/link';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './ChapterDirectory.module.css';
import ChapterMenu from '../ChapterMenu/ChapterMenu.component';
import InterestForm from '../InterestForm/InterestForm.component';

const ChapterDirectory = ({
  setOpen, token, active, userData,
}) => {
  const [startedAChapter, setStartedAChapter] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);

  const url = `${process.env.BASE_URI}/location`;
  const userDetails = {
    firstName: userData.firstName,
    lastName: userData.lastName,
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => res.data.data)
      .then((data) => setLocationDetails(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const result = locationDetails
      && locationDetails
        .reduce(
          (acc, { added_by }) => [
            ...acc,
            { firstName: added_by.firstName, lastName: added_by.lastName },
          ],
          [],
        )
        .find(
          (details) => JSON.stringify(details) === JSON.stringify(userDetails),
        );
    setStartedAChapter(result);
  }, [locationDetails]);

  return (
    <div className={styles.chapterDirectory}>
      {startedAChapter ? (
        <ChapterMenu userData={userData} active={active} />
      ) : (
        <InterestForm setOpen={setOpen} token={token} />
      )}
      <div className={styles.joinWrapper}>
        <div className={styles.joinOuterContainer}>
          <div className={styles.joinContainer}>
            <div className={styles.joinTextAndButtonContainer}>
              <div className={styles.joinText}>Find A Chapter Near you</div>
              <Link href="/chapter">
                <a className={styles.joinButton}>Join a chapter</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDirectory;
