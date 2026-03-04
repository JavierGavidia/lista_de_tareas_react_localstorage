import styles from "./todoApp.module.css";
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm/TodoForm";
import EditNoteForm from "./EditNoteForm/EditNoteForm";
import { SquarePen, Trash } from "lucide-react";
import { notasIniciales } from "../data/notasIniciales";

function TodoApp() {
    const [notas, setNotas] = useState([]);
    const [notaEditandoId, setNotaEditandoId] = useState(null);

    /* SOLO FUNCIONA CON db.jason en local */
    /* useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/notas");

                if (!response.ok) {
                    throw new Error(`Error http: ${response.status}`);
                }

                const data = await response.json();
                setNotas(data);
                console.log("Notas Cargadas");

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []) */

    // Cargar notas desde localStorage al iniciar
    useEffect(() => {
        const notasGuardadas = localStorage.getItem("notas");

        if (notasGuardadas !== null) {
            setNotas(JSON.parse(notasGuardadas));
        } else {
            setNotas(notasIniciales);
        }
    }, []);

    // Guardar notas cada vez que cambien
    useEffect(() => {
        localStorage.setItem("notas", JSON.stringify(notas));
    }, [notas])

    // Función para agregar notas
    const agregarNota = (nuevaNota) => {
        setNotas([...notas, nuevaNota])
    }

    // Función para borrar notas
    const eliminarNota = (id) => {
        setNotas(notas.filter(nota => nota.id !== id));
    };

    // Función Actualizar Nota
    const actualizarNota = (notaActualizada) => {
        setNotas(
            notas.map(nota => nota.id === notaActualizada.id ? notaActualizada : nota)
        );
    };

    // Función para completar las notas
    const marcarComoCompleta = (notaId) => {
        setNotas(
            notas.map(nota => nota.id === notaId ? { ...nota, completo: !nota.completo } : nota)
        );
    };

    return (
        <>
            <h1 className={styles.titulo}>Notas</h1>
            <TodoForm onAgregarNota={agregarNota}></TodoForm>
            <ul className={styles.lista_notas}>
                {notas.map((nota) => (
                    <li key={nota.id}>
                        <span>
                            {nota.texto} {nota.completo ? "✅" : "❎"}
                        </span>
                        <div className={styles.btns_lista}>
                            {/* Botón para completar la nota */}
                            <button
                                onClick={() => marcarComoCompleta(nota.id)}
                                className={styles.completoBtn}>
                                {/* Texto que se verá dependiendo del estado de completo */}
                                {nota.completo ? "Desmarcar" : "Completar"}
                            </button>
                            <SquarePen
                                onClick={() => setNotaEditandoId(nota.id)}
                                size={20}
                            />
                            <Trash
                                onClick={() => eliminarNota(nota.id)}
                                size={20}
                                className={styles.borrar}
                            />
                        </div>
                        {
                            notaEditandoId === nota.id && (
                                <EditNoteForm
                                    nota={nota}
                                    onEditarNota={actualizarNota}
                                    onCancelar={() => setNotaEditandoId(null)}
                                />
                            )
                        }
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TodoApp;