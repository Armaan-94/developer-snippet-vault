import { useState } from "react";
import { createSnippet } from "../api/snippetApi";
import toast from "react-hot-toast";
import Modal from "./ui/Modal";
import SnippetForm from "./SnippetForm";
import { toTagsArray } from "../lib/snippet";

function AddSnippetModal({ open, closeModal, refresh }) {
  const [submitting, setSubmitting] = useState(false);

  const submit = async (form) => {
    setSubmitting(true);
    try {
      await createSnippet({
        ...form,
        tags: toTagsArray(form.tags),
      });

      toast.success("Snippet created");
      refresh();
      closeModal();
    } catch {
      toast.error("Failed to create snippet");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={submitting ? undefined : closeModal}
      title="Create snippet"
      description="Save a reusable piece of code to your vault."
    >
      <SnippetForm
        onSubmit={submit}
        onCancel={closeModal}
        submitLabel="Create snippet"
        submitting={submitting}
      />
    </Modal>
  );
}

export default AddSnippetModal;
