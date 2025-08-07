import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import fontJson from "../assets/fonts/helvetiker_bold.typeface.json"; // Adjust path as necessary
import './RendezvousAnimation.css';

// Updated glass material with SOLID WHITE glassy texture
const createGlassMaterial = () => {
  return new THREE.MeshPhysicalMaterial({
    transmission: 0.8,          // Slightly reduced for more solid appearance
    opacity: 0.3,               // Increased opacity for more solid white
    transparent: true,
    metalness: 0,
    roughness: 0,
    ior: 1.5,
    thickness: 1.0,             // Increased thickness for more solid feel
    reflectivity: 0.9,
    envMapIntensity: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0,
    sheen: 0.8,                 // Increased sheen for white glow
    sheenColor: new THREE.Color('#ffffff'),
    specularIntensity: 1.2,     // Increased specular for bright white
    specularColor: new THREE.Color('#ffffff'),
    color: new THREE.Color('#ffffff'),  // SOLID WHITE COLOR
    attenuationDistance: 1.0,   // Increased for more solid appearance
    attenuationColor: new THREE.Color('#ffffff'),
    emissive: new THREE.Color('#f8f8f8'), // Slight white emission for glow
    emissiveIntensity: 0.1,     // Subtle white glow
  });
};

// Optimized spinning letter component
function SpinningLetter({ 
  char, 
  position, 
  rotationRates, 
  index, 
  isPaused, 
  onHover,
  resetTrigger 
}) {
  const mesh = useRef();
  const [glassMaterial] = useState(() => createGlassMaterial()); // Unique white material per letter
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [manualRotation, setManualRotation] = useState({ x: 0, y: 0, z: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  // Staggered entrance animation
  const { scale } = useSpring({
    scale: hasEntered ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  // Reset functionality
  useEffect(() => {
    if (resetTrigger) {
      setIsResetting(true);
      setManualRotation({ x: 0, y: 0, z: 0 });
      
      if (mesh.current) {
        const startRotation = {
          x: mesh.current.rotation.x,
          y: mesh.current.rotation.y, 
          z: mesh.current.rotation.z
        };
        
        const animateReset = () => {
          let progress = 0;
          const duration = 1000;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            if (mesh.current) {
              mesh.current.rotation.x = startRotation.x * (1 - easeOut);
              mesh.current.rotation.y = startRotation.y * (1 - easeOut);
              mesh.current.rotation.z = startRotation.z * (1 - easeOut);
            }
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setIsResetting(false);
            }
          };
          
          requestAnimationFrame(animate);
        };
        
        animateReset();
      }
    }
  }, [resetTrigger]);

  // Delayed entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  // Mouse interaction handlers
  const handlePointerDown = useCallback((event) => {
    event.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    document.body.style.cursor = 'grabbing';
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (!isDragging || isResetting) return;
    
    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;
    
    setManualRotation(prev => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
      z: prev.z
    }));
    
    setDragStart({ x: event.clientX, y: event.clientY });
  }, [isDragging, dragStart, isResetting]);

  const handleWheel = useCallback((event) => {
    if (isResetting) return;
    event.stopPropagation();
    const delta = event.deltaY * 0.001;
    setManualRotation(prev => ({
      ...prev,
      z: prev.z + delta
    }));
  }, [isResetting]);

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Animation frame updates
  useFrame(({ clock }) => {
    if (!mesh.current || !hasEntered || isResetting) return;
    
    const elapsed = clock.getElapsedTime();
    const rotationDelay = (index * 0.1) + 0.5;
    
    if (manualRotation.x !== 0 || manualRotation.y !== 0 || manualRotation.z !== 0) {
      mesh.current.rotation.x = manualRotation.x;
      mesh.current.rotation.y = manualRotation.y;
      mesh.current.rotation.z = manualRotation.z;
    }
    
    if (elapsed > rotationDelay && !isPaused && !isHovered && !isDragging) {
      mesh.current.rotation.x += rotationRates[0] * 0.016;
      mesh.current.rotation.y += rotationRates[1] * 0.016;
      mesh.current.rotation.z += rotationRates[2] * 0.016;
      
      setManualRotation({
        x: mesh.current.rotation.x,
        y: mesh.current.rotation.y,
        z: mesh.current.rotation.z
      });
    }
  });

  return (
    <animated.group scale={scale}>
      <Text3D
        ref={mesh}
        font={fontJson}
        size={5}                // INCREASED SIZE from 3 to 5 (2 units bigger)
        height={1.6}            // Increased height proportionally
        position={position}
        bevelEnabled
        bevelSize={0.15}        // Increased bevel for larger size
        bevelThickness={0.15}   // Increased bevel thickness
        onPointerDown={handlePointerDown}
        onPointerEnter={() => {
          setIsHovered(true);
          onHover(true);
          document.body.style.cursor = 'grab';
        }}
        onPointerLeave={() => {
          setIsHovered(false);
          onHover(false);
          document.body.style.cursor = 'default';
        }}
        onWheel={handleWheel}
      >
        {char}
        <primitive object={glassMaterial} />
      </Text3D>
    </animated.group>
  );
}

