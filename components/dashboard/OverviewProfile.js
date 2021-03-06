import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EmptyOverviewComponent from './EmptyOverviewComponent';

const OverviewProfile = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%' }}
    >
      {/* First row */}
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ height: '13%', marginBottom: '2%' }}
      >
        <p
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'white',
            margin: 0,
          }}
        >
          MPA Profile
        </p>
      </div>
      <div className="" style={{ height: '85%' }}>
        {loading ? (
          <EmptyOverviewComponent
            imgURL="https://s3-alpha-sig.figma.com/img/1976/b39a/4a68697e58613b2b3abf46ed288c9fde?Expires=1638748800&Signature=dsRmuqGXpRcdYk4fxff2ov0f-HROtzNJttNSlsInzruZNZuWwLo56Ddwdt6JyBo-pyoCEgDi7EMxeEsuUF5mtQVnZZ3yPHoE2whR7YCw2A3EcNx~ErncNhoWRv2bX~XTPVPe0AnqWyNCi0kfmUqjOcpc4c5L3iW~1VngnsiqWgD7DzEx2hpXraw3UhOSN7pO1~1JpwA5KypjHx13vAc2nyooWcunAcMpbrw6Xs~LyO9rjZxll0HfiI3umXYp6cNUD~08Ej3l-pefgyMiGC1SazPjv03S~ElKgLrhZyENoLWZzPwS9pFvD3ZU0UEJSp9WmuwoCWGf5qX67Fz-NQOZRg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            description="Oops, you must be logged in to view your profile."
            btnText="Login"
            btnFunction={() => {
              setLoading(false);
            }}
          />
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center dashboard-pofile-card"
            style={{ width: '100%', height: '100%' }}
          >
            <img
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: '3px solid  #6A0C8B',
                marginBottom: '2%',
              }}
              src={userData?.profilePicture || '/assets/images/profile.png'}
              alt="avatar"
            />
            <div className="personal-info tw-flex-col">
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '2%',
                }}
              >
                {userData.firstName}
                {' '}
                {userData.lastName}
              </p>
              <p style={{ fontSize: '12px', color: 'white', marginBottom: '2%' }}>
                {userData.role}
              </p>

            </div>
            <Link href={`user/${userData.userName}`}>
              <a
                className="button-more"
              >
                View Profile
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewProfile;
