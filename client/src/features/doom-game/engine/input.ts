// Keyboard input: W/S or Up/Down move, A/D or Left/Right turn. No strafing.

export interface InputState {
  forward: boolean;
  back: boolean;
  turnLeft: boolean;
  turnRight: boolean;
}

export interface InputHandle {
  state: InputState;
  dispose: () => void;
}

const KEYMAP: Record<string, keyof InputState> = {
  KeyW: "forward",
  ArrowUp: "forward",
  KeyS: "back",
  ArrowDown: "back",
  KeyA: "turnLeft",
  ArrowLeft: "turnLeft",
  KeyD: "turnRight",
  ArrowRight: "turnRight",
};

export function createInput(target: Window): InputHandle {
  const state: InputState = { forward: false, back: false, turnLeft: false, turnRight: false };

  const reset = () => {
    state.forward = false;
    state.back = false;
    state.turnLeft = false;
    state.turnRight = false;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const key = KEYMAP[e.code];
    if (!key) return;
    e.preventDefault();
    state[key] = true;
  };
  const onKeyUp = (e: KeyboardEvent) => {
    const key = KEYMAP[e.code];
    if (key) state[key] = false;
  };
  const onBlur = () => reset();

  target.addEventListener("keydown", onKeyDown);
  target.addEventListener("keyup", onKeyUp);
  target.addEventListener("blur", onBlur);

  return {
    state,
    dispose() {
      target.removeEventListener("keydown", onKeyDown);
      target.removeEventListener("keyup", onKeyUp);
      target.removeEventListener("blur", onBlur);
    },
  };
}
