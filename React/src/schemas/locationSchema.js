import * as Yup from "yup";

export const locationSchema = Yup.object().shape({
  locationType: Yup.string().required("Required"),
  lineOne: Yup.string()
    .required("Required")
    .max(255, "Too long")
    .min(10, "Too short"),
  lineTwo: Yup.string().max(255, "Too long"),
  city: Yup.string()
    .required("Required")
    .max(255, "Too long")
    .min(2, "Too short"),
  state: Yup.string().required("Required").max(255, "Too long"),
  zip: Yup.string().max(50, "Too long").matches(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/, 'Must be 5 or 9 digits')
});

export default { locationSchema };
