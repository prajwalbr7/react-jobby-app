import './index.css'

const EmployementItem = props => {
  const {EmpItems, onChangeCheckedValue} = props
  const {label, employmentTypeId} = EmpItems
  const CheckedValue = event => {
    onChangeCheckedValue(event.target.value)
  }

  return (
    <li className="employ-listContainer">
      <input
        id={employmentTypeId}
        type="checkbox"
        value={employmentTypeId}
        onChange={CheckedValue}
      />
      <label
        htmlFor={employmentTypeId}
        className="label-employement-salary-style"
      >
        {label}
      </label>
    </li>
  )
}

export default EmployementItem
