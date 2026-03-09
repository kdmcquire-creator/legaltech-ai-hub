'use client';
import { Metadata } from "next";

// Note: metadata cannot be in 'use client' files directly. 
// I will keep it simple here as it inherits from layout, 
// or I would need to split it. For now, layout covers the base.
// But to be explicit, I'll provide a separate server component for metadata if needed.
// Actually, in Next.js 14, you usually split client logic into a separate client component.

export default function SubmitPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const url = formData.get('url');
    const description = formData.get('description');
    window.location.href = `mailto:kdmcquire@gmail.com?subject=New Tool Submission: ${name}&body=Tool Name: ${name}%0D%0ATool URL: ${url}%0D%0ADescription: ${description}`;
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Submit your LegalTech Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tool Name</label>
          <input name="name" required className="w-full p-2 border rounded text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tool URL</label>
          <input name="url" type="url" required className="w-full p-2 border rounded text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" required className="w-full p-2 border rounded text-black" rows={4}></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit via Email
        </button>
      </form>
    </div>
  );
}
