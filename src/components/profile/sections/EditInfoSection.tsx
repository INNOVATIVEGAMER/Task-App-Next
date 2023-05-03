import { QUERY_KEYS } from "@/Constants/TanstackConstants";
import { queryClient } from "@/pages/_app";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import { UpdateUser } from "@/APIFunctions/auth";
import { useAuth } from "@/Context/Auth";

interface IProps {
  name: string;
  age: number;
  email: string;
  closeEditMode: () => void;
}

const EditInfoSection = ({ age, email, name, closeEditMode }: IProps) => {
  const { authToken } = useAuth();
  const { mutate } = useMutation({
    mutationFn: UpdateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      closeEditMode();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const age = data.get("age");
    const name = data.get("name");

    if (email && name && age && authToken)
      mutate({
        name: name.toString(),
        age: Number(age.toString()),
        email: email.toString(),
        AUTH_TOKEN: authToken,
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Stack spacing={2} width="50%">
        <TextField
          autoComplete="given-name"
          name="name"
          required
          id="name"
          label="Name"
          autoFocus
          defaultValue={name}
        />
        <TextField
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          defaultValue={email}
        />
        <TextField
          autoComplete="given-name"
          name="age"
          required
          id="age"
          label="Age"
          autoFocus
          type="number"
          defaultValue={age}
        />

        <Box display="flex" gap="1rem" alignItems="center">
          <Button
            endIcon={<SaveIcon color="success" fontSize="small" />}
            color="success"
            variant="outlined"
            type="submit"
          >
            Save
          </Button>
          <Button
            onClick={closeEditMode}
            endIcon={<CloseIcon color="error" fontSize="small" />}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditInfoSection;
