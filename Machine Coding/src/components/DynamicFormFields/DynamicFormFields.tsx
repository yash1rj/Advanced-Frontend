import { useEffect, useState } from "react";

const DynamicFormFields = () => {
  const [formData, setFormData] = useState([{ value: "" }]);
  const [showFinalData, setShowFinalData] = useState(false);
  const [primaryFieldRemovalError, setPrimaryFieldRemovalError] =
    useState(false);

  useEffect(() => {
    let timer: number;
    if (primaryFieldRemovalError) {
      timer = setTimeout(() => {
        setPrimaryFieldRemovalError(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [primaryFieldRemovalError]);

  const handleFormSubmit = () => {
    setShowFinalData(true);
  };

  const handleResetForm = () => {
    setShowFinalData(false);
    setFormData([{ value: "" }]);
  };

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number
  ) => {
    setFormData((prevFormData) => {
      const formDataCopy = [...prevFormData];
      formDataCopy[fieldIndex] = {
        ...formDataCopy[fieldIndex],
        value: e.target.value,
      };
      return formDataCopy;
    });
  };

  const handleNewField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData((prevFormData) => {
      return [
        ...prevFormData,
        {
          value: "",
        },
      ];
    });
  };

  const handleDeleteField = (fieldIndex: number) => {
    if (fieldIndex === 0) setPrimaryFieldRemovalError(true);
    if (fieldIndex !== 0)
      setFormData((prevFormData) => [
        ...prevFormData.slice(0, fieldIndex),
        ...prevFormData.slice(fieldIndex + 1),
      ]);
  };

  return (
    <>
      <h1>Dynamic Form</h1>
      <div>
        <header>
          {formData?.map((field, idx) => (
            <form key={idx}>
              <input
                value={field.value}
                onChange={(e) => handleValueChange(e, idx)}
                type="text"
              />
              <button
                type="button"
                onClick={() => handleDeleteField(idx)}
                style={{ marginLeft: "10px" }}
              >
                Delete Field
              </button>
            </form>
          ))}
        </header>
        <footer style={{ marginTop: "20px" }}>
          {primaryFieldRemovalError && (
            <p style={{ color: "red" }}>Cannot remove Primary field !!</p>
          )}

          <button
            type="button"
            onClick={(e) => handleNewField(e)}
            style={{ marginRight: "10px" }}
          >
            Add Field
          </button>
          <button
            style={{ marginRight: "10px" }}
            onClick={handleFormSubmit}
            type="button"
          >
            Submit Form Data
          </button>
          <button onClick={handleResetForm} type="button">
            Reset Form Data
          </button>
          {showFinalData && (
            <table border={1} cellPadding={5} style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <td>Field Number</td>
                  <td>Value</td>
                </tr>
              </thead>
              <tbody>
                {formData
                  ?.filter((field) => field.value !== "")
                  ?.map((field, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{field.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </footer>
      </div>
    </>
  );
};

export default DynamicFormFields;
