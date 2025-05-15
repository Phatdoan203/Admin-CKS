/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem
} from "@/components/ui/command"

import type SearchGroup from '@/interfaces/SearchGroup';
import { GroupLabel } from '@/interfaces/GroupLabel';


export default function SearchSuggest() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchGroup[]>([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResearch = useCallback(
    debounce(async (input: string) => {
      if (!input.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/v1/searchContract?q=${encodeURIComponent(input)}`);

        const grouped: Record<string, SearchGroup> = {};

        data.forEach((item: any) => {
          const type = item.type;
          const groupName = GroupLabel[type] || type;

          if (!grouped[type]) {
            grouped[type] = {
              group: groupName,
              items: []
            };
          }

          grouped[type].items.push({
            id: item.id,
            label: item.label || `${item[type]} - ${item.fullName}`,
            type: groupName
          });
        });

        setResults(Object.values(grouped));
        console.log(results);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (value: string) => {
    setQuery(value);
    handleResearch(value);
  };

  return (
    <Command className="w-[500px] border rounded-lg shadow">
      <CommandInput
        placeholder="Tìm kiếm theo số hợp đồng, MCAS, CIF hoặc số điện thoại..."
        value={query}
        onValueChange={handleInputChange}
      />
      <CommandList>
        {loading && <p className="px-4 py-2 text-sm text-muted">Đang tìm kiếm ...</p>}
        {!loading && results.length === 0 && query && (
          <p className="px-4 py-2 text-sm text-muted">Không có kết quả</p>
        )}
        
        {results.map((group, index) => (
          <CommandGroup key={`{${group.group}-${index}}`} heading={group.group}>
            {group.items.map(item => (
              <CommandItem
                key={`${item.type}-${item.id}`}
                onSelect={() => console.log("Đã chọn: ", item)}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
}