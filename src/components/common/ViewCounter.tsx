import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { formatViews } from '../../lib/market-calculator';

interface ViewCounterProps {
  slug: string;
  initialViews?: number;
  incrementOnMount?: boolean;
  className?: string;
}

export const ViewCounter: React.FC<ViewCounterProps> = ({
  slug,
  initialViews = 0,
  incrementOnMount = false,
  className = '',
}) => {
  const [views, setViews] = useState<number>(initialViews);

  useEffect(() => {
    let isMounted = true;

    async function handleViews() {
      if (incrementOnMount) {
        try {
          const res = await fetch(`/api/posts/${slug}/views`, { method: 'POST' });
          const data = await res.json();
          if (isMounted && data.success && typeof data.views === 'number') {
            setViews(data.views);
            return;
          }
        } catch (err) {
          // silently retain initial count
        }
      }

      // If not incrementing or if increment failed, fetch latest count
      try {
        const res = await fetch(`/api/posts/${slug}/views`);
        const data = await res.json();
        if (isMounted && data.success && typeof data.views === 'number') {
          setViews(data.views);
        }
      } catch (err) {
        // retain
      }
    }

    handleViews();

    return () => {
      isMounted = false;
    };
  }, [slug, incrementOnMount]);

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-[#6D7080] font-mono tabular-nums ${className}`}>
      <Eye className="w-3.5 h-3.5 text-slate-500" aria-label="Views" />
      <span>{formatViews(views)}</span>
    </span>
  );
};
