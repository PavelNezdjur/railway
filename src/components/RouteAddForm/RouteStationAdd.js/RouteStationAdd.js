import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";

const RouteStationAdd = ({
  typeStation,
  placeholderStation,
  typeTime,
  placeholderTime,
}) => {
  const { register, control } = useFormContext();

  const stations = useSelector((state) => state.station.stations);
  const options = stations?.map((station) => ({
    value: station.title,
    label: station.title,
    stopTime: station.stopTime,
  }));

  const getStationValue = (value) =>
    value ? options.find((option) => option.value === value) : "";

  return (
    <Box display="flex">
      <Controller
        control={control}
        name={typeStation}
        rules={{ required: "this field is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Box width="300px" sx={{ mb: 1, mr: 1 }}>
            <ReactSelect
              placeholder={placeholderStation}
              options={options}
              required
              value={getStationValue(value)}
              onChange={(newValue) => onChange(newValue).value}
            />
          </Box>
        )}
      />
      <TextField
        size="small"
        type="text"
        {...register(typeTime, { required: "Please enter time" })}
        placeholder={placeholderTime}
      />
    </Box>
  );
};

export default RouteStationAdd;
