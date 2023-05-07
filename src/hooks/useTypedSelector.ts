import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reudcers/root-reducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;