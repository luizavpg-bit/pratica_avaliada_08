import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import dayjs from "dayjs"
import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"

function Cadastro() {
	const navigate = useNavigate()

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: "",
		usuario: "",
		senha: "",
		foto: "",
		dataNascimento: "",
	})

	const [confirmarSenha, setConfirmarSenha] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		})
	}

	function atualizarConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmarSenha(e.target.value)
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (usuario.senha.length < 8) {
			alert("A senha precisa ter no mínimo 8 caracteres!")
			return
		}

		if (usuario.senha !== confirmarSenha) {
			alert("As senhas não conferem!")
			return
		}

		const idade = dayjs().diff(dayjs(usuario.dataNascimento), "year")
		if (idade < 18) {
			alert("É necessário ter 18 anos ou mais para se cadastrar!")
			return
		}

		setIsLoading(true)
		try {
			await cadastrarUsuario(`/usuarios/cadastrar`, usuario, () => {})
			alert("Usuário cadastrado com sucesso!")
			navigate("/")
		} catch (error) {
			alert("Erro ao cadastrar o usuário. Tente novamente.")
		} finally {
			setIsLoading(false)
		}
	}

	function cancelar() {
		navigate("/")
	}

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen place-items-center font-bold">
				<div
					className="bg-[url('https://ik.imagekit.io/vzr6ryejm/games/fundo_03.jpg?updatedAt=1714988179386')] lg:block hidden bg-no-repeat 
                    w-full min-h-screen bg-cover bg-center"
				></div>
				<form
					className="flex justify-center items-center flex-col w-full max-w-md px-6 sm:px-8 py-10 lg:py-3 gap-3"
					onSubmit={cadastrarNovoUsuario}
				>
					<h2 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl text-center">Cadastrar</h2>

					<div className="flex flex-col w-full">
						<label htmlFor="nome">Nome</label>
						<input
							type="text"
							id="nome"
							name="nome"
							placeholder="Nome"
							className="border-2 border-slate-700 rounded p-2 w-full"
							required
							value={usuario.nome}
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="usuario">Usuario</label>
						<input
							type="email"
							id="usuario"
							name="usuario"
							placeholder="Usuario"
							className="border-2 border-slate-700 rounded p-2 w-full"
							required
							value={usuario.usuario}
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full">
							<label htmlFor="foto">
								Foto (URL){" "}
								<span className="text-slate-400 font-normal">opcional</span>
							</label>
							<input
								id="foto"
								name="foto"
								type="text"
								className="border-2 border-slate-700 rounded p-2 w-full"
								placeholder="https://..."
								value={usuario.foto}
								onChange={atualizarEstado}
							/>
						</div>

					<div className="flex flex-col w-full">
						<label htmlFor="dataNascimento">Data de Nascimento</label>
						<input
							type="date"
							id="dataNascimento"
							name="dataNascimento"
							className="border-2 border-slate-700 rounded p-2 w-full"
							required
							value={usuario.dataNascimento}
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="senha">Senha</label>
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Senha"
							className="border-2 border-slate-700 rounded p-2 w-full"
							required
							value={usuario.senha}
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="confirmarSenha">Confirmar Senha</label>
						<input
							type="password"
							id="confirmarSenha"
							name="confirmarSenha"
							placeholder="Confirmar Senha"
							className="border-2 border-slate-700 rounded p-2 w-full"
							value={confirmarSenha}
							onChange={atualizarConfirmarSenha}
						/>
					</div>

					<div className="flex flex-col sm:flex-row justify-around w-full gap-3 sm:gap-8">
						<button
							type="button"
							onClick={cancelar}
							className="rounded text-white bg-red-400 hover:bg-red-700 w-full sm:w-1/2 py-2"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="rounded text-white bg-teal-500 hover:bg-teal-700 w-full sm:w-1/2 py-2 flex justify-center"
						>
							{isLoading ? <BeatLoader color="#ffffff" size={10} /> : <span>Cadastrar</span>}
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Cadastro