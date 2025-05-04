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

extend({ MeshTransmissionMaterial })

// function MyModel() {
//     const gltf = useLoader(GLTFLoader, './model/20.gltf') // or '/model.glb'
//     return <mesh position={[5, -1, 2]} material={MeshTransmissionMaterial} >
//         <primitive object={gltf.scene} scale={0.05} position={[0, 1, 0]} material={MeshTransmissionMaterial} />

//     </mesh>

// }

export default function Experience() {
    const three= useThree()
    const camera = three?.camera

    const MyImage = (props) => {
        return <Image url="/assets/images/3.png" scale={25} position={[0, 0, -10]} receiveShadow transparent opacity={1} />
    }

    const Knot = (props) => {
        const knotRef = useRef(null)
        const scroll = useScroll()

        useFrame(({ clock }) => {
            if (knotRef) {
                knotRef.current.rotation.x = clock.elapsedTime
                knotRef.current.rotation.y = clock.elapsedTime
                knotRef.current.position.y = scroll.offset * 60
                knotRef.current.position.z = scroll.offset * 100
                camera.rotation.y = scroll.offset / 5
                camera.rotation.x = scroll.offset / 5
            }
        })

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
            <ScrollControls pages={7} damping={0.1} >
                {/* <Html
                    transform
                    position={[0, 0, -10]}
                    rotation-y={THREE.MathUtils.degToRad(90)}
                    style={{
                        transition: 'opacity 0.3s',
                    }}
                >
                    <div className='w-80 h-80  rounded-xl bg-white/10'>
                    </div>
                </Html>
                <Html
                    transform
                    position={[0, 0, 10]}
                    rotation-y={THREE.MathUtils.degToRad(90)}
                    style={{
                        transition: 'opacity 0.3s',
                    }}
                >
                    <div className='w-80 h-80  rounded-xl bg-white/10'>
                    </div>
                </Html> */}
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
                maxYaw={0.05} // Max amount camera can yaw in either direction
                maxPitch={0.05} // Max amount camera can pitch in either direction
                maxRoll={0.02} // Max amount camera can roll in either direction
                yawFrequency={0.5} // Frequency of the the yaw rotation
                pitchFrequency={0.2} // Frequency of the pitch rotation
                rollFrequency={0.2} // Frequency of the roll rotation
                intensity={1} // initial intensity of the shake
                decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
            />
        </>
    )
}
