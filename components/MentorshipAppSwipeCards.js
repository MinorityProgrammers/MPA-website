import React, { useState, useMemo } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'

const alreadyRemoved = []

let swipeClick = 0

function MentorshipAppSwipeCards(props) {
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const childRefs = useMemo(() => Array(props.values.length).fill(0).map(i => React.createRef()), [])

    const swiped = (dir, character) => {
        toggleUndo()
        swipeClick++
        if (!alreadyRemoved.includes(character)) {
            alreadyRemoved.push(character)
        }
        if (dir === "right") {
            props.handleSwipeRight(character)
        }
    }

    const outOfFrame = (character) => {
        swipeClick--
        console.log(character.name + ' left the screen!')
        props.updateSwipeCards(character)
    }

    const undoPerson = () => {
        if (alreadyRemoved.length > 0) {
            console.log("undo before")
            const lastPerson = alreadyRemoved[alreadyRemoved.length - 1]
            props.undoLastSwipe(lastPerson)
            alreadyRemoved.splice(alreadyRemoved.length - 1, 1);
            console.log(alreadyRemoved)
        }
        else {
            console.log("no more to undo")
        }
    }

    const swipe = (dir) => {
        const cardsLeft = props.values.filter(person => !alreadyRemoved.includes(person))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1] // Find the card object to be removed
            const index = props.values.indexOf(toBeRemoved) // Find the index of which to make the reference to
            if (!alreadyRemoved.includes(toBeRemoved)) {
                alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            }
            childRefs[index].current.swipe(dir)
            // Swipe the card!

        }
    }

    async function toggleUndo() {


        console.log("toggled")
        const activeBtn = document.getElementById("active_replay_button")
        const inactiveBtn = document.getElementById("inactive_replay_button")
        activeBtn.classList.add('tw-hidden');
        inactiveBtn.classList.remove('tw-hidden');
        await sleep(2400)
        console.log(swipeClick)
        if (swipeClick == 0) {
            console.log("toggled x2")
            inactiveBtn.classList.add('tw-hidden');
            activeBtn.classList.remove('tw-hidden');

        }
        else {
            await sleep(2400)
            console.log(swipeClick)
            console.log("toggled x3")
            inactiveBtn.classList.add('tw-hidden');
            activeBtn.classList.remove('tw-hidden');

        }
    }

    return (
        <div className="tw-w-1/2 tw-z-40 tw-bg-#F9F9F9 tw-rounded-l-3xl">
            <div className="tw-absolute tw-top-52 tw-text-center tw-w-1/2 tw-h-full">
                <div class="razar tw-mx-auto">
                    <div class="ringbase ring1"></div>
                    <div class="ringbase ring2"></div>
                    <div class="pulse"></div>
                    <div class="pointer">
                        <div></div>
                    </div>
                    <div class="dot pos1"></div>
                    <div class="dot pos2"></div>
                </div>
                <div className="tw-pt-28 tw-italic">NO MORE PEOPLE AROUND YOU TO SWIPE!</div>
            </div>
            {props.values.map((character, index) =>
                <TinderCard
                    ref={childRefs[index]}
                    className={character.name + '_id swipe tw-absolute tw-h-full tw-w-1/2 tw-rounded-l-3xl'}
                    key={character.name}
                    preventSwipe={['up', 'down']}
                    onSwipe={(dir) => swiped(dir, character)} onCardLeftScreen={() => outOfFrame(character)}
                >
                    <img className="tw-h-61%  tw-absolute tw-top 0 tw-w-full tw-rounded-tl-3xl" src={character.url} alt={character.name} />
                    <div className="details tw-bg-white tw-w-full tw-absolute tw-bottom-0 tw-rounded-t-3xl tw-rounded-bl-3xl tw-px-7">
                        <div className="top tw-flex tw-justify-between tw-py-4 tw-border-b tw-border-#B9BCC1">
                            <div className="tw-text-left">
                                <h3 className="tw-text-3xl tw-font-bold">{character.name}</h3>
                                <p className="tw-text-2xl tw-font-medium">{character.occupation}</p>
                            </div>
                            <div className="text-right">
                                <p className="tw-text-3xl tw-font-bold">{character.company}</p>
                                <p className="tw-text-2xl tw-font-medium">{character.country}</p>
                            </div>
                        </div>
                        <div className="bottom tw-h-full tw-py-4">
                            <p>{character.description}</p>
                        </div>
                        <div className='buttons tw-mb-12'>
                            <div className="tw-w-300px tw-flex tw-justify-between tw-mx-auto">
                                <button id="active_replay_button" className="tw-rounded-full hover:tw-shadow-mentorAppButton tw-bg-white" onClick={() => undoPerson()}>
                                    <img src="/assets/images/Mentorship/replayBtn.png" alt="Replay Button" />
                                </button>
                                <button id="inactive_replay_button" className="tw-rounded-full hover:tw-shadow-mentorAppButton tw-bg-white tw-hidden">
                                    <img src="/assets/images/Mentorship/replayBtnInactive.png" alt="Inactive Replay Button" />
                                </button>
                                <button className="tw-rounded-full hover:tw-shadow-mentorAppButton tw-bg-white" onClick={() => swipe('right')}>
                                    <img src="/assets/images/Mentorship/likeBtn.png" alt="like Button" />
                                </button>
                                <button className="tw-rounded-full hover:tw-shadow-mentorAppButton tw-bg-white" onClick={() => swipe('left')}>
                                    <img src="/assets/images/Mentorship/dislikeBtn.png" alt="dislike Button" />
                                </button>
                            </div>
                        </div>
                    </div>
                </TinderCard>
            )}

        </div>
    )
}

export default MentorshipAppSwipeCards