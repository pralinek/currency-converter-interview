'use client'

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useForm,
  FormProvider as DefaultProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { ReactNode } from 'react';

const schema = yup.object({
  fromCurrency: yup.string().required(),
  toCurrency: yup.string().required(),
  amount: yup.number().required().positive(),
});

type FormValues = yup.InferType<typeof schema>;

interface FormProviderProps {
  children: ReactNode;
  defaultValues: FormValues;
  onSubmit?: SubmitHandler<FormValues>;
}

export function FormProvider({
  children,
  defaultValues,
  onSubmit = () => {},
}: FormProviderProps) {
  const methods: UseFormReturn<FormValues> = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return (
    <DefaultProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </DefaultProvider>
  );
}