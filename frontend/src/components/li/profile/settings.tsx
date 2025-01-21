type Props = {
  label: string;
  placeholder: string;
  defaultValue: string;
  name: string;
  disabled?: boolean;
  isPassword?: boolean;
};

export default function UserSettingsInput({
  label,
  placeholder,
  defaultValue,
  name,
  disabled = false,
  isPassword = false
}: Props) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-lg gray-text font-display" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full rounded-2xl  bg-dark-gray py-3 pl-5 pr-4.5 ${disabled ? 'gray-text' : 'text-white'} focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
          type={`${isPassword ? 'password' : 'text'}`}
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
