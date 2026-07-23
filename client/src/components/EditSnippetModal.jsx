import { useState } from "react";
import { updateSnippet } from "../api/snippetApi";
import toast from "react-hot-toast";
import Modal from "./ui/Modal";
import SnippetForm from "./SnippetForm";
import { toTagsArray, fromTagsArray } from "../lib/snippet";

function EditSnippetModal({ open, snippet, closeModal, refresh }) {
  const [submitting, setSubmitting] = useState(false);

  const submit = async (form) => {
    setSubmitting(true);
    try {
      await updateSnippet(snippet._id, {
        ...form,
        tags: toTagsArray(form.tags),
      });

      toast.success("Snippet updated");
      refresh();
      closeModal();
    } catch {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={submitting ? undefined : closeModal}
      title="Edit snippet"
      description="Update the details of your saved snippet."
    >
      <SnippetForm
        initial={{
          title: snippet.title,
          language: snippet.language,
          description: snippet.description || "",
          code: snippet.code,
          tags: fromTagsArray(snippet.tags),
        }}
        onSubmit={submit}
        onCancel={closeModal}
        submitLabel="Save changes"
        submitting={submitting}
      />
    </Modal>
  );
}

export default EditSnippetModal;
