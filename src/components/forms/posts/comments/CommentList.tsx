"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";

interface CommentItem {
  id: string;
  content: string;
  createdAt: Date;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  replies?: CommentItem[];
}

interface Props {
  comments: CommentItem[];
  postSlug: string;
}

function CommentNode({
  comment,
  postSlug,
}: {
  comment: CommentItem;
  postSlug: string;
}) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-purple-100">
            {comment.user?.name || comment.user?.email || "Anonymous"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-300 whitespace-pre-line">{comment.content}</p>

      <button
        type="button"
        onClick={() => setShowReply((prev) => !prev)}
        className="mt-3 text-sm text-purple-300 hover:text-purple-200"
      >
        {showReply ? "Cancel" : "Reply"}
      </button>

      {showReply ? (
        <div className="mt-4">
          <CommentForm
            postSlug={postSlug}
            parentId={comment.id}
            onSuccess={() => setShowReply(false)}
          />
        </div>
      ) : null}

      {comment.replies?.length ? (
        <div className="mt-4 space-y-4 border-l border-gray-800 pl-4">
          {comment.replies.map((reply) => (
            <CommentNode key={reply.id} comment={reply} postSlug={postSlug} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function CommentList({ comments, postSlug }: Props) {
  if (!comments.length) {
    return <p className="text-sm text-gray-400">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentNode key={comment.id} comment={comment} postSlug={postSlug} />
      ))}
    </div>
  );
}