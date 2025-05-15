/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
// import {
//   Command,
//   CommandInput,
//   CommandList,
//   CommandGroup,
//   CommandItem
// } from "@/components/ui/command"

import type SearchGroup from '@/interfaces/SearchGroup';
import { GroupLabel } from '@/interfaces/groupLabel';


export default function SearchSuggest() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchGroup[]>([]);



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResearch = useCallback(
    debounce(async (input: string) => {
      if (!input.trim()) {
        setResults([]);
        return;
      }

      try {
        const { data } = await axios.get(`/api/v1/searchContract?q=${encodeURIComponent(input)}`);
        console.log(data)
        const grouped : Record<string, SearchGroup> = {};

        data.forEach((item: any) => {
          const type = item.type;
          const groupName = GroupLabel[type] || type;
        
          // const labelValue = item[type] ?? item.contractNumber ?? item.phone ?? '---';
        
          if (!grouped[type]) {
            grouped[type] = {
              group: groupName,
              items: []
            };
          }

          grouped[type].items.push({
            id: item.id,
            label: `Contract : ${item.contractNumber}`+ ' -- ' + `MCAS : ${item.mcas}` + ' -- ' + `CIF : ${item.cif}` + ' -- ' + `Phone : ${item.mobile}` + ' -- ' + `Name : ${item.fullName}`,
            type: type
          });
        });

        setResults(Object.values(grouped));
        console.log(results);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      } finally {
      }
    }, 300),
    []
  );

  const handleInputChange = (_ : any, {newValue} : { newValue : string }) => {
      setQuery(newValue);
      handleResearch(newValue);
  }

  // React-autosuggest
  const getSuggestionValue = (suggestion : any) => suggestion.label;

  const renderSuggestion = (suggestion : any) => (
    <div className="py-2 text-sm text-gray-800">{suggestion.label}</div>
  )

  const renderSectionTitle = (section : SearchGroup) => (
    <div className="px-2 pt-2 pb-1 text-xs text-gray-500 uppercase">{section.group}</div>
  );

  const getSectionSuggestions = (section: SearchGroup) => section.items;

  return (
    <div className='w-[500px]'>
      <Autosuggest 
        suggestions={results}
        multiSection={true}
        onSuggestionsFetchRequested={({ value }) => handleResearch(value)}
        onSuggestionsClearRequested={() => setResults([])}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        onSuggestionSelected={(_, { suggestion }) => {
          console.log("Đã chọn:", suggestion);
        }}
        inputProps={{
          className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
          placeholder: "Tìm kiếm theo số hợp đồng, MCAS, CIF hoặc số điện thoại...",
          value: query,
          onChange: handleInputChange,
        }}
      />
    </div>
  );
}