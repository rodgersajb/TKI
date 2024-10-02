import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function Logout() {
    return (
        <LogoutLink className="text-kobWhite">Logout</LogoutLink>
    )
}