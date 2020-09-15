import * as Yup from "yup";

const baseRatingSchema = Yup.object().shape({
  subject: Yup.string().required("Required").max(50),
  text: Yup.string().required("Required").max(3000),
});

const ratingSchema = { baseRatingSchema };
export default ratingSchema;
