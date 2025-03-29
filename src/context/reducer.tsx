
import {
  ActionHandlerType,
  ActionType,
  GlobalStateType,
  ScreenSizeType,
  StateSection,
} from "./types";
import { themeSelectorState } from "component/ThemeSelector";

const screenSizeState: ScreenSizeType = {
  SMALL: false,
  MEDIUM: false,
  BIG: false,
};
const initialState: GlobalStateType = {
  [StateSection.SCREENSIZE]: screenSizeState,
  [StateSection.THEMESELECTOR]: themeSelectorState,
};

function reducer(
  state: GlobalStateType = initialState,
  action: ActionType
): GlobalStateType {
  const { type, payload } = action;
  if (payload) {
    return {
      ...state,
      [type]: {
        ...state[type],
        ...payload,
      },
    };
  }

  return state;
}
// Define the updateState function
const updateState = <K extends StateSection>(
  dispatch: React.Dispatch<ActionType>,
  type: K,
  updates: Partial<GlobalStateType[K]>
) => {
  dispatch({
    type,
    payload: updates,
  } as unknown as ActionType);
};

export { initialState, reducer, updateState };
export type { ActionHandlerType };