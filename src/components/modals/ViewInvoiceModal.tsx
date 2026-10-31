import React from 'react';
import { X, Printer, CheckCircle, Ban, Send, Download } from 'lucide-react';
import { useBrightloop } from '../../context/BrightloopContext';
import { Invoice } from '../../types';

interface ViewInvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const ViewInvoiceModal: React.FC<ViewInvoiceModalProps> = ({ invoice, onClose }) => {
  const { markInvoiceAsPaid, voidInvoice, formatCurrency, showToast } = useBrightloop();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendReminder = () => {
    showToast('Reminder Sent', `Payment reminder emailed to ${invoice.customerEmail}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Invoice Document</span>
            <span className="font-mono text-xs text-slate-500">#{invoice.number}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / PDF</span>
            </button>

            {invoice.status !== 'paid' && invoice.status !== 'void' && (
              <>
                <button
                  onClick={handleSendReminder}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Send Notice</span>
                </button>
                <button
                  onClick={() => {
                    markInvoiceAsPaid(invoice.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Mark Paid</span>
                </button>
              </>
            )}

            {invoice.status === 'open' && (
              <button
                onClick={() => {
                  voidInvoice(invoice.id);
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                title="Void Invoice"
              >
                <Ban className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Invoice Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-10 space-y-8 bg-white print:p-0">
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  BL
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  Brightloop Inc.
                </span>
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                450 Sansome Street, 10th Floor<br />
                San Francisco, CA 94111, USA<br />
                billing@brightloop.io · Tax ID: US-88291048
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
                Invoice
              </div>
              <div className="text-xs font-mono font-semibold text-slate-700">
                {invoice.number}
              </div>
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                  invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  invoice.status === 'overdue' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  invoice.status === 'void' ? 'bg-slate-200 text-slate-600 border border-slate-300' :
                  'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>

          {/* Bill To & Meta Grid */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Billed To
              </span>
              <div className="font-bold text-slate-900 text-sm">{invoice.company}</div>
              <div className="text-slate-600 mt-0.5">{invoice.customerName}</div>
              <div className="text-slate-500 font-mono">{invoice.customerEmail}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-right">
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                  Issue Date
                </span>
                <span className="text-slate-700 font-mono">{invoice.issueDate}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                  Due Date
                </span>
                <span className="text-slate-900 font-bold font-mono">{invoice.dueDate}</span>
              </div>
              {invoice.paidDate && (
                <div className="col-span-2 text-emerald-600 font-medium font-mono text-[11px]">
                  Paid in full on {invoice.paidDate} {invoice.paymentMethod ? `via ${invoice.paymentMethod}` : ''}
                </div>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-center w-16">Qty</th>
                  <th className="px-4 py-3 text-right w-24">Unit Rate</th>
                  <th className="px-4 py-3 text-right w-28">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-slate-800 font-medium">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-center font-mono">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-right font-mono">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-4 py-3 text-slate-900 font-semibold text-right font-mono">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation Summary */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono text-slate-800 font-medium">{formatCurrency(invoice.subtotal)}</span>
              </div>
              {invoice.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promotional Discount:</span>
                  <span className="font-mono">-{formatCurrency(invoice.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Sales Tax / VAT:</span>
                <span className="font-mono text-slate-800 font-medium">{formatCurrency(invoice.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Due:</span>
                <span className="font-mono text-blue-600">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes & Bank Details */}
          {invoice.notes && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800 block mb-0.5">Notes & Remittance:</span>
              {invoice.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
