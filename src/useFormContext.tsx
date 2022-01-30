import React from 'react';

import omit from './utils/omit';
import { FieldValues, FormProviderProps, UseFormReturn } from './types';

const HookFormContext = React.createContext<UseFormReturn | null>(null);

/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop.
 *
 * @summary
 * [API](https://react-hook-form.com/api/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @return return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
export const useFormContext = <
  TFieldValues extends FieldValues,
>(): UseFormReturn<TFieldValues> =>
  React.useContext(HookFormContext) as unknown as UseFormReturn<TFieldValues>;

export const FormProvider = <
  TFieldValues extends FieldValues,
  TContext extends object = object,
>(
  props: FormProviderProps<TFieldValues, TContext>,
) => (
  <HookFormContext.Provider
    value={omit(props, 'children') as unknown as UseFormReturn}
  >
    {props.children}
  </HookFormContext.Provider>
);
