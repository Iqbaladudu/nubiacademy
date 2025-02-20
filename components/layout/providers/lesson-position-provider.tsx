"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  createKelasPositionStore,
  initKelasPosition,
  KelasPositionStore,
} from "@/store/useKelasPositionStore";

export type LessonPositionStoreApi = ReturnType<
  typeof createKelasPositionStore
>;

export const LessonPositionContext = createContext<
  LessonPositionStoreApi | undefined
>(undefined);

export interface LessonPositionStoreProviderProps {
  children: ReactNode;
}

export const LessonPositionProvider: React.FC<
  LessonPositionStoreProviderProps
> = ({ children }) => {
  const storeRef = useRef<LessonPositionStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createKelasPositionStore(initKelasPosition());
  }

  return (
    <LessonPositionContext.Provider value={storeRef.current}>
      {children}
    </LessonPositionContext.Provider>
  );
};

export const useLessonPositionStore = <T,>(
  selector: (store: KelasPositionStore) => T,
): T => {
  const lessonPositionStoreContext = useContext(LessonPositionContext);

  if (!lessonPositionStoreContext) {
    throw new Error("Terdapat kesalahan");
  }

  return useStore(lessonPositionStoreContext, selector);
};
