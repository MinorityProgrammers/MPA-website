import React from 'react';

const HomepageTeamCard = function ({ member }) {
  return (
    <img
      src={
          member.AvatarLink !== null
            ? member.AvatarLink
            : 'https://github.com/MinorityProgrammers/mpa-avatars/blob/main/avatars/mysteryAvatar.png?raw=true'
        }
      className="rounded-circle mx-auto d-block"
      alt={member.Employee}
    />
  );
};

export default HomepageTeamCard;
