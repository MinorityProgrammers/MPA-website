import React from 'react';
import { useRouter } from 'next/router';
import SettingBody from './SettingBody';
import styles from '../../styles/settings/settingBodyWalletVotes.module.css';

const SettingBodyWalletVotes = function ({ settingsPage, data, userID }) {
  const router = useRouter();
  const handleSubmit = () => {};

  const closeProfileSetup = () => {
    // discard changes
    const slug = data?.userName;
    if (slug) { router.push(`/user/${slug}`); }
  };

  const votes = [
    {
      vote: '0xx12685662439785365111111111111111111111111111af1',
    },
    {
      vote: '0xx286548435695754634222222222222222222222222222af2',
    },
    {
      vote: '0xx3786595365463333333333333333333333333333af3',
    },
    {
      vote: '0xx4846956743654444444444444444444444444444af4',
    },
    {
      vote: '0xx586536554864653555555555555555555555555555af5',
    },
    {
      vote: '0xx68647456586356666666666666666666666666666af6',
    },
    { vote: '0xx7870574646777777777777777777777777777af7' },
    {
      vote: '0xx845236586354654356888888888888888888888888888af8',
    },
    { vote: '0xx9236568435999999999999999999999999999af9' },
  ];

  return (
    <SettingBody
      settingsPage={settingsPage}
      data={data}
      userID={userID}
      handleSubmit={handleSubmit}
      closeProfileSetup={closeProfileSetup}
    >
      <div className={styles.votesContent}>
        <div className={styles.votesWrapper}>
          <h5>Votes</h5>
          <ul>
            {votes.map((vote) => (
              <li>
                <p className={styles.vote}>{vote.vote}</p>
                <p className={styles.txt}>DESCRIPTION OF VOTE</p>
              </li>
            ))}
          </ul>
          <div className={styles.votesCover} />
        </div>
      </div>
    </SettingBody>
  );
};

export default SettingBodyWalletVotes;
