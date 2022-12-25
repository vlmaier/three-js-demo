var scene;
var camera;
var renderer;
var grid;
var x;
var y;
var z;
var cube;

function render() {
    renderer.render(scene, camera);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function update() {
    requestAnimationFrame(update);
    grid.rotation.x = Math.PI / 16;
    cube.rotation.x = Math.PI / 16;
    render();
}

function init() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    createXZGrid(-10, 10, -10, 10);
    createCube(1, 1, 1);

    var light = new THREE.PointLight(0xffffff);

    light.position.y = 3;
    light.position.z = 4;

    scene.add(light);
    camera.position.z = 15;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    updateModelMatrixObj();
    updateModelMatrixCam();

    update();
}

function updateObjLoc() {
    cube.position.x = parseFloat(document.getElementById("obj_loc_x").value);
    cube.position.y = parseFloat(document.getElementById("obj_loc_y").value);
    cube.position.z = parseFloat(document.getElementById("obj_loc_z").value);
    updateModelMatrixObj();
}

function updateObjRot() {
    cube.rotation.x = parseFloat(document.getElementById("obj_rot_x").value) * (Math.PI / 180);
    cube.rotation.y = parseFloat(document.getElementById("obj_rot_y").value) * (Math.PI / 180);
    cube.rotation.z = parseFloat(document.getElementById("obj_rot_z").value) * (Math.PI / 180);
    updateModelMatrixObj();
}

function updateObjScale() {
    cube.scale.x = parseFloat(document.getElementById("obj_scale_x").value);
    cube.scale.y = parseFloat(document.getElementById("obj_scale_y").value);
    cube.scale.z = parseFloat(document.getElementById("obj_scale_z").value);
    updateModelMatrixObj();
}

function updateCamLoc() {
    camera.position.x = parseFloat(document.getElementById("cam_loc_x").value);
    camera.position.y = parseFloat(document.getElementById("cam_loc_y").value);
    camera.position.z = parseFloat(document.getElementById("cam_loc_z").value);
    updateModelMatrixCam();
}

function updateCamRot() {
    camera.rotation.x = parseFloat(document.getElementById("cam_rot_x").value) * (Math.PI / 180);
    camera.rotation.y = parseFloat(document.getElementById("cam_rot_y").value) * (Math.PI / 180);
    camera.rotation.z = parseFloat(document.getElementById("cam_rot_z").value) * (Math.PI / 180);
    updateModelMatrixCam();
}

function updateCamScale() {
    camera.scale.x = parseFloat(document.getElementById("cam_scale_x").value);
    camera.scale.y = parseFloat(document.getElementById("cam_scale_y").value);
    camera.scale.z = parseFloat(document.getElementById("cam_scale_z").value);
    updateModelMatrixCam();
}

function updateModelMatrixObj() {
    cube.updateMatrix();
    var mat = cube.matrix.elements;

    document.getElementById("obj_mat_00").value = mat[0];
    document.getElementById("obj_mat_10").value = mat[1];
    document.getElementById("obj_mat_20").value = mat[2];
    document.getElementById("obj_mat_30").value = mat[3];

    document.getElementById("obj_mat_01").value = mat[4];
    document.getElementById("obj_mat_11").value = mat[5];
    document.getElementById("obj_mat_21").value = mat[6];
    document.getElementById("obj_mat_31").value = mat[7];

    document.getElementById("obj_mat_02").value = mat[8];
    document.getElementById("obj_mat_12").value = mat[9];
    document.getElementById("obj_mat_22").value = mat[10];
    document.getElementById("obj_mat_32").value = mat[11];

    document.getElementById("obj_mat_03").value = mat[12];
    document.getElementById("obj_mat_13").value = mat[13];
    document.getElementById("obj_mat_23").value = mat[14];
    document.getElementById("obj_mat_33").value = mat[15];
}

function updateModelMatrixCam() {
    camera.updateMatrix();
    var mat = camera.matrix.elements;

    document.getElementById("cam_mat_00").value = mat[0];
    document.getElementById("cam_mat_10").value = mat[1];
    document.getElementById("cam_mat_20").value = mat[2];
    document.getElementById("cam_mat_30").value = mat[3];

    document.getElementById("cam_mat_01").value = mat[4];
    document.getElementById("cam_mat_11").value = mat[5];
    document.getElementById("cam_mat_21").value = mat[6];
    document.getElementById("cam_mat_31").value = mat[7];

    document.getElementById("cam_mat_02").value = mat[8];
    document.getElementById("cam_mat_12").value = mat[9];
    document.getElementById("cam_mat_22").value = mat[10];
    document.getElementById("cam_mat_32").value = mat[11];

    document.getElementById("cam_mat_03").value = mat[12];
    document.getElementById("cam_mat_13").value = mat[13];
    document.getElementById("cam_mat_23").value = mat[14];
    document.getElementById("cam_mat_33").value = mat[15];
}

function createXZGrid(xmin, xmax, zmin, zmax) {
    try {
        var g = new THREE.Geometry();

        for (i = xmin; i <= xmax; i++) {
            g.vertices.push(new THREE.Vector3(i, 0, zmin));
            g.vertices.push(new THREE.Vector3(i, 0, zmax));
        }

        for (i = zmin; i <= zmax; i++) {
            g.vertices.push(new THREE.Vector3(xmin, 0, i));
            g.vertices.push(new THREE.Vector3(xmax, 0, i));
        }

        var m = new THREE.LineBasicMaterial({color: 0x808080});
        grid = new THREE.Line(g, m, THREE.LinePieces);
        grid.position.x = 0;
        grid.position.y = 0;

        scene.add(grid);
    } catch (e) {
        alert(e);
    }
}

function createAxis(xmin, xmax, ymin, ymax, zmin, zmax) {

    try {
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

        // z-Achse erzeugen

        var g = new THREE.Geometry();
        g.vertices.push(new THREE.Vector3(0, 0, zmin));
        g.vertices.push(new THREE.Vector3(0, 0, zmax));
        var m = new THREE.LineBasicMaterial({color: 0xaa0000});
        z = new THREE.Line(g, m, THREE.LinePieces);
        z.position.x = 0;
        z.position.y = 0;

        scene.add(x);
        scene.add(y);
        scene.add(z);
    } catch (e) {
        alert(e);
    }
}

function createCube(width, height, depth) {
    try {
        var geometry = new THREE.BoxGeometry(width, height, depth);
        var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
        cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
    } catch (e) {
        alert(e);
    }
}