import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  Checkbox,
  Link,
  Box,
} from "@chakra-ui/react";
import { Button } from "../../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";

type formFileds = {
  email: string;
  password: string;
};

const onSubmit: SubmitHandler<formFileds> = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(data);
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formFileds>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="20px" paddingTop="1.5rem">
        <FormControl>
          <FormLabel htmlFor="userName">Name</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="userName"
            color="gray.400"
            {...register("email", {
              required: "O preenchimento do campo é obrigatório",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Formato de email inválido",
              },
            })}
          />
          {errors.email && (
            <Box textColor="red.500">{errors.email.message}</Box>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            h="3.125rem"
            fontSize="0.875rem"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "O preenchimento do campo é obrigatório",
              minLength: {
                value: 8,
                message: "A senha deve conter no mínimo 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <Box textColor="red.500">{errors.password.message}</Box>
          )}
        </FormControl>
        <Flex justifyContent="space-between" marginTop="0.8125rem">
          <Checkbox defaultChecked colorScheme="green" size="sm">
            Do you want to save the password?
          </Checkbox>
          <Link fontWeight="600" color="purple.500" fontSize="0.8125rem">
            Forgot the password?
          </Link>
        </Flex>
        <Button
          disabled={isSubmitting}
          text={isSubmitting ? "Loading..." : "Login"}
          h="3.125rem"
          type="submit"
        />
      </Flex>
    </form>
  );
}
