import { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

type PropsType = HTMLAttributes<HTMLDivElement> & {
  children: string;
};

function Markdown({ children, className, ...otherProps }: PropsType) {
  return (
    <div
      className={`shelakhte ${className}`}
      {...otherProps}>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{children}</ReactMarkdown>
    </div>
  );
}

export default Markdown;
