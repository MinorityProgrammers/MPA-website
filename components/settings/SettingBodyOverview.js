import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../contexts/provider";
import styles from "../../styles/settings/settingBodyOverview.module.css";
import { useRouter } from "next/router";
import { uprContext } from "../../contexts/settingsPagesProvider/settingsPagesProvider";
import { getProgressPercentage } from "../../contexts/utils/settings/getProgressPercentage";

function SettingBodyOverview({ data }) {
  const router = useRouter();

  const { setUpdatePasswordRedirection } = useContext(uprContext);
  useEffect(() => {
    setUpdatePasswordRedirection(false);
  }, []);

  const completeRedirection = () => {
    if (
      !(
        !!data?.firstName &&
        !!data?.lastName &&
        !!data?.birthday &&
        !!data?.Gender &&
        !!data?.phoneNumber &&
        !!data?.location &&
        !!data?.Nationality &&
        !!data?.Ethnicity.length
      )
    ) {
      router.push("/settings/profile/details");
    } else if (!(!!data?.bio && !!data?.primaryLanguage)) {
      router.push("/settings/profile/overview");
    } else if (
      !(
        !!data?.FacebookLink &&
        !!data?.LinkedinLink &&
        !!data?.GithubLink &&
        !!data?.GoogleLink &&
        !!data?.FigmaLink &&
        !!data?.DribbleLink &&
        !!data?.ClickupLink
      )
    ) {
      router.push("/settings/profile/media");
    } else if (
      !(
        !!data?.passions.length &&
        (data.passions.length === 1 ? data.passions[0] !== "" : true) &&
        !!data?.softSkills.length &&
        (data.softSkills.length === 1 ? data.softSkills[0] !== "" : true) &&
        !!data?.programmingSkills.length &&
        (data.programmingSkills.length === 1
          ? data.programmingSkills[0] !== ""
          : true)
      )
    ) {
      router.push("/settings/profile/background");
    } else if (
      !(
        !!data?.educationLevel &&
        !!data?.schoolName &&
        !!data?.enteredHighSchoolYear &&
        !!data?.expectedGraduationYear &&
        !!data?.studentStatus &&
        !!data?.degree
      )
    ) {
      router.push("/settings/profile/education");
    }
  };

  const copyToClipboard = (link) => {
    const el = document.createElement("textarea");
    el.value = link;
    el.style.position = "absolute";
    el.style.height = "0.1px";
    el.style.width = "0.1px";
    el.style.left = "-100px";
    el.style.top = "-100px";
    el.style.opacity = "0";
    document.body.appendChild(el);

    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;

    el.select();
    document.execCommand("copy");

    document.body.removeChild(el);

    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };

  const copied = (haveLink) => {
    const el = document.getElementsByClassName("overviewContentSpanWrap");

    if (!el[0].hasChildNodes()) {
      el[0].style.backgroundColor = haveLink ? "#00aa4f" : "#fb3f4a";

      const spanEl = document.createElement("span");
      spanEl.style.padding = ".2vw .3vw";
      spanEl.innerText = haveLink ? "Link Copied" : "No link";

      el[0].appendChild(spanEl);

      setTimeout(() => {
        el[0].removeChild(spanEl);
      }, 500);
    }
  };

  return (
    <div className={styles.overviewContent}>
      <div className={styles.fleft}>
        <div className={`${styles.fItem} ${styles.fiCompletion}`}>
          <div className={styles.progress}>
            <svg>
              <circle
                style={{
                  strokeDashoffset: `calc(220 - (220 * ${getProgressPercentage(
                    data
                  )}) / 100)`,
                }}
                cx="35"
                cy="35"
                r="35"
              ></circle>
            </svg>
            <h6>
              {getProgressPercentage(data)}
              <span>%</span>
            </h6>
          </div>
          <div className={styles.info}>
            <h5>Profile</h5>
            <p>Complete your profile and explore all features across MPA.</p>
          </div>
          {getProgressPercentage(data) === 100 ? (
            <div className={styles.completedProfile}>
              Your Profile Is Complete
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                completeRedirection();
              }}
            >
              Complete My Profile
            </button>
          )}
        </div>
        <div className={`${styles.fItem} ${styles.fIProfile}`}>
          <h5>Profile</h5>
          <div className={styles.userContent}>
            <div className={styles.uCLeft}>
              <div className={styles.info}>
                <div className={styles.infoKey}>Role</div>
                <div className={styles.infoValue}>{data.role}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.infoKey}>Username</div>
                <div className={styles.infoValue}>{data.userName}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.infoKey}>Email</div>
                <div className={styles.infoValue}>
                  <a target="_blank" href={`mailto:${data.email}`}>
                    {data.email}
                  </a>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.infoKey}>Link URL</div>
                <div className={styles.infoValue}>
                  <a
                    target="_blank"
                    href={`https://minorityprogrammers.com/user/${data?.userName}`}
                  >{`https://minorityprogrammers.com/user/${data?.userName}`}</a>
                </div>
              </div>
            </div>
            <div className={styles.uCRight}>
              <div className={styles.uCRwrapper}>
                <div className={styles.imgDiv}>
                  <img
                    src={data?.profilePicture || "/assets/images/profile.png"}
                    alt="avatar"
                    className={styles.avatarImage}
                    onClick={() => router.push("/settings/profile/overview")}
                  />
                  <img
                    src="../../assets/images/settings/edit-avatar.svg"
                    alt="edit icon"
                    className={styles.editIcon}
                  />
                </div>
                <h6>{data.firstName + " " + data.lastName}</h6>
              </div>
            </div>
          </div>
          <div className={styles.quickLink}>
            <div className={styles.qlHeader}>
              <h6>Quick Link</h6>
              <p>
                Click icon to copy URL
                <img
                  src="../../assets/images/settings/link-icon.png"
                  alt="copy link"
                />
              </p>
            </div>
            <div className={styles.links}>
              <div
                className="overviewContentSpanWrap"
                style={{
                  position: "absolute",
                  backgroundColor: "#00aa4f",
                  borderRadius: ".5vw",
                  color: "white",
                  fontSize: ".6vw",
                  fontWeight: "bold",
                  top: ".5vw",
                  right: "7.1vw",
                }}
              ></div>
              <img
                src={`../../assets/images/settings/media-facebook.svg`}
                alt="facebook icon"
                onClick={() => {
                  copyToClipboard(data?.FacebookLink);
                  data?.FacebookLink ? copied(true) : copied(false);
                }}
              />
              <img
                src={`../../assets/images/settings/media-linkedin.svg`}
                alt="linkedin icon"
                onClick={() => {
                  copyToClipboard(data?.LinkedinLink);
                  data?.LinkedinLink ? copied(true) : copied(false);
                }}
              />
              <img
                src={`../../assets/images/settings/media-github.svg`}
                alt="github icon"
                onClick={() => {
                  copyToClipboard(data?.GithubLink);
                  data?.GithubLink ? copied(true) : copied(false);
                }}
              />
              <img
                src={`../../assets/images/settings/media-google.svg`}
                alt="google icon"
                onClick={() => {
                  copyToClipboard(data?.GoogleLink);
                  data?.GoogleLink ? copied(true) : copied(false);
                }}
              />
              <img
                src={`../../assets/images/settings/media-figma.svg`}
                alt="figma icon"
                onClick={() => {
                  copyToClipboard(data?.FigmaLink);
                  data?.FigmaLink ? copied(true) : copied(false);
                }}
              />
              <img
                src={`../../assets/images/settings/media-dribbble.svg`}
                alt="dribbble icon"
                onClick={() => {
                  copyToClipboard(data?.DribbleLink);
                  data?.DribbleLink ? copied(true) : copied(false);
                }}
              />
              <img
                src={`../../assets/images/settings/media-clickup.svg`}
                alt="clickup icon"
                onClick={() => {
                  copyToClipboard(data?.ClickupLink);
                  data?.ClickupLink ? copied(true) : copied(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.fItem} ${styles.fISecurity}`}>
          <h5>Security & Login</h5>
          <div className={styles.updateAccountLogin}>
            <div
              className={styles.username}
              onClick={() => router.push("/settings/security/login")}
            >
              <p>Change Username</p>
              <img
                src="../../assets/images/settings/change-arrow.svg"
                alt="change arrow"
              />
            </div>
            <div
              className={styles.password}
              onClick={() => {
                setUpdatePasswordRedirection(true);
                router.push("/settings/security/login");
              }}
            >
              <p>Change Password</p>
              <img
                src="../../assets/images/settings/change-arrow.svg"
                alt="change arrow"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fright}>
        <div className={`${styles.fItem} ${styles.fIWallet}`}>
          <h5>Wallet</h5>
          <div className={styles.connectWrapper}>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/settings/wallet/my-wallet");
              }}
            >
              Connect Wallet
            </button>
          </div>
          <div className={styles.balances}>
            <h5>Balances</h5>
            <div className={styles.cardWrapper}>
              <h6>$MINORITY </h6>
              <div className={styles.card}>
                <div className={styles.amountInfo}>
                  $MINORITY Earned <div>{`$150`}</div>
                </div>
                <div className={styles.amountInfo}>
                  $MINORITY Balance <div>{`$350`}</div>
                </div>
                <div
                  className={styles.addBtn}
                  onClick={() => {
                    router.push("/settings/wallet/my-wallet");
                  }}
                >
                  Add $MINORITY Funds
                </div>
              </div>
            </div>
            <div className={styles.cardWrapper}>
              <h6>$MPA Tokens </h6>
              <div className={styles.card}>
                <div className={styles.amountInfo}>
                  $MPA Tokens Earned <div>{`$35`}</div>
                </div>
                <div className={styles.amountInfo}>
                  $MPA Tokens Balance <div>{`$65`}</div>
                </div>
                <div
                  className={styles.addBtn}
                  onClick={() => {
                    router.push("/settings/wallet/my-wallet");
                  }}
                >
                  Add $MPA Tokens
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.fItem} ${styles.fINotifications}`}>
          <h5>Notifications</h5>
          <div className={styles.messages} onClick={() => router.push("/chat")}>
            <h6>Messages</h6>
            <div className={styles.inboxCounter}>{0}</div>
          </div>
          <div
            className={styles.notifyMessages}
            onClick={() => router.push("/settings/notifications/notifications")}
          >
            <p>Manage Message Delivery Notifications</p>
            <img
              src="../../assets/images/settings/change-arrow.svg"
              alt="change arrow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingBodyOverview;
