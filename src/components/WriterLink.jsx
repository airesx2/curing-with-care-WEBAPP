import React from "react";
import { Link } from "react-router-dom";
import { nameToSlug } from "../lib/writerUtils";

function WriterLink({ name, className = "" }) {
  if (!name) return null;

  const authors = name.split("•").map((n) => n.trim());

  return (
    <span>
      {authors.map((author, index) => (
        <span key={author}>
          <Link
            to={`/writer/${nameToSlug(author)}`}
            className={`text-[#32567F] underline underline-offset-2 hover:text-green-700 transition-colors ${className}`}
          >
            {author}
          </Link>
          {index < authors.length - 1 && <span className="mx-1">•</span>}
        </span>
      ))}
    </span>
  );
}

export default WriterLink;