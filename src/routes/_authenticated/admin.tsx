import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  listApplications,
  updateApplicationStatus,
  getResumeSignedUrl,
  type ApplicationStatus,
} from "@/lib/admin-applications.functions";
import { Loader2, Download, LogOut, Search, FileText } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Pushpa Online Tuition" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  qualification: string | null;
  subjects: string | null;
  experience: string | null;
  preferred_location: string | null;
  availability: string | null;
  resume_url: string | null;
  status: ApplicationStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const listFn = useServerFn(listApplications);
  const updateFn = useServerFn(updateApplicationStatus);
  const signFn = useServerFn(getResumeSignedUrl);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [selected, setSelected] = useState<Application | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: () => listFn(),
  });

  useEffect(() => {
    if (error) toast.error(error instanceof Error ? error.message : "Failed to load");
  }, [error]);

  const applications = (data?.applications ?? []) as Application[];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!q) return true;
      return [a.full_name, a.email, a.phone, a.country, a.subjects, a.qualification]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [applications, search, statusFilter]);

  const counts = useMemo(() => {
    const c = { all: applications.length, pending: 0, approved: 0, rejected: 0 };
    for (const a of applications) c[a.status]++;
    return c;
  }, [applications]);

  const updateMut = useMutation({
    mutationFn: (vars: { id: string; status: ApplicationStatus; admin_notes?: string | null }) =>
      updateFn({ data: vars }),
    onSuccess: () => {
      toast.success("Application updated");
      qc.invalidateQueries({ queryKey: ["admin-applications"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Update failed"),
  });

  async function handleDownloadResume(app: Application) {
    if (!app.resume_url) return;
    try {
      const { url } = await signFn({ data: { resume_url: app.resume_url } });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not open resume");
    }
  }

  function handleExportCsv() {
    const rows = filtered;
    const headers = [
      "id", "created_at", "status", "full_name", "email", "phone", "country",
      "qualification", "subjects", "preferred_location", "availability", "experience",
      "resume_url", "admin_notes",
    ];
    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => esc((r as any)[h])).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tutor-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/auth" });
  }

  return (
    <div className="container-page py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Tutor Applications</h1>
          <p className="text-sm text-muted-foreground">Review, filter, and update submissions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-secondary"
          >
            <Download className="size-4" /> Export CSV
          </button>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-secondary"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(["all", "pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s as any)}
            className={`rounded-lg border p-4 text-left transition ${
              statusFilter === s ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-secondary/50"
            }`}
          >
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{s}</div>
            <div className="mt-1 text-2xl font-semibold">{counts[s as keyof typeof counts]}</div>
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, subject…"
            className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex items-center justify-center text-muted-foreground">
            <Loader2 className="size-5 animate-spin mr-2" /> Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground text-sm">No applications match your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Contact</th>
                  <th className="text-left px-4 py-3">Subjects</th>
                  <th className="text-left px-4 py-3">Submitted</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-t border-border hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <button className="font-medium text-left hover:underline" onClick={() => setSelected(a)}>
                        {a.full_name}
                      </button>
                      {a.country && <div className="text-xs text-muted-foreground">{a.country}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div>{a.email}</div>
                      {a.phone && <div className="text-xs text-muted-foreground">{a.phone}</div>}
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">{a.subjects ?? "—"}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelected(a)}
                        className="text-primary hover:underline text-xs font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <DetailDrawer
          app={selected}
          onClose={() => setSelected(null)}
          onDownloadResume={() => handleDownloadResume(selected)}
          onUpdate={(status, notes) =>
            updateMut.mutate(
              { id: selected.id, status, admin_notes: notes },
              {
                onSuccess: () => setSelected((s) => (s ? { ...s, status, admin_notes: notes ?? null } : s)),
              },
            )
          }
          saving={updateMut.isPending}
        />
      )}
    </div>
  );
}

function DetailDrawer({
  app,
  onClose,
  onDownloadResume,
  onUpdate,
  saving,
}: {
  app: Application;
  onClose: () => void;
  onDownloadResume: () => void;
  onUpdate: (status: ApplicationStatus, notes: string | null) => void;
  saving: boolean;
}) {
  const [status, setStatus] = useState<ApplicationStatus>(app.status);
  const [notes, setNotes] = useState(app.admin_notes ?? "");

  useEffect(() => {
    setStatus(app.status);
    setNotes(app.admin_notes ?? "");
  }, [app.id]);

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-full max-w-lg bg-background border-l border-border overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-semibold">{app.full_name}</h2>
              <p className="text-sm text-muted-foreground">{app.email}</p>
            </div>
            <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">Close</button>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-sm">
            <Field label="Phone" value={app.phone} />
            <Field label="Country" value={app.country} />
            <Field label="Qualification" value={app.qualification} />
            <Field label="Subjects" value={app.subjects} />
            <Field label="Preferred Location" value={app.preferred_location} />
            <Field label="Availability" value={app.availability} />
            <Field label="Experience" value={app.experience} multiline />
            <Field label="Submitted" value={new Date(app.created_at).toLocaleString()} />
          </dl>

          {app.resume_url && (
            <button
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              <FileText className="size-4" /> View Resume
            </button>
          )}

          <div className="pt-4 border-t border-border space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Admin notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={() => onUpdate(status, notes.trim() ? notes : null)}
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Save changes
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, value, multiline }: { label: string; value: string | null; multiline?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`mt-0.5 text-foreground ${multiline ? "whitespace-pre-wrap" : ""}`}>{value || "—"}</dd>
    </div>
  );
}