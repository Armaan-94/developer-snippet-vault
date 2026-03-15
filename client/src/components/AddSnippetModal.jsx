import { useState } from "react";
import { createSnippet } from "../api/snippetApi";
import toast from "react-hot-toast";

function AddSnippetModal({ closeModal, refresh }) {

  const [form, setForm] = useState({
    title: "",
    language: "",
    description: "",
    code: "",
    tags: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {

    await createSnippet({
      ...form,
      tags: form.tags.split(",")
    });

    toast.success("Snippet created");

    refresh();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-xl w-[500px] space-y-4">

        <h2 className="text-xl font-bold">
          Create Snippet
        </h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="language"
          placeholder="Language"
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <textarea
          name="code"
          placeholder="Code"
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded h-32"
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <div className="flex gap-3">

          <button
            onClick={submit}
            className="bg-emerald-600 px-4 py-2 rounded"
          >
            Create
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

export default AddSnippetModal;