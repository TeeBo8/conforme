import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "h-4 w-4 border-2", md: "h-6 w-6 border-2", lg: "h-8 w-8 border-[3px]" };

export function Spinner({ className, size = "md" }: Props) {
  return (
    <div
      aria-label="Chargement…"
      className={cn(
        "animate-spin rounded-full border-white/20 border-t-white",
        sizes[size],
        className
      )}
    />
  );
}
