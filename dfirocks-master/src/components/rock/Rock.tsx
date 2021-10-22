import * as THREE from 'three';
import React, { RefObject, useEffect, useRef, useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator';
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper';
import {Component} from 'react';

export const Rock = (props) => {
  const gltf = useLoader(GLTFLoader, './forWeb/crystal_center.gltf')
  const ref = useRef<THREE.Suspense>(null!)
  // const [hovered, setHover] = useState(false)
  // const [active, setActive] = useState(false)
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )


  // const divRef = useRef(null!);

  // useEffect(() => {
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
  //   const renderer = new THREE.WebGLRenderer();

  //   renderer.setSize( window.innerWidth, window.innerHeight );
  //   // renderer.setSize( width, height);

  //   const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  //   scene.add( ambientLight );
    
  //   const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //   const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  //   const cube = new THREE.Mesh( geometry, material );
  //   scene.add( cube );
  //   camera.position.z = 5;

  //   (divRef.current as HTMLElement).appendChild( renderer.domElement );
  //   const animate = function () {
  //     requestAnimationFrame( animate );
  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;
  //     renderer.render( scene, camera );
  //   };
  //   animate();
  // }, [width, height]);

  // return (
  //   <div ref={divRef} />
  // );
}

// Rock.propTypes = {
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
// };


/*

  var container;
  let camera, scene, renderer;
  let stats;
  
  // var scenes = [scene];
  var composer;
  var controls;
  var ring;

  init();

  function init(){
    // container = document.getElementById('rockscene')
    const container = document.createElement( 'div' );
    // container = document.querySelector('.scene');
    // 添加场景
    scene = new THREE.Scene();
    // 添加摄像机
    const fov = 50;
    const aspect = container.clientWidth/container.clientHeight;
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,2,5);
      // 添加环境光
    const ambient = new THREE.AmbientLight( 0x404040 ,0.3);
          scene.add(ambient);
          const light2 = new THREE.PointLight(0xffffff,1,100);
          light2.position.set(20,-10,1);
          scene.add(light2);
          const light4 = new THREE.DirectionalLight(0xffffff,0.8 * Math.PI);
          light4.position.set(-15,10,30);
          scene.add(light4);
          
    // const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );

    // 添加渲染器
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
          renderer.setSize(container.clientWidth, container.clientHeight);
          renderer.setPixelRatio(window.devicePixelRatio);
          // renderer.physicallyCorrectLights = true;
          renderer.gammaOutput = true;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1;
          renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild(renderer.domElement);

    // 添加HDR
    new RGBELoader()
      .setDataType( THREE.UnsignedByteType )
      .setPath( './hdr/' )
      .load( 'royal_esplanade_1k.hdr', function (texture) {
        var envMap = pmremGenerator.fromEquirectangular(texture).texture;

        // scene.background = envMap;
        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();

        animate();

        // 粗糙度可选
        var roughnessMipmapper = new RoughnessMipmapper( renderer );

        // 加载GLTF模型
        var loader = new GLTFLoader().setPath('./3D/gen3/eth/');
        // var filename = 'Ring_' + j + '.gltf';
        // var filename = 'eth.crystal_rock_web_test.glb';

        loader.load('Ore_main.gltf', function(gltf){
          ring = gltf.scene;
          ring.scale.set(0.2,0.2,0.2);
          ring.position.set(0,0,0);
          scene.add(gltf.scene);
          roughnessMipmapper.dispose();
        }); 

        loader.load('crystal_fly.gltf', function(gltf){
          ring = gltf.scene;
          ring.scale.set(0.2,0.2,0.2);
          ring.position.set(0,0,0);
          scene.add(gltf.scene);
          roughnessMipmapper.dispose();
        });

        loader.load('crystal_center.gltf', function(gltf){
          ring = gltf.scene;
          ring.scale.set(0.2,0.2,0.2);
          ring.position.set(0,0,0);
          scene.add(gltf.scene);
          roughnessMipmapper.dispose();
        });

        loader.load('crystal_left_bottom.gltf', function(gltf){
          ring = gltf.scene;
          ring.scale.set(0.2,0.2,0.2);
          ring.position.set(0,0,0);
          scene.add(gltf.scene);
          roughnessMipmapper.dispose();
        });

        loader.load('crystal_right_bottom.gltf', function(gltf){
          ring = gltf.scene;
          ring.scale.set(0.2,0.2,0.2);
          ring.position.set(0,0,0);
          scene.add(gltf.scene);
          roughnessMipmapper.dispose();
        });

        loader.load('crystal_right_top.gltf', function(gltf){
          ring = gltf.scene;
          ring.scale.set(0.2,0.2,0.2);
          ring.position.set(0,0,0);
          scene.add(gltf.scene);
          roughnessMipmapper.dispose();
        });

        loader.load('crystal_left_top.gltf', function(gltf){
          ring = gltf.scene;
          ring.scale.set(0.2,0.2,0.2);
          ring.position.set(0,0,0);
          scene.add(gltf.scene);
          roughnessMipmapper.dispose();
        });
      });

    var pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();
    
    // 添加控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;
    controls.update();
  }

  // 鼠标操控摄像机
  function animate(){
    renderer.render(scene, camera);
    // spotLight.position.set(
    //     camera.position.x + 10,
    //     camera.position.y + 10,
    //     camera.position.z + 10
    // );
    controls.update();
    requestAnimationFrame(animate); 
    renderer.autoClear = false;
  }

  // 画布随窗口大小发生改变
  function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener("resize", onWindowResize);
  */