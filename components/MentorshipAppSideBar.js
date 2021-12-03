import React from 'react'
import MentorshipAppSideBarNavigation from "../components/MentorshipAppSideBarNavigation";

function MentorshipAppSideBar(props) {
    return (
        <MentorshipAppSideBarNavigation
            values={props.values}
            step={props.step}
            openedChatCharacter={props.openedChatCharacter}

            messagesStep={props.messagesStep}
            todoStep={props.todoStep}
            chatRedirectStep={props.chatRedirectStep}
        />
    )
}

export default MentorshipAppSideBar


