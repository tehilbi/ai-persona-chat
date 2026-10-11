import styles from './PersonaSelector.module.scss'

export default function PersonaSelector({ personas, selected, onSelect }) {
  return (
    <div className={styles.container}>
      {personas.map(persona => (
        <button
          key={persona.id}
          className={`${styles.card} ${selected.id === persona.id ? styles.active : ''}`}
          onClick={() => onSelect(persona)}
        >
          <span className={styles.emoji}>{persona.emoji}</span>
          <span className={styles.name}>{persona.name}</span>
          <span className={styles.description}>{persona.description}</span>
        </button>
      ))}
    </div>
  )
}
