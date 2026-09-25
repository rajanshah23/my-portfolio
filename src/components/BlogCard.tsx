import { ArrowRight } from "lucide-react";

type BlogCardProps = {
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  anchor: string;
};

const BlogCard = ({ title, summary, category, technologies, anchor }: BlogCardProps) => (
  <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{category}</p>
    <h3 className="mt-3 text-xl font-bold text-slate-900">{title}</h3>
    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{summary}</p>
    <div className="mt-5 flex flex-wrap gap-2">{technologies.map((technology) => <span key={technology} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">{technology}</span>)}</div>
    <a href={anchor} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Read technical note <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
  </article>
);

export default BlogCard;
