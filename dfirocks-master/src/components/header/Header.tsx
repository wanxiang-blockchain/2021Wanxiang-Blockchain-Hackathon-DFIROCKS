import React,{useState} from "react";
import styles from "./Header.module.css";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
// import logo from "../../assets/logo.svg";
declare let window: any;

// nothing
export const Header: React.FC = () => {

  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();
  var address = ""

  console.log("location:"+location.pathname)

  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);

  const clickConnect = async () => {
    // this.setState({step: 3});  // to confirm page..    
    const nnsCanisterId = 'ymglq-2qaaa-aaaah-qcbzq-cai'

    // Whitelist
    const whitelist = [
      nnsCanisterId, "yxdxv-aiaaa-aaaah-qcb3a-cai"
    ];

    // Make the request
    // var result = await window.ic.plug.isConnected();
    // console.log(result)
    // if(!result) {
    var result = await window.ic.plug.requestConnect({whitelist,}); // 
    // }
    // console.log(result)
    if(result){
      address = await window.ic.plug.agent.getPrincipal();
      if(address!=""){
        sessionStorage.setItem("address",address)
        setAdd(true)
        console.log("in pid: "+address)
        address = (sessionStorage.getItem("address") as string).substring(0, 7)+"..."
        setAdd(true)
      }
    }    
  }

  
  if(sessionStorage.getItem("address") != undefined){
    if(!add){
      setAdd(true)
    }
    address = (sessionStorage.getItem("address") as string).substring(0, 7)+"..."
  }

  // dropdown state
  const handleDropDown = () => {
    setOpen(!open)
  }

  // disconnect account
  const disConnect = () => {
    setAdd(false)
    sessionStorage.removeItem("address")
  }

  const getDropDown = () => {
    return (
      <div className={styles['dropdown-list']}>
      { address }
      <img src='./tri.svg' onClick={handleDropDown}/> 
      { open 
      ? 
      <ul>
      <li onClick={disConnect}>Logout</li>
      </ul>
      :
      null}
    </div>
    )
  }

  const routeCheck= (valid_path: string) => {
    if (valid_path==location.pathname){
      return "menu-item-on"
    } else {
      return "menu-item"
    }
  }

  return (
    <div className={styles["header"]}>
      <div className={styles["header-main"]}>
        <div onClick={() => history.push("/")} className={styles["header-logo"]}>
          <img src='./drockslogo.svg' height='50px' alt="logo"  />
          <h3 className={styles["header-title"]}>
            DFIROCKS
          </h3>
        </div>
        <div style={{width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <span className={styles["menu-container"]}>
            <div className={styles[routeCheck("/")]} onClick={()=>history.push("/")}>Home<div></div></div>
            <div className={styles[routeCheck("/create")]} onClick={()=>history.push("/create")}>Create<div></div></div>
            <div className={styles[routeCheck("/evolve")]} onClick={()=>history.push("/evolve")}>Evolve<div></div></div>
            <div className={styles[routeCheck("/gallery")]} onClick={()=>history.push("/gallery")}>Gallery<div></div></div>
          </span>
          <div className={styles["address-block"]}  >
            {add ?  getDropDown() : <div className={styles['dropdown-list']} onClick={clickConnect}> <img style={{height: '25px', paddingTop: '0'}} src='./plugDark.svg' />Connect Plug</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// { add }
            // {getTri(add)}

//address.substring(0, 10)+"..." 