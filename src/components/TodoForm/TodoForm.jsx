import styles from "./todoForm.module.css";
import { useState } from "react"
import { Plus } from "lucide-react";

const TodoForm = ({ onAgregarNota }) => {
    const [textNote, setTextNote] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();

        // Retornamos si el campo de texto está vacio
        if(textNote.trim() === ""){
            alert("No puede crear una nota vacia");
            return;
        }

        // Aquí creamos la nueva nota
        const newNote = {
            id: Date.now().toString(), // id único
            texto: textNote,
            completo: false
        }

        // Enviar al padre
        onAgregarNota(newNote);

        // Limpiar input
        setTextNote("");
    }

    const handleChange = (e) => {
        setTextNote(e.target.value)
    }

    return(
        <div className={styles.formContainer}>
            <h4>Nueva Nota</h4>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="nota" 
                    name="nota" 
                    value={textNote}
                    onChange={handleChange}
                />
                <button type="submit">
                <Plus size={16} />
                    Crear nota
                </button>
            </form>
        </div>
    )
}

export default TodoForm;