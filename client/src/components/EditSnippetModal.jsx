import { useState } from "react";
import { updateSnippet } from "../api/snippetApi";
import toast from "react-hot-toast";

function EditSnippetModal({ snippet, closeModal, refresh }) {

  const [form, setForm] = useState({
    title: snippet.title,
    language: snippet.language,
    code: snippet.code,
    tags: snippet.tags.join(",")
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = async () => {

    try {

      await updateSnippet(snippet._id, {
        ...form,
        tags: form.tags.split(",")
      });

      toast.success("Snippet updated");

      refresh();

      closeModal();

    } catch {

      toast.error("Update failed");

    }

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-xl w-[500px] space-y-4">

        <h2 className="text-xl font-bold">
          Edit Snippet
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <textarea
          name="code"
          value={form.code}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded h-32"
        />

        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <div className="flex gap-3">

          <button
            onClick={submit}
            className="bg-emerald-600 px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={closeModal}
            className="bg-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditSnippetModal;