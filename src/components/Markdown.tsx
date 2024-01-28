import { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

type PropsType = HTMLAttributes<HTMLDivElement> & {
  children: string;
};

function Markdown({ children, className, ...otherProps }: PropsType) {
  return (
    <div
      className={`shelakhte ${className}`}
      {...otherProps}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
