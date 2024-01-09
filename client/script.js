document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('bannerAnimation');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, banner.offsetWidth / banner.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(banner.offsetWidth, banner.offsetHeight);
    banner.appendChild(renderer.domElement);

    // Create a simple 3D shape for demonstration
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: '#0f0', wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
});
