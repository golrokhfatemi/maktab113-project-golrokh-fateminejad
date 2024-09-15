import React from 'react'

export default function TextInput({name,lable ,errors,register,classNames ,...props}) {
    return (
        <div className="my-3 w-full relative flex flex-row">
            <div className='w-48'>
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold text-center ">{lable}</label>
            </div>
            
            <input className={`shadow border rounded-md w-48 py-2 px-3  text-gray-700 focus:outline-none  ${classNames} ${
                errors[name] ? "border-red-500" :""
            }`}
            name={name}
            id={name}
            {...props}
            {...register}
    
            />
            <div>
            {
                errors[name] &&
               
                  <p className="text-red-500 text-sm px-3  absolute w-full">
                    {errors[name].message}
                </p>  
            }
            </div>
           
        
      </div>
      )
    }

