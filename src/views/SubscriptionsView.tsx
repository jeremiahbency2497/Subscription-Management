import React, { useState } from 'react';
import {
  RefreshCw,
  Search,
  Plus,
  Filter,
  CheckCircle,
  Pause,
  Play,
  XCircle,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Download
} from 'lucide-react';
import { useBrightloop } from '../context/BrightloopContext';
import { Subscription } from '../types';

interface SubscriptionsViewProps {
  onOpenCreateSubscription: () => void;
  onOpenCustomerDetail: (customerId: string) => void;
}

export const SubscriptionsView: React.FC<SubscriptionsViewProps> = ({
  onOpenCreateSubscription,
  onOpenCustomerDetail
}) => {
  const {
    subscriptions,
    plans,
    formatCurrency,
    cancelSubscription,
    pauseSubscription,
    resumeSubscription,
    changeSubscriptionPlan,
    updateSubscription,
    showToast
  } = useBrightloop();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'in_trial' | 'past_due' | 'paused' | 'canceled'>('all');
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [newPlanSelection, setNewPlanSelection] = useState('');

  const filteredSubs = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.customerName.toLowerCase().includes(search.toLowerCase()) ||
      sub.company.toLowerCase().includes(search.toLowerCase()) ||
      sub.id.toLowerCase().includes(search.toLowerCase()) ||
      sub.planName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const trialCount = subscriptions.filter(s => s.status === 'in_trial').length;
  const pastDueCount = subscriptions.filter(s => s.status === 'past_due').length;
  const pausedCount = subscriptions.filter(s => s.status === 'paused').length;

  const handleExportCSV = () => {
    const headers = ['SubscriptionID,CustomerName,Company,Plan,Status,BillingCycle,Amount,StartDate,RenewalDate,AutoRenew'];
    const rows = filteredSubs.map(s =>
      `"${s.id}","${s.customerName}","${s.company}","${s.planName}","${s.status}","${s.billingCycle}",${s.amount},"${s.startDate}","${s.renewalDate}",${s.autoRenew}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `brightloop_subscriptions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export Generated', `${filteredSubs.length} subscription records exported.`);
  };

  const handleApplyTierChange = () => {
    if (!editingSub || !newPlanSelection) return;
    changeSubscriptionPlan(editingSub.id, newPlanSelection);
    setEditingSub(null);
    setNewPlanSelection('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Active Subscriptions</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>{subscriptions.length} total records</span>
            <span>·</span>
            <span className="text-emerald-600 font-medium">{activeCount} active</span>
            <span>·</span>
            <span className="text-blue-600 font-medium">{trialCount} in trial</span>
            {pastDueCount > 0 && (
              <>
                <span>·</span>
                <span className="text-rose-600 font-medium">{pastDueCount} past due</span>
              </>
            )}
            {pausedCount > 0 && (
              <>
                <span>·</span>
                <span className="text-amber-600 font-medium">{pausedCount} paused</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onOpenCreateSubscription}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Subscription</span>
          </button>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscriptions by company, customer or ID..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 bg-slate-50/50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
        </div>

        <div className="flex items-center p-1 bg-slate-100 rounded-lg overflow-x-auto">
          {(['all', 'active', 'in_trial', 'past_due', 'paused', 'canceled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Subscription / Account</th>
                <th className="px-5 py-3">Plan Tier</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-right">Cadence & Amount</th>
                <th className="px-5 py-3 text-center">Seats</th>
                <th className="px-5 py-3">Renewal Date</th>
                <th className="px-5 py-3 text-right">Lifecycle Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    No subscriptions found for the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredSubs.map((sub) => {
                  const monthlyEquivalent = sub.billingCycle === 'annual' ? Math.round(sub.amount / 12) : sub.amount;

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => onOpenCustomerDetail(sub.customerId)}
                          className="text-left group cursor-pointer"
                        >
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {sub.company}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                            <span>{sub.customerName}</span>
                            <span>·</span>
                            <span>{sub.id}</span>
                          </div>
                        </button>
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-slate-800">{sub.planName}</span>
                        <div className="text-[11px] text-slate-400 capitalize">
                          {sub.billingCycle} contract
                        </div>
                      </td>

                      <td className="px-5 py-3.5 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          sub.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                          sub.status === 'in_trial' ? 'bg-blue-100 text-blue-800' :
                          sub.status === 'past_due' ? 'bg-rose-100 text-rose-800' :
                          sub.status === 'paused' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {sub.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <div className="font-mono font-bold text-slate-900">
                          {formatCurrency(sub.amount)}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          ({formatCurrency(monthlyEquivalent)}/mo MRR)
                        </div>
                      </td>

                      <td className="px-5 py-3.5 text-center font-mono text-slate-700 font-medium">
                        {sub.seats}
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="font-mono text-slate-700">{sub.renewalDate}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <input
                            type="checkbox"
                            checked={sub.autoRenew}
                            onChange={(e) => updateSubscription(sub.id, { autoRenew: e.target.checked })}
                            className="w-3 h-3 text-blue-600 rounded border-slate-300"
                            title="Toggle Auto-renew"
                          />
                          <span>Auto-renew</span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingSub(sub);
                              setNewPlanSelection(sub.planId);
                            }}
                            className="px-2 py-1 text-[11px] font-medium text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                          >
                            Change Tier
                          </button>

                          {sub.status === 'active' && (
                            <button
                              onClick={() => pauseSubscription(sub.id)}
                              className="p-1 text-slate-400 hover:text-amber-600 rounded cursor-pointer"
                              title="Pause subscription"
                            >
                              <Pause className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {sub.status === 'paused' && (
                            <button
                              onClick={() => resumeSubscription(sub.id)}
                              className="p-1 text-slate-400 hover:text-emerald-600 rounded cursor-pointer"
                              title="Resume subscription"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {sub.status !== 'canceled' && (
                            <button
                              onClick={() => {
                                const reason = prompt('Please enter cancellation reason (e.g. budget cut, missing feature):');
                                if (reason !== null) {
                                  cancelSubscription(sub.id, reason);
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                              title="Cancel subscription"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Tier Modal */}
      {editingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Change Subscription Tier</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjusting tier for {editingSub.customerName} ({editingSub.company})
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Target Plan
              </label>
              <select
                value={newPlanSelection}
                onChange={(e) => setNewPlanSelection(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden bg-white"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatCurrency(editingSub.billingCycle === 'annual' ? p.priceAnnual : p.priceMonthly)} / {editingSub.billingCycle}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Current Tier:</span>
                <span className="font-semibold text-slate-900">{editingSub.planName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Immediate Pro-Rata Credit:</span>
                <span className="text-emerald-600 font-mono font-medium">Calculated automatically</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingSub(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyTierChange}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
              >
                Confirm Plan Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
