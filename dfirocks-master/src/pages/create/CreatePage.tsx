import React,{useRef, useState, useEffect} from "react";
import styles from "./CreatePage.module.css";
import {Header} from "../../components";
import * as THREE from "three"
import { Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { getCrc32 } from "@dfinity/agent/lib/esm/utils/getCrc";
import * as SHA1 from "@dfinity/agent/lib/esm/utils/sha224";
import {Principal} from "@dfinity/agent";
import { idlFactory } from "../../drocks.did"
import { useGesture } from "react-use-gesture"

// const IDL = require("../../../public/drocks.did.js")
// const Web3 = require("web3") 
declare let window: any;

const Metarock = (props) => {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const ref = useRef<any>()
  // const center = useRef<any>()
  const address = props.address
  // useEffect(()=> {
  //   console.log("hi")
  //   console.log(address)
  //   console.log("address3"+address.toString())
  // }, [address]);

  useFrame((state) => {
    // console.log(state.mouse)
    const t = state.clock.getElapsedTime()
    // if(-0.8< state.mouse.x && state.mouse.x< 0.8){
    //   ref.current.rotation.y = state.mouse.x
    //   ref.current.rotation.x = -state.mouse.y
    // }else{
    //   ref.current.rotation.x = 0
    //   ref.current.rotation.y = 0
    // }
    ref.current.children[0].rotateOnAxis(new THREE.Vector3( -1, -1, 0 ), Math.PI /256)
  })

  // useEffect(()=>bind(),[bind]);

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      console.log(x)
      console.log(y)
      ref.current.rotation.y = x/aspect
      ref.current.rotation.x = y/aspect
      //set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 0] })
    }
    // onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
  })

  // const { nodes, materials } = useGLTF("./forWeb/crystal_center.gltf") as GLTFResults
  const crystal_fly = useLoader(GLTFLoader, './model/definity.crystal_rock_crystal_fly.glb')
  const crystal_left_bottom = useLoader(GLTFLoader, './model/definity.crystal_rock_crystal_leftbottom.glb')
  const crystal_left_top = useLoader(GLTFLoader, './model/definity.crystal_rock_crystal_lefttop.glb')
  const crystal_right_bottom = useLoader(GLTFLoader, './model/definity.crystal_rock_crystal_rightbottom.glb')
  const crystal_right_top = useLoader(GLTFLoader, './model/definity.crystal_rock_crystal_righttop.glb')
  const Ore_main = useLoader(GLTFLoader, './model/definity.crystal_rock_mainRock.glb')

  const color01 = parseInt(address.toString().slice(2,8),16)
  const color02 = parseInt(address.toString().slice(8,14),16)
  const color03 = parseInt(address.toString().slice(14,20),16)
  const color04 = parseInt(address.toString().slice(20,26),16)
  const color05 = parseInt(address.toString().slice(26,32),16)
  const color06 = parseInt(address.toString().slice(32,38),16)

  const scale=0.5
  var newMaterial01 = new THREE.MeshStandardMaterial({color: color01, transparent: true, opacity: 0.9, roughness: 0});
  crystal_fly.scene.traverse((o) => {
    if (o.isMesh) o.material = newMaterial01;
  });
  // const quaternion = new THREE.Quaternion();
  // quaternion.setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI / 4);
  // crystal_fly.scene.applyQuaternion( quaternion );

  var newMaterial02 = new THREE.MeshStandardMaterial({color: color02, transparent: true, opacity: 0.9, roughness: 0});
  crystal_left_bottom.scene.traverse((o) => {
    if (o.isMesh) o.material = newMaterial02;
  });
  
  var newMaterial03 = new THREE.MeshStandardMaterial({color: color03, flatShading:true, transparent: true, opacity: 0.9, roughness: 0});
  crystal_left_top.scene.traverse((o) => {
    if (o.isMesh) o.material = newMaterial03;
  });

  var newMaterial04 = new THREE.MeshStandardMaterial({color: color04, transparent: true, opacity: 0.9, roughness: 0});
  crystal_right_bottom.scene.traverse((o) => {
    if (o.isMesh) o.material = newMaterial04;
  });

  var newMaterial05 = new THREE.MeshStandardMaterial({color: color05, transparent: true, opacity: 0.9, roughness: 0});
  crystal_right_top.scene.traverse((o) => {
    if (o.isMesh) o.material = newMaterial05;
  });

  // var newMaterial06 = new THREE.MeshStandardMaterial({color: color06, roughness: 0, emissive: color06});
  // crystal_center.scene.traverse((o) => {
  //   if (o.isMesh) o.material = newMaterial06;
  // });

  return (
  
    // <mesh geometry={nodes.eht_down_029.geometry} />
    
    <group ref={ref} dispose={null} > 
      {/* <primitive object={crystal_center.scene} rotation-y={-Math.PI} scale={scale}/> */}
      <primitive object={crystal_fly.scene} position-y={-0.4} rotation-z={Math.PI/2} scale={0.6}/>
      <primitive object={crystal_left_bottom.scene} rotation-y={-Math.PI} scale={scale}/>
      <primitive object={crystal_left_top.scene} rotation-y={-Math.PI} scale={scale}/>
      <primitive object={crystal_right_bottom.scene} rotation-y={-Math.PI} scale={scale}/>
      <primitive object={crystal_right_top.scene} rotation-y={-Math.PI} scale={scale}/>
      <primitive object={Ore_main.scene} rotation-y={-Math.PI} scale={scale} {...bind()}/>
    </group>
  )
}
// </group>

