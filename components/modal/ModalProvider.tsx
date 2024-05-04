import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import QuizModal from "@/components/modal/QuizModal";

export default function ModalProvider() {
  const { modal } = useAppSelector((state) => state.ui);

  const searchParams = useSearchParams();

  switch (searchParams.get("modal")) {
    case "teachers":
      return null;
    default:
      return null;
  }
}
