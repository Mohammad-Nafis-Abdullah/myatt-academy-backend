"use client";
import * as React from "react";
import { useLocalStorage } from "react-use";
import { serialize } from "v8";

export type CartType = {
  grades: number[];
  subjects: {
    [key: number | string]: number[];
  };
};

type InitialStateType = {
  carts: CartType | null;
  cartsLength: () => number;
  setCarts: React.Dispatch<CartType | null>;
};

// initial context
const initialValue = {
  carts: null,
  cartsLength: () => 0,
  setCarts: () => {},
};

export const CartContext = React.createContext<InitialStateType>(initialValue);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [carts, setCarts] = React.useState<CartType | null>(null);
  const [value, setValue] = useLocalStorage("grade");

  const store = value as CartType;

  // sync style with local store
  React.useEffect(() => {
    if (store) {
      setCarts(store as CartType);
    }
  }, [store]);

  // get serialize carts
  const serializeCarts = () => {
    const grades = store?.grades?.map((gradeId: number) => {
      const subjects = store.subjects[gradeId];
      return {
        gradeId,
        subjects,
      };
    });

    return grades;
  };

  // cart length
  const cartsLength = React.useCallback((): number => {
    // const data = serializeCarts();

    // let len = 0;

    // data?.forEach(
    //   (el: { gradeId: number; subjects: number[] }) =>
    //     (len += el?.subjects?.length)
    // );

    // return len;

    if (store) {
      const count = Object.values(store?.subjects).flat(Infinity);
      return count.length;
    }
    return 0;
  }, [store]);

  return (
    <CartContext.Provider
      value={{
        carts,
        cartsLength,
        setCarts: setValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
