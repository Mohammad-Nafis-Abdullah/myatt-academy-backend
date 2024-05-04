"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      e.preventDefault(); // Prevent right-click context menu
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent keyboard shortcuts that open developer tools
      if (
        (e.ctrlKey && e.shiftKey && e.code === "KeyI") || // Ctrl+Shift+I
        (e.ctrlKey && e.code === "KeyU") || // Ctrl+U
        e.code === "F12"
      ) {
        // F12
        e.preventDefault();
      }
    };

    if (process.env.NODE_ENV === "production") {
      window.addEventListener("contextmenu", handleContextMenu);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return <Provider store={store}>{children}</Provider>;
};
