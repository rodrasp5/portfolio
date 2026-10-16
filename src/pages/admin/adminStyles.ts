export const input =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 disabled:bg-slate-50 disabled:text-slate-400";

export const labelCls = "mb-1.5 block text-sm font-medium text-slate-800";

export const pill = (active: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
    active
      ? "border-slate-900 bg-slate-900 text-white"
      : "border-slate-200 text-slate-600 hover:border-slate-400"
  }`;

export const primaryBtn =
  "rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

export const secondaryBtn =
  "rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";
