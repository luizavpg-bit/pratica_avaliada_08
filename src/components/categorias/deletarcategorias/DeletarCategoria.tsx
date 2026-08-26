import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"

function DeletarCategoria() {
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

	async function excluir() {
		setIsLoading(true)
		try {
			await deletar(`/categorias/${id}`, header)
			alert("Categoria excluída com sucesso!")
			navigate("/categorias")
		} catch (error) {
			alert("Erro ao excluir a categoria!")
		} finally {
			setIsLoading(false)
		}
	}

	function cancelar() {
		navigate("/categorias")
	}

	return (
		<div className='container w-full max-w-md px-4 pt-4 mx-auto md:pt-6'>
			<h1 className='py-4 text-3xl text-center md:text-4xl'>Deletar Categoria</h1>
			<p className='mb-4 text-base font-semibold text-center md:text-lg'>
				Você tem certeza de que deseja apagar a categoria a seguir?</p>
			<div className='flex flex-col justify-between overflow-hidden border rounded-2xl'>
				<header
					className='px-4 py-2 text-lg font-bold text-white md:px-6 bg-slate-600 md:text-2xl'>
					Categoria
				</header>
				<p className='h-full p-4 text-xl bg-white md:p-8 md:text-3xl'>{categoria.tipo}</p>
				<div className="flex flex-row">
					<button
						onClick={cancelar}
						className='w-full py-2 text-base bg-red-400 text-slate-100 hover:bg-red-600 md:text-lg'
					>
						Não
					</button>
					<button
						onClick={excluir}
						disabled={isLoading}
						className='flex items-center justify-center w-full text-base bg-teal-600 text-slate-100 hover:bg-teal-700 md:text-lg'
					>
						{isLoading ? <BeatLoader color="#ffffff" size={10} /> : <span>Sim</span>}
					</button>
				</div>
			</div>
		</div>
	)
}
export default DeletarCategoria