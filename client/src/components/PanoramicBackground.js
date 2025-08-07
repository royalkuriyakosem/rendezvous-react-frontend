import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * PanoramicBackground Component
 * A 360° draggable panoramic background for Three.js scenes
 */
export default function PanoramicBackground({ 
  imageUrl, 
  radius = 1000, 
  quality = 64,
  enableDrag = true,
  initialRotation = { x: 0, y: 0 },
  sensitivity = 0.005,
  maxVerticalAngle = Math.PI / 2
}) {
  const sphereRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(initialRotation);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  // Enhanced texture loading with state management
  const texture = useMemo(() => {
    if (!imageUrl) return null;
    
    setTextureLoaded(false);
    setLoadingError(false);
    
    const loader = new THREE.TextureLoader();
    const tex = loader.load(
      imageUrl,
      // onLoad
      (texture) => {
        console.log('✅ 360° image loaded successfully:', imageUrl);
        console.log('Image dimensions:', texture.image.width, 'x', texture.image.height);
        setTextureLoaded(true);
      },
      // onProgress
      (progress) => {
        if (progress.total > 0) {
          const percent = Math.round(progress.loaded / progress.total * 100);
          console.log('📥 Loading:', percent + '%');
        }
      },
      // onError
      (error) => {
        console.error('❌ Error loading 360° image:', error);
        console.error('❌ Failed to load:', imageUrl);
        console.error('❌ Check if file exists at:', window.location.origin + imageUrl);
        setLoadingError(true);
      }
    );
    
    // Configure texture for 360° panoramic mapping
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    
    return tex;
  }, [imageUrl]);

  // Mouse/Touch interaction handlers
  const handlePointerDown = useCallback((event) => {
    if (!enableDrag) return;
    
    setIsDragging(true);
    setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    event.stopPropagation();
    document.body.style.cursor = 'grabbing';
  }, [enableDrag]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (!isDragging || !enableDrag) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    setRotation(prev => ({
      x: Math.max(-maxVerticalAngle, Math.min(maxVerticalAngle, prev.x + deltaY * sensitivity)),
      y: prev.y + deltaX * sensitivity
    }));

    setPreviousMousePosition({ x: event.clientX, y: event.clientY });
  }, [isDragging, previousMousePosition, enableDrag, sensitivity, maxVerticalAngle]);

  // Apply rotation in animation frame
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = rotation.x;
      sphereRef.current.rotation.y = rotation.y;
    }
  });

  // Global event listeners for smooth dragging
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

  // Touch support for mobile devices
  const handleTouchStart = useCallback((event) => {
    if (!enableDrag || event.touches.length !== 1) return;
    
    const touch = event.touches[0];
    setIsDragging(true);
    setPreviousMousePosition({ x: touch.clientX, y: touch.clientY });
    event.stopPropagation();
  }, [enableDrag]);

  const handleTouchMove = useCallback((event) => {
    if (!isDragging || !enableDrag || event.touches.length !== 1) return;
    
    event.preventDefault();
    const touch = event.touches[0];
    const deltaX = touch.clientX - previousMousePosition.x;
    const deltaY = touch.clientY - previousMousePosition.y;

    setRotation(prev => ({
      x: Math.max(-maxVerticalAngle, Math.min(maxVerticalAngle, prev.x + deltaY * sensitivity)),
      y: prev.y + deltaX * sensitivity
    }));

    setPreviousMousePosition({ x: touch.clientX, y: touch.clientY });
  }, [isDragging, previousMousePosition, enableDrag, sensitivity, maxVerticalAngle]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Enhanced fallback material with visual indicators
  const fallbackMaterial = useMemo(() => {
    if (loadingError) {
      return new THREE.MeshBasicMaterial({
        color: '#ff4444', // Red indicates error
        side: THREE.BackSide,
      });
    } else if (!textureLoaded) {
      return new THREE.MeshBasicMaterial({
        color: '#444444', // Dark gray indicates loading
        side: THREE.BackSide,
      });
    }
    return new THREE.MeshBasicMaterial({
      color: '#1a1a2e',
      side: THREE.BackSide,
    });
  }, [loadingError, textureLoaded]);

  return (
    <mesh
      ref={sphereRef}
      scale={[-1, 1, 1]} // Invert sphere to show image on the inside
      onPointerDown={handlePointerDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <sphereGeometry args={[radius, quality, quality / 2]} />
      {textureLoaded && texture ? (
        <meshBasicMaterial 
          map={texture} 
          side={THREE.BackSide}
          transparent={false}
        />
      ) : (
        <primitive object={fallbackMaterial} />
      )}
    </mesh>
  );
}

PanoramicBackground.defaultProps = {
  radius: 1000,
  quality: 64,
  enableDrag: true,
  initialRotation: { x: 0, y: 0 },
  sensitivity: 0.005,
  maxVerticalAngle: Math.PI / 2,
};
