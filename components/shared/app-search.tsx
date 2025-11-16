"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowUpRight, Search, X } from "lucide-react";
import React from "react";

interface searchSuggestionProps {
  title: string;
  href: string;
}

type AppSearchContextProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchSuggestions: searchSuggestionProps[];
};

const AppSearchContext = React.createContext<AppSearchContextProps | null>(
  null
);

function useAppSearch() {
  const context = React.useContext(AppSearchContext);

  if (!context)
    throw new Error("useAppSearch must be used within a <AppSearch />");

  return context;
}

function SearchBar({ onFocus }: { onFocus?: () => void }) {
  const { searchValue, setSearchValue } = useAppSearch();

  return (
    <div className="w-full relative">
      <InputGroup className="bg-accent rounded-full pl-3 pr-10 h-12  border-none has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-primary has-[[data-slot=input-group-control]:focus-visible]:ring-2">
        <InputGroupInput
          onFocus={onFocus ? () => onFocus() : undefined}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Bạn muốn tìm gì?"
          className="placeholder:text-accent-foreground placeholder:text-[16px]"
        />
        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>

        {/* Delete button */}
        {searchValue && (
          <InputGroupAddon align={"inline-end"}>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full absolute top-2 right-2"
              onClick={() => setSearchValue("")}
            >
              <X className="size-5" />
            </Button>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
}

function SearchSuggestionsList() {
  return (
    <div className="w-full h-full">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="hover:bg-accent/50 cursor-pointer p-4 flex justify-between items-center group"
        >
          <div className="w-full flex gap-4 items-center">
            <Search size={14} />
            <p className="group-hover:underline">Gợi ý tìm kiếm {index + 1}</p>
          </div>

          <ArrowUpRight size={16} className="opacity-50" />
        </div>
      ))}
    </div>
  );
}

function AppSearch({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchSuggestions] = React.useState<searchSuggestionProps[]>([]);

  return (
    <AppSearchContext.Provider
      value={{ searchValue, searchSuggestions, setSearchValue }}
    >
      {children}
    </AppSearchContext.Provider>
  );
}

export { AppSearch, useAppSearch, SearchBar, SearchSuggestionsList };
