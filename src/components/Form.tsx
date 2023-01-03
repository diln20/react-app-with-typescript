import { Sub } from "../types";
import useNewSubForm from "../hooks/useNewSubForm";

interface FromProps {
  onNewSub: (newSub: Sub) => void;
}

const Form = ({ onNewSub }: FromProps) => {

  const [inputValues, dispatch] = useNewSubForm()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onNewSub(inputValues);
    dispatch({
      type: "clear"
    });
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    dispatch({
      type: "change_value",
      payload: {
        inputName: name,
        InputValue: value
      }
    });
  };

  const handleClear = () => {
    dispatch({
      type: "clear"
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Subs Form</h2>
        <input
          onChange={handleChange}
          value={inputValues.nick}
          type="text"
          name="nick"
          placeholder="Nick"
        />
        <input
          onChange={handleChange}
          value={inputValues.subMonths}
          type="number"
          name="subMonths"
          placeholder="Months"
        />
        <input
          onChange={handleChange}
          value={inputValues.avatar}
          type="text"
          name="avatar"
          placeholder="Avatar"
        />
        <textarea
          onChange={handleChange}
          value={inputValues.description}
          name="description"
          placeholder="Description"
        />
        <button type="submit">Submit</button>
        <button type="reset" onClick={handleClear}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Form;
