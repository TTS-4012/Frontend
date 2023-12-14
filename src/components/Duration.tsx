import Input from "./Input";

type PropsType = {
  value: number;
  onChange: (newValue: number) => unknown;
  onBlur: () => unknown;
};

function splitValue(value: number) {
  const minute = value % 60;
  const hour = Math.floor(value / 60) % 24;
  const day = Math.floor(value / 1440);
  return { minute, hour, day };
}

function Duration(props: PropsType) {
  const { minute, hour, day } = splitValue(props.value);

  const handleChange = (minute: number, hour: number, day: number) => {
    props.onChange(minute + 60 * hour + 1440 * day);
  };

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">Duration</label>
      <div className=" flex w-3/4 flex-row gap-2">
        <Input
          label="D"
          type="number"
          min={0}
          value={day}
          onChange={(e) => {
            const value = +e.target.value;
            if (isNaN(value) || value < 0) return;
            handleChange(minute, hour, value);
          }}
          onBlur={props.onBlur}
        />
        <Input
          label="H"
          type="number"
          min={0}
          value={hour}
          onChange={(e) => {
            const value = +e.target.value;
            if (isNaN(value) || value < 0 || value >= 24) return;
            handleChange(minute, value, day);
          }}
          onBlur={props.onBlur}
        />
        <Input
          label="M"
          type="number"
          min={0}
          value={minute}
          onChange={(e) => {
            const value = +e.target.value;
            if (isNaN(value) || value < 0 || value >= 60) return;
            handleChange(value, hour, day);
          }}
          onBlur={props.onBlur}
        />
      </div>
    </>
  );
}
export default Duration;
