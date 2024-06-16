'use client';

import { useState } from 'react';
import css from './dropdown.module.scss';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

export default function Dropdown({ options, onSelect }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options[0],
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`${cn(css.dropdown, 'bg-1-bg-black-80')} ${
        isOpen ? css.active : ''
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div>
        <button className={css.dropdownToggle}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </button>
        <div
          className={`${cn(css.dropdownMenu, 'bg-1-text-black-100')} ${
            isOpen ? css.active : ''
          }`}
        >
          {options.map((option, index) => {
            const isLast = index === options.length - 1;
            return (
              <div
                key={option.value}
                className={cn(
                  css.dropdownItem,
                  'hover:bg-1-bg-black-80 text-1-text-white-100',
                  { [css.lastItem]: isLast }
                )}
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Image
          className={`${css.arrow} ${isOpen ? css.arrowActive : ''}`}
          src={'/assets/icons/ChevronDown.svg'}
          alt="arrow"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
}
