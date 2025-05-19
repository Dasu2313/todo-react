import { useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Task = (props) => {
  const checkboxRef = useRef(null)

  const onFormSubmit = (event) => {
    event.preventDefault()

    const taskName = event.target.taskName.value
    const newTask = {
      name: taskName,
      status: 'active',
      timer: props.timer,
    }

    props.updateTasks(newTask, props.idx)
  }

  const onCheckChange = (checked) => {
    const newTask = {
      name: props.text,
      status: checked ? 'completed' : 'active',
    }
    props.updateTasks(newTask, props.idx)
  }

  console.log(props.timer)

  return (
    <li className={props.status}>
      <div
        className="view"
        onClick={(e) => {
          e.stopPropagation()
          if (checkboxRef.current) {
            checkboxRef.current.checked = !checkboxRef.current.checked
            onCheckChange(checkboxRef.current.checked)
          }
        }}
      >
        <input
          onClick={(e) => e.stopPropagation()}
          ref={checkboxRef}
          className="toggle"
          type="checkbox"
          onChange={(event) => {
            onCheckChange(event.target.checked)
          }}
        />
        <label>
          <span className="description">{props.text}</span>
          <span className="created">
            {formatDistanceToNow(props.timer, { addSuffix: true, includeSeconds: true })}
          </span>
        </label>
      </div>
      <button onClick={() => props.onEdit(props.idx)} className="icon icon-edit"></button>
      <button onClick={() => props.onDelete(props.idx)} className="icon icon-destroy"></button>

      {props.status === 'editing' && (
        <form onSubmit={onFormSubmit}>
          <input type="text" className="edit" name="taskName" required></input>
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  updateTasks: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['active', 'completed', 'editing']).isRequired,
  text: PropTypes.string.isRequired,
  timer: PropTypes.instanceOf(Date).isRequired,
}

Task.defaultProps = {
  status: 'active',
  timer: new Date(),
}

export default Task
