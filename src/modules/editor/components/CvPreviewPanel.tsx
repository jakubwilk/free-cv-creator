'use client';

import { useEffect, useRef, useState } from 'react';

import { getTemplate } from '@editor/templates/registry';
import type { CVData, TemplateId } from '@editor/templates/_shared/types';

const A4_WIDTH_PX = 595;
const A4_HEIGHT_PX = 842;

interface CvPreviewPanelProps {
  data: CVData;
  templateId: TemplateId;
}

export function CvPreviewPanel({ data, templateId }: CvPreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const availableWidth = entries[0].contentRect.width - 48;
      if (availableWidth > 0) {
        setScale(Math.min(1, availableWidth / A4_WIDTH_PX));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const template = getTemplate(templateId);
  const TemplateComponent = template.component;

  return (
    <div ref={containerRef} className="w-full flex justify-center py-6">
      <div
        className="shrink-0 overflow-hidden relative rounded-sm"
        style={{
          width: A4_WIDTH_PX * scale,
          height: A4_HEIGHT_PX * scale,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            transform: `scale(${scale})`,
          }}
        >
          <TemplateComponent data={data} accentColor={data.meta.accentColor} />
        </div>
      </div>
    </div>
  );
}