// Control panel component
function ControlPanel({ isPaused, onTogglePause, onReset }) {
  return (
    <div className="control-panel">
      <button 
        className={`control-btn ${isPaused ? 'play' : 'pause'}`}
        onClick={onTogglePause}
      >
        {isPaused ? '▶️' : '⏸️'} {isPaused ? 'Play' : 'Pause'}
      </button>
      <button className="control-btn reset" onClick={onReset}>
        🔄 Reset
      </button>
    </div>
  );
}

// Optimized letters configuration (4x faster)
const letters = [
  { char: "R", rates: [0.08, 0.06, 0.04] },
  { char: "E", rates: [0.032, 0.088, 0.048] },
  { char: "N", rates: [0.048, 0.04, 0.096] },
  { char: "D", rates: [0.096, 0.04, 0.056] },
  { char: "E", rates: [0.064, 0.08, 0.072] },
  { char: "Z", rates: [0.088, 0.064, 0.04] },
  { char: "V", rates: [0.024, 0.032, 0.056] },
  { char: "O", rates: [0.048, 0.072, 0.032] },
  { char: "U", rates: [0.08, 0.024, 0.088] },
  { char: "S", rates: [0.056, 0.096, 0.048] },
];

// Responsive camera controller (updated for larger letters)
function CameraController() {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const screenWidth = size.width;
    
    // Moved camera further back to accommodate larger letters
    if (screenWidth >= 1920) {
      camera.position.set(0, 0, 45);  // Increased from 35
      camera.fov = 80;                // Increased FOV
    } else if (screenWidth >= 1440) {
      camera.position.set(0, 0, 40);  // Increased from 30
      camera.fov = 75;
    } else if (screenWidth >= 1024) {
      camera.position.set(0, 0, 35);  // Increased from 25
      camera.fov = 70;
    } else if (screenWidth >= 768) {
      camera.position.set(0, 0, 32);  // Increased from 22
      camera.fov = 70;
    } else {
      camera.position.set(0, 0, 30);  // Increased from 20
      camera.fov = 65;
    }
    
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

// Main component
export default function RendezvousAnimation() {
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setResetTrigger(true);
    setTimeout(() => setResetTrigger(false), 1200);
  };

  const handleLetterHover = (isHovered) => {
    // Individual letter hover handled in component
  };

  // Dynamic spacing based on screen width (increased for larger letters)
  const getLetterSpacing = () => {
    if (screenWidth >= 1920) return 7;      // Increased spacing
    if (screenWidth >= 1440) return 6.5;    // Increased spacing
    if (screenWidth >= 1024) return 6;      // Increased spacing
    return 5.5;                             // Increased spacing
  };

  const letterSpacing = getLetterSpacing();

  return (
    <div className="rendezvous-container">
      <Canvas 
        camera={{ position: [0, 0, 40], fov: 75 }}  // Updated initial camera position
      >
        <CameraController />
        
        {/* Enhanced lighting for white glass effect */}
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight position={[15, 15, 15]} intensity={1.8} color="#ffffff" castShadow />
        <directionalLight position={[-15, 15, -15]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[0, -10, 10]} intensity={1.0} color="#ffffff" />
        <pointLight position={[0, 20, 20]} intensity={1.5} color="#ffffff" distance={80} />
        <pointLight position={[30, 5, 0]} intensity={1.0} color="#ffffff" distance={50} />
        <pointLight position={[-30, 5, 0]} intensity={1.0} color="#ffffff" distance={50} />
        <spotLight position={[0, 35, 0]} angle={0.4} penumbra={0.5} intensity={1.8} color="#ffffff" castShadow />
        <spotLight position={[25, -25, 25]} angle={0.3} penumbra={0.7} intensity={1.2} color="#ffffff" />

        {letters.map((letter, index) => (
          <SpinningLetter
            key={`${letter.char}-${index}`}
            char={letter.char}
            position={[-32 + index * letterSpacing, 0, 0]}  // Adjusted starting position
            rotationRates={letter.rates}
            index={index}
            isPaused={isPaused}
            onHover={handleLetterHover}
            resetTrigger={resetTrigger}
          />
        ))}
      </Canvas>

      <ControlPanel 
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onReset={handleReset}
      />
    </div>
  );
}
