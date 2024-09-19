export default function SelectInput({
    label,
    name,
    onChange,
    options = [],
    register,
    errors,
    ...props
  }) {
    return (
      <div>
        <div className="flex flex-row  my-3 w-full">
          <div className="w-48">
            <label
              htmlFor={name}
              className="block text-gray-700 text-sm font-bold mb-1 text-center"
            >
              {label}
            </label>
          </div>
          <select
            className="shadow border w-48 rounded-md py-2 px-3 text-gray-700 focus:outline-none"
            id={name}
            name={name}
            onChange={onChange}
            {...props}
            {...register}
          >
            <option value=""> category </option>
            {/* {console.log(options)}; */}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {/* {Array.isArray(options) && options.length > 0 ? (
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))
                    ) : (
                    <option value="">No options available</option> 
                    )} */}
          </select>
          {/* {console.log(errors)} */}
          {errors[name] && (
            <p className="text-red-500 text-sm px-3  absolute">
              {errors[name].message}
            </p>
          )}
        </div>
      </div>
    );
  }
  