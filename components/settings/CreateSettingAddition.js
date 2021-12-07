import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import styles from '../../styles/settings/createSettingAddition.module.css';

const CreateSettingAddition = function ({ values, setValue }) {
  const router = useRouter();
  const settingsSubPage = router.pathname.substring(
    router.pathname.lastIndexOf('/') + 1,
  );

  const checkedValues = values.filter((value) => value !== '');
  const deleteValue = (delValue) => {
    setValue(values.filter((value) => value !== delValue));
  };

  if (!checkedValues.length) {
    return <></>;
  }

  return (
    <div className={styles.cpSkillsContainer}>
      {checkedValues.map(
        (value, key) => value !== '' && (
        <span
          className={
                `${styles.cpSkill
                } `
                + `${settingsSubPage === 'background' && styles.bgcpSkill}`
              }
          key={key}
        >
          {value}
          <AiFillCloseCircle
            className={styles.deleteSkill}
            onClick={() => deleteValue(value)}
          />
        </span>
        ),
      )}
    </div>
  );
};

export default CreateSettingAddition;
