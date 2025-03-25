interface StatusIndicatorProps {
  text: string;
  bgColor: string;
  textColor: string;
  showWidth?: boolean;
  customWidth?: string;
}

export function StatusIndicator({ text, bgColor, textColor, showWidth = true, customWidth = "w-32" }: StatusIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4">
        <div
          className={`inline-flex items-center justify-center align-middle select-none font-bold text-center duration-300 ease-in text-sm py-2 px-4 rounded-full transition antialiased ${bgColor} ${textColor} ${showWidth ? customWidth : ""
            }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}