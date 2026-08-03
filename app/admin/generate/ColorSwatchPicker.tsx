"use client";

const presets = [
  "#ED1C24",
  "#B30006",
  "#1A1A1A",
  "#0288D1",
  "#2E7D32",
  "#DAA520",
  "#FFFFFF",
];

export default function ColorSwatchPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-wrap gap-1.5">
        {presets.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            aria-label={color}
            style={{ backgroundColor: color }}
            className={`h-6 w-6 rounded-full border transition-transform ${
              value.toUpperCase() === color
                ? "scale-110 border-text-primary"
                : "border-border"
            }`}
          />
        ))}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 rounded-lg border border-border bg-white px-2 py-1.5 font-ledger text-xs text-text-primary outline-none focus:border-primary"
      />
    </div>
  );
}
