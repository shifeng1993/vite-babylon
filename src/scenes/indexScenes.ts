import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import {SceneClass} from '@/babylon-main';

export class DefaultSceneWithTexture implements SceneClass {

  createScene = async (
    engine: Engine,
    canvas: HTMLCanvasElement
  ): Promise<Scene> => {
    // 创建一个场景对象

    const scene = new Scene(engine);



    // 加载完毕隐藏loading
    setTimeout(() => {
      engine.hideLoadingUI();
    }, 200);
    return scene;
  };
}

export default new DefaultSceneWithTexture();