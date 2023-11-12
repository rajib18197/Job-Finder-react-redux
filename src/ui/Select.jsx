export default function Select({
  options,
  id,
  name,
  value,
  onChange,
  ...props
}) {
  return (
    <select id={id} name={name} value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
