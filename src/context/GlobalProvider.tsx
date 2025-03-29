import React, { createContext, Dispatch, useReducer, useContext } from "react";
import { initialState, reducer } from "./reducer";
import { ActionType, GlobalStateType, ScreenSizeType, StateSection, ThemeSelectorType } from "./types";

export const StateMapping = {
  [StateSection.SCREENSIZE]: {} as ScreenSizeType,
  [StateSection.THEMESELECTOR]: {} as ThemeSelectorType,
};
const GlobalStateContext = createContext<GlobalStateType>(StateMapping);
const GlobalDispatchContext = createContext<Dispatch<ActionType>>(() => null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
