import type { CSSProperties } from "react";

type BarProps = {
  percentage: number;
  label: string;
  className?: string;
  style?: CSSProperties;
};

export function Bar({ percentage, label, className, style }: BarProps) {
  return (
    <div className="z-10 flex flex-row w-full">
      <p className="w-32 min-w-[128px] text-left">{label}</p>
      <div
        className={"relative flex items-center justify-center h-8" + className}
        style={{
          ...style,
          width: `${percentage}%`,
        }}
      >
        <div className="absolute -right-12">{percentage}%</div>
      </div>
    </div>
  );
}
