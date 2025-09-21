import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote, type CreateNotePayload } from "../../services/noteService";
import type { NoteTag } from "../../types/note";

interface NoteFormProps {
  onCancel: () => void;
}

const noteTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const schema = Yup.object().shape({
  title: Yup.string().required("Enter title"),
  content: Yup.string().max(1000, "Content must be less than 1000 characters"),
  tag: Yup.string()
    .oneOf(noteTags, "Select a valid tag")
    .required("Select a tag"),
});

const NoteForm: React.FC<NoteFormProps> = ({ onCancel }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });
  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" as NoteTag }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        await mutation.mutateAsync(values as CreateNotePayload);
        resetForm();
      }}
    >
      {() => (
        <Form className={css.form}>
          <label className={css.formGroup}>
            Title
            <Field name="title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </label>

          <label className={css.formGroup}>
            Content
            <Field as="textarea" name="content" className={css.textarea} />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </label>

          <label className={css.formGroup}>
            Tag
            <Field as="select" name="tag" className={css.select}>
              {noteTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </label>

          <div className={css.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className={css.submitButton}
            >
              Create
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
