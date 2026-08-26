import { useContext, type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

interface RotaProtegidaProps {
	children: ReactNode
}

function RotaProtegida({ children }: RotaProtegidaProps) {
	const { usuario } = useContext(AuthContext)

	if (usuario.token === "") {
		return <Navigate to="/" />
	}

	return <>{children}</>
}

export default RotaProtegida