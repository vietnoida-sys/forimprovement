import { useEffect, useState } from "react";
import {
  LayoutTemplate,
  Image as ImageIcon,
  FileText,
  MessageSquareQuote,
  HelpCircle,
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Eye,
  EyeOff,
  Star,
  Loader2,
} from "lucide-react";
import "./CMS.css";
import { cmsApi as api } from "../api/axiosClient";

/* ---------------------------------------------------------
   Website Content Management
   Each section (banners, blog posts, testimonials, FAQs,
   news & events) is backed by the Express + MongoDB API in
   /cms-backend. Data is fetched on mount and every create /
   edit / delete goes straight to the API — nothing is stored
   only in memory anymore. See api.js for the fetch wrapper.
--------------------------------------------------------- */

const TABS = [
  { id: "banners", label: "Homepage Banners", icon: ImageIcon },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "news", label: "News & Events", icon: CalendarDays },
];

/* ---------- shared bits ---------- */

function EmptyState({ label, onAdd }) {
  return (
    <div className="cms-empty">
      <p>Nothing here yet.</p>
      <button className="cms-btn-primary" onClick={onAdd}>
        <Plus size={15} /> {label}
      </button>
    </div>
  );
}

function SectionHeader({ title, description, actionLabel, onAdd }) {
  return (
    <div className="cms-section-header">
      <div>
        <h2 className="cms-section-title">{title}</h2>
        <p className="cms-section-desc">{description}</p>
      </div>
      <button className="cms-btn-primary" onClick={onAdd}>
        <Plus size={16} /> {actionLabel}
      </button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="cms-field">
      <span className="cms-field-label">{label}</span>
      {children}
    </label>
  );
}

