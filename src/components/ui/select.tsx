import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// API: <Select value, onChange, options, placeholder, className>
export function Select({ value, onChange, options, placeholder, className, disabled }) {
  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <div className={cn('relative', className)}>
          <Listbox.Button
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              !value && 'text-muted-foreground',
              className
            )}
          >
            <span className="block truncate">{options.find(o => o.value === value)?.label || placeholder || 'Selecione...'}</span>
            <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            show={open}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span className={cn('block truncate', selected && 'font-medium')}>{option.label}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
