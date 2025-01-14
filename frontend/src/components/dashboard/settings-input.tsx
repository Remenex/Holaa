import Icon from "../lib/icon";

type Props = {
  label: string;
  icon: string;
  placeholder: string;
  defaultValue: string;
  name: string;
};

export default function SettingsInput({
  label,
  icon,
  placeholder,
  defaultValue,
  name,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-lg text-white" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <Icon
          icon={icon}
          variation="absolute  top-1/2 -translate-y-1/2 left-2"
        />
        <input
          className="w-full rounded border border-gray-600 bg-zinc-800 py-3 pl-10 pr-4.5 text-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}
