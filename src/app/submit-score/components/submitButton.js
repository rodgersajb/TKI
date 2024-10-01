import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-kobeGreen text-kobeWhite font-semibold mt-2 py-2 px-4 rounded">
      {pending ? "Adding Score..." : "Submit Score"}
    </button>
  );
}
