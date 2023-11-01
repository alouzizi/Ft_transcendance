import { createContext, useContext } from "react";

export interface Padlle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  score: number;
}

export interface Ball {
  x: number;
  y: number;
  radius: number;
  speed: number;
  velocityX: number;
  velocityY: number;
  color: string;
}

export interface Canvas {
  width: number;
  height: number;
}

export const canvasContext = createContext<Canvas | undefined>(undefined);

export function useCanvas() {
  const canvas = useContext(canvasContext);
  if (canvas === undefined) {
    throw new Error("canvasContext is undefined");
  }
  return canvas;
}
