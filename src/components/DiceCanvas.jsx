import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function DiceCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })

    let canvasSize = window.innerWidth < 768 ? 80 : 125
    renderer.setSize(canvasSize, canvasSize)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 3

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)

    function createDiceFace(number) {
      const size = 256
      const faceCanvas = document.createElement('canvas')
      faceCanvas.width = size
      faceCanvas.height = size
      const ctx = faceCanvas.getContext('2d')

      ctx.fillStyle = '#dc2626'
      ctx.fillRect(0, 0, size, size)

      ctx.strokeStyle = '#fecaca'
      ctx.lineWidth = 8
      ctx.strokeRect(4, 4, size - 8, size - 8)

      ctx.fillStyle = '#ffffff'
      const dotRadius = 18
      const positions = {
        1: [[128, 128]],
        2: [[70, 70], [186, 186]],
        3: [[70, 70], [128, 128], [186, 186]],
        4: [[70, 70], [186, 70], [70, 186], [186, 186]],
        5: [[70, 70], [186, 70], [128, 128], [70, 186], [186, 186]],
        6: [[70, 70], [186, 70], [70, 128], [186, 128], [70, 186], [186, 186]]
      }

      positions[number].forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      return new THREE.CanvasTexture(faceCanvas)
    }

    const materials = [
      new THREE.MeshPhongMaterial({ map: createDiceFace(1), shininess: 100, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ map: createDiceFace(2), shininess: 100, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ map: createDiceFace(3), shininess: 100, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ map: createDiceFace(4), shininess: 100, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ map: createDiceFace(5), shininess: 100, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ map: createDiceFace(6), shininess: 100, transparent: true, opacity: 0.8 })
    ]

    const cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)

    const edges = new THREE.EdgesGeometry(geometry)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xfecaca, linewidth: 2, transparent: true })
    const wireframe = new THREE.LineSegments(edges, lineMaterial)
    cube.add(wireframe)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xef4444, 1, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    let mouseX = 0, mouseY = 0, targetRotationX = 0, targetRotationY = 0
    let isHovering = false, scale = 1, targetScale = 1

    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = ((event.clientX - rect.left) / canvasSize) * 2 - 1
      mouseY = -((event.clientY - rect.top) / canvasSize) * 2 + 1
      isHovering = true
    })

    canvas.addEventListener('mouseenter', () => {
      isHovering = true
      targetScale = 1.3
      materials.forEach(mat => mat.emissiveIntensity = 0.5)
    })

    canvas.addEventListener('mouseleave', () => {
      isHovering = false
      targetScale = 1
      materials.forEach(mat => mat.emissiveIntensity = 0.2)
      mouseX = 0
      mouseY = 0
    })

    let lastTime = 0
    const frameInterval = 1000 / 60

    function animate(currentTime) {
      requestAnimationFrame(animate)
      const deltaTime = currentTime - lastTime

      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval)

        cube.rotation.x += 0.005
        cube.rotation.y += 0.008

        if (isHovering && window.innerWidth >= 768) {
          targetRotationX = mouseY * 2
          targetRotationY = mouseX * 2
          cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.1
          cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.1
          materials.forEach(mat => {
            mat.opacity = 0.7 + Math.sin(currentTime * 0.003) * 0.2
          })
        }

        scale += (targetScale - scale) * 0.1
        cube.scale.set(scale, scale, scale)
        lineMaterial.opacity = 0.8 + Math.sin(currentTime * 0.002) * 0.2

        renderer.render(scene, camera)
      }
    }

    animate(0)

    const handleResize = () => {
      canvasSize = window.innerWidth < 768 ? 80 : 125
      renderer.setSize(canvasSize, canvasSize)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cube.remove(wireframe)
      scene.remove(cube)
      geometry.dispose()
      materials.forEach(m => m.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="cubeCanvas"
      className="fixed top-2 right-2 md:top-5 md:right-5 z-[1000]"
    />
  )
}
