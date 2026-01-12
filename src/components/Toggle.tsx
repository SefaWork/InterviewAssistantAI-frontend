import './Toggle.css'

/**
 * React component for Dark Mode toggle. 
 * @author SefaWork
 * */
function Toggle({ handleChange, isChecked }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; isChecked: boolean }) {
    return (
        <div className='toggle-container'>
            <input type="checkbox" id="dark-mode-check" className='toggle' onChange={handleChange} checked={isChecked} />
            <label htmlFor='dark-mode-check'>{isChecked? "Dark Mode":"Light Mode"}</label>
        </div>
    )
}

export default Toggle