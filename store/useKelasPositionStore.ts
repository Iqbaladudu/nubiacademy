import { createStore } from "zustand";

interface BaseNavPosition {
  lesson_id: string;
  title: string;
}

interface NextPosition extends BaseNavPosition {
  next_module?: string;
}

interface PrevPosition extends BaseNavPosition {
  prev_module?: string;
}

interface CurrentPosition extends BaseNavPosition {}

export interface KelasPositionState {
  previous: PrevPosition;
  next: NextPosition;
  current: CurrentPosition;
}

export interface KelasPositionAction {
  setPrevious: (data: PrevPosition) => void;
  setNext: (data: NextPosition) => void;
  setCurrent: (data: CurrentPosition) => void;
}

const defaultInitState: KelasPositionState = {
  previous: {
    lesson_id: "",
    title: "",
    prev_module: "",
  },
  next: {
    lesson_id: "",
    title: "",
    next_module: "",
  },
  current: {
    lesson_id: "",
    title: "",
  },
};

export type KelasPositionStore = KelasPositionState & KelasPositionAction;

export const initKelasPosition = (): KelasPositionState => {
  return {
    previous: {
      lesson_id: "",
      title: "",
      prev_module: "",
    },
    next: {
      lesson_id: "",
      title: "",
      next_module: "",
    },
    current: {
      lesson_id: "",
      title: "",
    },
  };
};

export const createKelasPositionStore = (
  initState: KelasPositionState = defaultInitState
) => {
  return createStore<KelasPositionStore>()((set) => ({
    ...initState,
    setNext: (data: NextPosition) => set(() => ({ next: { ...data } })),
    setPrevious: (data: PrevPosition) => set(() => ({ previous: { ...data } })),
    setCurrent: (data: CurrentPosition) =>
      set(() => ({ current: { ...data } })),
  }));
};
