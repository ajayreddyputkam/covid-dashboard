// Write your code here

import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const colorsBackground = ['#5a8dee', '#a3df9f', '#64c2a6']

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div className="vaccination-age-main-container">
      <div className="vaccination-age-in-container">
        <h1 className="vaccination-age-heading">Vaccination by age</h1>
        <PieChart height={300} width={1000}>
          <Pie
            data={vaccinationByAge}
            dataKey="count"
            cx="50%"
            cy="50%"
            startAngle={0}
            endAngle={360}
            outerRadius={120}
          >
            {vaccinationByAge.map((entry, index) => (
              <Cell
                fill={colorsBackground[index]}
                name={vaccinationByAge[index].age}
                key={vaccinationByAge[index].age}
              />
            ))}
          </Pie>
          <Legend iconType="circle" />
        </PieChart>
      </div>
    </div>
  )
}

export default VaccinationByAge
