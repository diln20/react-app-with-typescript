import { useReducer } from "react";
import { Sub } from "../types";


interface FormState {
  inputValues: Sub;
}


type FormReducerAction =
  | {
      type: "change_value";
      payload: {
        inputName: string;
        InputValue: string;
      };
    }
  | {
      type: "clear";
    };


const INITIAL_STATE = {
  nick: "",
  subMonths: 0,
  avatar: "",
  description: ""
};



const formReducer = (
  state: FormState["inputValues"],
  action: FormReducerAction
) => {
  switch (action.type) {
    case "change_value":
      const { inputName, InputValue } = action.payload;
      return {
        ...state,
        [inputName]: InputValue
      };
    case "clear":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const useNewSubForm = () => {
    return useReducer(formReducer, INITIAL_STATE);
}

export default useNewSubForm;