'use client';

interface Category {
    id: string;
    label: string;
}

interface CategoryListProps {
    categories: Category[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export const CategoryList = ({ categories, selectedId, onSelect }: CategoryListProps) => {
    return (
        <div className="flex overflow-x-auto py-4 px-4 gap-2 no-scrollbar border-b border-gray-800 bg-gray-900 sticky top-14 z-30">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`
            whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all
            ${selectedId === cat.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                        }
          `}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
};
