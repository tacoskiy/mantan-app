'use client'

import { useState } from "react";
import CategoryChip from "../elements/CategoryChip";
import { Category } from "@/app/types/types";


interface CategoryBarProps{
    category: Category[];
    onSelect: (query: string) => void;
}

const CategoryBar = ({category, onSelect}:CategoryBarProps) => {
    const [selectedQuery, setSelectedQuery] = useState<string>("");

    function selectCategory (query: string){
        setSelectedQuery(query);
        onSelect(query);
    }

    return(
        <nav className="flex gap-1.5 w-full p-4 sticky top-0 z-1000 bg-bg-base-transparent backdrop-blur-2xl">
            {category.map((e) => (
                <CategoryChip
                    key={e.id}
                    context={e.context}
                    selected={selectedQuery === e.query}
                    onClick={() => selectCategory(e.query)}
                />
            ))}
        </nav>
    );
}

export default CategoryBar;