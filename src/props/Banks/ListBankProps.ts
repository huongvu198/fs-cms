import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

export interface ListBankProps {
  navigate: NavigateFunction;
  dispatch: AppDispatch;
}
