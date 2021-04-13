/*
 * @Description: 机柜mesh组件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-07-16 21:39:40
 */
import {Scene} from "@babylonjs/core/scene";
import {AbstractMesh} from '@babylonjs/core/Meshes/abstractMesh';
import {IParticleSystem} from '@babylonjs/core/Particles/IParticleSystem';
import {Skeleton} from '@babylonjs/core/Bones/skeleton';
import {AnimationGroup} from '@babylonjs/core/Animations';
import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader";

import "@babylonjs/loaders/glTF";
import controllerModel from "../../../../static/glb/cabinet.glb";

interface Mesh {
  meshes: AbstractMesh[];
  particleSystems: IParticleSystem[];
  skeletons: Skeleton[];
  animationGroups: AnimationGroup[];
}

console.log(controllerModel)

export async function Cabinet(scene: Scene): Promise<Mesh> {
  return SceneLoader.ImportMeshAsync(
    "",
    "",
    controllerModel,
    scene,
    undefined,
    ".glb"
  );
} 