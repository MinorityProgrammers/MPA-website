import React from 'react';
import {
    AiOutlineDashboard,
    AiOutlineDown,
    AiOutlineFundProjectionScreen,
    AiOutlineMessage,
    AiOutlineUser,
  } from 'react-icons/ai';
  import { BiKey } from 'react-icons/bi';
import { BsChevronRight, BsEnvelope, BsFilePost } from 'react-icons/bs';

function SidebarList({title, target, subTarget, sidebar, dark, setSidebar}) {
    return (
        <article className="tw-pl-2">
            <div className="tw-my-2 tw-mx-1 tw-font-bold">
              <span>{title}</span>
            </div>
            <div>
              <ul>
                <li>
                  <div
                    href="#link"
                    className={`${
                      sidebar ? 'tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform' : ''
                    } tw-flex tw-justify-between ${
                      dark ? 'hover:tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform' : 'hover:tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform'
                    }  ${dark && sidebar ? 'tw-bg-profileDark' : ''}   ${
                      !dark && sidebar ? 'tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform' : ''
                    }   tw-p-2`}
                  >
                    <div className="tw-flex">
                      <span className="tw-mr-2">
                        <AiOutlineDashboard className="tw-text-base tw-mt-0.5 tw-font-bold" />
                      </span>
                      <span>{target}</span>
                    </div>
                    {sidebar ? (
                      <div>
                        <AiOutlineDown
                          className={`${
                            sidebar ? 'tw-block ' : 'tw-hidden'
                          } tw-text-sm tw-mt-1  tw-mx-2 tw-font-bold`}
                          onClick={() => setSidebar(!sidebar)}
                        />
                      </div>
                    ) : (
                      <div>
                        <BsChevronRight
                          className={`${
                            sidebar ? 'tw-hidden ' : 'tw-block'
                          } tw-text-sm tw-mt-1 tw-mx-2 tw-font-bold`}
                          onClick={() => setSidebar(!sidebar)}
                        />
                      </div>
                    )}
                  </div>
                  <div className={`${!sidebar ? 'tw-hidden ' : 'tw-block'}`}>
                    <div className="tw-flex tw-justify-between tw-my-2">
                      <a href="/" className="tw-flex tw-text-gray-200">
                        <div>
                          <BiKey className="tw-mt-0.5 tw-mx-3" />
                        </div>
                        <span className="tw-text-sm">{subTarget}</span>
                      </a>
                      <div />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </article>
    )
}

export default SidebarList
