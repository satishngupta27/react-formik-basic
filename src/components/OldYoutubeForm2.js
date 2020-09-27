import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TestError from "./TestError";
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneno: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("form :", values);
};

// const validate = (values) => {
//   //values.name values.email values.channel
//   //erros.name errors.email errors.channel
//   //errors.name ="this is required"
//   let errors = {};
//   if (!values.name) {
//     errors.name = "Required";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email format";
//   }
//   if (!values.channel) {
//     errors.channel = "Required";
//   }
//   return errors;
// }

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email").required("required"),
  channel: Yup.string().required("Required!"),
  comments: Yup.string().required("Required!"),
});

const validateComments = value=>{
  let error
  if(!value){
    error='Required'
  }
  return error
}

function YoutubeForm() {
  //   const formik = useFormik({
  //     initialValues,
  //     onSubmit,
  //     validationSchema,
  //   });

  //   console.log("visited :",formik.touched)

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component={TestError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email">
            {(ErrorMsg) => <div className="error">{ErrorMsg}</div>}
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="channel">channel</label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage name="channel" />
        </div>

        <div className="form-control">
          <label htmlFor="comments">comments</label>
          <Field as="textarea" id="comments" name="comments" validate={validateComments}/>
          <ErrorMessage name="comments" component={TestError}/>
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log("render props:", props);
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>meta.error</div> : null}
                </div>
              );
            }}
          </Field>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <Field type="text" id="facebook" name="social.facebook" />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">twitter</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>

        <div className="form-control">
          <label htmlFor="PhoneNoPri">Primary Phone Number</label>
          <Field type="text" id="PhoneNoPri" name="phoneno[0]" />
        </div>

        <div className="form-control">
          <label htmlFor="phoneNoSec">Secondary Phone Number</label>
          <Field type="text" id="PhoneNoSec" name="phoneno[1]" />
        </div>

        <div className="form-control">
          <label>list of phone numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              console.log("fieldArrayProps", fieldArrayProps)
              const { push, remove, form } = fieldArrayProps
              const { values } = form
              const { phNumbers } = values

              return (
                <div>
                  {phNumbers.map((phNumber, index) => (
                  <div key={index}>
                    <Field name={`phNumbers[${index}]`} />
                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        {' '}
                        -{' '}
                      </button>
                    )}
                    <button type='button' onClick={()=>push('')}>
                      {' '}
                      +{' '}
                    </button>
                  </div>
                  ))}
                </div>
              )
            }}
          </FieldArray>
        </div>

        <button>submit</button>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;
