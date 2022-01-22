import React, { useState, useEffect } from 'react';
import twitterWidget from './twitterWidget';

const TweetEmbed = ({ tweetId = '', options = '' }) => {
  const [widget, setWidget] = useState();
  const [twt, setTwttr] = useState();
  const [loading, setLoading] = useState(true);

  // Make sure we have a window before attaching the twitter widget
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidget(twitterWidget());
      if (window.twttr) {
        setTwttr(window.twttr);
      }
    }
  }, [widget]);

  // Check to make sure the widgets library is loaded
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

  // Spawn in the actual tweet
  useEffect(() => {
    if (!loading) {
      // Options for embedding can be found here
      // https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
      twt.widgets.createTweetEmbed(
        tweetId,
        document.getElementById(tweetId),
        {
          theme: 'light',
          align: 'center',
          // Min 220px, Max 550px
          //   width: '350px',
          cards: options.cards,
          conversation: options.conversation,
        },
      )
        .then(() => console.log(`Loaded Tweet ${tweetId} successfully.`))
        .catch(() => console.log(`Failed to load Tweet ${tweetId}.`));
    }
  }, [loading]);

  return (
    <div id={tweetId} />
  );
};

export default TweetEmbed;
