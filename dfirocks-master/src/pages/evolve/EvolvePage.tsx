import React from "react";
import styles from "./EvolvePage.module.css";
import {Header} from "../../components";

export class EvolvePage extends React.Component {
  render() {
    console.log(this.props)
    return (
      <>
        <Header />
        {/* 页面内容 content */}
        <div className={styles["page-content"]}
          style={{ 
            backgroundImage: `url("./homebg2.jpg")`, 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover',
            backgroundPosition: 'center center' }}
        >
        </div>

      </>
    );
  }
}