function Modal({ title, onClose, onSave, saving, children, saveLabel = "Save" }) {
  return (
    <div className="cms-modal-overlay">
      <div className="cms-modal">
        <div className="cms-modal-header">
          <h3 className="cms-modal-title">{title}</h3>
          <button className="cms-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="cms-modal-body">{children}</div>
        <div className="cms-modal-footer">
          <button className="cms-btn-secondary" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button className="cms-btn-primary" onClick={onSave} disabled={saving}>
            {saving ? <Loader2 size={15} className="cms-spin" /> : <Check size={15} />}
            {saving ? "Saving..." : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDelete({ label, onCancel, onConfirm, deleting }) {
  return (
    <div className="cms-confirm-overlay">
      <div className="cms-confirm">
        <h3 className="cms-confirm-title">Delete this item?</h3>
        <p className="cms-confirm-text">
          "{label}" will be removed permanently. This can't be undone.
        </p>
        <div className="cms-confirm-actions">
          <button className="cms-btn-secondary" onClick={onCancel} disabled={deleting}>
            Cancel
          </button>
          <button className="cms-btn-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ active, onLabel = "Published", offLabel = "Draft" }) {
  return (
    <span className={`cms-pill ${active ? "on" : "off"}`}>
      {active ? <Eye size={11} /> : <EyeOff size={11} />}
      {active ? onLabel : offLabel}
    </span>
  );
}

function LoadingState() {
  return (
    <div className="cms-loading">
      <Loader2 size={18} className="cms-spin" />
      Loading...
    </div>
  );
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="cms-error">
      <span>{message}</span>
      {onRetry && (
        <button className="cms-btn-outline" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

/* ---------- Banners ---------- */

function BannersSection() {
  const resource = "banners";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const blank = { heading: "", subheading: "", imageUrl: "", active: true };

  const load = () => {
    setLoading(true);
    setError(null);
    api
      .list(resource)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    if (!editing.heading.trim()) return;
    setSaving(true);
    try {
      if (editing._id) {
        const updated = await api.update(resource, editing._id, editing);
        setItems((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      } else {
        const created = await api.create(resource, editing);
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (banner) => {
    try {
      const updated = await api.update(resource, banner._id, { active: !banner.active });
      setItems((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.remove(resource, deleting._id);
      setItems((prev) => prev.filter((b) => b._id !== deleting._id));
      setDeleting(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Homepage Banners"
        description="Control the rotating banners shown at the top of your homepage."
        actionLabel="Add Banner"
        onAdd={() => setEditing({ ...blank })}
      />
      {error && <ErrorBanner message={error} onRetry={load} />}
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState label="Add Banner" onAdd={() => setEditing({ ...blank })} />
      ) : (
        <div className="cms-banner-list">
          {items.map((b) => (
            <div key={b._id} className="cms-banner-item">
              <div className="cms-banner-thumb">
                <ImageIcon size={20} />
              </div>
              <div className="cms-item-info">
                <div className="cms-item-title-row">
                  <p className="cms-item-title">{b.heading}</p>
                  <StatusPill active={b.active} onLabel="Live" offLabel="Hidden" />
                </div>
                <p className="cms-item-subtitle">{b.subheading}</p>
              </div>
              <div className="cms-item-actions">
                <button
                  className="cms-icon-btn"
                  title={b.active ? "Hide banner" : "Show banner"}
                  onClick={() => toggleActive(b)}
                >
                  {b.active ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button className="cms-icon-btn" onClick={() => setEditing(b)}>
                  <Pencil size={16} />
                </button>
                <button className="cms-icon-btn danger" onClick={() => setDeleting(b)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal
          title={editing._id ? "Edit Banner" : "Add Banner"}
          onClose={() => setEditing(null)}
          onSave={save}
          saving={saving}
        >
          <Field label="Heading">
            <input
              className="cms-input"
              value={editing.heading}
              onChange={(e) => setEditing({ ...editing, heading: e.target.value })}
              placeholder="Summer Collection Is Here"
            />
          </Field>
          <Field label="Subheading">
            <input
              className="cms-input"
              value={editing.subheading}
              onChange={(e) => setEditing({ ...editing, subheading: e.target.value })}
              placeholder="Shop new arrivals before they're gone"
            />
          </Field>
          <Field label="Image URL">
            <input
              className="cms-input"
              value={editing.imageUrl}
              onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </Field>
          <label className="cms-checkbox-label">
            <input
              type="checkbox"
              checked={editing.active}
              onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
            />
            Show on homepage
          </label>
        </Modal>
      )}

      {deleting && (
        <ConfirmDelete
          label={deleting.heading}
          deleting={deleteBusy}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

/* ---------- Blog Posts ---------- */

function BlogSection() {
  const resource = "blog-posts";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const blank = {
    title: "",
    author: "",
    excerpt: "",
    content: "",
    status: "draft",
    date: new Date().toISOString().slice(0, 10),
  };

  const load = () => {
    setLoading(true);
    setError(null);
    api
      .list(resource)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    if (!editing.title.trim()) return;
    setSaving(true);
    try {
      if (editing._id) {
        const updated = await api.update(resource, editing._id, editing);
        setItems((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      } else {
        const created = await api.create(resource, editing);
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (post) => {
    const status = post.status === "published" ? "draft" : "published";
    try {
      const updated = await api.update(resource, post._id, { status });
      setItems((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.remove(resource, deleting._id);
      setItems((prev) => prev.filter((p) => p._id !== deleting._id));
      setDeleting(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Blog Posts"
        description="Write, edit, and publish articles shown on your public blog."
        actionLabel="New Post"
        onAdd={() => setEditing({ ...blank })}
      />
      {error && <ErrorBanner message={error} onRetry={load} />}
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState label="New Post" onAdd={() => setEditing({ ...blank })} />
      ) : (
        <div className="cms-list">
          {items.map((p) => (
            <div key={p._id} className="cms-list-item">
              <div className="cms-item-info">
                <div className="cms-item-title-row">
                  <p className="cms-item-title">{p.title}</p>
                  <StatusPill active={p.status === "published"} />
                </div>
                <p className="cms-item-subtitle">
                  {p.author} · {p.date}
                </p>
              </div>
              <div className="cms-item-actions">
                <button className="cms-btn-outline" onClick={() => toggleStatus(p)}>
                  {p.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button className="cms-icon-btn" onClick={() => setEditing(p)}>
                  <Pencil size={16} />
                </button>
                <button className="cms-icon-btn danger" onClick={() => setDeleting(p)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal
          title={editing._id ? "Edit Post" : "New Post"}
          onClose={() => setEditing(null)}
          onSave={save}
          saving={saving}
        >
          <Field label="Title">
            <input
              className="cms-input"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="5 Tips for a Better Workflow"
            />
          </Field>
          <div className="cms-form-row">
            <Field label="Author">
              <input
                className="cms-input"
                value={editing.author}
                onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                placeholder="Jordan Lee"
              />
            </Field>
            <Field label="Publish date">
              <input
                type="date"
                className="cms-input"
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Excerpt">
            <textarea
              className="cms-input"
              rows={2}
              value={editing.excerpt}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              placeholder="One or two sentences shown in the blog list"
            />
          </Field>
          <Field label="Content">
            <textarea
              className="cms-input"
              rows={6}
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              placeholder="Write the full post..."
            />
          </Field>
          <Field label="Status">
            <select
              className="cms-input"
              value={editing.status}
              onChange={(e) => setEditing({ ...editing, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </Modal>
      )}

      {deleting && (
        <ConfirmDelete
          label={deleting.title}
          deleting={deleteBusy}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

/* ---------- Testimonials ---------- */

function TestimonialsSection() {
  const resource = "testimonials";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  // Matches the public Feedback page card: title, name, country, rating, text
  const blank = { title: "", name: "", country: "", quote: "", rating: 5, active: true };

  const load = () => {
    setLoading(true);
    setError(null);
    api
      .list(resource)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    if (!editing.title.trim() || !editing.name.trim() || !editing.quote.trim()) return;
    setSaving(true);
    try {
      if (editing._id) {
        const updated = await api.update(resource, editing._id, editing);
        setItems((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      } else {
        const created = await api.create(resource, editing);
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.remove(resource, deleting._id);
      setItems((prev) => prev.filter((t) => t._id !== deleting._id));
      setDeleting(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Testimonials"
        description="Manage the customer quotes shown on your public site."
        actionLabel="Add Testimonial"
        onAdd={() => setEditing({ ...blank })}
      />
      {error && <ErrorBanner message={error} onRetry={load} />}
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState label="Add Testimonial" onAdd={() => setEditing({ ...blank })} />
      ) : (
        <div className="cms-grid">
          {items.map((t) => (
            <div key={t._id} className="cms-card">
              <div className="cms-card-top">
                <div className="cms-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < t.rating ? "#fbbf24" : "none"}
                      color={i < t.rating ? "#fbbf24" : "#e2e8f0"}
                    />
                  ))}
                </div>
                <StatusPill active={t.active} onLabel="Shown" offLabel="Hidden" />
              </div>
              <p className="cms-item-title" style={{ marginBottom: 4 }}>"{t.title}"</p>
              <p className="cms-quote">"{t.quote}"</p>
              <p className="cms-name">{t.name}</p>
              <p className="cms-role">{t.country}</p>
              <div className="cms-card-actions">
                <button className="cms-icon-btn" onClick={() => setEditing(t)}>
                  <Pencil size={15} />
                </button>
                <button className="cms-icon-btn danger" onClick={() => setDeleting(t)}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal
          title={editing._id ? "Edit Testimonial" : "Add Testimonial"}
          onClose={() => setEditing(null)}
          onSave={save}
          saving={saving}
        >
          <Field label="Review Title">
            <input
              className="cms-input"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Professional & Transparent Process"
            />
          </Field>
          <div className="cms-form-row">
            <Field label="Name">
              <input
                className="cms-input"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="Rahul Singh"
              />
            </Field>
            <Field label="Country">
              <input
                className="cms-input"
                value={editing.country}
                onChange={(e) => setEditing({ ...editing, country: e.target.value })}
                placeholder="Australia"
              />
            </Field>
          </div>
          <Field label="Quote / Text">
            <textarea
              className="cms-input"
              rows={4}
              value={editing.quote}
              onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
              placeholder="My admission process was handled very professionally..."
            />
          </Field>
          <Field label="Rating">
            <div className="cms-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  onClick={() => setEditing({ ...editing, rating: i + 1 })}
                >
                  <Star
                    size={20}
                    fill={i < editing.rating ? "#fbbf24" : "none"}
                    color={i < editing.rating ? "#fbbf24" : "#e2e8f0"}
                  />
                </button>
              ))}
            </div>
          </Field>
          <label className="cms-checkbox-label">
            <input
              type="checkbox"
              checked={editing.active}
              onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
            />
            Show on public site
          </label>
        </Modal>
      )}

      {deleting && (
        <ConfirmDelete
          label={deleting.name}
          deleting={deleteBusy}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

/* ---------- FAQs ---------- */

function FaqsSection() {
  const resource = "faqs";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const blank = { question: "", answer: "", category: "General" };

  const load = () => {
    setLoading(true);
    setError(null);
    api
      .list(resource)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    if (!editing.question.trim()) return;
    setSaving(true);
    try {
      if (editing._id) {
        const updated = await api.update(resource, editing._id, editing);
        setItems((prev) => prev.map((f) => (f._id === updated._id ? updated : f)));
      } else {
        const created = await api.create(resource, editing);
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.remove(resource, deleting._id);
      setItems((prev) => prev.filter((f) => f._id !== deleting._id));
      setDeleting(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="FAQs"
        description="Questions and answers shown on your site's help page."
        actionLabel="Add FAQ"
        onAdd={() => setEditing({ ...blank })}
      />
      {error && <ErrorBanner message={error} onRetry={load} />}
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState label="Add FAQ" onAdd={() => setEditing({ ...blank })} />
      ) : (
        <div className="cms-faq-list">
          {items.map((f) => (
            <div key={f._id} className="cms-faq-item">
              <div className="cms-faq-top">
                <div style={{ minWidth: 0 }}>
                  <span className="cms-faq-category">{f.category}</span>
                  <p className="cms-faq-question">{f.question}</p>
                  <p className="cms-faq-answer">{f.answer}</p>
                </div>
                <div className="cms-item-actions">
                  <button className="cms-icon-btn" onClick={() => setEditing(f)}>
                    <Pencil size={15} />
                  </button>
                  <button className="cms-icon-btn danger" onClick={() => setDeleting(f)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal
          title={editing._id ? "Edit FAQ" : "Add FAQ"}
          onClose={() => setEditing(null)}
          onSave={save}
          saving={saving}
        >
          <Field label="Question">
            <input
              className="cms-input"
              value={editing.question}
              onChange={(e) => setEditing({ ...editing, question: e.target.value })}
            />
          </Field>
          <Field label="Answer">
            <textarea
              className="cms-input"
              rows={3}
              value={editing.answer}
              onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
            />
          </Field>
          <Field label="Category">
            <input
              className="cms-input"
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              placeholder="Shipping, Returns, General..."
            />
          </Field>
        </Modal>
      )}

      {deleting && (
        <ConfirmDelete
          label={deleting.question}
          deleting={deleteBusy}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

/* ---------- News & Events ---------- */

function NewsEventsSection() {
  const resource = "news-events";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const blank = {
    title: "",
    type: "news",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  };

  const load = () => {
    setLoading(true);
    setError(null);
    api
      .list(resource)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    if (!editing.title.trim()) return;
    setSaving(true);
    try {
      if (editing._id) {
        const updated = await api.update(resource, editing._id, editing);
        setItems((prev) => prev.map((n) => (n._id === updated._id ? updated : n)));
      } else {
        const created = await api.create(resource, editing);
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.remove(resource, deleting._id);
      setItems((prev) => prev.filter((n) => n._id !== deleting._id));
      setDeleting(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="News & Events"
        description="Announcements and upcoming events shown on your site."
        actionLabel="Add Item"
        onAdd={() => setEditing({ ...blank })}
      />
      {error && <ErrorBanner message={error} onRetry={load} />}
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState label="Add Item" onAdd={() => setEditing({ ...blank })} />
      ) : (
        <div className="cms-faq-list">
          {items
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((n) => (
              <div key={n._id} className="cms-banner-item">
                <div className="cms-news-date">
                  <span className="cms-news-date-month">
                    {new Date(n.date + "T00:00:00").toLocaleString("en-US", { month: "short" })}
                  </span>
                  <span className="cms-news-date-day">
                    {new Date(n.date + "T00:00:00").getDate()}
                  </span>
                </div>
                <div className="cms-item-info">
                  <div className="cms-item-title-row">
                    <p className="cms-item-title">{n.title}</p>
                    <span className={`cms-news-type ${n.type}`}>{n.type}</span>
                  </div>
                  <p className="cms-item-subtitle">{n.description}</p>
                </div>
                <div className="cms-item-actions">
                  <button className="cms-icon-btn" onClick={() => setEditing(n)}>
                    <Pencil size={15} />
                  </button>
                  <button className="cms-icon-btn danger" onClick={() => setDeleting(n)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {editing && (
        <Modal
          title={editing._id ? "Edit Item" : "Add Item"}
          onClose={() => setEditing(null)}
          onSave={save}
          saving={saving}
        >
          <Field label="Title">
            <input
              className="cms-input"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
          </Field>
          <div className="cms-form-row">
            <Field label="Type">
              <select
                className="cms-input"
                value={editing.type}
                onChange={(e) => setEditing({ ...editing, type: e.target.value })}
              >
                <option value="news">News</option>
                <option value="event">Event</option>
              </select>
            </Field>
            <Field label="Date">
              <input
                type="date"
                className="cms-input"
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              className="cms-input"
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
          </Field>
        </Modal>
      )}

      {deleting && (
        <ConfirmDelete
          label={deleting.title}
          deleting={deleteBusy}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

/* ---------- Root ---------- */

export default function CMS() {
  const [tab, setTab] = useState("banners");

  return (
    <div className="cms-root">
      <div className="cms-header">
        <div className="cms-header-row">
          <div className="cms-header-icon">
            <LayoutTemplate size={18} />
          </div>
          <div>
            <h1 className="cms-header-title">Website Content Management</h1>
            <p className="cms-header-desc">Manage what visitors see on your public site.</p>
          </div>
        </div>
      </div>

      <div className="cms-body">
        <ul className="cms-nav">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <li key={t.id}>
                <button
                  className={`cms-nav-item ${active ? "active" : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  <Icon size={16} />
                  {t.label}
                </button>
              </li>
            );
          })}
        </ul>

        <main className="cms-main">
          {tab === "banners" && <BannersSection />}
          {tab === "blog" && <BlogSection />}
          {tab === "testimonials" && <TestimonialsSection />}
          {tab === "faqs" && <FaqsSection />}
          {tab === "news" && <NewsEventsSection />}
        </main>
      </div>
    </div>
  );
}