import { useFormik } from "formik";
import * as Yup from "yup";

import "./App.css";
//! trzeba robić walidację w html podstawową requiered i type=email,
// !a dodatkowo możemy zrobić przez bibliotekę Yup lub js

//!===== Walidacja js bez yup ==============================
// const EMAIL_REGEX =
//   /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// const validate = (values) => {
//   const errors = {};

//   if (!values.firstName.length) {
//     errors.firstName = "Imię jest wymagane";
//   } else if (values.firstName.length <= 3) {
//     errors.firstName = "Za krótkie imię, podaj minimum 4 znaki. ";
//   } else if (values.firstName.length > 10) {
//     errors.firstName =
//       "Twoje imię jest zbyt długie, podaj maksymalnie 10 znaków.";
//   }

//   if (!values.email.length) {
//     errors.email = "Email jest wymagany!";
//   } else if (!values.email.match(EMAIL_REGEX)) {
//     errors.email = "Niepoprawny adres email";
//   }

//   return errors;
// };
// ============================================

// ! ====== walidacja z yup najlepiej =======
// w przykłądzie na npm let schema, a u nas validationSchema
const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .required("Email jest wymagany!")
      .email("Niepoprawny adres email"),
    firstName: Yup.string()
      .required("Imię jest wymagane!")
      .min(4, "Za krótkie imię, podaj minimum 4 znaki. ")
      .max(10, "Twoje imię jest zbyt długie, podaj maksymalnie 10 znaków."),
    lastName: Yup.string()
      .required("Nazwisko jest wymagane!")
      .min(3, "Za krótkie nazwisko, podaj minimum 4 znaki. ")
      .max(10, "Twoje nazwisko jest zbyt długie, podaj maksymalnie 10 znaków."),
    age: Yup.number()
      .required("Podaj swój wiek")
      .min(18, "Musisz być pełnoletni.")
      .max(60, "naprzykład dla jakiegoś ubezpieczenia"),
  });
// ===============

function App() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    },
    // validate,  - tylko dla walidacji js bez yup
    // validationSchema - dla walidacji przez yup
    validationSchema,
    // isInitialValid  - różne flagi do walidacji prze yup i inne jest
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  const errorsElements = Object.entries(formik.errors).map(([key, value]) => (
    <p key={key}>{value}</p>
  ));
  // jeden zapis u góry lub poniższe dwa zapisy
  // const firstNameError = formik.errors.firstName ? (
  //   <p>{formik.errors.firstName}</p>
  // ) : null;

  // const emailError = formik.errors.email ? <p>{formik.errors.email}</p> : null;

  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <label>
          Imię:
          <input
            className={formik.errors.firstName ? "has-error" : ""}
            name="firstName"
            // onBlur={formik.handleBlur} znika czerwona ramka po uzupełnieniu danych
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            required
            value={formik.values.firstName}
          />
        </label>
        <label>
          Nazwisko:
          <input
            className={formik.errors.lastName ? "has-error" : ""}
            name="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            required
            value={formik.values.lastName}
          />
        </label>
        <label>
          Email:
          <input
            className={formik.errors.email ? "has-error" : ""}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            required
            value={formik.values.email}
          />
        </label>
        <label>
          Age:
          <input
            className={formik.errors.age ? "has-error" : ""}
            name="age"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            required
            value={formik.values.age}
          />
        </label>
        <button type="submit">Wyślij</button>
      </form>
      {errorsElements}
      {/* {firstNameError} */}
      {/* {emailError} */}
    </div>
  );
}

export default App;
