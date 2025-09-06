import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../hooks/use-auth";
import { NewPasswordInputs, newPasswordSchema } from "../schemas/new-password-schema";

export function NewPasswordForm() {
  const { completeNewPassword, isLoading, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordInputs>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordInputs) => {
    await completeNewPassword(data.password);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="text-red-600 text-center">{error}</div>}
      <div className="grid gap-2">
        <Label>Nueva contraseña</Label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <Input type="password" {...field} />}
        />
        {errors.password && (
          <span className="text-sm text-red-600">{errors.password.message}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label>Confirmar contraseña</Label>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => <Input type="password" {...field} />}
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <Button className="w-full mt-2" type="submit" disabled={isLoading}>
        {isLoading ? "Actualizando..." : "Actualizar contraseña"}
      </Button>
    </form>
  );
}
