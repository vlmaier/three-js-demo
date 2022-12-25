var scene;
var camera;
var renderer;
var pyramid;

function render() {
    renderer.render(scene, camera);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function rotatePyramid() {
    pyramid.rotation.x += Math.PI / 128;
    pyramid.rotation.y += Math.PI / 128;
    pyramid.rotation.z += Math.PI / 128;
}

function update() {
    requestAnimationFrame(update);
    //rotatePyramid();
    render();
}

function init() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    createMeshes();

    var light = new THREE.PointLight(0xffffff);

    light.position.y = 3;
    light.position.z = 4;

    scene.add(light);
    camera.position.z = 10;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    update();
}

function createMeshes() {
    try {
        var g = new THREE.Geometry();
        g.vertices.push(new THREE.Vector3(-3, -3, 0));
        g.vertices.push(new THREE.Vector3(-3, 3, 0));
        g.vertices.push(new THREE.Vector3(3, 3, 0));
        g.vertices.push(new THREE.Vector3(3, -3, 0));
        g.vertices.push(new THREE.Vector3(-3, -3, 0));
        var m = new THREE.LineBasicMaterial({color: 0x0000aa});
        var rect = new THREE.Line(g, m, THREE.LineStrip);
        rect.position.x = -10;
        rect.position.y = 0;

        var g = new THREE.Geometry();
        g.vertices.push(new THREE.Vector3(-3, -3, 0));
        g.vertices.push(new THREE.Vector3(0, 3, 0));
        g.vertices.push(new THREE.Vector3(3, -3, 0));
        g.vertices.push(new THREE.Vector3(-3, -3, 0));
        var m = new THREE.LineBasicMaterial({color: 0x00aa00});
        var triangle = new THREE.Line(g, m, THREE.LineStrip);
        triangle.position.x = 10;
        triangle.position.y = 0;

        var g = new THREE.Geometry();
        g.vertices.push(new THREE.Vector3(0, -0.5, 0));
        g.vertices.push(new THREE.Vector3(-4, -3, 0));
        g.vertices.push(new THREE.Vector3(-4, -3, 0));
        g.vertices.push(new THREE.Vector3(2, -4, 0));
        g.vertices.push(new THREE.Vector3(2, -4, 0));
        g.vertices.push(new THREE.Vector3(5, -1, 0));
        g.vertices.push(new THREE.Vector3(5, -1, 0));
        g.vertices.push(new THREE.Vector3(0, -0.5, 0));
        g.vertices.push(new THREE.Vector3(0, -0.5, 0));
        g.vertices.push(new THREE.Vector3(1, 5, 0));
        g.vertices.push(new THREE.Vector3(1, 5, 0));
        g.vertices.push(new THREE.Vector3(5, -1, 0));
        g.vertices.push(new THREE.Vector3(1, 5, 0));
        g.vertices.push(new THREE.Vector3(-4, -3, 0));
        g.vertices.push(new THREE.Vector3(1, 5, 0));
        g.vertices.push(new THREE.Vector3(2, -4, 0));
        var m = new THREE.LineBasicMaterial({color: 0xaa0000});
        pyramid = new THREE.Line(g, m, THREE.LinePieces);
        pyramid.position.x = 0;
        pyramid.position.y = 0;

        scene.add(rect);
        scene.add(triangle);
        scene.add(pyramid);
    } catch (e) {
        alert(e);
    }
}
