import { z, string } from "zod";

export const signInSchema = z.object({
    email: string({ required_error: "Email é obrigatório" })
        .min(1, "Email é obrigatório")
        .email("Email invalido"),
    password: string({ required_error: "Senha é obrigatória" })
        .min(1, "Senha é obrigatória")
        .min(6, "A senha deve ter mais de 6 ou mais caracteres")
        .max(15, "A senha deve ter no máximo 15 caracteres"),
});

export const signUpSchema = z.object({
    username: string({required_error: "Nome de usuário é obrigatório"})
        .min(4, "O nome de usuário deve ter 4 ou mais carracteres"),
    email: string({ required_error: "Email é obrigatório" })
        .min(1, "Email é obrigatório")
        .email("Email invalido"),
    password: string({ required_error: "Senha é obrigatória" })
        .min(1, "Senha é obrigatória")
        .min(6, "A senha deve ter mais de 6 ou mais caracteres")
        .max(15, "A senha deve ter no máximo 15 caracteres"),
        confirmPassword: z
        .string({ required_error: "Confirmação de senha é obrigatória" }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"], // mostra o erro nesse campo
});

export const modalSchema = z.object({
    taskTitle: string({required_error:"O nome da tarefa é obrigatório"}).min(1,"Preencha este campo."),
    taskType: string({required_error:"O tipo da tarefa é obrigatório"}).min(1,'Preencha este campo'),
    taskDate: string({required_error:"A data da tarefa é obrigatório"}).min(10,"Data invalida"),
    taskDescription: string({required_error:'A descrição da tarefa é obrigatória'}).min(1,'Preencha este campo')
})