import { useFormStatus } from "react-dom";

export default function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-kobePurple w-full text-kobeWhite py-2 px-4 rounded">
      {pending ? "Completing Sign Up..." : "Complete Sign Up"}
    </button>
  );
}
