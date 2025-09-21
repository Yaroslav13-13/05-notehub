import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import type { CreateNotePayload } from "../../services/noteService";
import type { NoteTag } from "../../types/note";

interface NoteFormProps {
  onCreate: (payload: CreateNotePayload) => Promise<void> | void;
  onCancel: () => void;
}

const noteTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const schema = Yup.object().shape({
  title: Yup.string().required("Введіть заголовок"),
  content: Yup.string().required("Введіть текст"),
  tag: Yup.string()
    .oneOf(noteTags, "Оберіть валідний тег")
    .required("Введіть тег"),
});

const NoteForm: React.FC<NoteFormProps> = ({ onCreate, onCancel }) => {
  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" as NoteTag }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        await onCreate(values as CreateNotePayload);
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

          <label>
            Тег
            <Field as="select" name="tag" className={css.input}>
              {noteTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
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
