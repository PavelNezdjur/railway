import { TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const RouteNumAdd = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <TextField
        sx={{ mb: 3, width: "200px" }}
        required
        size="small"
        type="number"
        {...register("numRoute", { required: "Please enter Route number" })}
        placeholder="Route №"
      />

      {errors?.numRoute && (
        <Typography sx={{ color: "red" }}>{errors.numRoute.message}</Typography>
      )}
    </div>
  );
};

export default RouteNumAdd;
