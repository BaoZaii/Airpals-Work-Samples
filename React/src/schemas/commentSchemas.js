import * as Yup from "yup";

const baseCommentSchema = Yup.object().shape({
  Subject: Yup.string().max(50),
  Text: Yup.string().max(3000),
});

const commentSchema = { baseCommentSchema };
export default commentSchema;
