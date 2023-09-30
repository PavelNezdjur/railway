import { DeleteOutlineTwoTone } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";

const RouteTicketsAdd = ({ index, remove, field }) => {
  const { register, control } = useFormContext();

  const options = [
    { value: "Reserved Seat", label: "Reserved Seat" },
    { value: "Coupe", label: "Coupe" },
  ];

  const getTicketValue = (value) =>
    value ? options.find((option) => option.value === value) : "";

  return (
    <Box>
      <Controller
        control={control}
        name={`tickets.${index}`}
        render={({ field: { onChange, value } }) => (
          <Box display="flex">
            <Box sx={{ width: "152px" }}>
              <ReactSelect
                placeholder="Ticket type"
                required
                options={options}
                defaultValue={getTicketValue(field?.carriageType)}
                value={getTicketValue(value)}
                onChange={(newValue) => onChange(newValue)}
              />
            </Box>
            <TextField
              defaultValue={field?.ticketsTotal}
              {...register(`tickets.${index}.ticketsTotal`, {
                valueAsNumber: true,
                required: "Please enter this field",
              })}
              placeholder="Tickets quantity"
              type="number"
              size="small"
              sx={{ width: "160px", mx: 1 }}
            />
            <TextField
              defaultValue={field?.ticketPrice}
              {...register(`tickets.${index}.ticketPrice`, {
                valueAsNumber: true,
                required: "Please enter this field",
              })}
              placeholder="Ticket price"
              type="number"
              size="small"
              sx={{ width: "160px" }}
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

export default RouteTicketsAdd;
