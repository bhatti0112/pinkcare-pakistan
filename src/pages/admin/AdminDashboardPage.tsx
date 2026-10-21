import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAKISTAN_FACILITIES, Facility } from '../../data/facilitiesData';
import { ARTICLES_DATA } from '../../data/articlesData';
import {
  Building2,
  FileText,
  ShieldCheck,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Flag,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'facilities' | 'articles' | 'logs' | 'reports'>('facilities');
  const [facilities, setFacilities] = useState<Facility[]>(PAKISTAN_FACILITIES);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      const facRes = await fetch('/api/v1/admin/facilities');
      if (facRes.ok) {
        const facData = await facRes.json();
        if (facData.facilities) setFacilities(facData.facilities);
      }

      const logRes = await fetch('/api/v1/admin/audit-logs');
      if (logRes.ok) {
        const logData = await logRes.json();
        if (logData.logs) setAuditLogs(logData.logs);
      }

      const repRes = await fetch('/api/v1/admin/reports');
      if (repRes.ok) {
        const repData = await repRes.json();
        if (repData.reports) setReports(repData.reports);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleVerifyFacility = async (facilityId: string) => {
    setVerifyingId(facilityId);
    try {
      const res = await fetch(`/api/v1/admin/facilities/${facilityId}/verify`, {
        method: 'POST',
      });
      if (res.ok) {
        setFacilities(prev =>
          prev.map(f =>
            f.id === facilityId
              ? {
                  ...f,
                  verification: {
                    ...f.verification,
                    status: 'verified',
                    lastVerifiedAt: new Date().toISOString().split('T')[0],
                  },
                }
              : f
          )
        );
        fetchAdminData();
      }
    } catch {
      // Fallback
    } finally {
      setVerifyingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } catch {
      // Fallback
    }
    sessionStorage.removeItem('pinkcare_admin_auth');
    sessionStorage.removeItem('pinkcare_admin_email');
    navigate('/admin/login');
  };

  return (
    <div className="py-8 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white border border-[#FCE7F3] rounded-3xl shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
              <ShieldCheck className="w-4 h-4" />
              <span>Administrative Control & Medical Verification Console</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#42152F] mt-1">
              PinkCare Management Portal
            </h1>
            <p className="text-xs text-[#625766]">
              Authenticated as: <strong className="text-[#42152F]">reviewer@pinkcare.pk</strong> (Role: Medical Administrator)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              title="Refresh administrative data"
              className="p-2 text-[#42152F] hover:bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-[#FCE7F3] rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#625766]">Verified Care Facilities</span>
              <Building2 className="w-4 h-4 text-[#E83E8C]" />
            </div>
            <div className="text-2xl font-extrabold text-[#42152F] mt-2 font-mono tabular-nums">
              {facilities.length}
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Accredited Pakistani institutions</span>
            </p>
          </div>

          <div className="p-5 bg-white border border-[#FCE7F3] rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#625766]">Published Articles</span>
              <FileText className="w-4 h-4 text-[#E83E8C]" />
            </div>
            <div className="text-2xl font-extrabold text-[#42152F] mt-2 font-mono tabular-nums">
              {ARTICLES_DATA.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Bilingual English & Urdu editions
            </p>
          </div>

          <div className="p-5 bg-white border border-[#FCE7F3] rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#625766]">Community Correction Reports</span>
              <Flag className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-[#42152F] mt-2 font-mono tabular-nums">
              {reports.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Submissions audited & queued
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#FCE7F3] pb-2 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'facilities'
                ? 'bg-[#E83E8C] text-white font-semibold'
                : 'text-[#625766] hover:bg-white'
            }`}
          >
            Verified Facilities ({facilities.length})
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'articles'
                ? 'bg-[#E83E8C] text-white font-semibold'
                : 'text-[#625766] hover:bg-white'
            }`}
          >
            Educational Articles ({ARTICLES_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-[#E83E8C] text-white font-semibold'
                : 'text-[#625766] hover:bg-white'
            }`}
          >
            Correction Reports ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'logs'
                ? 'bg-[#E83E8C] text-white font-semibold'
                : 'text-[#625766] hover:bg-white'
            }`}
          >
            Audit Log History
          </button>
        </div>

        {/* Content based on Active Tab */}
        {activeTab === 'facilities' && (
          <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#42152F]">Healthcare Facility Registry</h2>
              <span className="text-xs text-[#625766]">Strict provenance enforcement active</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#FCE7F3] text-[#625766] font-medium pb-2">
                    <th className="py-2.5">Facility Name</th>
                    <th>City / Province</th>
                    <th>Mammography</th>
                    <th>Status</th>
                    <th>Last Verified</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FCE7F3]">
                  {facilities.map((f) => (
                    <tr key={f.id} className="hover:bg-[#FFF8FB] transition-colors">
                      <td className="py-3 font-semibold text-[#42152F]">{f.name}</td>
                      <td className="text-[#625766]">{f.city}, {f.province}</td>
                      <td>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-medium">
                          Available
                        </span>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{f.verification.status}</span>
                        </span>
                      </td>
                      <td className="font-mono text-[#625766] tabular-nums">{f.verification.lastVerifiedAt}</td>
                      <td>
                        <button
                          onClick={() => handleVerifyFacility(f.id)}
                          disabled={verifyingId === f.id}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#E83E8C] hover:bg-[#FFF1F7] border border-[#FCE7F3] rounded-lg transition-colors"
                        >
                          {verifyingId === f.id ? 'Updating...' : 'Re-verify'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#42152F]">Medical Content Database</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#FCE7F3] text-[#625766] font-medium pb-2">
                    <th className="py-2.5">Title</th>
                    <th>Category</th>
                    <th>Clinical Reviewer</th>
                    <th>Review Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FCE7F3]">
                  {ARTICLES_DATA.map((art) => (
                    <tr key={art.id} className="hover:bg-[#FFF8FB] transition-colors">
                      <td className="py-3 font-semibold text-[#42152F]">{art.title}</td>
                      <td className="capitalize text-[#625766]">{art.category.replace('_', ' ')}</td>
                      <td className="text-emerald-700">{art.reviewer}</td>
                      <td className="font-mono text-[#625766] tabular-nums">{art.lastReviewedAt}</td>
                      <td>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-semibold">
                          Published
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 shadow-xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-[#42152F]">Community Correction Submissions</h2>
            {reports.length === 0 ? (
              <p className="text-slate-500 py-6 text-center">No pending correction reports in the queue.</p>
            ) : (
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-4 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3] space-y-1">
                    <div className="flex items-center justify-between font-semibold text-[#42152F]">
                      <span>{rep.facilityName}</span>
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                        {rep.status}
                      </span>
                    </div>
                    <p className="text-[#625766]">{rep.details}</p>
                    <div className="text-[10px] text-slate-400 pt-1 font-mono">
                      Reported at: {rep.submittedAt} {rep.reporterEmail && `by ${rep.reporterEmail}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 shadow-xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-[#42152F]">Security & Verification Audit Trail</h2>
            <div className="space-y-2 font-mono text-[11px] text-[#625766]">
              {auditLogs.length === 0 ? (
                <p className="text-slate-500 py-4 text-center font-sans">No audit logs recorded yet.</p>
              ) : (
                auditLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <span className="truncate">
                      [{log.timestamp}] {log.action}: {log.resourceType} {log.resourceId || ''} by {log.actorEmail}
                    </span>
                    <span className={`font-semibold shrink-0 ${log.status === 'SUCCESS' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {log.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
