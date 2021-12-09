import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { RiArrowRightSLine, RiUserAddLine, RiFlag2Fill } from 'react-icons/ri';
import userinfo from './User.json';
import editTagsData from './editTagsData.json';
import piorityflagData from './piorityflagData.json';
import ModalComp from './ModalComp';

const TaskNameHeader = function () {
  const [newUser, setNewUser] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [users, setUsers] = useState({});
  const [allEditTags, setAllEditTags] = useState({});
  const [piority, setPiority] = useState(false);
  const [allPiorityFlag, setAllPiorityFlag] = useState({});
  const [userCart, setUserCart] = useState([]);
  const [editTagCart, setEditTagCart] = useState([]);
  const [piorityFlagCart, setPiorityFlagCart] = useState([]);
  useEffect(() => {
    setUsers(userinfo);
    setAllEditTags(editTagsData);
    setAllPiorityFlag(piorityflagData);
  }, []);
  // add---------selected------user
  const handleUserCart = (addnew) => {
    const newUsers = [...userCart, addnew];
    setUserCart(newUsers);
  };
  console.log(userCart);

  // remove---------selected------user
  const HandleRemoveUser = (id) => {
    const afterRemoveUsers = userCart.filter((remo) => remo.id !== id);
    setUserCart(afterRemoveUsers);
  };
  // add--------selected-----tags

  const handleEditTagsCat = (newtag) => {
    const newEditTags = [...editTagCart, newtag];
    setEditTagCart(newEditTags);
    // if (newtag.tagName === "bug") {

    //     document.querySelector('.feature').style.backgroundColor = 'red';
    // }
    console.log(newtag.tagName);
  };
  console.log(editTagCart);
  // remove---------selected------editTag
  const HandleRemoveEditTag = (id) => {
    const afterRemoveEditTags = editTagCart.filter((remo) => remo.id !== id);
    setEditTagCart(afterRemoveEditTags);
  };
  // add--------selected-----piority----flag

  const handlePiorityflagCart = (newFlag) => {
    const newFlagCat = [...piorityFlagCart, newFlag];
    setPiorityFlagCart(newFlagCat);
    setPiority(!piority);
    if (piorityFlagCart) {
      alert('hello');
      document.querySelector('#check').style.display = 'none';
    }
  };
  console.log(piorityFlagCart);
  // remove---------selected------Flag
  const HandleRemoveFlag = (id) => {
    const afterRemoveFlagCat = piorityFlagCart.filter((remo) => remo.id !== id);
    setPiorityFlagCart(afterRemoveFlagCat);
    document.querySelector('#check').style.display = 'inline-block';
  };
  // Modal Functionality--------
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className=" tw-bg-white   tw-container tw-mx-auto tw-py-5 tw-mt-20">
      <div className="tw-flex w-items-center tw-px-5 ">
        <div className="tw-container tw-flex  tw-items-center ">
          <p>In</p>
          <p>Category</p>
          <RiArrowRightSLine />
          {' '}
          <p>Sub Category</p>
          {' '}
          <p className="tw-ml-2">For</p>
          <img src="/assets/images/coreteamimg/user.png" alt="user" className="tw-h-6 tw-w-6 tw-ml-3" />
          <div className="gradient tw-rounded-full tw-h-6 tw-w-6 text-center"><span className="tw-purple-800 te-p-2">LA</span></div>
          {
                        userCart.length
                        && userCart.map((u) => (
                          <div
                            className="tw-cursor-pointer tw-btn"
                            key={u.id}
                            onClick={() => HandleRemoveUser(u.id)}
                            data-tip={u.name}
                          >
                            <img className="tw-h-5 tw-w-5" src={u.image} alt="" />
                            <ReactTooltip />
                          </div>
                        ))
                    }
          <div>
            {' '}
            <RiUserAddLine onClick={() => setNewUser(!newUser)} className="tw-cursor-pointer" />
            {
                            newUser && (
                            <div id="myDropdown" className="dropdown-content">
                              {
                                    users.map((user) => (
                                      <a className="hover:tw-bg-gray-200" key={user.id}>

                                        <div className="tw-flex tw-gap-x-3 tw-cursor-pointer" onClick={() => handleUserCart(user)}>
                                          <img className="tw-h-5 tw-w-5" src="/assets/images/coreteamimg/user.png" alt="" />
                                          {' '}
                                          <span>{user.name}</span>
                                        </div>
                                      </a>
                                    ))
                                }
                            </div>
                            )
                        }
          </div>
        </div>
        <div className="tw-flex tw-items-center ">
          <svg className="tw-mr-2" width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.1775 5.31439H20.3844V0.753957C20.3844 0.337471 20.0468 0 19.6304 0H5.30635C4.88996 0 4.55239 0.337471 4.55239 0.753957V5.31439H1.75923C0.789242 5.31439 0 6.10353 0 7.07362V16.7469C0 17.7169 0.789242 18.5061 1.75923 18.5061H4.55239V22.246C4.55239 22.6625 4.88996 23 5.30635 23H19.6303C20.0467 23 20.3843 22.6625 20.3843 22.246V18.5061H23.1774C24.1474 18.5061 24.9367 17.7169 24.9367 16.7469V7.07362C24.9368 6.10363 24.1475 5.31439 23.1775 5.31439ZM6.0603 1.50791H18.8764V5.31439H6.0603V1.50791ZM18.8764 21.4921H6.0603V14.0124H18.8764V21.4921ZM23.4289 16.7469C23.4289 16.8831 23.3137 16.9982 23.1775 16.9982H20.3844V13.2585C20.3844 12.842 20.0468 12.5045 19.6304 12.5045H5.30635C4.88996 12.5045 4.55239 12.842 4.55239 13.2585V16.9982H1.75923C1.62302 16.9982 1.50791 16.8831 1.50791 16.7469V7.07362C1.50791 6.93731 1.62302 6.8223 1.75923 6.8223H5.30635H19.6303H23.1774C23.3136 6.8223 23.4287 6.93731 23.4287 7.07362V16.7469H23.4289Z" fill="black" fillOpacity="0.6" />
          </svg>
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5195 14.9141C16.1882 14.9141 15.0053 15.561 14.2682 16.5569L7.92206 13.3138C8.02853 12.9521 8.08594 12.5695 8.08594 12.1738C8.08594 11.6379 7.98087 11.1261 7.79062 10.6576L14.4418 6.66142C15.1839 7.53245 16.2882 8.08594 17.5195 8.08594C19.7488 8.08594 21.5625 6.27226 21.5625 4.04297C21.5625 1.81368 19.7488 0 17.5195 0C15.2902 0 13.4766 1.81368 13.4766 4.04297C13.4766 4.55822 13.5736 5.05115 13.7501 5.50473L7.08238 9.51086C6.34081 8.66552 5.25321 8.13086 4.04297 8.13086C1.81368 8.13086 0 9.94454 0 12.1738C0 14.4031 1.81368 16.2168 4.04297 16.2168C5.39611 16.2168 6.59597 15.5485 7.33022 14.5248L13.6579 17.7585C13.5401 18.1373 13.4766 18.5399 13.4766 18.957C13.4766 21.1863 15.2902 23 17.5195 23C19.7488 23 21.5625 21.1863 21.5625 18.957C21.5625 16.7277 19.7488 14.9141 17.5195 14.9141ZM17.5195 1.34766C19.0057 1.34766 20.2148 2.55677 20.2148 4.04297C20.2148 5.52916 19.0057 6.73828 17.5195 6.73828C16.0333 6.73828 14.8242 5.52916 14.8242 4.04297C14.8242 2.55677 16.0333 1.34766 17.5195 1.34766ZM4.04297 14.8691C2.55677 14.8691 1.34766 13.66 1.34766 12.1738C1.34766 10.6876 2.55677 9.47852 4.04297 9.47852C5.52916 9.47852 6.73828 10.6876 6.73828 12.1738C6.73828 13.66 5.52916 14.8691 4.04297 14.8691ZM17.5195 21.6523C16.0333 21.6523 14.8242 20.4432 14.8242 18.957C14.8242 17.4708 16.0333 16.2617 17.5195 16.2617C19.0057 16.2617 20.2148 17.4708 20.2148 18.957C20.2148 20.4432 19.0057 21.6523 17.5195 21.6523Z" fill="black" fillOpacity="0.6" />
          </svg>
        </div>
      </div>
      <div className="tw-flex  tw-items-center tw-pl-4 ">
        <div className="tw-bg-yellow-500 tw-rounded-full tw-h-4 tw-w-4" />
        <h1 className="tw-text-black tw-text-3xl tw-ml-2">Task Name Here</h1>
      </div>
      {/* ANOTHER PART----------- */}
      <div className="tw-flex tw-items-center tw-mt-4 tw-justify-between sm:tw-flex-col tw-px-0 tw-px-3">
        <div className="tw-flex tw-items-center tw-gap-x-5 tw-mb-4 sm:tw-w-auto">

          <div className="design tw-mt-3 tw-pb-1">Feature</div>
          <div className="feature tw-mt-3">Feature</div>
          {
                        editTagCart.map((addtag) => <div onClick={() => HandleRemoveEditTag(addtag.id)} className="feature tw-mt-3 tw-cursor-pointer">{addtag.tagName}</div>)
                    }
          <div className="editTag">
            <div onClick={() => setEditTags(!editTags)} data-tip=" edit tags" className="tw-bg-indigo-400 tw-rounded-full tw-h-8 tw-flex tw-w-8 tw-items-center tw-justify-center tw-btn tw-cursor-pointer">
              <ReactTooltip />
              <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9059 2.36115C16.9049 1.57582 16.2681 0.939453 15.4826 0.939453H9.52302C9.14555 0.939453 8.78355 1.08936 8.51661 1.35625L0.758818 9.11244C0.202834 9.66829 0.20279 10.5696 0.758684 11.1256L6.71828 17.0852C6.99621 17.3631 7.36052 17.5022 7.72483 17.5022C7.95413 17.5022 8.18095 17.4406 8.38872 17.3305C9.1491 16.7043 8.0241 17.7923 16.489 9.32907C16.7561 9.06209 16.9061 8.70001 16.9061 8.32244C16.9061 2.2773 16.9061 3.30996 16.9059 2.36115ZM16.1943 8.3224C16.1943 8.51251 16.1203 8.69129 15.9858 8.82571L8.22801 16.582C8.09358 16.7165 7.91486 16.7905 7.72474 16.7905C7.53462 16.7905 7.35594 16.7164 7.22147 16.582L1.26196 10.6224C1.12753 10.4879 1.05351 10.3092 1.05351 10.1191C1.05351 9.92896 1.12758 9.75023 1.262 9.61581L9.01979 1.85957C9.15422 1.72519 9.3329 1.65117 9.52302 1.65117H15.4827C15.8751 1.65117 16.1944 1.97046 16.1944 2.36289L16.1943 8.3224Z" fill="white" />
              </svg>
            </div>
            {
                            editTags && (
                            <div id="myDropdown" className="dropdown-content">
                              {
                                    allEditTags.map((tag) => (
                                      <a className="hover:tw-bg-gray-200 " key={tag.id}>
                                        <h3 onClick={() => handleEditTagsCat(tag)} className="tw-gap-x-3 tw-cursor-pointer tw-capitalize">{tag.tagName}</h3>

                                        {/* <div className="tw-flex tw-gap-x-3 tw-cursor-pointer" onClick={() => handleUserCart(user)}>
                                        <img className="tw-h-5 tw-w-5" src="/assets/images/coreteamimg/user.png" alt="" /> <span >{user.name}</span>
                                    </div> */}
                                      </a>
                                    ))
                                }

                            </div>
                            )
                        }
          </div>
          <div className="tw-bg-indigo-400 tw-rounded-full tw-h-8 tw-flex tw-w-8 tw-items-center tw-justify-center " onClick={openModal}>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.05273" y="0.720703" width="11.271" height="2.58918" stroke="white" strokeWidth="0.75" />
              <rect x="2.68164" y="6.35742" width="12.021" height="3.33918" fill="white" />
              <rect x="5.06055" y="12.7422" width="11.271" height="2.58918" stroke="white" strokeWidth="0.75" />
            </svg>

          </div>
          {
                        modalIsOpen
                        && <ModalComp modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
                    }
          {
                        piorityFlagCart.map((flag) => (
                          <div onClick={() => HandleRemoveFlag(flag.id)} className="tw-bg-indigo-400 tw-rounded-full tw-h-8 tw-flex tw-w-8 tw-items-center tw-justify-center  tw-btn tw-cursor-pointer" data-tip={flag.flagName}>
                            <ReactTooltip />
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.551 6.68751L13.2445 2.64726C13.5732 2.15419 13.2198 1.49372 12.6272 1.49372H1.49763V0.751725C1.49763 0.341948 1.16541 0.00976562 0.755631 0.00976562C0.345855 0.00976562 0.0136719 0.341948 0.0136719 0.751725V2.23568V11.1393V17.0751C0.0136719 17.4849 0.345855 17.8171 0.755631 17.8171C1.16541 17.8171 1.49759 17.4849 1.49759 17.0751V11.8813H12.6272C13.2198 11.8813 13.5732 11.2208 13.2445 10.7277L10.551 6.68751ZM1.49763 10.3974V2.97764H11.2408L9.04194 6.27592C8.8758 6.52515 8.8758 6.84982 9.04194 7.09906L11.2408 10.3973L1.49763 10.3974Z" fill="white" />
                            </svg>

                          </div>
                        ))
                    }

          <div>
            <div onClick={() => setPiority(!piority)} id="check" className="tw-bg-indigo-400 tw-rounded-full tw-h-8 tw-flex tw-w-8 tw-items-center tw-justify-center  tw-btn tw-cursor-pointer" data-tip="set piority">
              <ReactTooltip />
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.551 6.68751L13.2445 2.64726C13.5732 2.15419 13.2198 1.49372 12.6272 1.49372H1.49763V0.751725C1.49763 0.341948 1.16541 0.00976562 0.755631 0.00976562C0.345855 0.00976562 0.0136719 0.341948 0.0136719 0.751725V2.23568V11.1393V17.0751C0.0136719 17.4849 0.345855 17.8171 0.755631 17.8171C1.16541 17.8171 1.49759 17.4849 1.49759 17.0751V11.8813H12.6272C13.2198 11.8813 13.5732 11.2208 13.2445 10.7277L10.551 6.68751ZM1.49763 10.3974V2.97764H11.2408L9.04194 6.27592C8.8758 6.52515 8.8758 6.84982 9.04194 7.09906L11.2408 10.3973L1.49763 10.3974Z" fill="white" />
              </svg>
            </div>
            {
                            piority && (
                            <div id="myDropdown" className="dropdown-content">
                              {
                                    allPiorityFlag.map((flag) => (
                                      <a className="hover:tw-bg-gray-200 " key={flag.id} onClick={() => handlePiorityflagCart(flag)}>

                                        <div className="tw-flex tw-gap-x-4 tw-cursor-pointer tw-items-center">

                                          <span className="tw-text-pink-500"><RiFlag2Fill className="tw-h-5 tw-w-5  " /></span>
                                          <span>{flag.flagName}</span>
                                        </div>
                                      </a>
                                    ))
                                }
                            </div>
                            )
                        }
          </div>
        </div>
        <div className="tw-flex tw-items-center tw-gap-x-5 sm:tw-w-auto sm:tw-gap-x-2">
          <div>
            <p><span className="sm:tw-text-sm ">CREATED</span></p>
            <p>
              {' '}
              <span className="sm:tw-text-sm ">Jun 11th, 3:00 pm</span>
            </p>
          </div>
          <div>
            <p><span className="sm:tw-text-sm ">TIME TRACKED</span></p>
            <h3 className="tw-flex tw-items-center tw-gap-x-2">
              <div className="tw-bg-yellow-500 tw-rounded-full tw-h-4 tw-w-4 text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C3.58853 0 0 3.58887 0 8C0 12.4111 3.58853 16 8 16C12.4115 16 16 12.4111 16 8C16 3.58887 12.4115 0 8 0ZM11.1803 8.28028L6.51369 11.2803C6.459 11.3158 6.39584 11.3333 6.33334 11.3333C6.27866 11.3333 6.22331 11.3197 6.17384 11.2927C6.06641 11.2341 6 11.1221 6 11V5C6 4.87794 6.06641 4.76594 6.17384 4.70734C6.27931 4.64941 6.41147 4.65297 6.51369 4.71972L11.1803 7.71972C11.2754 7.78091 11.3333 7.88672 11.3333 8C11.3333 8.11328 11.2754 8.21906 11.1803 8.28028Z" fill="#FF00B8" />
                </svg>
              </div>
              <span className="sm:tw-text-sm">0:00:00</span>
            </h3>
          </div>
          <div>
            <h3 className="sm:tw-text-sm ">ESTIMATE</h3>
            <h3 className="tw-flex tw-items-center tw-gap-x-2">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.68878 11.1765H7.98321V9.9118C7.98321 8.63229 7.28103 7.45618 6.006 6.60002C5.84746 6.49355 5.74891 6.2637 5.74891 5.99994C5.74891 5.73618 5.84746 5.50641 6.00608 5.39986C7.28103 4.54378 7.98321 3.36767 7.98329 2.08815V0.823472H8.68878C8.91613 0.823472 9.10045 0.639149 9.10045 0.411716C9.10045 0.184282 8.91613 0 8.68878 0H0.411716C0.184363 0 0 0.184282 0 0.411675C0 0.639109 0.184363 0.823431 0.411716 0.823431H1.11729V2.08819C1.11729 3.36771 1.81939 4.54382 3.09449 5.3999C3.25304 5.50645 3.35158 5.73622 3.35158 5.99998C3.35158 6.26378 3.25304 6.49359 3.09441 6.60014C1.81939 7.45622 1.11729 8.63233 1.11729 9.91185V11.1765H0.411716C0.184363 11.1765 0 11.3609 0 11.5883C0 11.8157 0.184363 12 0.411716 12H8.68874C8.91609 12 9.10041 11.8158 9.10041 11.5883C9.10045 11.3609 8.91613 11.1765 8.68878 11.1765ZM1.94076 9.9118C1.94076 8.56736 2.9511 7.68818 3.55344 7.28381C3.94265 7.02252 4.17506 6.54256 4.17506 5.99998C4.17506 5.45744 3.94265 4.97748 3.55344 4.71623C2.9511 4.31186 1.94076 3.43268 1.94076 2.08824V0.823472H7.15973L7.15965 2.08824C7.15965 3.43268 6.14931 4.31186 5.54705 4.71615C5.15776 4.97752 4.92536 5.45748 4.92536 5.99998C4.92536 6.5426 5.15776 7.02248 5.54697 7.28381C6.14931 7.68818 7.15965 8.56736 7.15973 9.9118V11.1765H1.94076V9.9118Z" fill="#151371" />
              </svg>
              <span className="sm:tw-text-sm ">15 h</span>
            </h3>
          </div>
          <div>
            <h3 className="sm:tw-text-sm ">START DATE</h3>
            <h3 className="sm:tw-text-sm ">
              {' '}
              <span>Jun 12</span>
            </h3>
          </div>
          <div>
            <h3 className="sm:tw-text-sm ">DUE DATE</h3>
            <h3>
              {' '}
              <span className=" tw-text-pink-500 sm:tw-text-sm">Jun 15</span>
            </h3>
          </div>
          <svg width="33" height="23" viewBox="0 0 33 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.2045 13.3569C28.9791 13.029 23.5625 5.34766 14.9999 5.34766C7.65251 5.34766 1.10535 12.9848 0.829863 13.3104C0.64265 13.5322 0.64265 13.8578 0.829863 14.0808C1.10535 14.4064 7.65251 22.0436 14.9999 22.0436C22.3473 22.0436 28.8944 14.4064 29.1699 14.0808C29.3429 13.8757 29.3583 13.5787 29.2045 13.3569ZM14.9999 20.851C9.10986 20.851 3.50955 15.234 2.08686 13.6956C3.5072 12.1561 9.10153 6.54026 14.9999 6.54026C21.8917 6.54026 26.7562 12.1489 27.944 13.6634C26.5725 15.1529 20.94 20.851 14.9999 20.851Z" fill="#726EA8" />
            <path d="M15.0007 8.92578C12.3699 8.92578 10.2305 11.0652 10.2305 13.696C10.2305 16.3268 12.3699 18.4662 15.0007 18.4662C17.6315 18.4662 19.7709 16.3268 19.7709 13.696C19.7709 11.0652 17.6315 8.92578 15.0007 8.92578ZM15.0007 17.2738C13.0282 17.2738 11.423 15.6685 11.423 13.6961C11.423 11.7236 13.0282 10.1184 15.0007 10.1184C16.9732 10.1184 18.5784 11.7236 18.5784 13.6961C18.5784 15.6685 16.9732 17.2738 15.0007 17.2738Z" fill="#726EA8" />
            <path d="M25.6784 0C21.9958 0 19 2.99576 19 6.67836C19 10.361 21.9958 13.3567 25.6784 13.3567C29.361 13.3567 32.3567 10.361 32.3567 6.67836C32.3567 2.99576 29.361 0 25.6784 0Z" fill="#726EA8" />
            <path d="M23.304 9V8.232L25.512 6.256C25.7627 6.02667 25.9413 5.82667 26.048 5.656C26.1547 5.48 26.208 5.29867 26.208 5.112C26.208 4.86667 26.112 4.664 25.92 4.504C25.728 4.344 25.488 4.264 25.2 4.264C24.9333 4.264 24.6827 4.31733 24.448 4.424C24.2187 4.53067 23.968 4.70667 23.696 4.952L23.08 4.216C23.4053 3.92267 23.7493 3.70133 24.112 3.552C24.4747 3.40267 24.848 3.328 25.232 3.328C25.5307 3.328 25.8053 3.37067 26.056 3.456C26.312 3.536 26.528 3.65067 26.704 3.8C26.8853 3.94933 27.024 4.13067 27.12 4.344C27.2213 4.55733 27.272 4.78933 27.272 5.04C27.272 5.36 27.192 5.656 27.032 5.928C26.872 6.2 26.5947 6.512 26.2 6.864L24.832 8.08H27.344V9H23.304Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TaskNameHeader;
