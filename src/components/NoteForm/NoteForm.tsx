import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import type { CreateNotePayload } from "../../services/noteService";

interface NoteFormProps {
  onCreate: (payload: CreateNotePayload) => Promise<void> | void;
  onCancel: () => void;
}

const schema = Yup.object().shape({
  title: Yup.string().required("Введіть заголовок"),
  content: Yup.string().required("Введіть текст"),
});

const NoteForm: React.FC<NoteFormProps> = ({ onCreate, onCancel }) => {
  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        await onCreate(values);
        resetForm();
        onCancel();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label>
            Заголовок
            <Field name="title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </label>

          <label>
            Текст
            <Field as="textarea" name="content" className={css.textarea} />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </label>

          <div className={css.actions}>
            <button type="submit" disabled={isSubmitting}>
              Створити
            </button>
            <button type="button" onClick={onCancel}>
              Скасувати
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
