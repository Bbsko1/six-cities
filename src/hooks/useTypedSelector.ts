import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reudcers/location-reducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;