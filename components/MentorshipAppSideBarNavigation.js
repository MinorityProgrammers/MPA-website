import React from 'react'

import MentorshipAppSideBarChat from "../components/MentorshipAppSideBarChat";

function MentorshipAppSideBarNavigation(props) {

    let totalChatsNumber = 0
    let totalToDoNumber = 0

    props.values.map(function (character, i) {
        if (character.messages.length > 0) {
            totalChatsNumber++
        }
        totalToDoNumber = totalToDoNumber + character.toDo.length
    })
    switch (props.step) {
        case 1:
            return (
                <div className="tw-w-1/2 tw-h-600px tw-bg-white tw-rounded-r-3xl tw-flex tw-flex-col tw-z-10">
                    <header className="tw-rounded-tr-3xl tw-select-none">
                        <h2 className="tw-px-4 tw-pt-6 tw-text-lg tw-text-2xl tw-font-medium">New Matches ({props.values.length})</h2>
                        <div className="matches tw-flex tw-py-4 tw-overflow-scroll">
                            {props.values.map((character, index) =>
                                <div id={"matched_id_" + index} key={"key_" + index}>
                                    <div className="tw-w-full tw-h-full">
                                        <div className="tw-w-full tw-px-4 tw-h-1/3 tw-cursor-pointer" onClick={() => { props.chatRedirectStep(character) }}>
                                            <div className="img tw-w-20 tw-h-20">
                                                <img className="tw-object-cover
                                    tw-h-full tw-w-full tw-rounded-full" src={character.url} alt="avatar image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>
                    <div className="tw-flex tw-flex-1 tw-flex-col">
                        <nav className="tw-bg-white tw-text-2xl tw-font-medium tw-pb-4 tw-select-none">
                            <ul className="tw-flex tw-cursor-pointer">
                                <li className="tw-flex tw-w-160px tw-px-4 tw-py-2" onClick={props.messagesStep}>
                                    <h3 className="tw-text-activeOrange tw-font-bold">Chats</h3>
                                    <span className="tw-bg-activeOrange tw-text-white tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-8 tw-h-8 tw-ml-6">
                                        <div className="tw-text-sm tw-font-bold">
                                            {totalChatsNumber < 99 ? totalChatsNumber : "+99"}
                                        </div>
                                    </span>
                                </li>
                                <li className="tw-flex tw-w-160px tw-px-4 tw-py-2" onClick={props.todoStep}>
                                    <h3>To-Do</h3>
                                    <span className="tw-bg-NavDark tw-text-white tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-8 tw-h-8 tw-ml-6">
                                        <div className="tw-text-sm tw-font-bold">
                                            {totalToDoNumber < 99 ? totalToDoNumber : "+99"}
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </nav>
                        <div className="messages tw-bg-#F9F9F9 tw-w-full tw-flex-auto tw-rounded-br-3xl tw-shadow-mentorAppMessagesInner tw-overflow-y-scroll tw-h-140px">
                            {props.values.map((character, index) =>

                                <div id={"message_from_" + index} key={"key_" + index} className="tw-relative tw-w-full" onClick={() => { props.chatRedirectStep(character) }}>
                                    <div className="message tw-w-full tw-flex tw-justify-between tw-items-end tw-p-4 tw-h-1/3 tw-cursor-pointer hover:tw-bg-#F9F9F9 hover:tw-shadow-mentorAppMessagesOuter">
                                        <div className="active-bar tw-absolute tw-h-full tw-w-2 tw-top-0 tw-left-0 tw-bg-gradient-to-b tw-from-FF00B8 tw-to-FFC700 tw-hidden"></div>
                                        <div className="img tw-w-20 tw-h-20  tw-relative">
                                            <img className="tw-object-cover tw-rounded-full
                                                tw-h-full tw-w-full" src={character.url} alt="avatar image" />
                                            {character.messages[character.messages.length - 1].read ? (
                                                <div className="tw-absolute tw-w-4 tw-h-4 tw-rounded-full tw-border-2 tw-border-white tw--right-2 tw-top-8 tw-bg-activeOrange tw-z-20"></div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                        <div className="text tw-flex-1 tw-px-6 tw-pb-4">
                                            <h4 className="tw-font-medium tw-text-2xl">{character.name}</h4>
                                            <p>{character.messages[character.messages.length - 1].message}</p>
                                        </div>
                                        <div className="timestamp tw-text-gray-400 tw-pb-4">
                                            <p>{character.messages[character.messages.length - 1].messageTimeStamp}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className="tw-w-1/2 tw-h-600px tw-bg-white tw-rounded-r-3xl tw-flex tw-flex-col tw-z-10">
                    <header className="tw-rounded-tr-3xl tw-select-none">
                        <h2 className="tw-px-4 tw-pt-6 tw-text-lg tw-text-2xl tw-font-medium">New Matches ({props.values.length})</h2>
                        <div className="matches tw-flex tw-py-4 tw-overflow-scroll">
                            {props.values.map((character, index) =>
                                <div id={"matched_id_" + index} key={"key_" + index}>
                                    <div className="tw-w-full tw-h-full">
                                        <div className="tw-w-full tw-px-4 tw-h-1/3 tw-cursor-pointer" onClick={() => { props.chatRedirectStep(character) }}>
                                            <div className="img tw-w-20 tw-h-20">
                                                <img className="tw-object-cover
                                    tw-h-full tw-w-full tw-rounded-full" src={character.url} alt="avatar image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>
                    <div className="tw-flex tw-flex-1 tw-flex-col">
                        <nav className="tw-bg-white tw-text-2xl tw-font-medium tw-pb-4 tw-select-none">
                            <ul className="tw-flex tw-cursor-pointer">
                                <li className="tw-flex tw-w-160px tw-px-4 tw-py-2" onClick={props.messagesStep}>
                                    <h3>Chats</h3>
                                    <span className="tw-bg-NavDark tw-text-white tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-8 tw-h-8 tw-ml-6">
                                        <div className="tw-text-sm tw-font-bold">
                                            {totalChatsNumber < 99 ? totalChatsNumber : "+99"}
                                        </div>
                                    </span>
                                </li>
                                <li className="tw-flex tw-w-160px tw-px-4 tw-py-2" onClick={props.todoStep}>
                                    <h3 className="tw-text-activeOrange tw-font-bold">To-Do</h3>
                                    <span className="tw-bg-activeOrange tw-text-white tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-8 tw-h-8 tw-ml-6">
                                        <div className="tw-text-sm tw-font-bold">
                                            {totalToDoNumber < 99 ? totalToDoNumber : "+99"}
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </nav>
                        <div className="messages tw-bg-#F9F9F9 tw-w-full tw-flex-auto tw-rounded-br-3xl tw-shadow-mentorAppMessagesInner tw-overflow-y-auto ">
                            {props.values.map((character, index) =>
                                <div id={"todo_from_" + index} key={"key_" + index}>

                                    {character.toDo.map((task, id) =>
                                        <div key={id} className="tw-relative tw-w-full tw-h-full">
                                            <div className="message tw-w-full tw-flex tw-justify-between tw-items-end tw-p-4 tw-h-1/3 tw-cursor-pointer hover:tw-bg-#F9F9F9 hover:tw-shadow-mentorAppMessagesOuter">
                                                <div className="active-bar tw-absolute tw-h-full tw-w-2 tw-top-0 tw-left-0 tw-bg-gradient-to-b tw-from-FF00B8 tw-to-FFC700 tw-hidden"></div>
                                                <div className="img tw-w-20 tw-h-20">
                                                    <img className="tw-object-cover tw-rounded-full tw-h-full tw-w-full" src={character.url} alt="avatar image" />
                                                </div>
                                                <div className="text tw-flex-1 tw-px-6 tw-pb-4">
                                                    <h4 className="tw-font-medium tw-text-2xl">{character.name}</h4>
                                                    <p>{task.message}</p>
                                                </div>
                                                <div className="timestamp tw-text-gray-400 tw-pb-4">
                                                    <p>{task.messageTimeStamp}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        case 3:
            return (
                <MentorshipAppSideBarChat
                    character={props.openedChatCharacter}
                    messagesStep={props.messagesStep}
                />
            );
    }
}

export default MentorshipAppSideBarNavigation
