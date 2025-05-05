"use client"
import React, { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'

import { ScrollControls, Scroll, OrbitControls, MeshTransmissionMaterial, Environment, useScroll, PerspectiveCamera, Text, Html, Float, CameraShake } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import HomePage from './Home/HomePage'
import * as THREE from 'three'
import dynamic from "next/dynamic";
import { Image } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { lerp } from 'three/src/math/MathUtils'
extend({ MeshTransmissionMaterial })

// function MyModel() {
//     const gltf = useLoader(GLTFLoader, './model/20.gltf') // or '/model.glb'
//     return <mesh position={[5, -1, 2]} material={MeshTransmissionMaterial} >
//         <primitive object={gltf.scene} scale={0.05} position={[0, 1, 0]} material={MeshTransmissionMaterial} />

//     </mesh>

// }

export default function Experience() {
    const three = useThree()
    const camera = three?.camera
    const shakeRef = useRef();

    const MyImage = (props) => {
        return <Image url="/assets/images/3.png" scale={25} position={[0, 0, -10]} receiveShadow transparent opacity={1} />
    }

    const Knot = (props) => {
        const knotRef = useRef(null)
        const scroll = useScroll()

        
        useFrame((state) => {
            if (!knotRef.current) return;
            
            const t = scroll.offset;
            let vec = new THREE.Vector3()
            state.camera.position.lerp(vec.set( state.pointer.x*2, 0.5, state.pointer.y*10), 0.01)
            state.camera.lookAt(0, 0, 0)
          
            // Smooth rotation
            knotRef.current.rotation.x = lerp(knotRef.current.rotation.x, state.clock.elapsedTime, 0.1);
            knotRef.current.rotation.y = lerp(knotRef.current.rotation.y, state.clock.elapsedTime, 0.1);

            // Smooth position
            knotRef.current.position.y = lerp(knotRef.current.position.y, t * 60, 0.1);
            knotRef.current.position.z = lerp(knotRef.current.position.z, t * 100, 0.1);

            // Smooth camera rotation
            camera.rotation.y = lerp(camera.rotation.y, t / 5, 0.1);
            camera.rotation.x = lerp(camera.rotation.x, t / 5, 0.1);

            // Smooth camera zoom based on scroll ranges
            if (t < 0.3) {
                camera.position.z = lerp(camera.position.z, 10 + t * 10, 0.1);
            }
            if (t > 0.4) {
                camera.position.z = lerp(camera.position.z, t * 50, 0.5);
            }
            if (shakeRef.current && t > 0.5) {
                shakeRef.current.setIntensity(0); // Set shake intensity to 1
              }
        });


        return (
            <mesh receiveShadow castShadow position={[0, 0, -2]} scale={0.8} ref={knotRef}  >
                <torusKnotGeometry args={[3, 1, 256, 32]} />
                <MeshTransmissionMaterial backside backsideThickness={1} emissive={1} thickness={1} roughness={0.2} />
            </mesh>
        )
    }

    return (
        <>
            {/* <gridHelper /> */}
            <Environment preset='city' />
            <OrbitControls enabled={false} enableZoom={false} position={[10, 10, 0]} />
            <ambientLight intensity={10} />
            <directionalLight position={[2, 2, 10]} intensity={10} />
            {/* <color attach="background" args={['#fef4eff']} /> */}
            <ScrollControls pages={8} damping={0.1} >
                <Scroll html>
                    <HomePage data={scroll} />
                </Scroll>
                <Knot />
                <Text scale={8} position={[0, 0, -4]} castShadow>
                    Yieldium
                </Text>
                <MyImage />
            </ScrollControls>
            <CameraShake
            ref={shakeRef}
                maxYaw={0.05} // Max amount camera can yaw in either direction
                maxPitch={0.05} // Max amount camera can pitch in either direction
                maxRoll={0.02} // Max amount camera can roll in either direction
                yawFrequency={0.5} // Frequency of the the yaw rotation
                pitchFrequency={0.2} // Frequency of the pitch rotation
                rollFrequency={0.2} // Frequency of the roll rotation
                intensity={0.5} // initial intensity of the shake
                decayRate={0.5}/>
        </>
    )
}
