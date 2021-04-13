import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import {SceneClass} from '@/babylon-main';

/******Build Functions***********/
const buildGround = (scene: Scene) => {
  //color
  const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 15, height: 16});
  ground.material = groundMat;
}


const buildBox = (width: number, scene: Scene) => {
  //texture
  const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
  if (width == 2) {
    boxMat.diffuseTexture = new BABYLON.Texture("/assets/uv/semihouse.png", scene)
  }
  else {
    boxMat.diffuseTexture = new BABYLON.Texture("/assets/uv/cubehouse.png", scene);
  }

  //options parameter to set different images on each side
  const faceUV = [];
  if (width == 2) {
    faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
  }
  else {
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
  }
  // top 4 and bottom 5 not seen so not set

  /**** World Objects *****/
  const box = BABYLON.MeshBuilder.CreateBox("box", {width: width, faceUV: faceUV, wrap: true});
  box.material = boxMat;
  box.position.y = 0.5;

  return box;
}

const buildRoof = (width: number, scene: Scene) => {
  //texture
  const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
  roofMat.diffuseTexture = new BABYLON.Texture("/assets/texture/roof.jpg", scene);

  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
  roof.material = roofMat;
  roof.scaling.x = 0.75;
  roof.scaling.y = width;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  return roof;
}

const buildHouse = (width: number, scene: Scene) => {
  const box = buildBox(width, scene);
  const roof = buildRoof(width, scene);

  return BABYLON.Mesh.MergeMeshes([box, roof], true, false, undefined, false, true);
}


export class DefaultSceneWithTexture implements SceneClass {

  createScene = async (
    engine: Engine,
    canvas: HTMLCanvasElement
  ): Promise<Scene> => {

    // create a scene
    const scene = new Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    /**** Materials *****/
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

    const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("/assets/uv/cubehouse.png", scene);
    const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
    roofMat.diffuseTexture = new BABYLON.Texture("/assets/texture/roof.jpg", scene);

    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // top 4 and bottom 5 not seen so not set

    /**** World Objects *****/


    const ground = buildGround(scene);

    const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5]);
    places.push([2, -Math.PI / 16, -4.5, 3]);
    places.push([2, -Math.PI / 16, -1.5, 4]);
    places.push([2, -Math.PI / 3, 1.5, 6]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5]);
    places.push([1, 5 * Math.PI / 4, 0, -1]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
    places.push([2, Math.PI / 1.9, 4.75, -1]);
    places.push([1, Math.PI / 1.95, 4.5, -3]);
    places.push([2, Math.PI / 1.9, 4.75, -5]);
    places.push([1, Math.PI / 1.9, 4.75, -7]);
    places.push([2, -Math.PI / 3, 5.25, 2]);
    places.push([1, -Math.PI / 3, 6, 4]);

    const detached_house = buildHouse(1, scene);
    if (detached_house) {
      detached_house.rotation.y = -Math.PI / 16;
      detached_house.position.x = -6.8;
      detached_house.position.z = 2.5;
    }


    const semi_house = buildHouse(2, scene);
    if (semi_house) {
      semi_house.rotation.y = -Math.PI / 16;
      semi_house.position.x = -4.5;
      semi_house.position.z = 3;
    }


    const houses: BABYLON.InstancedMesh[] = [];
    for (let i = 0; i < places.length; i++) {
      if (places[i][0] === 1) {
        detached_house && (houses[i] = detached_house.createInstance("house" + i));
      }
      else {
        semi_house && (houses[i] = semi_house.createInstance("house" + i));
      }

      houses[i].rotation.y = places[i][1];
      houses[i].position.x = places[i][2];
      houses[i].position.z = places[i][3];

    }
    // 加载完毕隐藏loading
    setTimeout(() => {
      engine.hideLoadingUI();
    }, 200);
    return scene;
  };
}

export default new DefaultSceneWithTexture();