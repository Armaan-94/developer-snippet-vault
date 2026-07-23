import { useState } from "react";
import { Input, Textarea } from "./ui/Field";
import Button from "./ui/Button";

/**
 * Shared, presentational snippet form used by both the create and edit modals
 * (previously two near-identical copies). It owns only the form field state;
 * the actual API call stays in the parent so CRUD logic isn't touched here.
 *
 * onSubmit receives the raw values object: { title, language, description,
 * code, tags } where `tags` is still the comma-separated string.
 */
function SnippetForm({ initial, onSubmit, onCancel, submitLabel, submitting }) {
  const [form, setForm] = useState({
    title: "",
    language: "",
    description: "",
    code: "",
    tags: "",
    ...initial,
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Client-side guard mirrors the backend's required fields (title/language/code)
  const isValid =
    form.title.trim() && form.language.trim() && form.code.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          name="title"
          label="Title"
          placeholder="Debounce Function"
          value={form.title}
          onChange={handleChange}
          maxLength={100}
          autoComplete="off"
        />
        <Input
          name="language"
          label="Language"
          placeholder="JavaScript"
          value={form.language}
          onChange={handleChange}
          maxLength={30}
          autoComplete="off"
        />
      </div>

      <Input
        name="description"
        label="Description"
        placeholder="A short note about what this does (optional)"
        value={form.description}
        onChange={handleChange}
        maxLength={300}
        autoComplete="off"
      />

      <Textarea
        name="code"
        label="Code"
        placeholder="Paste your snippet here…"
        value={form.code}
        onChange={handleChange}
        rows={8}
        mono
        maxLength={5000}
        spellCheck={false}
      />

      <Input
        name="tags"
        label="Tags"
        hint="Separate tags with commas"
        placeholder="utility, performance"
        value={form.tags}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={submitting}
          disabled={!isValid}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default SnippetForm;
