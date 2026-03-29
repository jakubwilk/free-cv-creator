'use client';

import { useCallback, useState } from 'react';

import type { CvEntry } from '../models';
import { duplicateCvEntry, loadCvList, saveCvList } from '../utils';

export function useCvList() {
  const [cvList, setCvList] = useState<CvEntry[]>(() => loadCvList());

  const addCv = useCallback((entry: CvEntry) => {
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

  const duplicateCv = useCallback((entry: CvEntry) => {
    const copy = duplicateCvEntry(entry);
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
