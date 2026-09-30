import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import type { TechnicalNote } from '../data/technicalNotes';
import type { TechnicalNoteType } from '../types';

const renderInline = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  const formattingPattern = /(`[^`]+`|\*\*.+?\*\*)/g;
  let previousIndex = 0;
  let tokenIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = formattingPattern.exec(text)) !== null) {
    if (match.index > previousIndex) {
      nodes.push(text.slice(previousIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('`')) {
      nodes.push(
        <code key={`inline-${tokenIndex}`} className="bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(
        <strong key={`inline-${tokenIndex}`}>
          {token.slice(2, -2)}
        </strong>
      );
    }

    previousIndex = formattingPattern.lastIndex;
    tokenIndex += 1;
  }

  if (previousIndex < text.length) {
    nodes.push(text.slice(previousIndex));
  }

  return nodes;
};

const parseTableRow = (line: string): string[] =>
  line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());

const isTableRow = (line: string): boolean => line.trimStart().startsWith('| ');

const isTableSeparator = (line: string): boolean =>
  /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line);

const renderMarkdown = (markdown: string): ReactNode => {
  const lines = markdown.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let paragraphLines: string[] = [];
  let index = 0;

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    blocks.push(
      <p key={`paragraph-${blocks.length}`} className="text-base leading-relaxed mb-4">
        {renderInline(paragraphLines.join(' '))}
      </p>
    );
    paragraphLines = [];
  };

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === '') {
      flushParagraph();
      index += 1;
      continue;
    }

    if (line.trimStart().startsWith('```')) {
      flushParagraph();
      index += 1;
      const codeLines: string[] = [];
      while (index < lines.length && !lines[index].trimStart().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push(
        <pre key={`code-${blocks.length}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    if (line.startsWith('# ')) {
      flushParagraph();
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="text-2xl font-bold mt-8 mb-4">
          {renderInline(line.slice(2))}
        </h2>
      );
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="text-xl font-semibold mt-6 mb-3">
          {renderInline(line.slice(3))}
        </h3>
      );
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      blocks.push(
        <h4 key={`h4-${blocks.length}`} className="text-lg font-semibold mt-4 mb-2">
          {renderInline(line.slice(4))}
        </h4>
      );
      index += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push(
        <ul key={`list-${blocks.length}`} className="list-disc pl-6 mb-4 space-y-1">
          {items.map((item, itemIndex) => (
            <li key={`item-${itemIndex}`}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (isTableRow(line)) {
      flushParagraph();
      const hasHeader = index + 1 < lines.length && isTableSeparator(lines[index + 1]);
      const headerCells = hasHeader ? parseTableRow(line) : null;
      const rows: string[][] = [];
      index += hasHeader ? 2 : 1;

      while (index < lines.length && isTableRow(lines[index])) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }

      blocks.push(
        <table key={`table-${blocks.length}`} className="w-full border-collapse mb-4">
          {headerCells && (
            <thead>
              <tr>
                {headerCells.map((cell, cellIndex) => (
                  <th key={`header-${cellIndex}`} className="border border-gray-700 px-3 py-2 bg-gray-800 text-left">
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`cell-${cellIndex}`} className="border border-gray-700 px-3 py-2">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
      continue;
    }

    paragraphLines.push(line);
    index += 1;
  }

  flushParagraph();
  return <>{blocks}</>;
};

type TechnicalNoteModalProps = {
  note: TechnicalNote | TechnicalNoteType | null;
  onClose: () => void;
};

const TechnicalNoteModal = ({ note, onClose }: TechnicalNoteModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!note) return;

    const previouslyFocusedElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    closeButtonRef.current?.focus();

    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [note, onClose]);

  if (!note) return null;

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const content = 'content' in note
    ? note.content ?? ''
    : 'implementation' in note
      ? note.implementation.join('\n\n')
      : '';
  const linkTo = 'linkTo' in note
    ? note.linkTo
    : 'anchor' in note
      ? note.anchor
      : undefined;
  const readTime = 'readTime' in note ? note.readTime : null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto backdrop-blur-[2px] animate-fade-in"
      onClick={handleOutsideClick}
      role="presentation"
    >
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div
          ref={dialogRef}
          className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col animate-scale-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="technical-note-title"
          tabIndex={-1}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div className="min-w-0">
              <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {note.category}
              </span>
              <h2 id="technical-note-title" className="mt-3 text-2xl font-bold text-gray-800">
                {note.title}
              </h2>
              {readTime && <p className="mt-1 text-sm text-gray-500">{readTime}</p>}
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close technical note"
              className="ml-4 rounded-full p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="min-h-0 overflow-y-auto p-6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {note.technologies.map((technology) => (
                  <span key={technology} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm">
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            {renderMarkdown(content)}

            {linkTo && (
              <a
                href={linkTo}
                onClick={onClose}
                className="mt-6 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Open related section
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalNoteModal;