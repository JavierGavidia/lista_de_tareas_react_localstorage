import styles from "../todoApp.module.css";
import { useState } from "react";

const EditNoteForm = ({nota, onEditarNota, onCancelar}) => {

    const [textoEditado, setTextoEditado] = useState(nota.texto);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Creamos la nota actualizada
        const notaActualizada = {...nota, texto: textoEditado};

        // Enviamos al padre
        onEditarNota(notaActualizada); // Actualiza la nota
        onCancelar(); // Cerramos el formulario
    };

    return (
        <form onSubmit={handleSubmit} className={styles.editForm}>
            <input 
                type="text" 
                value={textoEditado} 
                onChange={(e) => setTextoEditado(e.target.value)}
                className={styles.inputEditForm}
            />

            {/* BOTONES */}
            <button 
                type="submit" 
                className={styles.guardarBtn}>
                Guardar
            </button>
            <button 
                type="button" 
                onClick={onCancelar} 
                className={styles.cancelarBtn}>
                Cancelar
            </button>
        </form>
    )

};

export default EditNoteForm;