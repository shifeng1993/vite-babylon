import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import {LoadingScreen, ILoadingScreen} from './components/Loading';

export interface SceneClass {
  createScene: (engine: Engine, canvas: HTMLCanvasElement) => Promise<Scene>;
  preTasks?: Promise<unknown>[];
}

export const babylonInit = async (sceneModule: SceneClass): Promise<Engine> => {
  // Execute the pretasks, if defined
  await Promise.all(sceneModule.preTasks || []);
  // Get the canvas element
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
  // Generate the BABYLON 3D engine
  const engine = new Engine(canvas, true);

  // loading加在引擎上
  const loadingScreen: ILoadingScreen = new LoadingScreen('loading');
  engine.loadingScreen = loadingScreen;

  //创建场景前开启loading
  engine.displayLoadingUI();

  // 创建场景
  const scene = await sceneModule.createScene(engine, canvas);

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });
  return engine;
}
