'use client';

import { useCallback, useState } from 'react';

import type { ICvEntry } from '../models';
import { duplicateICvEntry, loadCvList, saveCvList } from '../utils';

export function useCvList() {
  const [cvList, setCvList] = useState<ICvEntry[]>(() => loadCvList());

  const addCv = useCallback((entry: ICvEntry) => {
    setCvList((prev) => {
      const next = [entry, ...prev];
      saveCvList(next);
      return next;
    });
  }, []);

  const removeCv = useCallback((id: string) => {
    setCvList((prev) => {
      const next = prev.filter((cv) => cv.id !== id);
      saveCvList(next);
      return next;
    });
  }, []);

  const duplicateCv = useCallback((entry: ICvEntry) => {
    const copy = duplicateICvEntry(entry);
    setCvList((prev) => {
      const idx = prev.findIndex((cv) => cv.id === entry.id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      saveCvList(next);
      return next;
    });
    return copy;
  }, []);

  return { cvList, addCv, removeCv, duplicateCv };
}
