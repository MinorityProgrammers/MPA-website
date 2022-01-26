import React, { useState, useEffect } from 'react';
import twitterWidget from './twitterWidget';

const TweetEmbed = ({ tweetId = '', options = '', loading, setLoading }) => {
  const [widget, setWidget] = useState();
  const [twt, setTwttr] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidget(twitterWidget());
      if (window.twttr) {
        setTwttr(window.twttr);
      }
    }
  }, [widget]);

  useEffect(() => {
    if (twt) {
      const interval = setInterval(() => {
        const loaded = twt.init;
        if (loaded) {
          setLoading(false);
          clearInterval(interval);
        }
      }, 500);
    }
  }, [twt]);

  useEffect(() => {
    if (!loading) {
      twt.widgets
        .createTweetEmbed(tweetId, document.getElementById(tweetId), {
          theme: 'light',
<<<<<<< HEAD
          align: 'center',

=======
          // align: 'center',
          // Min 220px, Max 550px
          width: '350px',
>>>>>>> 8750ad6 (add tweets)
          cards: options.cards,
          conversation: options.conversation,
        })
        .then(() => console.log(`Loaded Tweet ${tweetId} successfully.`))
        .catch(() => console.log(`Failed to load Tweet ${tweetId}.`));
    }
  }, [loading]);
<<<<<<< HEAD
  console.log(loading);
  return <div id={tweetId} />;
=======
  return (
    <div id={tweetId} />
  );
>>>>>>> 8750ad6 (add tweets)
};

export default TweetEmbed;
