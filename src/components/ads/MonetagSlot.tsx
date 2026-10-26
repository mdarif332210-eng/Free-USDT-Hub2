import React, { useEffect, useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface MonetagSlotProps {
  slotType: 'banner' | 'inPagePush' | 'native' | 'vignette';
  zoneId?: string;
  className?: string;
}

export const MonetagSlot: React.FC<MonetagSlotProps> = ({ slotType, zoneId, className = '' }) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [publisherTagActive, setPublisherTagActive] = useState(false);

  useEffect(() => {
    // Check if the owner's Monetag verification meta tag exists in DOM
    const metaTag = document.querySelector('meta[name="monetag"]');
    if (metaTag && metaTag.getAttribute('content') === '6403520c5cf5d7c84f05b9b0223f05c7') {
      setPublisherTagActive(true);
    }

    // Check if zoneId or global Monetag script is injected
    if (zoneId || (window as any).monetag) {
      setIsConfigured(true);
    }
  }, [zoneId]);

  return (
    <aside
      aria-label="Monetag Sponsored Placement"
      className={`my-6 p-4 rounded-2xl neu-inset text-xs text-[#6D7080] border border-slate-200/60 overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 mb-3">
        <span className="font-semibold tracking-wide uppercase text-[10px] text-slate-500 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#6C3BDB]" />
          Monetag Sponsor Slot · {slotType.toUpperCase()}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          {publisherTagActive ? 'Tag Verified (64035...)' : 'Verification Ready'}
        </span>
      </div>

      {isConfigured ? (
        <div id={`monetag-zone-${zoneId || slotType}`} className="min-h-[90px] flex items-center justify-center text-center">
          {/* Real Monetag script zone container */}
        </div>
      ) : (
        <div className="py-3 px-4 rounded-xl bg-white/70 border border-slate-200/60 text-center">
          <p className="font-medium text-slate-700 mb-1">Official Monetag Placement Container</p>
          <p className="text-[11px] text-slate-500 max-w-xl mx-auto">
            Configured with publisher verification token <code className="font-mono text-purple-700">6403520c5cf5d7c84f05b9b0223f05c7</code>.
            Ad scripts load strictly through authorized zones without deceptive redirects or forced clicks.
          </p>
        </div>
      )}
    </aside>
  );
};
