"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";

interface CuratorReviewCardProps {
  id: string;
  title: string;
  medium: string;
  imageUrl: string;
  onApprove: (id: string) => void;
  onReject: (id: string, feedback: string) => void;
  onTagChange?: (id: string, tag: string) => void;
}

export default function CuratorReviewCard({
  id,
  title,
  medium,
  imageUrl,
  onApprove,
  onReject,
  onTagChange,
}: CuratorReviewCardProps) {
  const [feedback, setFeedback] = useState("");
  const [tag, setTag] = useState("");

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">Medium: {medium}</p>

      <div className="mb-2">
        <Label htmlFor={`tag-${id}`} className="block mb-1">
          Tag (Style)
        </Label>
        <select
          id={`tag-${id}`}
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
            onTagChange?.(id, e.target.value);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Tag</option>
          <option value="Abstract">Abstract</option>
          <option value="Portrait">Portrait</option>
          <option value="Landscape">Landscape</option>
          <option value="Conceptual">Conceptual</option>
        </select>
      </div>

      <div className="mb-2">
        <Label htmlFor={`feedback-${id}`} className="block mb-1">
          Feedback (if rejecting)
        </Label>
        <TextInput
          id={`feedback-${id}`}
          label=""
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Optional feedback message"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <Button variant="default" onClick={() => onApprove(id)}>
          Approve
        </Button>
        <Button variant="destructive" onClick={() => onReject(id, feedback)}>
          Reject
        </Button>
      </div>
    </div>
  );
}
