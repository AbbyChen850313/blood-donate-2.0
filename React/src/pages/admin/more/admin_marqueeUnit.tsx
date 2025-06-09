//admin_marquee.tsx
import React from "react";

interface MarqueeInputProps {
  id: number;
  text: string;
  onUpdate: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}
function MarqueeInput(data: MarqueeInputProps) {
  
  return (
    <div className="inputGroup">
      <input
        type="text"
        value={data.text}
        onChange={(e) => data.onUpdate(data.id, e.target.value)}
      />
      <button
        className="deleteButton"
        onClick={() => data.onDelete(data.id)}
      >
        X
      </button>
    </div>
  );
}
export default MarqueeInput;
