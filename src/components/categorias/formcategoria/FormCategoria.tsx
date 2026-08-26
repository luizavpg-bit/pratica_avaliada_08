import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import { buscar, cadastrar, atualizar } from "../../../services/Service"

function FormCategoria() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { usuario } = useContext(AuthContext)
	const token = usuario.token

	const [categoria, setCategoria] = useState<Categoria>({
		id: 0,
		tipo: "",
	})

	const [isLoading, setIsLoading] = useState(false)

	const header = { headers: { Authorization: token } }

	async function buscarPorId(id: string) {
		try {
			await buscar(`/categorias/${id}`, setCategoria, header)
		} catch (error) {
			alert("Erro ao buscar a categoria!")
		}
	}

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id)
		}
	}, [id])

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setCategoria({
			...categoria,
			[e.target.name]: e.target.value,
		})
	}

	async function enviarFormulario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		setIsLoading(true)
		try {
			if (id !== undefined) {
				await atualizar(`/categorias`, categoria, setCategoria, header)
				alert("Categoria atualizada com sucesso!")
			} else {
				await cadastrar(`/categorias`, categoria, setCategoria, header)
				alert("Categoria cadastrada com sucesso!")
			}
			navigate("/categorias")
		} catch (error) {
			alert("Erro ao salvar a categoria!")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="container flex flex-col items-center justify-center px-2 pt-4 mx-auto">
			<h1 className="my-8 text-3xl text-center md:text-4xl">
				{id !== undefined ? "Editar Categoria" : "Cadastrar Categoria"}
			</h1>

			<form className="flex flex-col w-full max-w-md gap-4 px-2 md:max-w-1/2" onSubmit={enviarFormulario}>
				<div className="flex flex-col gap-2 ">
					<label htmlFor="tipo">Categoria</label>
					<input
						type="text"
						placeholder="Categoria"
						id='tipo'
						name='tipo'
						className="p-2 text-base bg-white border-2 rounded border-slate-700 utral-800 md:text-lg"
						required
						value={categoria.tipo}
						onChange={atualizarEstado}
					/>
				</div>
				<button
					className="flex justify-center w-full py-2 mx-auto text-base rounded text-slate-100 bg-slate-400 hover:bg-slate-800 md:w-1/2 md:text-lg"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? <BeatLoader color="#ffffff" size={10} /> : <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>}
				</button>
			</form>
		</div>
	)
}

export default FormCategoria