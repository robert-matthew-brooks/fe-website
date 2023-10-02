import { useState, useEffect } from 'react';
import { fetchVotes, putVote } from '../js/api';
import thumbImg from '../assets/thumb.png';
import './ProjectVotes.css';

export default function ProjectVotes({ projectId, userIp }) {
  const [votesSum, setVotesSum] = useState();
  const [userVote, setUserVote] = useState();

  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);

  useEffect(() => {
    if (projectId && userIp) {
      (async () => {
        const { votes_sum: votesSum, user_votes: userVotes } = await fetchVotes(
          projectId,
          userIp
        );

        setVotesSum(votesSum - userVotes);
        setUserVote(userVotes);

        setIsUpVote(userVotes === 1 ? true : false);
        setIsDownVote(userVotes === -1 ? true : false);
      })();
    }
  }, [projectId, userIp]);

  const vote = async (direction) => {
    let voteValue;

    switch (direction) {
      case 'down':
        setIsUpVote(false);
        if (isDownVote) {
          // remove existing vote
          setIsDownVote(false);
          voteValue = 0;
        } else {
          setIsDownVote(true);
          voteValue = -1;
        }
        break;
      case 'up':
        setIsDownVote(false);
        if (isUpVote) {
          // remove existing vote
          setIsUpVote(false);
          voteValue = 0;
        } else {
          setIsUpVote(true);
          voteValue = 1;
        }
        break;
    }

    setUserVote(voteValue);
    putVote(projectId, userIp, voteValue);
  };

  if (!isNaN(votesSum)) {
    return (
      <div id="ProjectVotes">
        <figcaption>Rate this project?</figcaption>
        <figure>
          <button
            id="ProjectVotes__up-btn"
            className={isUpVote ? 'ProjectVotes__up-btn--active' : ''}
            onClick={() => {
              vote('up');
            }}
          >
            <img src={thumbImg} />
            <span id="ProjectVotes__votes">{votesSum + userVote}</span>
          </button>
          <button
            id="ProjectVotes__down-btn"
            className={isDownVote ? 'ProjectVotes__down-btn--active' : ''}
            onClick={() => {
              vote('down');
            }}
          >
            <img src={thumbImg} />
          </button>
        </figure>
      </div>
    );
  }
}
