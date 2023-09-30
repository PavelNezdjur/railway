import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import { DeleteOutlineTwoTone } from "@mui/icons-material";

const RouteMiddleStationsAdd = ({ index, remove, field }) => {
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
        name={`middleStations.${index}`}
        render={({ field: { onChange, value } }) => (
          <Box display="flex" sx={{ mb: 1 }}>
            <Box sx={{ width: "300px", mr: 1 }}>
              <ReactSelect
                placeholder="Middle Station"
                required
                options={options}
                defaultValue={getStationValue(field?.title)}
                value={getStationValue(value)}
                onChange={(newValue) => onChange(newValue).value}
              />
            </Box>
            <TextField
              defaultValue={field?.departTime}
              {...register(`middleStations.${index}.departMidStTime`, {
                required: "Please enter this field",
              })}
              placeholder="Departure time"
              sx={{ width: "180px" }}
              size="small"
            />

            <Button
              type="button"
              sx={{ minWidth: "20px" }}
              size="small"
              color="error"
              onClick={() => remove(index)}
            >
              <DeleteOutlineTwoTone />
            </Button>
          </Box>
        )}
      />
    </Box>
  );
};

export default RouteMiddleStationsAdd;