export const CreatePage: React.FC = () => {

  const principalToAccountIdentifier = (principal, s) => {
    if (!principal) return "";
    const padding = Buffer.from("\x0Aaccount-id");
    const array = new Uint8Array([
      ...padding,
      ...Principal.fromText(principal).toBlob(),
      ...getSubAccountArray(s),
    ]);
    const hash = SHA1.sha224(array);
    const checksum = to32bits(getCrc32(hash));
    const array2 = new Uint8Array([...checksum, ...hash]);
    return toHexString(array2);
  };
  const getSubAccountArray = (s) => {
    return Array(28)
      .fill(0)
      .concat(to32bits(s ? s : 0));
  };
  const to32bits = (num) => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint8Array(b));
  };
  const toHexString = (byteArray) => {
    return Array.from(byteArray, function (byte:any) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    }).join("");
  };

  // const {rotate_x, setrotatex } = useState(-Math.PI / 2)
  // 接收一个 web3 addresss:
  var address0 = "0x0000000000000000000000000000000000000000"
  // 在首次渲染前就确定地址，避免报错 early return
  const [address, setAdd] = useState(
    sessionStorage.getItem("address")==undefined
    ?
    address0
    :
    principalToAccountIdentifier(sessionStorage.getItem("address"),0)
  )

  // 检测 storage 更新 页面 add
  if( address == address0 && sessionStorage.getItem("address")!=undefined) {
    // setAdd(sessionStorage.getItem("address") as string)
    var add = principalToAccountIdentifier(sessionStorage.getItem("address"),0)
    setAdd(add)
  }

  // 分片
  const color01str = address!.slice(2,8)
  const color02str = address!.slice(8,14)
  const color03str = address!.slice(14,20)
  const color04str = address!.slice(20,26)
  const color05str = address!.slice(26,32)
  const color06str = address!.slice(32,38)
  const rest = address!.slice(38, 42)

  // const model = crystal_left_bottom.scene  
  
  const claimRock = async () => {
    const nnsCanisterId = "yxdxv-aiaaa-aaaah-qcb3a-cai"
    const whitelist = [nnsCanisterId, "ymglq-2qaaa-aaaah-qcbzq-cai"];
    await window.ic.plug.requestConnect({
      whitelist
    });

    //nns network neuro system
    const dRocksFactory = idlFactory

    const DRocksActor = await window.ic.plug.createActor({
      canisterId: nnsCanisterId,
      interfaceFactory: dRocksFactory,
    });

    console.log(sessionStorage.getItem("address"))
    const stats = DRocksActor.freeMint(Principal.fromText(sessionStorage.getItem("address") as string), "", "", address);
    console.log('Mint DRock stats', stats);
    alert("Mint Successfully!")
  }

  return (
    <>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}
        style={{ 
          backgroundImage: `url("./bg.jpg")`, 
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat' }}
      >
        <div style={{height: '80%'}}>
          <Canvas>
            {/* <ambientLight intensity={0.3}/> */}
            <pointLight position={[10, 10, 10]} intensity={0.5}/>
            <pointLight position={[-1, -1, 1]} intensity={0.6}/>
            <pointLight position={[10, -10, 10]} intensity={0.5}/>
            <pointLight position={[-10, 10, 10]} intensity={0.5}/>
            <Metarock address={address}/>
          </Canvas> 
        </div>
      
        <div className={styles['button-container']}>
          <div className={styles['button']} style={{ height:"48px", width: "115px", backgroundImage: `url("./bigger-hl.png")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', color: 'white'}} onClick={claimRock} >
            Claim
          </div>
          <div className={styles['button']} style={{ height:"48px", width: "115px", backgroundImage: `url("./smaller.png")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', color: 'white'}}  >
            Evolve
          </div>
        </div>
        <div className={styles['address-list']}><span style={{color: '#F08331'}}>Meta Data: </span> <span style={{color: '#'+color01str}}>{color01str}</span> <span style={{color: '#'+color02str}}>{color02str}</span> <span style={{color: '#'+color03str}}>{color03str} </span> <span style={{color: '#'+color04str}}> {color04str}</span> <span style={{color: '#'+color05str}}> {color05str}</span> <span style={{color: '#'+color06str}}> {color06str}</span> </div> 
      </div>
    </>
  );
}

/**  
 
              */