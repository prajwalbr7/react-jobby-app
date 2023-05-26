import {Component} from 'react'
import './index.css'

class SalaryItem extends Component {
  render() {
    const {SalItems, onChangeSalary, salaryLabelText} = this.props
    const {salaryRangeId, label} = SalItems
    const FetchSalary = event => {
      onChangeSalary(event.target.value)
    }
    return (
      <li className="employ-listContainer">
        <input
          id={salaryRangeId}
          type="radio"
          onChange={FetchSalary}
          value={salaryRangeId}
          checked={salaryRangeId === salaryLabelText}
        />
        <label
          htmlFor={salaryRangeId}
          className="label-employement-salary-style"
        >
          {label}
        </label>
      </li>
    )
  }
}

export default SalaryItem
