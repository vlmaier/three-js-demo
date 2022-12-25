var scene;
var camera;
var renderer;
var grid;
var graph;
var x;
var y;

function render() {
    renderer.render(scene, camera);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function rotate() {
    grid.rotation.x += Math.PI / 128;
    graph.rotation.x += Math.PI / 128;
    y.rotation.x += Math.PI / 128;
    x.rotation.x += Math.PI / 128;

    grid.rotation.y += Math.PI / 128;
    graph.rotation.y += Math.PI / 128;
    y.rotation.y += Math.PI / 128;
    x.rotation.y += Math.PI / 128;

    grid.rotation.z += Math.PI / 128;
    graph.rotation.z += Math.PI / 128;
    y.rotation.z += Math.PI / 128;
    x.rotation.z += Math.PI / 128;
}

function update() {
    requestAnimationFrame(update);
    //rotate();
    render();
}

function init() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    createPlot(-30, -10, 30, 10, linearFunction);

    var light = new THREE.PointLight(0xffffff);

    light.position.y = 3;
    light.position.z = 4;

    scene.add(light);
    camera.position.z = 35;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    update();
}

function linearFunction(x) {
    return x * x;
}

function createPlot(xmin, ymin, xmax, ymax, func) {
    try {
        // grid erzeugen

        var g = new THREE.Geometry();

        for (i = ymin; i <= ymax; i++) {
            g.vertices.push(new THREE.Vector3(xmin, i, 0));
            g.vertices.push(new THREE.Vector3(xmax, i, 0));
        }

        for (i = xmin; i <= xmax; i++) {
            g.vertices.push(new THREE.Vector3(i, ymin, 0));
            g.vertices.push(new THREE.Vector3(i, ymax, 0));
        }

        var m = new THREE.LineBasicMaterial({color: 0x808080});
        grid = new THREE.Line(g, m, THREE.LinePieces);
        grid.position.x = 0;
        grid.position.y = 0;

        // x-Achse erzeugen

        var g = new THREE.Geometry();
        g.vertices.push(new THREE.Vector3(xmin, 0, 0));
        g.vertices.push(new THREE.Vector3(xmax, 0, 0));
        var m = new THREE.LineBasicMaterial({color: 0xaa0000});
        x = new THREE.Line(g, m, THREE.LinePieces);
        x.position.x = 0;
        x.position.y = 0;

        // y-Achse erzeugen

        var g = new THREE.Geometry();
        g.vertices.push(new THREE.Vector3(0, ymin, 0));
        g.vertices.push(new THREE.Vector3(0, ymax, 0));
        var m = new THREE.LineBasicMaterial({color: 0xaa0000});
        y = new THREE.Line(g, m, THREE.LinePieces);
        y.position.x = 0;
        y.position.y = 0;

        // graph erzeugen

        var g = new THREE.Geometry();

        for (i = xmin; i <= xmax; i += ((Math.abs(xmin) + Math.abs(xmax)) / 10000)) {
            if (func(i) <= ymax && func(i) >= ymin) {
                g.vertices.push(new THREE.Vector3(i, func(i), 0));
            }
        }

        var m = new THREE.LineBasicMaterial({color: 0x00aa00});
        graph = new THREE.Line(g, m, THREE.LineStrip);
        graph.position.x = 0;
        graph.position.y = 0;

        scene.add(grid);
        scene.add(x);
        scene.add(y);
        scene.add(graph);
    } catch (e) {
        alert(e);
    }
}