import { useEffect, useState } from "react";
import { GraduationCap, MapPin } from "lucide-react";
import api from "../../api/axiosClient";

export default function StudentUniversities() {
  const [unis, setUnis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/universities").then((res) => setUnis(res.data)).finally(() => setLoading(false));
  }, []);

  const filtered = unis.filter((u) =>
    (u.name + u.country + (u.city || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Universities</h1>
          <p>Browse universities your consultancy has listed for you.</p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <input className="search-input" placeholder="Search by name or country..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {!loading && filtered.length > 0 && (
          <div className="uni-grid">
            {filtered.map((u) => (
              <div key={u._id} className="uni-card">
                <div className="uni-icon"><GraduationCap size={20} /></div>
                <div className="uni-name">{u.name}</div>
                <div className="uni-meta"><MapPin size={13} /> {u.city ? `${u.city}, ` : ""}{u.country}</div>
                {u.ranking && <div className="uni-rank">Rank #{u.ranking}</div>}
                {u.description && <p className="uni-desc">{u.description}</p>}
              </div>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && <div className="empty-state">No universities found.</div>}
      </div>

      <style>{`
.portal-app {

        .uni-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 14px;
          padding: 18px;
        }
        .uni-card {
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-md);
          padding: 16px;
        }
        .uni-icon {
          width: 38px; height: 38px; border-radius: var(--radius-md);
          background: #eceeff; color: var(--indigo-600);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .uni-name { font-weight: 700; font-size: 14.5px; color: var(--slate-900); }
        .uni-meta { display: flex; align-items: center; gap: 4px; font-size: 12.5px; color: var(--slate-500); margin-top: 4px; }
        .uni-rank { font-size: 11.5px; color: var(--amber-500); font-weight: 700; margin-top: 6px; }
        .uni-desc { font-size: 12.5px; color: var(--slate-500); margin-top: 8px; line-height: 1.5; }
      
}
`}</style>
    </div>
  );
}
