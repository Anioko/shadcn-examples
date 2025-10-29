import React, { useState, useRef, KeyboardEvent } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string[];
  onChange: (values: string[]) => void;
  suggestions?: string[];
  maxTags?: number;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
  error?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Tag-based multi-entry input component following UI Guidelines
 * Implements the exact pattern from ReqArchitect Business Model Wizard
 */
export function TagInput({
  label,
  placeholder = "Type and press Enter to add",
  required = false,
  value = [],
  onChange,
  suggestions = [],
  maxTags = 50,
  validation,
  error,
  disabled = false,
  className
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on current input and exclude already selected values
  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
    !value.includes(suggestion)
  ).slice(0, 10); // Limit to 10 visible suggestions

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowSuggestions(newValue.length > 0);
    setFocusedSuggestionIndex(-1);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (focusedSuggestionIndex >= 0 && filteredSuggestions[focusedSuggestionIndex]) {
          addTag(filteredSuggestions[focusedSuggestionIndex]);
        } else if (inputValue.trim()) {
          addTag(inputValue.trim());
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        setFocusedSuggestionIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;

      case 'Escape':
        setShowSuggestions(false);
        setFocusedSuggestionIndex(-1);
        break;

      case 'Backspace':
        if (inputValue === '' && value.length > 0) {
          removeTag(value.length - 1);
        }
        break;
    }
  };

  const addTag = (tag: string) => {
    if (!tag || value.includes(tag) || value.length >= maxTags) return;

    // Validate tag if pattern is provided
    if (validation?.pattern && !validation.pattern.test(tag)) {
      return; // Invalid tag, don't add
    }

    const newTags = [...value, tag];
    onChange(newTags);
    setInputValue('');
    setShowSuggestions(false);
    setFocusedSuggestionIndex(-1);
  };

  const removeTag = (index: number) => {
    if (disabled) return;
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  const selectSuggestion = (suggestion: string) => {
    addTag(suggestion);
    inputRef.current?.focus();
  };

  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Label */}
      <Label className="text-base font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Tags Container */}
      <div
        className={cn(
          "min-h-[40px] p-2 border rounded-md bg-background cursor-text transition-colors",
          "focus-within:ring-2 focus-within:ring-ring focus-within:border-ring",
          error && "border-red-500 focus-within:ring-red-500 focus-within:border-red-500",
          disabled && "opacity-50 cursor-not-allowed",
          "flex flex-wrap gap-1 items-center"
        )}
        onClick={handleContainerClick}
      >
        {/* Render existing tags */}
        {value.map((tag, index) => (
          <Badge
            key={index}
            variant="default"
            className="bg-black text-white hover:bg-gray-800 text-sm px-2 py-1 flex items-center gap-1"
          >
            <span>{tag}</span>
            {!disabled && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-gray-700 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </Badge>
        ))}

        {/* Input field */}
        {value.length < maxTags && (
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setShowSuggestions(inputValue.length > 0)}
            onBlur={() => {
              // Delay hiding suggestions to allow clicking
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder={value.length === 0 ? placeholder : ""}
            disabled={disabled}
            className="border-none shadow-none p-0 h-auto focus-visible:ring-0 flex-1 min-w-[120px]"
          />
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50 bg-popover border rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                className={cn(
                  "w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                  "border-none bg-transparent cursor-pointer transition-colors",
                  index === focusedSuggestionIndex && "bg-accent text-accent-foreground"
                )}
                onClick={() => selectSuggestion(suggestion)}
                onMouseEnter={() => setFocusedSuggestionIndex(index)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Helper text */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          {/* Validation error */}
          {error && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              {error}
            </p>
          )}
          
          {/* General help text */}
          {!error && (
            <p className="text-sm text-muted-foreground">
              Type and press Enter to add. {maxTags - value.length} remaining.
            </p>
          )}
        </div>

        {/* Tag counter */}
        <span className="text-xs text-muted-foreground">
          {value.length} / {maxTags}
        </span>
      </div>

      {/* Validation message */}
      {validation?.message && (
        <p className="text-xs text-muted-foreground mt-1">
          {validation.message}
        </p>
      )}
    </div>
  );
}

// Quick suggestion buttons for common values
interface SuggestionButtonsProps {
  label: string;
  suggestions: string[];
  selected: string[];
  onToggle: (suggestion: string) => void;
  maxVisible?: number;
}

export function SuggestionButtons({
  label,
  suggestions,
  selected,
  onToggle,
  maxVisible = 8
}: SuggestionButtonsProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleSuggestions = showAll ? suggestions : suggestions.slice(0, maxVisible);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      
      <div className="flex flex-wrap gap-2">
        {visibleSuggestions.map((suggestion) => {
          const isSelected = selected.includes(suggestion);
          return (
            <Button
              key={suggestion}
              type="button"
              variant={isSelected ? "default" : "outline"}
              size="sm"
              className={cn(
                "text-xs transition-colors",
                isSelected && "bg-black text-white hover:bg-gray-800"
              )}
              onClick={() => onToggle(suggestion)}
            >
              {isSelected && <X className="w-3 h-3 mr-1" />}
              {!isSelected && <Plus className="w-3 h-3 mr-1" />}
              {suggestion}
            </Button>
          );
        })}
        
        {suggestions.length > maxVisible && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `+${suggestions.length - maxVisible} More`}
          </Button>
        )}
      </div>
    </div>
  );
}