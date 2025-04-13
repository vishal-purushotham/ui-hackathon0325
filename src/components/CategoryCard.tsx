import Link from 'next/link';

type CategoryCardProps = {
  id: string;
  name: string;
  description: string;
  threadCount: number;
  lastActive: string;
  icon: React.ReactNode;
  hasNewContent?: boolean;
};

export function CategoryCard({
  id,
  name,
  description,
  threadCount,
  lastActive,
  icon,
  hasNewContent = false,
}: CategoryCardProps) {
  return (
    <Link href={`/category/${id}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-border flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <div className="text-primary p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-text group-hover:text-primary transition-colors">
                {name}
              </h3>
              {hasNewContent && (
                <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>
            <p className="text-subtle-text text-sm">
              {description}
            </p>
          </div>
        </div>
        <div className="text-right text-sm text-subtle-text">
          <div>{threadCount} threads</div>
          <div>Last active {lastActive}</div>
        </div>
      </div>
    </Link>
  );
} 