import React, { useState, useEffect } from 'react';
import twitterWidget from './twitterWidget';

const TweetEmbed = ({
  tweetId = '', options = '', setTweetsLoading, tweetsLoading = null,
}) => {
  const [loading, setLoading] = useState(true);
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
          // align: 'center',
          // Min 220px, Max 550px
          width: '350px',
          cards: options.cards,
          conversation: options.conversation,
        })
        .then(() => {
          console.log(`Loaded Tweet ${tweetId} successfully.`);
          if (tweetsLoading === false) {
            setTweetsLoading(tweetsLoading);
          }
        })
        .catch(() => console.log(`Failed to load Tweet ${tweetId}.`));
    }
  }, [loading]);
  return (
    <div id={tweetId} />
  );
};

export default TweetEmbed;
