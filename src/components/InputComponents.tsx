import React from "react";
import { ArrowDown, ArrowUp, EyeFilled, EyeFilledOff, SearchIcon } from "./IconPacks";


interface inputProps {
  title: string
  type: 'email' | 'password' | 'text'
  id: string
  placeholder: string
  value: string
  marginBottom?: boolean
  name: string
  checked: boolean
  onChange: (event:React.ChangeEvent<HTMLInputElement>) => void
  onTextChange: (event:React.ChangeEvent<HTMLTextAreaElement>) => void
  wordCount: number
  maxWordCount: number
  useWordCount: boolean
  disabled: boolean
  maxHeight: string
}

interface customSelectProps {
	data: any;
	placeholder: string
	selected: string 
	setSelected: React.Dispatch<React.SetStateAction<string>>
	title: string
	flowBottom?: boolean
	useSearchBar: boolean
  marginBottom?: boolean
}



const InputComponent = ({marginBottom, title, type, id, placeholder, value, onChange}: Partial<inputProps>):React.ReactElement => {
  const [inputType, setInputType] = React.useState<string>('password');

  return (
    <div className={marginBottom ? 'lg:mb-3 mb-2' : ''}>
      <h2 className='ml-2 mb-[3px] text-sm capitalize'>{title}</h2>
      <div className='relative'>
        {type === 'password' ?
          <input type={inputType} name="" id={id} className='border text-sm outline-none focus:outline-none w-full lg:p-[10px] p-2 rounded bg-inherit' placeholder={placeholder} value={value} onChange={onChange} autoComplete='off'/> :
          <input type={type} name="" id={id} className='border text-sm outline-none focus:outline-none w-full lg:p-[10px] p-2 rounded bg-inherit' placeholder={placeholder} value={value} onChange={onChange} autoComplete='off'/>
        }
        <div className={`absolute top-[9px] right-3 ${type === 'password' ? 'flex' : 'hidden'}`}>
          {inputType !== 'password' ? <EyeFilled className=' lg:w-6 w-5 lg:h-6 h-5 cursor-pointer' onClick={() => setInputType('password')}/> :
          <EyeFilledOff className='lg:w-6 w-5 lg:h-6 h-5 cursor-pointer' onClick={() => setInputType('text')}/> }
        </div>
      </div>
    </div>
  )
}

const DateInputComponent = ({marginBottom, title, id, value, onChange, name}:Partial<inputProps>):React.ReactElement => {

  return (
    <div className={`${marginBottom ? 'lg:mb-3 mb-2' : ''} flex flex-col`}>
      <label htmlFor={name} className='ml-2 mb-[3px] text-sm capitalize'>{title}</label>
      <input
        type='date'
        value={value} 
        name={name}
        id={id}
        onChange={onChange}
        className={'p-2 lg:p-[10px] outline-none focus:outline-none border rounded text-sm uppercase'}
      />
    </div>
  );
}

const RadioInputComponent = ({name, value, onChange, checked}:Partial<inputProps>):React.ReactElement => {
  return (
    <div className="flex gap-2">
      <input type="radio" name={name} id={value} value={value} className="w-4 accent-primary border-0" onChange={onChange} checked={checked}/> 
      <h2 className="capitalize dark:text-white text-sm">{value}</h2>
    </div>
  );
}

const CustomSelectComponent = ({marginBottom, flowBottom, data, placeholder, selected, setSelected, title, useSearchBar}:customSelectProps):React.ReactElement => {

	const [inputValue, setInputValue] = React.useState<string>('');
	const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className={`${marginBottom ? 'lg:mb-3 mb-2' : ''} relative`}>
			<h2 className='ml-2 mb-[3px] text-sm capitalize'>{title}</h2>
      <div
				onClick={() => setOpen(!open)}
				className={`cursor-pointer border w-full flex items-center justify-between lg:p-[10px] p-2 rounded md:text-[13px] text-xs capitalize ${!selected && 'text-gray-500 dark:text-white'}`}
			>
				{ selected ? selected : `select ${placeholder}` }
				{ open ? <ArrowDown className='w-5 h-5'/> : <ArrowUp className='w-5 h-5'/> }
      </div>
			<ul className={`z-[120] absolute ${flowBottom ? 'top-12 md:top-14' : 'bottom-10 md:bottom-11'} left-0 w-full bg-[#f1f1f1] dark:bg-[#9d9d9d] mt-2 rounded overflow-y-auto ${open ? 'max-h-40 md:max-h-44' : 'max-h-0'} `}>
				{ useSearchBar && data?.length > 0 && 
					<div className='flex items-center px-2 sticky top-0 bg-[#f1f1f1] dark:bg-[#9d9d9d]'>
						<SearchIcon className='w-4 h-4 text-primary'/>
						<input 
							type="text" 
							className='bg-inherit p-2 outline-none md:text-sm text-[12px] text-gray-700 dark:text-black dark:placeholder:text-black' 
							placeholder={`Search for ${placeholder}...`}
							value={inputValue} 
							onChange={(event) => setInputValue(event.target.value.toLowerCase())}
						/>
					</div>
				}
				{ data && data.map((singleItem:string, index:number) => (
					<li 
						className={`p-1 md:p-2 md:text-sm text-[12px] hover:text-white hover:dark:text-white cursor-pointer ${singleItem.toLowerCase().startsWith(inputValue) ? 'block': 'hidden'} ${singleItem.toLowerCase() === selected.toLowerCase() ? 'dark:text-white text-white bg-tertiaryBlue hover:bg-tertiaryBlue/75' : 'dark:text-black hover:bg-tertiaryBlue/50'}`} 
						key={index}
						onClick={() => { 
							if (singleItem.toLowerCase() !== selected?.toLowerCase()) {
								setSelected(singleItem);
								setOpen(false);
							}
						}}
					>
						{singleItem}
					</li>
				))}
			</ul>
    </div>
  );
};

const TextAreaComponent = ({maxHeight, disabled, useWordCount, marginBottom, title, id, value, name, placeholder, onTextChange, wordCount, maxWordCount}:Partial<inputProps>)=> {
  return (
    <div className={marginBottom ? 'lg:mb-3 mb-2' : ''}>
      <h2 className='ml-2 mb-[3px] text-sm capitalize'>{title}</h2>
      <textarea name={name} id={id} className={`border text-sm outline-none focus:outline-none w-full lg:p-[10px] p-2 rounded ${maxHeight ? maxHeight : 'h-[90px]'} resize-none`} placeholder={placeholder} value={value} onChange={onTextChange} autoComplete='off' disabled={disabled}/>
      { useWordCount && <span className="text-xs mt-[3px]">{wordCount} / {maxWordCount}</span> }
    </div>
  )
}


export {InputComponent, DateInputComponent, RadioInputComponent, CustomSelectComponent, TextAreaComponent}