export default function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: width }}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>

      <style>{`
.portal-app {

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 41, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }
        .modal-box {
          background: var(--white);
          border-radius: var(--radius-lg);
          width: 100%;
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(15, 23, 41, 0.25);
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 1px solid var(--slate-200);
          position: sticky;
          top: 0;
          background: var(--white);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        }
        .modal-header h3 { font-size: 17px; }
        .modal-close {
          border: none;
          background: transparent;
          font-size: 22px;
          color: var(--slate-500);
          line-height: 1;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .modal-close:hover { background: var(--slate-100); }
        .modal-body { padding: 20px 22px 24px; }
      
}
`}</style>
    </div>
  );
}
