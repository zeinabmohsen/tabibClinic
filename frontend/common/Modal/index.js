import React from "react";
import styles from "./styles/index.module.scss";

export default function Modal({
  active,
  setActive = () => {},
  title,
  children,
}) {
  return (
    active && (
      <>
        <div className={styles.container} onClick={() => setActive(false)} />
        <div className={styles.modal}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.children} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </>
    )
  );
}
