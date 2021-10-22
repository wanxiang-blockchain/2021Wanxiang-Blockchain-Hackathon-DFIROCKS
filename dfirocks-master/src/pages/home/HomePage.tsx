import React from "react";

import styles from "./HomePage.module.css";
import { useHistory } from "react-router-dom";
import {Header } from "../../components";

export const HomePage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}
        style={{ 
          backgroundImage: `url("./homebg.jpg")`, 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover',
          backgroundPosition: 'center center' }}>
            <div className={styles["button-arrow"]}>
            <img className={styles["create-now"]} onClick={()=>history.push("/create")} src='./create-now.png'/>
            <img src='./longArrow.svg'/>
            </div>
            {/* <div className={styles["big-circle-container"]}>
              <img className={styles["big-circle"]}  src='./DFIROCK_rock_orange.png'></img>
            </div> */}
            <div className={styles["big-circle-container"]}>
              <video className={styles["big-circle"]} loop autoPlay muted>
                <source src='./drocks.mp4' type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className={styles["bottom"]}> 
              <span>
                learn more
              </span>
              <div className={styles["bottom-link"]}>
                <span onClick={()=>history.push("/icrocks")}>
                    IC.ROCKS <img src='./Arrow.png'/></span>
              </div>
            </div>
      </div>
    </>
  );
}

//