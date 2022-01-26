import React, { useState, useEffect } from 'react';
import twitterWidget from './twitterWidget';

<<<<<<< HEAD
const TweetEmbed = ({ tweetId = '', options = '', loading, setLoading }) => {
=======
const TweetEmbed = ({
  tweetId = '', options = '',
}) => {
  const [loading, setLoading] = useState(true);
>>>>>>> 3cedcb0 (update loading time)
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
          align: 'center',

          cards: options.cards,
          conversation: options.conversation,
        })
        .then(() => console.log(`Loaded Tweet ${tweetId} successfully.`))
        .catch(() => console.log(`Failed to load Tweet ${tweetId}.`));
    }
  }, [loading]);
  return (
    <div id={tweetId} />
  );
};

export default TweetEmbed;
