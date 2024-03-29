import { Comment as CommentType } from "@prisma/client";

// TODO: this isn't a true CommentType; the dates have already been serialized
// dates are going to be ISO formatted strings
export const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  const author = comment.author || "anon";
  const dateTime = new Date(comment.createdAt).toLocaleString();
  return (
    <div className="prose">
      <p className="text-sm">
        <>
          at {dateTime}, {author} wrote:
        </>
      </p>
      <p className="border-l-4 border-l-mineral-400 pl-2">{comment.content}</p>
    </div>
  );
};
