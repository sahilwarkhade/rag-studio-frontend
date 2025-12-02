import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import DOMPurify from "dompurify";
import "highlight.js/styles/github-dark.css";

export const ChatMessage = ({ message, isStreaming, citations = [] }) => {
  const isUser = message?.role === "user";
  const [openCitationIndex, setOpenCitationIndex] = useState(null);

  const sanitizedContent = DOMPurify.sanitize(message?.content);

  return (
    <div
      className={`
        flex w-full mt-4 gap-3 sm:gap-4 
        ${isUser ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 sm:w-9 sm:h-9 rounded-full 
          flex items-center justify-center flex-shrink-0
          ${
            isUser
              ? "bg-gradient-to-br from-indigo-500 to-purple-600"
              : "bg-[#0f1117] border border-white/10"
          }
        `}
      >
        {isUser ? "👤" : "🤖"}
      </div>

      {/* Message Bubble */}
      <div
        className={`
          max-w-[80%] sm:max-w-[70%] md:max-w-[65%]
          rounded-2xl px-3 sm:px-4 py-3 
          backdrop-blur-xl border break-words
          ${
            isUser
              ? "bg-indigo-600/90 text-white border-indigo-500/50"
              : "bg-[#1a1c23]/80 border-white/10 text-slate-200"
          }
        `}
      >
        {/* Content */}
        <div className="prose prose-invert max-w-none text-sm sm:text-[15px] leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              p: ({ children }) => (
                <p className="mb-2 break-words">{children}</p>
              ),

              code: ({ className, children }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-black/40 px-1.5 py-0.5 rounded text-pink-300 text-[0.85em] break-words">
                    {children}
                  </code>
                ) : (
                  <pre className="bg-black/60 p-3 rounded-lg overflow-x-auto border border-white/10 text-xs sm:text-sm">
                    <code className={className}>{children}</code>
                  </pre>
                );
              },
            }}
          >
            {sanitizedContent}
          </ReactMarkdown>

        {/* Streaming cursor */}
        {isStreaming && (
          <span className="ml-1 inline-block w-2 h-4 bg-white/60 animate-pulse rounded-sm"></span>
        )}
        </div>

        {/* Citations */}
        {!isUser && citations?.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
            <h4 className="text-[10px] sm:text-xs font-medium text-slate-400 tracking-wide">
              SOURCES
            </h4>

            <div className="flex flex-wrap gap-2">
              {citations.map((cite, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setOpenCitationIndex(
                      openCitationIndex === index ? null : index
                    )
                  }
                  className="
                    cursor-pointer px-3 py-1.5 rounded-lg text-[11px] sm:text-xs 
                    bg-[#0f1117]/70 border border-white/10 text-slate-300 
                    hover:bg-[#1a1c23] hover:border-white/20 transition
                    max-w-full truncate
                  "
                >
                  📄 Page {cite?.metadata?.loc?.pageNumber}
                </button>
              ))}
            </div>

            {/* Citation Expand Panel */}
            {openCitationIndex !== null && (
              <div
                className="
                  p-3 rounded-lg bg-black/40 border border-white/10 
                  text-xs sm:text-sm text-slate-300 transition 
                  whitespace-pre-wrap leading-relaxed
                "
              >
                <h5 className="font-semibold text-slate-200 mb-1">
                  Lines {citations[openCitationIndex]?.metadata?.loc?.lines?.from}
                  {" – "}
                  {citations[openCitationIndex]?.metadata?.loc?.lines?.to}
                </h5>

                {citations[openCitationIndex]?.metadata?.loc?.pageNumber && (
                  <p className="text-slate-400 text-xs mb-2">
                    Page: {citations[openCitationIndex]?.metadata?.loc?.pageNumber}
                  </p>
                )}

                <p className="text-xs sm:text-sm break-words">
                  {citations[openCitationIndex]?.pageContent ||
                    "No preview available."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
