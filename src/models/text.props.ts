import { ReactNode } from "react";

export interface TextProps {
    children: ReactNode;
    variant?: "title" | "subtitle" | "body" | "caption";
    className?: string;
}