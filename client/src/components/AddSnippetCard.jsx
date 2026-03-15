import { motion } from "framer-motion";

function AddSnippetCard({ openModal }) {

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={openModal}
      className="bg-gray-900 border-2 border-dashed border-gray-700 hover:border-emerald-500 flex items-center justify-center rounded-xl cursor-pointer h-[200px]"
    >

      <div className="text-center text-gray-400">

        <div className="text-4xl font-bold">+</div>

        <p className="mt-2 text-sm">
          Create New Snippet
        </p>

      </div>

    </motion.div>
  );
}

export default AddSnippetCard;