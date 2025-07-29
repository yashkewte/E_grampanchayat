import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }

    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
};

const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] });
  const toastTimeouts = React.useRef(new Map());

  const addToRemoveQueue = (toastId) => {
    if (toastTimeouts.current.has(toastId)) return;

    const timeout = setTimeout(() => {
      toastTimeouts.current.delete(toastId);
      dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.current.set(toastId, timeout);
  };

  const toast = React.useCallback((props) => {
    const id = genId();

    dispatch({
      type: actionTypes.ADD_TOAST,
      toast: {
        ...props,
        id,
        open: true,
      },
    });

    return id;
  }, []);

  const dismiss = React.useCallback((toastId) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });

    // Add to remove queue
    if (toastId) {
      addToRemoveQueue(toastId);
    } else {
      state.toasts.forEach((t) => addToRemoveQueue(t.id));
    }
  }, [state.toasts]);

  const value = {
    toasts: state.toasts,
    toast,
    dismiss,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
