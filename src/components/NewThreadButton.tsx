import Link from 'next/link';

type NewThreadButtonProps = {
  categoryId?: string;
};

export function NewThreadButton({ categoryId }: NewThreadButtonProps) {
  const href = categoryId ? `/category/${categoryId}/new` : '/new-thread';
  
  return (
    <Link href={href}>
      <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>New Thread</span>
      </button>
    </Link>
  );
} 