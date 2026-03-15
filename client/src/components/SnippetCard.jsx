import { motion } from "framer-motion";
import { deleteSnippet } from "../api/snippetApi";
import toast from "react-hot-toast";
import Prism from "prismjs";
import { useEffect, useState } from "react";

import EditSnippetModal from "./EditSnippetModal";

function SnippetCard({ snippet, refresh }) {

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippet]);

  const copyCode = () => {
    navigator.clipboard.writeText(snippet.code);
    toast.success("Code copied!");
  };

  const removeSnippet = async () => {

    await deleteSnippet(snippet._id);

    toast.success("Snippet deleted");

    refresh();

  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-emerald-500 flex flex-col justify-between"
      >

        <div>

          <h2 className="text-lg font-semibold">
            {snippet.title}
          </h2>

          <span className="text-xs bg-indigo-600 px-2 py-1 rounded mt-2 inline-block">
            {snippet.language}
          </span>

          <pre className="mt-4 rounded overflow-x-auto">
            <code className={`language-${snippet.language.toLowerCase()}`}>
              {snippet.code}
            </code>
          </pre>

        </div>

        <div className="flex gap-2 mt-4">

          <button
            onClick={copyCode}
            className="bg-emerald-600 px-3 py-1 rounded text-sm"
          >
            Copy
          </button>

          <button
            onClick={() => setShowEdit(true)}
            className="bg-yellow-600 px-3 py-1 rounded text-sm"
          >
            Edit
          </button>

          <button
            onClick={removeSnippet}
            className="bg-red-600 px-3 py-1 rounded text-sm"
          >
            Delete
          </button>

        </div>

      </motion.div>

      {showEdit && (
        <EditSnippetModal
          snippet={snippet}
          closeModal={() => setShowEdit(false)}
          refresh={refresh}
        />
      )}
    </>
  );
}

export default SnippetCard;