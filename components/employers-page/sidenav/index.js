import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./sidenav.module.css";

const menu = [
  {
    title: "HOME",
    path: "/careers/employers-page/dashboard",
    class: "fas fa-home",
  },
  {
    title: "JOBS",
    path: "/careers/employers-page/employer-jobs",
    class: "fas fa-suitcase",
  },
  {
    title: "INBOX",
    path: "/careers/employers-page/employer",
    class: "fas fa-comment-alt",
  },
  {
    title: "CANDIDATES",
    path: "/careers/employers-page/employer",
    class: "fas fa-user-friends",
  },
];

const Content = function (props) {
  const router = useRouter();
  return (
    <div className={styles.root}>
      <section className={styles.container}>
        {menu.map((item, index) => (
          <Link key={index} href={item.path}>
            <div className={styles.home}>
              <a className={router.pathname === item.path ? styles.active : ""}>
                <i className={item.class} />
                <span className={styles.text}>{item.title}</span>
              </a>
            </div>
          </Link>
        ))}
      </section>
      <main className={styles.main_content}>
        <div className={styles.child_content}>{props.children}</div>
      </main>
    </div>
  );
};

export default Content;
