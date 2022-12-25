var scene;
var camera;
var renderer;

function render() {
    renderer.render(scene, camera);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    var cube_g = new THREE.CubeGeometry(1, 1, 1);
    var cube_m = new THREE.MeshLambertMaterial({color: 0x0000aa});
    var cube_o = new THREE.Mesh(cube_g, cube_m);

    var sphere_g = new THREE.SphereGeometry(0.5, 32, 32);
    var sphere_m = new THREE.MeshLambertMaterial({color: 0xaa0000});
    var sphere_o = new THREE.Mesh(sphere_g, sphere_m);

    var light = new THREE.PointLight(0xffffff);

    cube_o.position.x = -1;
    sphere_o.position.x = 1;
    light.position.y = 3;
    light.position.z = 4;

    scene.add(cube_o);
    scene.add(sphere_o);
    scene.add(light);
    camera.position.z = 2;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    render();
}
