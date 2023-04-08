// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-coverage-main-container">
      <div className="vaccination-coverage-in-container">
        <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
        <BarChart data={last7DaysVaccination} height={300} width={1000}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <Legend />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#64c2a6"
            barSize="20%"
            className="bar-style"
          />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </div>
    </div>
  )
}

export default VaccinationCoverage
