"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

export const TextInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block mb-1">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
